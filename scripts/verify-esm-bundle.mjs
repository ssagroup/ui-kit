#!/usr/bin/env node
/**
 * Loads a package's built `dist/index.mjs` the way a *plain* ESM loader would —
 * no bundler in the middle — and fails the build if anything about it only
 * works because a bundler was there.
 *
 * Why this exists: the ESM bundle was previously only ever exercised through
 * webpack (here), Rollup (`vite build`) and esbuild (Vite's dep pre-bundling).
 * All three paper over CommonJS interop, so a genuinely broken bundle looked
 * healthy in CI and in consumers' production builds, and only fell over under
 * `vite dev` — as an unrelated-looking React error, once a chart mounted:
 *
 *   Element type is invalid: expected a string ... but got: object
 *
 * The cause was `import { default as Plot } from 'react-plotly.js'`. A named
 * `default` import binds to the whole `module.exports` of a CommonJS module,
 * because `__esModule` is a bundler convention rather than part of the interop
 * spec — so `Plot` was `{ __esModule: true, default: PlotComponent }`.
 *
 * Two checks, in order:
 *
 *   1. Static — every external specifier in the bundle must genuinely publish
 *      ESM. This is the check with the actionable error message: it names the
 *      offending package and points at the externals allowlist.
 *   2. Runtime — actually import the bundle under jsdom and assert every export
 *      is a usable value rather than an un-unwrapped CommonJS namespace. This
 *      is the backstop, and it also catches resolution bugs a bundler forgives,
 *      such as an extensionless deep path like `plotly.js/dist/plotly`.
 *
 * Run from a package directory: `node ../../scripts/verify-esm-bundle.mjs`.
 */
import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { basename, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const cwd = process.cwd();
const label = basename(cwd);
const bundlePath = resolve(cwd, 'dist/index.mjs');

const errors = [];
const warnings = [];

if (!existsSync(bundlePath)) {
  console.error(
    `verify-esm-bundle(${label}): dist/index.mjs not found — build first`,
  );
  process.exit(1);
}

// The bundle and its externals are browser code — plotly.js touches `self` at
// module scope, emotion touches `document`. Install jsdom globals before the
// dynamic import; ESM shares `globalThis`, so this is enough.
const { JSDOM, VirtualConsole } = await import('jsdom');

// jsdom reports unimplemented browser APIs by logging to the console rather
// than throwing. Those are jsdom's gaps, not the bundle's, and plotly.js trips
// several of them at module scope — swallow them so a real failure stands out.
const virtualConsole = new VirtualConsole();
virtualConsole.on('jsdomError', () => {});

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'https://localhost/',
  pretendToBeVisual: true,
  virtualConsole,
});

// Minimal stubs for the APIs jsdom does not implement at all. plotly.js probes
// canvas and object URLs while initialising its WebGL trace types; none of that
// is what we are testing, it just has to not throw.
dom.window.HTMLCanvasElement.prototype.getContext = () => ({
  fillRect: () => {},
  clearRect: () => {},
  getImageData: (_x, _y, width, height) => ({
    data: new Uint8ClampedArray(Math.max(1, width * height * 4)),
  }),
  putImageData: () => {},
  createImageData: () => [],
  setTransform: () => {},
  drawImage: () => {},
  save: () => {},
  restore: () => {},
  beginPath: () => {},
  moveTo: () => {},
  lineTo: () => {},
  closePath: () => {},
  stroke: () => {},
  fill: () => {},
  translate: () => {},
  scale: () => {},
  rotate: () => {},
  measureText: () => ({ width: 0 }),
  fillText: () => {},
});
dom.window.URL.createObjectURL = () => 'blob:verify-esm-bundle';
dom.window.URL.revokeObjectURL = () => {};

// Copy across every browser global Node does not already provide, rather than
// maintaining a list — the point of this check is to find out what the bundle
// touches, not to guess it in advance.
for (const key of Object.getOwnPropertyNames(dom.window)) {
  if (globalThis[key] !== undefined) {
    continue;
  }
  try {
    const value = dom.window[key];
    if (value !== undefined) {
      Object.defineProperty(globalThis, key, {
        value,
        configurable: true,
        writable: true,
      });
    }
  } catch {
    // Some jsdom globals throw on access outside a window context; skip them.
  }
}
Object.defineProperty(globalThis, 'self', {
  value: dom.window,
  configurable: true,
  writable: true,
});

/* ------------------------------------------------------------------ *
 * 1. Static: are all externals real ESM?
 * ------------------------------------------------------------------ */

const source = readFileSync(bundlePath, 'utf8');

// Webpack emits every external as a top-level, single-line import statement.
const imports = [
  ...source.matchAll(
    /^import\s+(.+?)\s+from\s*["']([^"']+)["'];?$|^import\s*["']([^"']+)["'];?$/gm,
  ),
].map(([, clause, specifier, sideEffectOnly]) => ({
  specifier: specifier ?? sideEffectOnly,
  clause: clause ?? '',
}));

const specifiers = [...new Set(imports.map((entry) => entry.specifier))].sort();

/**
 * Does this statement bind the module's `default` export by name?
 *
 * This is the one import form that is silently wrong against a CommonJS
 * module, and so the only one worth a static check:
 *
 *   import { default as X } from 'cjs-pkg'   // X === module.exports  ← hazard
 *   import X from 'cjs-pkg'                  // X === module.exports  ← hazard
 *   import * as X from 'cjs-pkg'             // X.default === module.exports, fine
 *   import { named } from 'cjs-pkg'          // cjs-module-lexer; throws loudly
 *
 * The last two are left to the runtime check below, which imports the bundle
 * for real: a namespace import always succeeds, and a missing named export is
 * a link-time SyntaxError rather than a value that quietly renders as `object`.
 */
const bindsDefaultByName = (clause) =>
  /(^|[{,]\s*)default\s+as\s+/.test(clause) ||
  /^[A-Za-z_$][\w$]*\s*(,|$)/.test(clause.trim());

const require_ = createRequire(resolve(cwd, 'noop.js'));

/** Splits `@scope/pkg/deep/path` into its package name and `./deep/path`. */
const splitSpecifier = (specifier) => {
  const segments = specifier.split('/');
  const name = specifier.startsWith('@')
    ? segments.slice(0, 2).join('/')
    : segments[0];
  const subpath = specifier.slice(name.length);
  return { name, subpath: subpath ? `.${subpath}` : '.' };
};

/** True if any nested condition in an `exports` entry can serve ESM. */
const hasEsmCondition = (node) => {
  if (typeof node === 'string') {
    return node.endsWith('.mjs');
  }
  if (Array.isArray(node)) {
    return node.some(hasEsmCondition);
  }
  if (node && typeof node === 'object') {
    return Object.entries(node).some(
      ([condition, value]) =>
        condition === 'import' ||
        condition === 'module' ||
        hasEsmCondition(value),
    );
  }
  return false;
};

const readPackageJson = (name) => {
  // `require.resolve('pkg/package.json')` fails on packages with an `exports`
  // map that does not expose it, which is most modern ones — walk to the
  // package root from any resolvable entry point instead.
  let dir;
  try {
    dir = require_.resolve(`${name}/package.json`);
    return JSON.parse(readFileSync(dir, 'utf8'));
  } catch {
    /* fall through */
  }
  try {
    const entry = require_.resolve(name);
    const marker = `/node_modules/${name}/`;
    const root = entry.slice(0, entry.lastIndexOf(marker) + marker.length);
    return JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
  } catch {
    return null;
  }
};

/**
 * Is a named `default` import of this CommonJS specifier actually broken?
 *
 * Not every one is. An ESM loader binds `default` to `module.exports`, so a
 * module written as `module.exports = value` — react, react-dom — comes through
 * correctly; that is the defined interop, not luck. The hazard is a
 * transpiled-ESM module, which sets `exports.default` and marks itself with
 * `__esModule`: `default` then binds to the record wrapping the value rather
 * than the value, and the export silently becomes an object.
 *
 * Probing the module is the only way to tell the two apart, so require it.
 * A specifier that cannot be required is reported as broken, since a plain ESM
 * loader will not manage it either.
 */
const doubleWrapsDefault = (specifier) => {
  try {
    const module_ = require_(specifier);
    return Boolean(module_ && module_.__esModule && 'default' in module_);
  } catch (error) {
    return error;
  }
};

for (const specifier of specifiers) {
  if (specifier.startsWith('.') || specifier.startsWith('node:')) {
    continue;
  }

  if (/\.(css|scss|sass|less|svg|png|jpe?g|gif|woff2?)$/.test(specifier)) {
    errors.push(
      `"${specifier}" is an asset specifier. Only a bundler can execute it; ` +
        `a plain ESM loader cannot. Add it to the externals allowlist so the ` +
        `asset is inlined at build time.`,
    );
    continue;
  }

  const importsDefault = imports.some(
    (entry) =>
      entry.specifier === specifier && bindsDefaultByName(entry.clause),
  );
  if (!importsDefault) {
    continue;
  }

  const { name, subpath } = splitSpecifier(specifier);
  const pkg = readPackageJson(name);

  if (!pkg) {
    warnings.push(`"${specifier}" could not be resolved — skipped.`);
    continue;
  }

  if (pkg.type === 'module') {
    continue;
  }

  let servesEsm;
  let reason;

  if (pkg.exports) {
    const entry =
      typeof pkg.exports === 'object' && !Array.isArray(pkg.exports)
        ? (pkg.exports[subpath] ?? (subpath === '.' ? pkg.exports : undefined))
        : pkg.exports;

    if (entry === undefined) {
      warnings.push(
        `"${specifier}" is not listed in ${name}'s exports map — skipped.`,
      );
      continue;
    }
    servesEsm = hasEsmCondition(entry);
    reason = `${name}'s exports map has no "import"/"module" condition for "${subpath}"`;
  } else if (pkg.module) {
    // The legacy `module` field: bundlers honour it, plain ESM loaders do not,
    // so as far as this check is concerned the package is CommonJS.
    servesEsm = false;
    reason = `${name} ships ESM only via the legacy \`module\` field, which plain ESM loaders ignore`;
  } else {
    servesEsm = false;
    reason = `${name} has no \`exports\`, no \`module\` and no \`"type": "module"\``;
  }

  if (servesEsm) {
    continue;
  }

  const doubleWrapped = doubleWrapsDefault(specifier);

  if (doubleWrapped instanceof Error) {
    errors.push(
      `"${specifier}" resolves to CommonJS (${reason}) and could not be ` +
        `loaded to check its interop: ${doubleWrapped.message}`,
    );
  } else if (doubleWrapped) {
    errors.push(
      `"${specifier}" resolves to CommonJS (${reason}) and sets ` +
        `\`exports.default\`, so a named \`default\` import of it binds to the ` +
        `module record — \`{ __esModule: true, default: ... }\` — instead of ` +
        `the export. Consumers see React's "Element type is invalid ... but ` +
        `got: object". Add it to the externals allowlist so it is bundled ` +
        `instead.`,
    );
  }
}

/* ------------------------------------------------------------------ *
 * 2. Runtime: does it load, and are the exports usable?
 * ------------------------------------------------------------------ */

let namespace;
try {
  namespace = await import(pathToFileURL(bundlePath).href);
} catch (error) {
  errors.push(
    `the bundle does not load in a plain ESM loader: ${error.message}`,
  );
}

/**
 * The signature of un-unwrapped CommonJS interop: an object that *is* a module
 * record — it carries a `default` alongside the `__esModule` marker, or has
 * nothing in it but `default`. A consumer would render or call the record
 * instead of the export it wraps.
 *
 * `__esModule` alone is not enough to go on: webpack stamps it onto the
 * namespace objects behind legitimate compound exports such as `Drawer.Root`.
 * Those have no `default`, which is what separates them.
 */
const looksLikeUnwrappedCjs = (value) => {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }
  const keys = Object.keys(value);
  if (!keys.includes('default')) {
    return false;
  }
  return value.__esModule === true || keys.length === 1;
};

if (namespace) {
  for (const [name, value] of Object.entries(namespace)) {
    if (looksLikeUnwrappedCjs(value)) {
      errors.push(
        `export "${name}" is an un-unwrapped CommonJS module record ` +
          `(${JSON.stringify(Object.keys(value))}), not a value. React would ` +
          `report "Element type is invalid ... but got: object".`,
      );
    }
  }
}

/* ------------------------------------------------------------------ */

for (const warning of warnings) {
  console.warn(`verify-esm-bundle(${label}): warning: ${warning}`);
}

if (errors.length) {
  for (const error of errors) {
    console.error(`verify-esm-bundle(${label}): error: ${error}`);
  }
  process.exit(1);
}

console.log(
  `verify-esm-bundle(${label}): ok — ${specifiers.length} externals, ` +
    `${namespace ? Object.keys(namespace).length : 0} exports load without a bundler`,
);
process.exit(0);
