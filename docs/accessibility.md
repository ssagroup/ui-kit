# Accessibility

This document records what the SSA UI Kit actually does for accessibility, and
how that is enforced. It deliberately avoids blanket claims: where behaviour is
unverified or missing, it says so.

## How accessibility is enforced

Three layers, in increasing cost to run:

| Layer | Tool | Scope | Runs in CI |
|---|---|---|---|
| Static JSX rules | `eslint-plugin-jsx-a11y` (recommended set) | every `.tsx` file | `pnpm lint` |
| Runtime ARIA/role checks | `jest-axe` (axe-core) | components listed below | `pnpm test` |
| Visual review | Chromatic / Lost Pixel | Storybook stories | on PR |

### The axe layer

`eslint-plugin-jsx-a11y` only sees source. The axe layer catches what exists
only once a component has rendered: generated ids and the
`aria-labelledby`/`aria-describedby` targets they point at, roles applied by
wrapper components, label/control association through React Hook Form, and
required-child relationships such as `role="tablist"` → `role="tab"`.

Assertions live in `packages/core/src/test-utils/a11y.spec.tsx`, with the shared
helper in `packages/core/src/test-utils/axe.ts`. Because they are ordinary Jest
tests they run in the existing CI job (`pnpm test:coverage:ci`) with no extra
workflow step.

To add a component, append to the `COMPONENTS` table with realistic props:

```tsx
{ name: 'MyComponent', ui: <MyComponent label="Example" /> },
```

If a rule must be disabled, pass `rules` and explain why in a comment. Silent
exclusions are how an a11y suite becomes decorative.

**Rules disabled under jsdom** (see `axe.ts`): `color-contrast`, `region`,
`landmark-one-main`, `page-has-heading-one`, `html-has-lang`. jsdom implements no
layout engine and no CSS cascade for computed colour, so these either throw or
pass on everything. Colour contrast is instead enforced by the design tokens plus
visual review; the landmark rules are page-level concerns that do not apply to a
component rendered in isolation.

**Known limitation:** axe verifies roles, names and relationships. It cannot
verify keyboard behaviour. Anything in the table below is either covered by a
behavioural test or explicitly marked unverified.

## Keyboard interaction

Verified against the implementation. "Native" means the component renders a real
`<button>`, `<input>` or `<a>`, so keyboard behaviour comes from the browser
rather than a handler.

| Component | Keys | Notes |
|---|---|---|
| `Button`, `IconButton` | <kbd>Enter</kbd>, <kbd>Space</kbd> | Native `<button>`. `IconButton` requires `aria-label`. |
| `ButtonGroup` | <kbd>Tab</kbd>, <kbd>Enter</kbd>, <kbd>Space</kbd> | Native buttons; each item is separately tabbable. Not a radio group — no arrow-key navigation. |
| `Checkbox` | <kbd>Space</kbd> | Native `<input type="checkbox">`. |
| `Radio` | <kbd>Space</kbd> | Native `<input type="radio">`. Arrow-key group navigation is native only when inputs share a `name`. |
| `Switch` | <kbd>Space</kbd> | Native checkbox underneath. |
| `Input`, `TextField`, `Textarea`, `NumberField` | native text editing | `Input`/`TextField` additionally handle <kbd>Enter</kbd> for submit-on-enter. |
| `SearchBox` | <kbd>Enter</kbd> | Triggers the search callback. |
| `Slider` | <kbd>Enter</kbd> | Handles <kbd>Enter</kbd> explicitly; arrow-key stepping is native to the underlying range inputs. |
| `Chip` | <kbd>Backspace</kbd>, <kbd>Delete</kbd>, <kbd>Escape</kbd> | Removal keys, when the chip is removable. |
| `Typeahead` | <kbd>Enter</kbd>, <kbd>Backspace</kbd>, <kbd>Tab</kbd> | <kbd>Enter</kbd> selects, <kbd>Backspace</kbd> removes the last selection, <kbd>Tab</kbd> moves out. Focus is trapped by `TypeaheadFocusTrap` while open. |
| `Pagination` | <kbd>Enter</kbd> | On the page-number input. |
| `FileUpload` | <kbd>Enter</kbd> | Activates the hidden file input from the drop zone. |
| `Popover`, `Tooltip`, `Drawer` | <kbd>Escape</kbd>, <kbd>Tab</kbd> | Via Floating UI `useDismiss` + `FloatingFocusManager`: <kbd>Escape</kbd> dismisses and focus is trapped and restored. |
| `Modal` | <kbd>Escape</kbd>, <kbd>Tab</kbd> | Dismiss and focus containment. |
| `Breadcrumbs` | <kbd>Tab</kbd>, <kbd>Enter</kbd> | Native anchors. |

### Not yet verified

These have no keyboard tests and no explicit handlers found; treat as unverified
rather than working:

- `TabBar` / `Tab` / `LargeTab` — no arrow-key navigation between tabs (the APG
  tabs pattern expects <kbd>←</kbd>/<kbd>→</kbd>).
- `AccordionGroup` — no explicit key handling beyond whatever the trigger
  element provides natively.
- `Dropdown` / `MultipleDropdown` — no <kbd>↑</kbd>/<kbd>↓</kbd> option
  navigation; unlike `Typeahead` these do not use Floating UI's
  `useListNavigation`.
- `DatePicker` / `DateRangePicker` calendar grids — no arrow-key date
  navigation.
- `ColorPicker` — no key handling of its own.

These are the highest-value places to improve keyboard support next, and each
should gain a behavioural test at the same time.

## ARIA notes

- `role="progressbar"` requires an accessible name. `ProgressBar` and
  `ProgressCircle` therefore accept `aria-label` / `aria-labelledby`, and set
  `aria-valuenow` / `aria-valuemin` / `aria-valuemax`. `ProgressBar` also accepts
  `valueText` (`aria-valuetext`) for cases where a bare percentage is unhelpful.
  `ProgressCircle` with `mode="infinite"` omits `aria-valuenow` — per ARIA that
  is what marks progress as indeterminate.
- `Button` exposes a curated ARIA prop set (`aria-label`, `aria-labelledby`,
  `aria-describedby`, `aria-disabled`, `aria-pressed`, `aria-current`) and
  follows the [W3C APG button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/).
- Icon-only controls have no text content, so they need an explicit
  `aria-label`. `IconButton` treats it as required in practice; axe will fail the
  build if it is missing.
