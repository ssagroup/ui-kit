---
name: audit-stories-docs
description: Audits and cleans up one or more @ssa-ui-kit/core components' Storybook stories and docs pages — finds stale docs (mdx, JSDoc, story descriptions that no longer match the code), redundant stories to remove/merge/fold into controls, and other improvements, then restructures the stories and mdx to the kit's conventions. Use whenever the user asks to "audit stories", "clean up stories", "check docs are up to date", "too many stories", "stale docs", "next chunk" of the stories/docs audit, or names a component and asks to tidy its Storybook. Not for aligning visuals with Figma (use align-with-design) and never for the Fumadocs site in apps/docs.
---

# Audit Stories & Docs

Brings a component's Storybook page back in line with its code: docs that say
what the code does, a short story list where every story earns its place, and
an mdx page whose examples are live stories rather than drifting snippets.

The kit is audited in family **chunks** so siblings are compared together
(Dropdown/MultipleDropdown/Typeahead repeat the same stories). Progress and the
chunk list live in the auto-memory note `stories-docs-audit` — read it first
and update it at the end.

| #   | Chunk                    | Components                                                                                                           |
| --- | ------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| 1   | Selection                | Dropdown, MultipleDropdown, Typeahead, FiltersMultiSelect, ContextMenu                                               |
| 2   | Text inputs              | Input, TextField, Textarea, NumberField, SearchBox, Field                                                            |
| 3   | Choice & forms           | Checkbox, Radio, RadioGroup, FormRadioGroup, Switch, Form, JsonSchemaForm                                            |
| 4   | Date & value pickers     | DatePicker, DateRangePicker, Calendar, Slider, Counter, ColorPicker                                                  |
| 5   | Actions & tokens         | Button, IconButton, ButtonGroup, FloatingActionButton, Chip, Tag, Badge                                              |
| 6   | Overlays & notifications | Modal, Drawer, Popover, Tooltip, NotificationMenu/Card/Components                                                    |
| 7   | Navigation               | NavBar, CollapsibleNavBar, Header, Footer, Breadcrumbs, TabBar, LinksTabBar, Pagination, Stepper, TreeView           |
| 8   | Data display             | Table, NestedTable, TableFilters, Filters, AccordionGroup, Card, CardList, History                                   |
| 9   | Media & people           | FileUpload, FileAttachment, Carousel, ImageItem, ResponsiveImage, Avatar, PersonInfo, UserProfile, AddNewAccountCard |
| 10  | Misc & foundations       | Progress, ProgressCircle, ProgressInfo, Indicator, Wrapper, Typography, Icon, ColorPalette, ThemeCustomization       |
| 11  | Charts                   | all chart types under Charts/                                                                                        |

## Ground rules

- **Read-only until the user picks.** Audit, report, then wait.
- **Never commit or branch.** Leave changes uncommitted on the current branch.
- **Ignore `apps/docs`** (Fumadocs, being dropped). Docs = the `*.mdx` next to
  the stories. Core sets `tags: ['autodocs']` globally, so a component without
  an mdx still has a docs page built from JSDoc and story descriptions — for
  those, stale JSDoc _is_ stale docs.
- **Three kinds of finding, three risk levels**, applied in the order the user
  agreed for chunk 1:
  - **B — stale docs** (mdx, JSDoc, argTypes text): no consumer risk, do it.
  - **C — story / mdx restructure**: no consumer risk, do it.
  - **A — behaviour bugs** found along the way: report, don't fix, until the
    user decides. Before proposing a fix, run `git log -S '<code>' --reverse`
    to see **how long** the behaviour has existed and when the docs started
    describing it. Long-standing behaviour is the de-facto contract: fix the
    docs to match it and make any new behaviour **additive** (new prop, new
    export), never a silent change. Purely additive fixes (a missing value
    export, forwarding an ignored prop) are low risk — still ask.

## Step 1 — Audit (read-only)

Spawn one `general-purpose` subagent per component **in parallel**, in the
background, with this brief (fill in the component, its directory, and the
recent features you know touched it from memory notes / git log):

> READ-ONLY audit — do NOT edit files or commit. Component: **X**
> (packages/core/src/components/X + its building blocks). Storybook 10, global
> autodocs; docs = the mdx next to the stories; ignore apps/docs. Recent
> changes: … Run `git log --oneline -15 -- <dir>`. Read source + types/JSDoc,
> all stories, the mdx. Report, citing file:line:
> **A. Stale docs** — docs/JSDoc/argTypes describing props or behaviour that
> don't exist or are wrong; meaningful props never documented; mdx story refs
> vs existing stories; mdx snippets that would not compile (wrong package
> name, `useState([])` → `never[]`, wrong prop types, enums).
> **B. Story triage** — table: story | shows | KEEP / MERGE into X / REMOVE /
> FOLD into controls | reason. Be opinionated: a story differing from Default
> by one control-able arg is a fold; obsolete/"Legacy" styles go; edge cases
> that belong in a spec go. Propose a target list (~6–9 for a complex
> component). Flag stories duplicating a sibling without adding value.
> **C. Other improvements** — max ~6 bullets. Under ~600 words.

While they run, don't read the same files yourself.

## Step 2 — Verify and consolidate

- **Verify every claimed behaviour bug yourself** in the code before
  repeating it. Agents are usually right about docs and sometimes wrong about
  runtime behaviour.
- Report to the user, grouped: **real bugs (A)** · **stale docs (B)** · **story
  triage table** (now → target, what goes) · **cross-cutting patterns** ·
  proposed order. Ask only the decisions that are genuinely theirs.

## Step 3 — Apply B + C, one component at a time

Before removing or renaming stories, check nothing links to them:

```bash
grep -rn -e "X.stories" -e "components-x--" --exclude-dir=node_modules \
  --exclude-dir=storybook-static --exclude-dir=dist --exclude-dir=apps .
```

A link to `…--docs` survives; links to individual story ids must be updated.

### Stories conventions

Reference implementation: `packages/core/src/components/Dropdown/Dropdown.stories.tsx`.

- **CSF3 only**: `export const X: StoryObj<Args> = { args, render: (args) => … }`.
  Every render spreads `{...args}` so the Controls panel actually drives it.
- **Callbacks as actions**: `args: { onChange: fn() }` in the meta, `fn` from
  `storybook/test`. Don't stub callbacks to no-ops in decorators.
- **`Default` first**, args-driven. Single-prop variants (disabled, opened,
  placeholder, width value, status) become its controls, not stories. A prop
  read only on mount (e.g. `isOpen`) gets `key={String(args.isOpen)}` so the
  control remounts.
- **One story per distinct pattern**: form-field states together in one
  story, a real `Controlled` story (state + `onChange` writing back), groups,
  custom content, layout/size comparisons, placement edge cases.
- **Shared fixtures** at the top with **unique values** (duplicate values mean
  duplicate React keys and ambiguous selection) and realistic labels, not
  lorem. Map options **inline** in each render rather than through a helper —
  the "Show code" panel shows the story source, so it should read like usage.
- **The story's JSDoc is the section prose.** The mdx renders it with
  `<Description of>`, so write the full usage explanation there (rules,
  defaults, gotchas — markdown works) and don't repeat it in the mdx.
- Meta sets `parameters: { docs: { source: { type: 'code' } } }`. The default
  dynamic source prints the rendered element tree — every option expanded,
  story-only props like `key` leaking out.
- argTypes: only what adds value (`control: false` for nodes/callbacks,
  corrected descriptions). Dotted keys like `'dropdownProps.x'` don't map to
  nested args — use a flat arg and map it in `render`.
- Don't demo behaviour that is currently broken; note it under A instead.

### mdx conventions

Reference implementation: `Dropdown/Dropdown.mdx`. Every story section has
the same shape — **heading → description → (snippet) → live canvas**, with the
story-source panel collapsed behind "Show code":

````mdx
import {
  Meta,
  Canvas,
  Controls,
  Description,
} from '@storybook/addon-docs/blocks';
import * as XStories from './X.stories';

<Meta of={XStories} />

# X

One-paragraph intro: what it is, and which sibling to use instead when.

## Default Usage

<Description of={XStories.Default} />

```tsx
// consumer snippet: imports from '@ssa-ui-kit/core', no args/render
```

<Canvas of={XStories.Default} />

## Feature

<Description of={XStories.Feature} />
<Canvas of={XStories.Feature} />

## Keyboard and Accessibility

Key table, ARIA wiring, how to label it without a visible label.

## Props

<Controls of={XStories.Default} />
````

- One section per kept story, in story order. No trailing `<Stories />` dump.
- **Consumer snippets only where they add something** the story source can't:
  `Default Usage` always, plus API shapes (groups/compound children,
  controlled state, enums/config objects). Other sections are description +
  canvas only. Don't set `sourceState="shown"` — the panel is story code.
- Prose with no story to hang on (sub-component props, keyboard, a11y) stays
  in the mdx.
- **No placeholders** (`{...props}`, bare `...` children). Every identifier
  is defined in the snippet or in the Default Usage snippet (say so in a
  comment when reusing, e.g. `// items as in Default Usage`).
- Snippets import from `'@ssa-ui-kit/core'` and must type-check: typed
  `useState<T[]>([])`, values matching option values, enums that are actually
  exported as values from the package root (`export type *` exports types only
  — check `packages/core/src/components/index.ts`).
- State usage rules, not implementation essays.
- `<Controls/>` in mdx ignores `parameters.controls.include`; components whose
  props extend `HTMLAttributes` show ~300 rows — pass `include` on the block
  or accept it.

### JSDoc

Fix wrong defaults, "controlled" claims for initial-only props, outdated
structure lists, examples that wouldn't work. New exports need JSDoc or
`pnpm docs:check` fails CI.

## Step 4 — Verify

From the repo root:

```bash
npx prettier --write <changed files>
npx eslint <changed .ts/.tsx>
npx stylelint <changed .stories.tsx>
(cd packages/core && pnpm -s ts-check)
pnpm -s docs:check
npx jest packages/core/src/components/X      # always from the repo root
```

Then render every story and the docs page in the running Storybook
(`pnpm sb:core`, port 6006):

```bash
node .claude/skills/audit-stories-docs/scripts/render-check.mjs components-x '[role=combobox]'
```

The prefix is the story-id prefix from `http://localhost:6006/index.json`; the
selector proves the component mounted. Exit code 1 if any story mounts nothing,
throws, or logs a console/page error; 2 if Storybook isn't reachable.
For interactive stories (Controlled), add a quick ad-hoc Playwright check
from the repo root (import `chromium` from `@playwright/test`), then delete it.

Known traps: backticks inside a CSS comment in an Emotion template literal
break the Babel build silently; jsdom has no PointerEvent and chokes on
`:has(>)`.

## Step 5 — Report and pause

- Summarise per component: stories now → target and what went, docs fixed,
  checks run with results, and new A-list items.
- **After the first component of a chunk, stop for the user's review** — the
  siblings will copy its structure, so naming and layout should be agreed on
  one before repeating.
- Update the `stories-docs-audit` memory note: progress line and A-list.
