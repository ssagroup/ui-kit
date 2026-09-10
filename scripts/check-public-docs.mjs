/**
 * Fails when a public export is added without documentation.
 *
 * Everything currently undocumented is grandfathered through
 * `scripts/public-docs-baseline.json`, so this gates *new* API only — the
 * existing gaps are a separate, optional cleanup. Documenting a grandfathered
 * export is always safe; the baseline is a ceiling, not an expectation.
 *
 * The API surface comes from `ai-source-map.mjs --json`, which reads the
 * TypeScript program. That matters: a doc comment attached to the wrong symbol
 * (an internal `*Inner` implementation, say) does not count here, because it
 * does not reach consumers' editors or the generated `.d.ts` either.
 *
 * Usage:
 *   node scripts/check-public-docs.mjs           # verify
 *   node scripts/check-public-docs.mjs --update  # rewrite the baseline
 */
import { execFileSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const SCRIPTS = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(SCRIPTS, '..');
const BASELINE = resolve(SCRIPTS, 'public-docs-baseline.json');

const PACKAGES = ['packages/core', 'packages/utils'];

/**
 * Kinds that must carry a usage example, not just a summary. Types, constants
 * and contexts are excluded: an example of a type alias is noise, and the
 * summary already says what it is for.
 */
const NEEDS_EXAMPLE = new Set(['component', 'hook', 'function', 'class']);

/** Kinds that are not API a consumer writes against. */
const IGNORED_KINDS = new Set(['namespace']);

const isUpdate = process.argv.includes('--update');

const surfaceOf = (pkgDir) => {
  const raw = execFileSync(
    process.execPath,
    [resolve(SCRIPTS, 'ai-source-map.mjs'), pkgDir, '--json'],
    { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
  );
  return JSON.parse(raw);
};

/** Exports that fall short of the documentation bar, split by what is missing. */
const gapsIn = (surface) => {
  const missingSummary = [];
  const missingExample = [];
  for (const entry of surface.exports) {
    if (IGNORED_KINDS.has(entry.kind)) continue;
    if (!entry.summary) missingSummary.push(entry.name);
    else if (NEEDS_EXAMPLE.has(entry.kind) && !entry.hasExample) {
      missingExample.push(entry.name);
    }
  }
  return {
    missingSummary: [...new Set(missingSummary)].sort(),
    missingExample: [...new Set(missingExample)].sort(),
  };
};

const current = {};
for (const pkgDir of PACKAGES) {
  const surface = surfaceOf(pkgDir);
  current[surface.package] = gapsIn(surface);
}

if (isUpdate) {
  const payload = {
    $comment:
      'Public exports predating the documentation gate. Do not add to this ' +
      'list — document the export instead. Regenerate with: pnpm docs:check --update',
    ...current,
  };
  writeFileSync(BASELINE, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  const total = Object.values(current).reduce(
    (n, g) => n + g.missingSummary.length + g.missingExample.length,
    0,
  );
  console.log(
    `public-docs: baseline rewritten — ${total} grandfathered exports`,
  );
  process.exit(0);
}

if (!existsSync(BASELINE)) {
  console.error(
    'public-docs: no baseline found. Create one with: pnpm docs:check --update',
  );
  process.exit(1);
}

const baseline = JSON.parse(readFileSync(BASELINE, 'utf8'));

const added = [];
const fixed = [];
for (const [pkg, gaps] of Object.entries(current)) {
  const known = baseline[pkg] ?? { missingSummary: [], missingExample: [] };
  for (const field of ['missingSummary', 'missingExample']) {
    const allowed = new Set(known[field] ?? []);
    for (const name of gaps[field]) {
      if (!allowed.has(name)) added.push({ pkg, name, field });
    }
    for (const name of allowed) {
      if (!gaps[field].includes(name)) fixed.push({ pkg, name, field });
    }
  }
}

if (fixed.length) {
  console.log(
    `public-docs: ${fixed.length} grandfathered export(s) now documented — ` +
      'run `pnpm docs:check --update` to shrink the baseline.',
  );
}

if (!added.length) {
  const grandfathered = Object.values(current).reduce(
    (n, g) => n + g.missingSummary.length + g.missingExample.length,
    0,
  );
  console.log(
    `public-docs: ok — no undocumented new exports (${grandfathered} grandfathered)`,
  );
  process.exit(0);
}

console.error('\npublic-docs: new public exports are missing documentation.\n');
for (const { pkg, name, field } of added) {
  const what =
    field === 'missingSummary' ? 'needs a JSDoc summary' : 'needs an @example';
  console.error(`  ${pkg}  ${name} — ${what}`);
}
console.error(
  '\nAdd a JSDoc block to the *exported* declaration. A comment on an internal\n' +
    'implementation (e.g. `FooInner`) does not reach consumers and will not\n' +
    'satisfy this check.\n',
);
process.exit(1);
