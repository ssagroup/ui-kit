---
name: import-icon
description: >
  Imports missing SVG icons from a Figma file into the SSA UI Kit icon system.
  Use this skill whenever the user provides a Figma URL and asks to add, import,
  or create icons — even if they say "add these icons", "bring in from Figma",
  "we're missing X icon", or just pastes a Figma link with a list of icon names.
  Also trigger if the user says they want to sync icons from design or asks why
  an icon is missing from Storybook. Never skip this skill when a Figma URL and
  icon names appear together in the same request.
---

# Import Icon Skill

This skill fetches SVG icons from Figma and creates properly structured React
component files in the SSA UI Kit icon system, following the exact patterns
already established in the codebase.

## Codebase context

Icons live in:
```
packages/core/src/components/Icon/icons/
  {Name}.tsx      ← one file per icon
  all.ts          ← barrel: export * as {Name} from './{Name}'
  iconsList.tsx   ← auto-derived from all.ts via ICON_NAME exports
  index.tsx       ← builds the name→component map
```

The `iconsList` and the map are rebuilt automatically from `all.ts` — you only
need to touch `{Name}.tsx` and `all.ts`.

## Step 1 — Understand the request

Extract from the user's message:
- **Figma URL** — must contain a `node-id` query param (e.g. `?node-id=2642-1752`)
- **Icon names** — what the user listed (e.g. "Star, Dashboard, Phone")
- **Groups** (optional) — Figma frame names to scope the search, e.g. "Main Icons", "PeopleOps icons"

Derive `fileKey` and `nodeId` from the URL:
- URL shape: `https://www.figma.com/design/{fileKey}/...?node-id={int}-{int}`
- `nodeId` uses `:` not `-`: convert `2642-1752` → `2642:1752`

## Step 2 — Get the page structure

Call `mcp__plugin_figma_figma__get_metadata` with the extracted `fileKey` and `nodeId`.

The response is XML. Scan the `<frame>` elements to find the relevant groups.
Each icon is a `<symbol>` element. The `name` attribute tells you the icon name,
and `id` is the Figma node ID you'll need later.

**Matching icons to nodes:**
- The user says "Star" → find `<symbol ... name="Name=Star, ...">` or similar
- Strip the `Name=` prefix and any size/variant suffixes (`Size=24x24`, etc.)
- If the user specified groups, only look inside those `<frame>` elements
- If a user-requested icon name doesn't match anything, report it clearly
- Skip icons that already have a `.tsx` file in `packages/core/src/components/Icon/icons/`

## Step 3 — Fetch design context for each icon

For each matched icon node, call `mcp__plugin_figma_figma__get_design_context`:

```
nodeId: the symbol's id (e.g. "6921:17020")
fileKey: from the URL
clientFrameworks: "react"
clientLanguages: "typescript"
excludeScreenshot: true
```

Do this **in parallel** for all icons in one batch.

The response contains:
- Asset URL constants (e.g. `const imgUnion = "https://www.figma.com/api/mcp/asset/..."`)
- A React/Tailwind component showing how the pieces are positioned inside a 24px container

**Parse the positioning info** — you need it to compute the SVG transform:
- Single uniform inset: `inset-[X%]` → all 4 sides = X% of 24px
- Non-uniform: `inset-[top_right_bottom_left]` (CSS shorthand, clockwise)
- Absolute: `left-{N}px top-{N}px` (already in pixels)
- For `top-1/2 -translate-y-1/2`: element is vertically centered; ty = (24 - height) / 2

The element's top-left corner in the 24px canvas is the translate offset: `translate(tx, ty)`.

For icons with **multiple sub-elements** (multiple asset URLs), note each element's
individual position and size — they'll become separate `<g>` groups in the SVG.

## Step 4 — Fetch the SVG data

For each asset URL found in Step 3, call `WebFetch`:

```
url: the asset URL (e.g. "https://www.figma.com/api/mcp/asset/...")
prompt: "Return the full raw SVG markup exactly as-is, including all path data, viewBox, and all attributes."
```

Do this **in parallel** across all assets.

The response will be an SVG with:
- A `viewBox` that matches the inner element's natural size
- `fill="var(--fill-0, #2B2D31)"` or `stroke="var(--stroke-0, #2B2D31)"` on paths
- Possibly `fill-opacity` or `stroke-opacity`

## Step 5 — Compute the SVG transform

Each icon renders inside a `viewBox="0 0 24 24"` SVG. The inner paths need a
`<g transform="translate(tx, ty)">` wrapper to place them correctly.

**Formula:**
```
tx = left_inset_px  = (left%  / 100) * 24   or   absolute left value
ty = top_inset_px   = (top%   / 100) * 24   or   absolute top value
```

**Common cases:**
| Figma positioning | tx | ty |
|---|---|---|
| `inset-[9.58%]` | 2.3 | 2.3 |
| `inset-[9.79%]` | 2.35 | 2.35 |
| `inset-[10%]` | 2.4 | 2.4 |
| `inset-[12.5%]` | 3 | 3 |
| `inset-[8.33%]` | 2 | 2 |
| `left-2px top-3px` | 2 | 3 |
| `left-2px top-4px` | 2 | 4 |

For **non-uniform insets** `[top right bottom left]`:
```
tx = (left% / 100) * 24
ty = (top%  / 100) * 24
```

If the native viewBox of the SVG is NOT square or differs from the expected inner
size, add a `scale(actual_inner_width / native_viewbox_width)` after the translate.
In most cases the scale will be ~1.0 and can be omitted.

For **multi-element icons** (e.g. Phone = body + speaker dot), use separate
`<g transform="...">` groups, one per asset.

For icons with **CSS rotation/flip** (`-rotate-180 -scale-x-100`, etc.):
- `-rotate-180` + `-scale-x-100` = `scale(1, -1)` (flip Y) around the element center
- Express as: `translate(cx, cy) scale(1, -1) translate(-cx+tx, -cy+ty) scale(native_scale)`
  where cx/cy is the element's center in 24px space.

## Step 6 — Build the component

Use this exact template for each icon:

```tsx
import { SVGProps } from '@components/Icon/types';

export const {ComponentName} = ({
  fill = '#000',
  size = 24,
  tooltip = '{Display Name}',
  ...props
}: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{tooltip}</title>
    <g transform="translate(tx, ty)">
      {/* paste paths here */}
    </g>
  </svg>
);

export const ICON_NAME = 'kebab-case-name';
```

**Attribute conversions (HTML → JSX):**
| HTML | JSX |
|---|---|
| `fill-rule` | `fillRule` |
| `clip-rule` | `clipRule` |
| `fill-opacity` | remove entirely |
| `stroke-opacity` | remove entirely |
| `stroke-width` | `strokeWidth` |
| `stroke-linecap` | `strokeLinecap` |
| `stroke-linejoin` | `strokeLinejoin` |
| `fill="var(--fill-0, ...)"` | `fill={fill}` |
| `stroke="var(--stroke-0, ...)"` | `stroke={fill}` |

For **stroke-only icons** (no fill paths), add `fill="none"` on each `<path>` element.

**Naming:**
- File: `{PascalCase}.tsx` (e.g. `ZoomIn.tsx`, `FilterList.tsx`, `Save2.tsx`)
- Component export: same as file name
- `ICON_NAME`: kebab-case (e.g. `'zoom-in'`, `'filter-list'`, `'save-2'`)
- `tooltip`: the display name with spaces (e.g. `'Zoom In'`, `'Filter List'`)

## Step 7 — Register in all.ts

Add one line per icon at the **end** of `packages/core/src/components/Icon/icons/all.ts`:

```ts
export * as {ComponentName} from './{ComponentName}';
```

Maintain alphabetical order is nice but not required — just don't insert in the middle of unrelated groups.

## Step 8 — Verify

Run a quick TypeScript check to catch any JSX attribute errors:

```bash
npx tsc --noEmit -p packages/core/tsconfig.json 2>&1 | grep -v "TS2688" | grep "error"
```

If there are errors in the new files, fix them before reporting done.

## Step 9 — Report

Tell the user:
- Which icons were successfully created (with file names)
- Which icons were skipped (already exist)
- Which icon names had no match in Figma (if any)
- The `ICON_NAME` string they'd use to render each: `<Icon name="zoom-in" />`

---

## Tips and edge cases

**Figma desktop not needed.** The MCP tools work as long as the user is authenticated
in the Figma desktop app in the background. If `get_design_context` fails with
"nothing selected", ask the user to open the Figma file in the desktop app.

**Icons that are already present.** Always check the existing `all.ts` exports
before creating a file. If it's already there, skip it and say so.

**Name mismatches.** Figma often uses "Name=Zoom, Size=24x24" — strip everything
after and including the comma, and strip the "Name=" prefix. For "Title=Geography",
strip the "Title=" prefix. The user's input names might be slightly different (e.g.
"Log In" vs "Log in") — do fuzzy matching.

**Multiple sizes.** Figma often has the same icon at 16, 18, 20, and 24px. Always
prefer the 24×24 variant as the source for the SVG paths (it gives the most detail).

**Asset URLs expire in 7 days.** The Figma asset URLs from `get_design_context` are
temporary. Don't tell the user to save them; just use them immediately during the
import session.

**`iconsList` is auto-generated.** Do NOT manually edit `iconsList.tsx`. It derives
from `all.ts` at runtime via `ICON_NAME` exports.
