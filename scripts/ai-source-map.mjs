/**
 * Generates `dist/ai/source-map.md` — a single-file index of a package's public
 * API, sized to be read in one shot by a coding agent.
 *
 * Agents consuming this library grep across ~940 `.d.ts` files (16MB) to answer
 * "what components exist and what props do they take". This emits the answer as
 * one small file instead.
 *
 * Derived from the TypeScript program, so it cannot drift from the real exports.
 *
 * Usage: node scripts/ai-source-map.mjs [packageDir]   (default: packages/core)
 */
import ts from 'typescript';
import { dirname, resolve, relative } from 'path';
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'fs';

const PKG_DIR = resolve(process.cwd(), process.argv[2] ?? 'packages/core');
const MAX_TYPE_LENGTH = 72;
const MAX_DOC_LENGTH = 110;
const MAX_SUMMARY_LENGTH = 170;
const MAX_OBJECT_KEYS = 6;
const UNION_APPENDIX_MIN = 15;
const NATIVE_PROPS_THRESHOLD = 40;

/**
 * Styling/polymorphism escape hatches that every component accepts. Listing them
 * ~150 times would bury the props that actually differ between components, so
 * they are noted once in the preamble instead.
 */
const UBIQUITOUS_PROPS = new Set([
  'className',
  'css',
  'as',
  'theme',
  'key',
  'ref',
]);

const pkgJson = JSON.parse(
  readFileSync(resolve(PKG_DIR, 'package.json'), 'utf8'),
);

/* ------------------------------------------------------------------ program */

const configPath = ['tsconfig.build.json', 'tsconfig.json']
  .map((f) => resolve(PKG_DIR, f))
  .find(existsSync);
if (!configPath) throw new Error(`No tsconfig found in ${PKG_DIR}`);

const rawConfig = ts.readConfigFile(configPath, ts.sys.readFile);
if (rawConfig.error) {
  throw new Error(
    ts.flattenDiagnosticMessageText(rawConfig.error.messageText, '\n'),
  );
}
const parsed = ts.parseJsonConfigFileContent(
  rawConfig.config,
  ts.sys,
  dirname(configPath),
);

const entry = resolve(PKG_DIR, 'src/index.ts');
const SRC = resolve(PKG_DIR, 'src');

const program = ts.createProgram([entry], { ...parsed.options, noEmit: true });
const checker = program.getTypeChecker();

const entryFile = program.getSourceFile(entry);
if (!entryFile) throw new Error(`Could not load entry point ${entry}`);
const moduleSymbol = checker.getSymbolAtLocation(entryFile);
if (!moduleSymbol) throw new Error(`${entry} is not a module`);

const exportSymbols = checker.getExportsOfModule(moduleSymbol);

/* ------------------------------------------------------------------ helpers */

const unwrap = (symbol) =>
  symbol.getFlags() & ts.SymbolFlags.Alias
    ? checker.getAliasedSymbol(symbol)
    : symbol;

const isOptional = (symbol) =>
  Boolean(symbol.getFlags() & ts.SymbolFlags.Optional);

const declarationOf = (symbol) => symbol.getDeclarations()?.[0];

/** Only props declared inside this package — filters out inherited DOM attributes. */
const isOwnDeclaration = (symbol) => {
  const decl = declarationOf(symbol);
  return Boolean(decl) && decl.getSourceFile().fileName.startsWith(SRC);
};

/**
 * The leading paragraph, rewrapped onto one line.
 *
 * Taking only the first *physical* line would cut mid-sentence wherever the
 * author happened to wrap, producing text that reads complete but isn't.
 */
const leadParagraph = (text) =>
  text
    .trim()
    .split(/\n\s*\n/)[0]
    .split('\n')
    .map((line) => line.trim())
    .join(' ')
    .trim();

/** Truncate at a word boundary so the tail reads as a sentence fragment, not a cut. */
const clamp = (text, max) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const boundary = cut.lastIndexOf(' ');
  return `${(boundary > max * 0.6 ? cut.slice(0, boundary) : cut).trimEnd()}…`;
};

/**
 * Strip the leading `Name — ` that most of our JSDoc summaries start with. The
 * remainder is often lowercase ("Breadcrumbs — navigational trail of …"), so
 * recapitalise it to read as a standalone sentence.
 */
const stripNamePrefix = (text, name) => {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const stripped = text.replace(new RegExp(`^${escaped}\\s*[-–—:]\\s*`), '');
  return stripped === text
    ? stripped
    : stripped.charAt(0).toUpperCase() + stripped.slice(1);
};

const summaryOf = (symbol, name) => {
  const own = ts
    .displayPartsToString(symbol.getDocumentationComment(checker))
    .trim();
  if (own)
    return clamp(stripNamePrefix(leadParagraph(own), name), MAX_SUMMARY_LENGTH);

  // Components frequently document the `<Name>Props` interface instead.
  const propsSymbol = exportSymbols.find((s) => s.getName() === `${name}Props`);
  if (propsSymbol) {
    const doc = ts
      .displayPartsToString(
        unwrap(propsSymbol).getDocumentationComment(checker),
      )
      .trim();
    // "Props for the X component" carries no information an agent doesn't have.
    if (doc && !/^props for the/i.test(doc))
      return clamp(
        stripNamePrefix(leadParagraph(doc), name),
        MAX_SUMMARY_LENGTH,
      );
  }
  return '';
};

const tagOf = (symbol, tagName) => {
  const tag = symbol.getJsDocTags(checker).find((t) => t.name === tagName);
  return tag ? ts.displayPartsToString(tag.text).trim() : '';
};

/** Collapse noisy compiler type text into something an agent can scan. */
const formatType = (type, decl, optional, context) => {
  let text = checker.typeToString(
    type,
    decl,
    ts.TypeFormatFlags.NoTruncation |
      ts.TypeFormatFlags.UseSingleQuotesForStringLiteralType |
      ts.TypeFormatFlags.UseFullyQualifiedType,
  );

  if (optional) {
    text = text
      .replace(/\s*\|\s*undefined$/, '')
      .replace(/^undefined\s*\|\s*/, '');
  }
  // `import("/abs/path/to/module").Foo` -> `Foo`
  text = text.replace(/import\([^)]*\)\./g, '');
  text = text.replace(/\s+/g, ' ').trim();

  if (isFullyParenthesized(text)) text = text.slice(1, -1);
  // Nested optionals stringify as `string | undefined | undefined`.
  text = text
    .replace(/(\s*\|\s*undefined)+/g, ' | undefined')
    .replace(/\s+/g, ' ');

  return shorten(text, context, decl?.type?.getText() ?? '');
};

/**
 * Large literal unions truncated inline (icon names, typography variants) are
 * listed in full once, at the bottom. Keyed by their members so a union reused
 * across components — every `icon` prop in the kit — is only written out once.
 */
const largeUnions = new Map();

const unionToken = (id) => `%%UNION:${id}%%`;

/**
 * A union reused across components (the icon-name union covers `Icon.name`,
 * `Dropdown.icon`, `Chip.deleteIcon`, …) should be filed under its origin.
 *
 * Props that borrow a union declare it as an indexed access — `IconProps['name']`
 * — while the origin declares it outright (`keyof MapIconsType`). So a borrowed
 * declaration is a pointer to the canonical one, and loses. Length then
 * alphabetical order break any remaining ties, keeping output deterministic.
 */
const canonicalAnchor = (occurrences) =>
  [...occurrences].sort((a, b) => {
    const borrowed = (o) => (/\[['"]/.test(o.declText) ? 1 : 0);
    return (
      borrowed(a) - borrowed(b) ||
      a.context.length - b.context.length ||
      a.context.localeCompare(b.context)
    );
  })[0].context;

/** Keep every rendered type scannable on one line. */
const shorten = (text, context, declText) => {
  if (text.length <= MAX_TYPE_LENGTH) return text;

  // Long literal unions (e.g. 227 icon names) would otherwise dominate the file.
  const members = splitUnion(text);
  if (members.length > 1) {
    const shown = [];
    let budget = MAX_TYPE_LENGTH;
    for (const member of members) {
      if (shown.length && budget - member.length - 3 < 0) break;
      shown.push(member);
      budget -= member.length + 3;
    }
    const rest = members.length - shown.length;
    if (rest <= 0) return shown.join(' | ');

    const isEnumerable =
      members.length >= UNION_APPENDIX_MIN &&
      members.every((m) => /^'[^']*'$/.test(m));
    if (isEnumerable && context) {
      const key = members.join('|');
      if (!largeUnions.has(key)) {
        largeUnions.set(key, {
          id: largeUnions.size,
          members,
          occurrences: [],
        });
      }
      const union = largeUnions.get(key);
      union.occurrences.push({ context, declText });
      // The canonical owner isn't known until every component has been walked,
      // so emit a placeholder and resolve it once the whole file is assembled.
      return `${shown.join(' | ')} | …(${rest} more — full list under "${unionToken(union.id)}")`;
    }
    return `${shown.join(' | ')} | …(${rest} more)`;
  }

  // Inline object types: their keys are the useful part, the value types are not.
  if (text.startsWith('{')) {
    const keys = topLevelKeys(text);
    if (keys.length) {
      const shown = keys.slice(0, MAX_OBJECT_KEYS);
      const rest = keys.length - shown.length;
      return `{ ${shown.join(', ')}${rest > 0 ? `, …+${rest}` : ''} }`;
    }
  }

  return `${text.slice(0, MAX_TYPE_LENGTH - 1).trimEnd()}…`;
};

/** Property names at brace-depth 1 of an inline object type. */
const topLevelKeys = (text) => {
  const keys = [];
  let depth = 0;
  let token = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if ('<([{'.includes(ch)) {
      depth++;
      if (depth === 1) token = '';
      continue;
    }
    if (isCloser(text, i)) {
      depth--;
      continue;
    }
    if (depth !== 1) continue;

    if (ch === ':' || ch === ';') {
      const key = token.trim().replace(/\?$/, '');
      if (ch === ':' && /^[A-Za-z_$][\w$]*$/.test(key)) keys.push(key);
      token = '';
    } else {
      token += ch;
    }
  }
  return keys;
};

/**
 * True for a real closing bracket. The `>` of an arrow type (`() => void`) is
 * not one — counting it would unbalance the depth and make nested `|` and `;`
 * look top-level.
 */
const isCloser = (text, i) =>
  ')]}'.includes(text[i]) || (text[i] === '>' && text[i - 1] !== '=');

/**
 * True only when the leading `(` is closed by the trailing `)`, i.e. the parens
 * wrap the whole type and can be dropped.
 *
 * Checking just the first and last character is not enough: a union of function
 * types stringifies as `(() => void) | ((x: number) => void)`, which begins and
 * ends with parens that are not a pair. Slicing those off would emit a
 * syntactically broken type.
 */
const isFullyParenthesized = (text) => {
  if (!text.startsWith('(') || !text.endsWith(')')) return false;
  let depth = 0;
  for (let i = 0; i < text.length; i++) {
    if ('<(['.includes(text[i]) || text[i] === '{') depth++;
    else if (isCloser(text, i)) depth--;
    if (depth === 0) return i === text.length - 1;
  }
  return false;
};

/** Split a union at top level only — nested generics/objects must stay intact. */
const splitUnion = (text) => {
  const parts = [];
  let depth = 0;
  let current = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if ('<([{'.includes(ch)) depth++;
    else if (isCloser(text, i)) depth--;
    if (ch === '|' && depth === 0) {
      parts.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  parts.push(current.trim());
  return parts.filter(Boolean);
};

const typeParametersOf = (symbol) => {
  const decl = declarationOf(symbol);
  const type = decl && checker.getTypeOfSymbolAtLocation(symbol, decl);
  const signature = type?.getCallSignatures()?.[0];
  const params = signature?.getTypeParameters();
  if (!params?.length) return '';
  return `<${params.map((p) => checker.typeToString(p)).join(', ')}>`;
};

/* --------------------------------------------------------------- extraction */

const propsOf = (symbol, ownerName) => {
  const decl = declarationOf(symbol);
  if (!decl) return null;

  const type = checker.getTypeOfSymbolAtLocation(symbol, decl);
  const signature = type.getCallSignatures()[0];
  if (!signature) return null;

  const param = signature.getParameters()[0];
  if (!param) return { own: [], inherited: 0 };

  const paramDecl = declarationOf(param);
  if (!paramDecl) return { own: [], inherited: 0 };

  const all = checker.getPropertiesOfType(
    checker.getTypeOfSymbolAtLocation(param, paramDecl),
  );
  const own = all.filter(isOwnDeclaration);

  return {
    inherited: all.length - own.length,
    own: own.map((prop) => {
      const propDecl = declarationOf(prop);
      const optional = isOptional(prop);
      return {
        name: prop.getName(),
        optional,
        type: formatType(
          checker.getTypeOfSymbolAtLocation(prop, propDecl),
          propDecl,
          optional,
          `${ownerName}.${prop.getName()}`,
        ),
        doc: clamp(
          leadParagraph(
            ts.displayPartsToString(prop.getDocumentationComment(checker)),
          ),
          MAX_DOC_LENGTH,
        ),
        default: tagOf(prop, 'default'),
      };
    }),
  };
};

const classify = (symbol, name) => {
  const flags = symbol.getFlags();
  if (
    flags &
    (ts.SymbolFlags.Interface | ts.SymbolFlags.TypeAlias | ts.SymbolFlags.Enum)
  ) {
    return 'type';
  }
  if (flags & ts.SymbolFlags.Module) return 'namespace';
  // Classes expose construct signatures, not call signatures, so the
  // has-a-call-signature test below would file them as plain constants.
  if (flags & ts.SymbolFlags.Class) return 'class';
  if (/^use[A-Z]/.test(name)) return 'hook';

  const decl = declarationOf(symbol);
  const hasCall =
    decl &&
    checker.getTypeOfSymbolAtLocation(symbol, decl).getCallSignatures().length >
      0;

  // React 19 made Context itself renderable, so contexts have call signatures
  // and would otherwise be indistinguishable from components.
  if (/(Context|Provider)$/.test(name)) return 'context';
  if (hasCall && /^[A-Z]/.test(name)) return 'component';
  if (hasCall) return 'function';
  return 'constant';
};

/** Fill in the component detail an entry needs to be rendered. */
const describeComponent = (entry, symbol, qualifiedName) => {
  entry.subcategory = tagOf(symbol, 'subcategory');
  entry.generics = typeParametersOf(symbol);
  const props = propsOf(symbol, qualifiedName);
  entry.props = (props?.own ?? []).filter((p) => !UBIQUITOUS_PROPS.has(p.name));
  entry.inherited = props?.inherited ?? 0;
  return entry;
};

const entries = [];
for (const exported of exportSymbols) {
  const name = exported.getName();
  const symbol = unwrap(exported);
  const kind = classify(symbol, name);

  const entry = {
    name,
    kind,
    summary: summaryOf(symbol, name),
    file: declarationOf(symbol)?.getSourceFile().fileName ?? '',
  };

  if (kind === 'component') describeComponent(entry, symbol, name);

  // `export * as Drawer from './index.parts'` publishes a compound component
  // whose parts are only reachable as `Drawer.Root`, `Drawer.Content`, … —
  // walk into the namespace so those parts are not missing from the index.
  if (kind === 'namespace') {
    entry.members = checker.getExportsOfModule(symbol).map((member) => {
      const memberName = member.getName();
      const memberSymbol = unwrap(member);
      const qualified = `${name}.${memberName}`;
      const memberEntry = {
        name: qualified,
        kind: classify(memberSymbol, memberName),
        // Members document themselves as `Drawer.Root - …`, so strip the
        // qualified name rather than the bare member name.
        summary: summaryOf(memberSymbol, qualified),
      };
      if (memberEntry.kind === 'component') {
        describeComponent(memberEntry, memberSymbol, qualified);
      }
      return memberEntry;
    });
  }
  entries.push(entry);
}

/* ------------------------------------------------------------- barrel groups */

/**
 * The components barrel is organised into commented sections. Mapping each
 * section to its directories lets every export — including sub-components the
 * barrel never names, via `export * from './Charts'` — inherit a group.
 */
const barrelGroups = () => {
  const barrelPath = resolve(SRC, 'components/index.ts');
  if (!existsSync(barrelPath)) return { groups: {}, order: [] };

  const lines = readFileSync(barrelPath, 'utf8').split('\n');
  const isRule = (line) => /^\/\/\s*={10,}\s*$/.test(line);

  const groups = {};
  const order = [];
  let current = null;

  for (let i = 0; i < lines.length; i++) {
    // A section header is a title line fenced by two `// ====` rules.
    if (isRule(lines[i]) && isRule(lines[i + 2])) {
      const title = lines[i + 1].replace(/^\/\/\s*/, '').trim();
      if (title) {
        current = title;
        if (!order.includes(title)) order.push(title);
      }
      i += 2;
      continue;
    }

    // Map the *directory* to its section. `export * from './Charts'` re-exports
    // names the barrel never spells out, so resolving by declaration path later
    // catches them all — including sub-components and contexts.
    const from = lines[i].match(/from\s+'\.\/([A-Za-z0-9_]+)/);
    if (from && current) groups[from[1]] ??= current;
  }
  return { groups, order };
};

const { groups: groupByDir, order: groupOrder } = barrelGroups();
const COMPONENTS_DIR = resolve(SRC, 'components');

/**
 * The barrel's own sections are the most consistent grouping we have.
 * `@category` is not usable here — 45 components declare it as "Components" —
 * but `@subcategory` is meaningful, so it serves as the fallback.
 */
const groupFor = (entry) => {
  if (entry.file.startsWith(COMPONENTS_DIR)) {
    const dir = relative(COMPONENTS_DIR, entry.file).split(/[/\\]/)[0];
    const group = groupByDir[dir.replace(/\.tsx?$/, '')];
    if (group) return group;
  }
  return entry.subcategory || 'Other';
};

/* ------------------------------------------------------------------- render */

const components = entries
  .filter((e) => e.kind === 'component')
  .sort((a, b) => a.name.localeCompare(b.name));
const namespaces = entries.filter((e) => e.kind === 'namespace');
const compounds = namespaces.filter((n) =>
  n.members.some((m) => m.kind === 'component'),
);
const utilityNamespaces = namespaces.filter((n) => !compounds.includes(n));
const classes = entries.filter((e) => e.kind === 'class');
const contexts = entries.filter((e) => e.kind === 'context');
const hooks = entries.filter((e) => e.kind === 'hook');
const functions = entries.filter((e) => e.kind === 'function');
const constants = entries.filter((e) => e.kind === 'constant');
const types = entries.filter((e) => e.kind === 'type');

const renderProp = (prop) => {
  let line = `  - \`${prop.name}${prop.optional ? '?' : ''}: ${prop.type}\``;
  if (prop.default) line += ` \`= ${prop.default}\``;
  if (prop.doc) line += ` — ${prop.doc}`;
  return line;
};

const renderComponent = (entry) => {
  const lines = [`#### ${entry.name}${entry.generics}`];
  if (entry.summary) lines.push(entry.summary);
  lines.push('');

  if (entry.props.length) {
    for (const prop of entry.props) lines.push(renderProp(prop));
  } else {
    lines.push('  _No library-specific props._');
  }
  if (entry.inherited > NATIVE_PROPS_THRESHOLD) {
    lines.push(`  - _plus native element attributes_`);
  }
  return lines.join('\n');
};

const grouped = new Map();
for (const component of components) {
  const group = groupFor(component);
  if (!grouped.has(group)) grouped.set(group, []);
  grouped.get(group).push(component);
}

// Follow the barrel's section order; anything ungrouped sorts to the end.
const rank = (group) => {
  const index = groupOrder.indexOf(group);
  return index === -1 ? groupOrder.length : index;
};
const orderedGroups = [...grouped].sort(
  (a, b) => rank(a[0]) - rank(b[0]) || a[0].localeCompare(b[0]),
);

const documented = components.filter((c) => c.summary).length;

const out = [];
out.push(`# ${pkgJson.name} — AI source map`);
out.push('');
out.push(
  `Generated from the TypeScript program at build time — do not edit by hand.`,
);
out.push('');
out.push(
  `**Everything below is imported from the package root:** \`import { X } from '${pkgJson.name}'\``,
);
out.push('');
const count = (n, singular, plural = `${singular}s`) =>
  `${n} ${n === 1 ? singular : plural}`;

out.push(
  [
    count(components.length, 'component'),
    count(contexts.length, 'context'),
    count(hooks.length, 'hook'),
    count(functions.length, 'function'),
    count(classes.length, 'class', 'classes'),
    count(constants.length, 'constant'),
    count(types.length, 'exported type'),
  ]
    .filter((part) => !part.startsWith('0 '))
    .join(' · '),
);
out.push('');
out.push('## Reading this file');
out.push('');
// A utility package has no components, so the prop-shaped guidance would only
// be noise there.
if (components.length) {
  out.push(
    '- Only props **declared by this library** are listed. Components that also accept native element attributes say so explicitly.',
  );
  out.push(
    '- `prop?:` means optional. `= value` is the default. Long literal unions are truncated — the full union is enforced by the type checker.',
  );
  out.push(
    `- Every component additionally accepts \`${[...UBIQUITOUS_PROPS].join('`, `')}\`; these are omitted below.`,
  );
  out.push('- To look a component up, search this file for `#### <Name>`.');
}
out.push(
  '- This is an index, not a reference. For full documentation and usage examples, read the matching `.d.ts` in `dist/`.',
);
out.push('');

if (components.length) {
  // A names-only roster answers "what exists?" without reading the whole file.
  out.push('## Component roster');
  out.push('');
  for (const [group, items] of orderedGroups) {
    out.push(`**${group}** — ${items.map((i) => i.name).join(', ')}`);
    out.push('');
  }

  out.push('## Components');
  out.push('');
}

for (const [group, items] of orderedGroups) {
  out.push(`### ${group}`);
  out.push('');
  for (const item of items) {
    out.push(renderComponent(item));
    out.push('');
  }
}

const renderFlatSection = (title, items) => {
  if (!items.length) return;
  out.push(`## ${title}`);
  out.push('');
  for (const item of items.sort((a, b) => a.name.localeCompare(b.name))) {
    out.push(`- \`${item.name}\`${item.summary ? ` — ${item.summary}` : ''}`);
  }
  out.push('');
};

if (compounds.length) {
  out.push('## Compound components');
  out.push('');
  out.push(
    "_Namespace exports. Import the namespace, then use its parts: `import { Drawer } from '@ssa-ui-kit/core'` → `<Drawer.Root>`._",
  );
  out.push('');
  for (const compound of compounds) {
    out.push(`### ${compound.name}`);
    if (compound.summary) out.push(compound.summary);
    out.push('');
    for (const member of compound.members) {
      if (member.kind === 'component') {
        out.push(renderComponent(member));
      } else {
        out.push(`#### ${member.name}`, member.summary || `_${member.kind}_`);
      }
      out.push('');
    }
  }
}

if (utilityNamespaces.length) {
  out.push('## Utility namespaces');
  out.push('');
  for (const ns of utilityNamespaces) {
    out.push(
      `- \`${ns.name}\` — ${ns.members.map((m) => m.name.split('.').pop()).join(', ')}`,
    );
  }
  out.push('');
}

renderFlatSection('Contexts & providers', contexts);
renderFlatSection('Hooks', hooks);
renderFlatSection('Functions', functions);
renderFlatSection('Classes', classes);
renderFlatSection('Constants', constants);

if (largeUnions.size) {
  out.push('## Large value sets');
  out.push('');
  out.push(
    '_Literal unions too long to inline above. A union shared by several props is listed once, under the prop it first appeared on._',
  );
  out.push('');
  for (const union of largeUnions.values()) {
    out.push(
      `### ${canonicalAnchor(union.occurrences)} — ${union.members.length} values`,
    );
    out.push('');
    out.push(union.members.join(' · '));
    out.push('');
  }
}

if (types.length) {
  out.push('## Exported types');
  out.push('');
  out.push('_Names only — read the `.d.ts` for their shape._');
  out.push('');
  // One long line is hard to scan; wrap at a comfortable width.
  const names = types.map((t) => `\`${t.name}\``).sort();
  let row = [];
  let width = 0;
  for (const name of names) {
    if (width + name.length > 100) {
      out.push(row.join(' · '));
      row = [];
      width = 0;
    }
    row.push(name);
    width += name.length + 3;
  }
  if (row.length) out.push(row.join(' · '));
  out.push('');
}

// Resolve the deferred union anchors now that every occurrence is known.
const markdown = out.join('\n').replace(/%%UNION:(\d+)%%/g, (_, id) => {
  const union = [...largeUnions.values()].find((u) => u.id === Number(id));
  return union ? canonicalAnchor(union.occurrences) : 'see below';
});

const outDir = resolve(PKG_DIR, 'dist/ai');
mkdirSync(outDir, { recursive: true });
const outFile = resolve(outDir, 'source-map.md');
writeFileSync(outFile, markdown, 'utf8');

const kb = (Buffer.byteLength(markdown, 'utf8') / 1024).toFixed(1);
console.log(
  `ai-source-map: ${relative(process.cwd(), outFile)} — ${kb}KB, ` +
    `${components.length} components (${documented} with a summary), ` +
    `${grouped.size} groups`,
);
