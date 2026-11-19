---
name: organize-stories
description: Write or redesign a core component's Storybook stories and its .mdx docs page using the kit's shared story layout (grey canvas, captioned white cards, grids, a variant × size matrix) and a fixed story order — grouped by prop axis, never one story per value, ending in an "Example with content" story of real layouts. Use when the user asks to write stories for a new component, "redesign", "reorganise", "group" or "clean up" existing stories, make stories "look like the Divider ones", or move a story file onto the shared layout. Not for auditing stale docs or behaviour bugs across a family of components.
---

# Organize stories

Stories in this kit are documentation that people scan. The pattern below came from the Divider stories (`packages/core/src/components/Divider/`), which are the **reference implementation**: read them before you start.

The layout primitives live in `packages/core/.storybook/layout/index.tsx`, imported as `@storybook-layout`. **Never re-create a card, canvas or caption style in a story file.** If a primitive is missing, add it to the shared module, not to the story.

## Modes

- **New component**: write `X.stories.tsx`, `X.mdx` and, if useful, `X.dev.stories.tsx` from scratch.
- **Redesign existing**: keep every _behaviour_ the old stories demonstrate. Regroup them, don't drop them. Before editing, list each old story and which new story covers it, and show the user that mapping if any story is removed or merged. Story ids change when stories are renamed: search the repo for links to the old ids (`grep -rn "components-x--" packages/ .storybook/`).

## The layout primitives

| Export        | Use for                                                                                                                                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `storyCanvas` | The meta decorator: `decorators: [storyCanvas]`. Grey `#eef1f7` canvas with 24px padding.                                                                                                                          |
| `Panel`       | One white card per prop value or use case. `title` is a caption naming the value (`"theme key: blue"`, `"spacing: 0 / 8 (default) / 24"`). Optional: `width`, `elevated` (shadow, for a modal-like card), `style`. |
| `PanelGrid`   | Equal columns that wrap (`minWidth`, default 320). Use when every card shows the same content for a different value.                                                                                               |
| `PanelRow`    | Cards of their own widths, wrapping, top-aligned. Use for mixed content and use cases.                                                                                                                             |
| `PanelStack`  | Cards one under another.                                                                                                                                                                                           |
| `Matrix`      | Two axes in one card (`rows`, `columns`, `renderCell`), with captions on both edges. Use for variant × size.                                                                                                       |
| `Stack`       | Flex container inside a card (`direction`, `gap`, `align`, `height`, `wrap`). Use for a fixed-height row of vertical components.                                                                                   |
| `Caption`     | The small uppercase label, for anything else that needs one.                                                                                                                                                       |

Components that draw their own white surface (`Table`, `Card`, `WidgetCard` and their skeletons) must not go inside a `Panel`, which would put white on white. Put them straight on the canvas under a `<Caption>` instead. See `Presets` and `ExamplesWithContent` in `Skeleton.stories.tsx`.

Layout markup that belongs to one _example_ (a fake sidebar, a stats row) may stay inline in the story. Only the shared chrome must come from the module.

## Story order

Group by **prop axis**, one story per axis, each value in its own captioned card. Leave out any story the component has nothing for.

1. **`Default`**: one card, the component with every documented control. `args` set the design defaults.
2. **Look**: e.g. `StylesAndSizes` or `Variants`. A `Matrix` for two axes. Add a second card if the component has an orientation or layout mode.
3. **Content**: what can go inside (none / text / icon / node, empty states). One card per mode.
4. **Colours / themes**: a `PanelGrid` with one card per preset, then one theme key and one raw CSS value if custom colours are allowed. Show every content type in each card, so the colour rule is visible.
5. **Customization**: one card per escape-hatch prop (`length`, `gap`, `fontSize`…), showing 2–3 values, with the default marked in the title.
6. **States**: disabled, error, loading, if the component has them.
7. **`ExamplesWithContent`** (`name: 'Example with content'`): the component in **real layouts**, one card per layout. Examples: a modal (`Panel elevated`), a grouped list, a form, a toolbar, a dashboard widget, a sidebar page. Use kit components and `Skeleton` presets (`SkeletonForm`, `SkeletonListItem`, `SkeletonText`, `Skeleton`) as filler content, so the cards show layout, not lorem ipsum.

Story JSDoc (one or two sentences) states what the story shows. It is what `<Description>` renders.

## Controls: one list for stories and docs

The mdx `<Controls>` block ignores `parameters.controls.include`. So define the list once, export it, and use it in both places. Exclude it from the stories, or it shows up as a story:

```tsx
/** Props shown in the controls tables of the stories and the docs page. */
export const DOCUMENTED_X_PROPS = ['variant', 'size', 'color', 'children'];

const meta: Meta<typeof X> = {
  title: 'Components/X',
  component: X,
  excludeStories: ['DOCUMENTED_X_PROPS'],
  decorators: [storyCanvas],
  parameters: { controls: { include: DOCUMENTED_X_PROPS } },
  args: {
    /* design defaults */
  },
  argTypes: {
    /* inline-radio for small enums, select for icons, text for colours/lengths */
  },
};
```

```mdx
<Controls of={XStories.Default} include={DOCUMENTED_X_PROPS} />
```

## The .mdx page

Per CLAUDE.md, update the `X.mdx` next to the stories whenever stories or props change. Ignore `apps/docs`. Structure:

- `# X`: one-line purpose, then an import + usage snippet.
- `<Canvas of={Default}/>` + `<Controls … include={…}/>`.
- One `##` section per story, **in story order**. Each has 2–5 bullets explaining the props the story shows (defaults, units, edge rules), then `<Canvas of={…}/>`. Use a small table when a rule depends on a value (e.g. which parts a colour paints).
- `## Accessibility`: role, name, keyboard behaviour, what the consumer must pass.

## Dev playground (optional)

Developer-only edge cases go in `X.dev.stories.tsx`, titled `Dev Playground/X` (see CLAUDE.md). Cover awkward parents: no gap, flex row/column, `align-items: center`, grid cells, a fixed-height or auto-height block, a narrow container, long text, style overrides, custom colours on every content type. Give each case a title and a one-line note on the expected result. Outline each case area (`outline: 1px dashed #f0a`) so overflow shows.

## Verify

1. `pnpm --filter ./packages/core ts-check`, `npx eslint <files>`, and `pnpm docs:check` if exports changed.
2. Screenshot **every** story and read the screenshots. Problems that are visible but not caught by tests (a dashed line rendering solid, a box stretching to full width) show up here. Get story ids from `http://localhost:6006/index.json`. Use the repo's `@playwright/test` as a library, from a throwaway script at the repo root (delete it afterwards):

   ```js
   import { chromium } from '@playwright/test';
   const b = await chromium.launch();
   const p = await b.newPage({
     viewport: { width: 1400, height: 900 },
     deviceScaleFactor: 2,
   });
   for (const id of process.argv.slice(2)) {
     await p.goto(`http://localhost:6006/iframe.html?id=${id}&viewMode=story`);
     await p.waitForSelector('#storybook-root > *');
     await p.waitForTimeout(800);
     await p.screenshot({ path: `/tmp/${id}.png`, fullPage: true });
   }
   await b.close();
   ```

   Also load the docs page (`viewMode=docs`, id `…--docs`) and check that every `##` section rendered with no page errors.

3. If Storybook on 6006 predates a `.storybook/` change (such as a new alias), it needs a restart. Ask before restarting the user's instance, or use a spare port (`npx storybook dev -p 6010 --ci --no-open` from `packages/core`).

## Don'ts

- One story per prop value (`Small`, `Medium`, `Large`…).
- Local `Panel`/`surface`/caption styles, or a hand-rolled grey decorator.
- Unlabelled cards: every card title names what it shows.
- Selected states marked by font weight or size in examples. Use colour.
- Backticks inside CSS comments in emotion templates. They break the Babel build silently.
