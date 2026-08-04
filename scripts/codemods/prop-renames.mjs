#!/usr/bin/env node
/**
 * Codemod: prop renames for @ssa-ui-kit components (issue #656, Phase 2).
 *
 * The library is converging on the names the DOM, MUI, Radix, Chakra and Ant
 * all use. Each rename lands as an additive alias first — the old prop keeps
 * working and warns once in dev — and is removed at the next major.
 *
 * Renames are either:
 *   - **mechanical**: same behaviour, different spelling. Safe to apply blind.
 *   - **semantic**:   the replacement behaves differently. Applied, but each
 *                     site is reported so it can be reviewed. See the caveat
 *                     printed at the end of the run.
 *
 * Rewrites three shapes, and only where the target is one of ours:
 *   1. JSX attributes:   <Checkbox initialState />      → <Checkbox defaultChecked />
 *   2. Hook options:     useDrawer({ defaultOpened })   → useDrawer({ defaultOpen })
 *   3. Item-object keys: { id: 1, isDisabled: true }    → { id: 1, disabled: true }
 *      (only for item shapes recognised by the sibling keys they carry)
 *
 * Parsing uses the TypeScript compiler API, so matches inside strings,
 * comments and template literals are left alone.
 *
 * **A tag name alone is never enough to act on.** Every component this renames
 * shares its name with one in another library — Chakra UI in particular uses
 * `isDisabled` as its own real API on `Button`, `Checkbox`, `Radio` and
 * `Switch`, and `<ColorPicker color>` is about as generic as a prop gets. So a
 * JSX element is only rewritten when its tag resolves, in that file, to an
 * import from `@ssa-ui-kit/*`. Local aliases (`import { Button as KitButton }`),
 * namespace imports (`import * as Kit` → `<Kit.Button>`) and default imports
 * are all followed; anything declared locally or imported from elsewhere is
 * left alone. Pass `--unsafe-any-tag` to fall back to the old name-only
 * matching, e.g. when running over files that re-export through a barrel this
 * script cannot see through.
 *
 * Usage:
 *   node scripts/codemods/prop-renames.mjs [paths...] [--dry] [--json]
 *                                          [--unsafe-any-tag]
 *
 * Defaults to the current directory. Exits non-zero in --dry mode when there
 * is still something to rewrite, so it can gate CI.
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import ts from 'typescript';

const CONTROLLED_CAVEAT =
  'the deprecated prop was synced *into* internal state, so the control still ' +
  'moved on click even when the parent ignored the change callback; the ' +
  'replacement is fully controlled. Verify the parent writes the value back.';

const NEVER_CONTROLLED_CAVEAT =
  'the deprecated prop read as controlled but only ever seeded the initial ' +
  'state, so a changing value did nothing. `defaultOpen` preserves that ' +
  'behaviour exactly. If the intent was to control the component, switch to ' +
  '`open` + `onOpenChange` instead.';

/**
 * JSX attribute renames, keyed by component. Namespaced usages (`C.Button`)
 * are matched on the last segment of the tag name.
 */
const JSX_RENAMES = {
  Accordion: [
    { from: 'ariaControls', to: 'aria-controls' },
    { from: 'isOpened', to: 'defaultOpen', semantic: NEVER_CONTROLLED_CAVEAT },
  ],
  AccordionContent: [{ from: 'isOpened', to: 'open' }],
  Breadcrumbs: [{ from: 'ariaLabel', to: 'aria-label' }],
  Button: [{ from: 'isDisabled', to: 'disabled' }],
  ButtonGroup: [
    { from: 'isDisabled', to: 'disabled' },
    { from: 'externalState', to: 'value', semantic: CONTROLLED_CAVEAT },
    { from: 'selectedItem', to: 'value', semantic: CONTROLLED_CAVEAT },
  ],
  Checkbox: [
    { from: 'isDisabled', to: 'disabled' },
    { from: 'initialState', to: 'defaultChecked' },
    { from: 'externalState', to: 'checked', semantic: CONTROLLED_CAVEAT },
  ],
  CardContent: [{ from: 'ariaLabelledby', to: 'aria-labelledby' }],
  // Named-import qualified usage: `import { Drawer } from '@ssa-ui-kit/core'`.
  'Drawer.Root': [
    { from: 'opened', to: 'open' },
    { from: 'defaultOpened', to: 'defaultOpen' },
  ],
  Dropdown: [{ from: 'isDisabled', to: 'disabled' }],
  DropdownOption: [{ from: 'isDisabled', to: 'disabled' }],
  DropdownOptions: [{ from: 'ariaLabelledby', to: 'aria-labelledby' }],
  DropdownToggle: [
    { from: 'ariaLabelledby', to: 'aria-labelledby' },
    { from: 'ariaControls', to: 'aria-controls' },
  ],
  LargeTab: [{ from: 'ariaControls', to: 'aria-controls' }],
  FileAttachment: [{ from: 'isDisabled', to: 'disabled' }],
  Label: [{ from: 'isDisabled', to: 'disabled' }],
  Modal: [{ from: 'isOpen', to: 'open', semantic: CONTROLLED_CAVEAT }],
  ModalDialog: [{ from: 'isOpen', to: 'open' }],
  MultipleDropdown: [{ from: 'isDisabled', to: 'disabled' }],
  MultipleDropdownOptions: [
    { from: 'isDisabled', to: 'disabled' },
    { from: 'ariaLabelledby', to: 'aria-labelledby' },
  ],
  Pagination: [
    { from: 'isDisabled', to: 'disabled' },
    { from: 'ariaLabel', to: 'aria-label' },
  ],
  Popover: [{ from: 'initialOpen', to: 'defaultOpen' }],
  Radio: [
    { from: 'isDisabled', to: 'disabled' },
    { from: 'isChecked', to: 'checked' },
  ],
  RadioGroup: [
    { from: 'externalState', to: 'value', semantic: CONTROLLED_CAVEAT },
  ],
  Switch: [{ from: 'isDisabled', to: 'disabled' }],
  Tab: [{ from: 'ariaControls', to: 'aria-controls' }],
  TableFilters: [{ from: 'isDisabled', to: 'disabled' }],
  TableRow: [{ from: 'isDisabled', to: 'disabled' }],
  Tooltip: [
    { from: 'isOpen', to: 'defaultOpen', semantic: NEVER_CONTROLLED_CAVEAT },
  ],
  Typeahead: [
    { from: 'isDisabled', to: 'disabled' },
    { from: 'selectedItems', to: 'value' },
    { from: 'defaultSelectedItems', to: 'defaultValue' },
  ],
  ColorPicker: [
    { from: 'color', to: 'value' },
    { from: 'defaultColor', to: 'defaultValue' },
  ],
  TypeaheadOption: [{ from: 'isDisabled', to: 'disabled' }],
  // Forwards straight to Button.
  PopoverTrigger: [{ from: 'isDisabled', to: 'disabled' }],
};

/**
 * Option-object renames for the kit's hooks — `useDrawer({ opened: true })` and
 * friends, where the props never appear as JSX attributes at all. Keyed by the
 * hook's exported name and matched with the same import-awareness as the JSX
 * rules, so a same-named local hook is left alone.
 */
const HOOK_RENAMES = {
  useDrawer: [
    { from: 'opened', to: 'open' },
    { from: 'defaultOpened', to: 'defaultOpen' },
  ],
  useFilterMultiSelect: [
    { from: 'opened', to: 'open' },
    { from: 'defaultOpened', to: 'defaultOpen' },
    { from: 'onOpenedChange', to: 'onOpenChange' },
  ],
  usePopover: [{ from: 'initialOpen', to: 'defaultOpen' }],
  useTooltip: [
    { from: 'isOpen', to: 'defaultOpen', semantic: NEVER_CONTROLLED_CAVEAT },
  ],
};

/**
 * Object-literal key renames. Only applied to literals carrying every key in
 * `siblings`, which keeps unrelated application state untouched.
 */
const OBJECT_RENAMES = [
  {
    // ButtonGroupItem
    siblings: ['id', 'text'],
    renames: [{ from: 'isDisabled', to: 'disabled' }],
  },
  {
    // TableFilters SingleItem
    siblings: ['key', 'name', 'content'],
    renames: [{ from: 'isDisabled', to: 'disabled' }],
  },
];

const IGNORED_DIRS = new Set([
  'node_modules',
  'dist',
  'build',
  'coverage',
  'storybook-static',
  '.git',
  '.next',
  '.turbo',
]);

const EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs']);

/** Every prop name any rule could match, for a cheap pre-filter. */
const ALL_SOURCE_PROPS = new Set([
  ...Object.values(JSX_RENAMES).flatMap((rules) => rules.map((r) => r.from)),
  ...Object.values(HOOK_RENAMES).flatMap((rules) => rules.map((r) => r.from)),
  ...OBJECT_RENAMES.flatMap((g) => g.renames.map((r) => r.from)),
]);

/** Packages whose components these rules describe. */
const KIT_MODULE = /^@ssa-ui-kit\//;

/**
 * Also treat the kit's own sources as in-scope, so the codemod is usable inside
 * this repo where components are imported through path aliases instead.
 */
const KIT_INTERNAL_MODULE = /^(@components\/|@ssa-ui-kit\/|\.{1,2}\/)/;

const tagName = (node) => {
  const tag = ts.isJsxSelfClosingElement(node)
    ? node.tagName
    : node.openingElement.tagName;
  return tag.getText();
};

/** `Kit.Button` → `Button`; `Button` → `Button`. */
const lastSegment = (text) =>
  text.includes('.') ? text.slice(text.lastIndexOf('.') + 1) : text;

/**
 * Maps the JSX tags a file may legitimately use to the kit component they
 * resolve to, by reading the file's own imports.
 *
 * Returns `{ tags: Map<localName, componentName>, namespaces: Set<localName> }`.
 * A namespace import contributes `<Ns.Anything>`, since the member name is the
 * component name by construction.
 */
const kitTagsInScope = (sourceFile, internal) => {
  const tags = new Map();
  const namespaces = new Set();
  const modulePattern = internal ? KIT_INTERNAL_MODULE : KIT_MODULE;

  for (const statement of sourceFile.statements) {
    if (!ts.isImportDeclaration(statement)) continue;
    if (!ts.isStringLiteral(statement.moduleSpecifier)) continue;
    if (!modulePattern.test(statement.moduleSpecifier.text)) continue;

    const clause = statement.importClause;
    if (!clause) continue;

    // `import Checkbox from '@components/Checkbox'` — the local name is the
    // only clue to which component it is, which is exactly how the kit's own
    // default-exported components are consumed.
    if (clause.name) tags.set(clause.name.text, clause.name.text);

    const { namedBindings } = clause;
    if (!namedBindings) continue;

    if (ts.isNamespaceImport(namedBindings)) {
      namespaces.add(namedBindings.name.text);
      continue;
    }

    for (const element of namedBindings.elements) {
      // `{ Button as KitButton }` → local `KitButton`, component `Button`.
      tags.set(element.name.text, (element.propertyName ?? element.name).text);
    }
  }

  return { tags, namespaces };
};

/**
 * The kit component a JSX tag refers to, or `undefined` when it is not one of
 * ours (a host element, a local component, or another library's).
 */
const resolveKitComponent = (tag, scope, anyTag) => {
  if (anyTag) return lastSegment(tag);

  if (tag.includes('.')) {
    const [qualifier] = tag.split('.');
    // `import * as Kit` → `<Kit.Button>`: the member name is the component.
    if (scope.namespaces.has(qualifier)) return lastSegment(tag);

    // `import { Drawer }` → `<Drawer.Root>`: neither half alone identifies the
    // component, so rules for these are keyed by the qualified name.
    const resolved = scope.tags.get(qualifier);
    return resolved ? `${resolved}.${lastSegment(tag)}` : undefined;
  }

  return scope.tags.get(tag);
};

const objectRuleFor = (objectLiteral) => {
  const keys = new Set(
    objectLiteral.properties
      .filter((p) => p.name && ts.isIdentifier(p.name))
      .map((p) => p.name.text),
  );

  return OBJECT_RENAMES.find((group) =>
    group.siblings.every((key) => keys.has(key)),
  );
};

/** Renames of keys in one object literal, shared by the hook and item rules. */
const objectKeyRenames = (sourceFile, objectLiteral, rules, component) => {
  const renames = [];

  for (const property of objectLiteral.properties) {
    const isAssignment = ts.isPropertyAssignment(property);
    const isShorthand = ts.isShorthandPropertyAssignment(property);
    if (!isAssignment && !isShorthand) continue;
    if (!property.name || !ts.isIdentifier(property.name)) continue;

    const rule = rules.find((r) => r.from === property.name.text);
    if (!rule) continue;

    renames.push({
      start: property.name.getStart(sourceFile),
      end: property.name.getEnd(),
      // A shorthand `{ isDisabled }` has to become `{ disabled: isDisabled }`
      // or it silently changes which variable is read.
      text: isShorthand ? `${rule.to}: ${rule.from}` : rule.to,
      rule,
      component,
      line:
        sourceFile.getLineAndCharacterOfPosition(
          property.name.getStart(sourceFile),
        ).line + 1,
    });
  }

  return renames;
};

/** Collects every rename worth making, as byte ranges into the source text. */
const findRenames = (sourceFile, { anyTag = false, internal = false } = {}) => {
  const renames = [];
  const scope = kitTagsInScope(sourceFile, internal);

  // Nothing from the kit is in scope and we are not in name-only mode, so no
  // JSX in this file can be ours. Object-literal rules still apply.
  const hasKitImports = scope.tags.size > 0 || scope.namespaces.size > 0;

  const visit = (node) => {
    if (
      (anyTag || hasKitImports) &&
      (ts.isJsxSelfClosingElement(node) || ts.isJsxElement(node))
    ) {
      const component = resolveKitComponent(tagName(node), scope, anyTag);
      const rules = component ? JSX_RENAMES[component] : undefined;

      if (rules) {
        const attributes = ts.isJsxSelfClosingElement(node)
          ? node.attributes
          : node.openingElement.attributes;

        for (const attribute of attributes.properties) {
          if (!ts.isJsxAttribute(attribute) || !ts.isIdentifier(attribute.name))
            continue;

          const rule = rules.find((r) => r.from === attribute.name.text);
          if (!rule) continue;

          renames.push({
            start: attribute.name.getStart(sourceFile),
            end: attribute.name.getEnd(),
            text: rule.to,
            rule,
            component: tagName(node),
            resolvedComponent: component,
            line:
              sourceFile.getLineAndCharacterOfPosition(
                attribute.name.getStart(sourceFile),
              ).line + 1,
          });
        }
      }
    }

    // `useDrawer({ defaultOpened: true })` — the options never appear as JSX,
    // so the hook's callee is what identifies them.
    if (
      (anyTag || hasKitImports) &&
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.arguments.length &&
      ts.isObjectLiteralExpression(node.arguments[0])
    ) {
      const hook = anyTag
        ? node.expression.text
        : scope.tags.get(node.expression.text);
      const rules = hook ? HOOK_RENAMES[hook] : undefined;

      if (rules) {
        renames.push(
          ...objectKeyRenames(sourceFile, node.arguments[0], rules, hook),
        );
      }
    }

    if (ts.isObjectLiteralExpression(node)) {
      const group = objectRuleFor(node);

      if (group) {
        renames.push(
          ...objectKeyRenames(
            sourceFile,
            node,
            group.renames,
            `{ ${group.siblings.join(', ')}, … }`,
          ),
        );
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);

  return renames.sort((a, b) => a.start - b.start);
};

const applyRenames = (text, renames) => {
  let result = '';
  let cursor = 0;

  for (const rename of renames) {
    result += text.slice(cursor, rename.start) + rename.text;
    cursor = rename.end;
  }

  return result + text.slice(cursor);
};

const collectFiles = (target, out) => {
  if (fs.statSync(target).isFile()) {
    if (EXTENSIONS.has(path.extname(target))) out.push(target);
    return out;
  }

  for (const entry of fs.readdirSync(target, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (IGNORED_DIRS.has(entry.name)) continue;
      collectFiles(path.join(target, entry.name), out);
    } else if (EXTENSIONS.has(path.extname(entry.name))) {
      out.push(path.join(target, entry.name));
    }
  }

  return out;
};

const main = () => {
  const argv = process.argv.slice(2);
  const dry = argv.includes('--dry');
  const asJson = argv.includes('--json');
  const anyTag = argv.includes('--unsafe-any-tag');
  // Inside this repo components come from path aliases, not the published
  // package names, so widen what counts as a kit import.
  const internal = argv.includes('--internal');
  const targets = argv.filter((arg) => !arg.startsWith('--'));

  const files = (targets.length ? targets : ['.']).flatMap((target) =>
    collectFiles(path.resolve(target), []),
  );

  const changed = [];
  const semantic = [];
  let total = 0;

  for (const file of files) {
    const text = fs.readFileSync(file, 'utf8');
    if (![...ALL_SOURCE_PROPS].some((prop) => text.includes(prop))) continue;

    const sourceFile = ts.createSourceFile(
      file,
      text,
      ts.ScriptTarget.Latest,
      /* setParentNodes */ true,
      /^\.(tsx|jsx)$/.test(path.extname(file))
        ? ts.ScriptKind.TSX
        : ts.ScriptKind.TS,
    );

    const renames = findRenames(sourceFile, { anyTag, internal });
    if (!renames.length) continue;

    const relative = path.relative(process.cwd(), file);
    total += renames.length;
    changed.push({ file: relative, count: renames.length });

    for (const rename of renames.filter((r) => r.rule.semantic)) {
      semantic.push({
        file: relative,
        line: rename.line,
        component: rename.component,
        from: rename.rule.from,
        to: rename.rule.to,
        caveat: rename.rule.semantic,
      });
    }

    if (!dry) fs.writeFileSync(file, applyRenames(text, renames));
  }

  if (asJson) {
    console.log(
      JSON.stringify({ dry, total, files: changed, semantic }, null, 2),
    );
    process.exit(dry && total ? 1 : 0);
  }

  for (const { file, count } of changed) {
    console.log(`${dry ? 'would rewrite' : 'rewrote'} ${count}\t${file}`);
  }

  console.log(
    `\n${dry ? 'Would rewrite' : 'Rewrote'} ${total} occurrence(s) across ${changed.length} file(s).`,
  );

  if (semantic.length) {
    console.log(
      `\n⚠  ${semantic.length} of these are NOT pure renames. Review each by hand:`,
    );

    // Grouped by caveat — different renames break in different ways, and one
    // blanket warning would describe most of them wrongly.
    const byCaveat = new Map();
    for (const s of semantic) {
      if (!byCaveat.has(s.caveat)) byCaveat.set(s.caveat, []);
      byCaveat.get(s.caveat).push(s);
    }

    for (const [caveat, sites] of byCaveat) {
      console.log(`\n   ${caveat}`);
      for (const s of sites) {
        console.log(
          `     ${s.file}:${s.line}  <${s.component}> ${s.from} → ${s.to}`,
        );
      }
    }
  }

  if (anyTag) {
    console.log(
      '\n⚠  --unsafe-any-tag: tags were matched by name only, without checking\n' +
        '   where they were imported from. Other libraries use these names too —\n' +
        '   Chakra UI has a real `isDisabled` on Button/Checkbox/Radio/Switch —\n' +
        '   so review the diff before committing.',
    );
  }

  if (total) {
    console.log(
      '\nRemaining occurrences are on components outside these renames — check them by hand.',
    );
  }

  process.exit(dry && total ? 1 : 0);
};

main();
