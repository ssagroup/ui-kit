---
name: align-with-design
description: Compares an existing SSA UI Kit component's live implementation (a Storybook story) against its Figma design, and brings the code in line — colors, spacing, typography, states, and design-token usage. Use this whenever the user asks to "align", "check", "audit", "match", or "sync" a component against Figma; asks why a component "looks different from the design"; wants a component to "use our design tokens properly"; or wants to "bring [a component] up to date with the design system". Trigger this even if the user supplies only a Figma link, only a Storybook link, or neither (just a component name) — the skill itself asks for whatever's missing rather than being skipped. Do NOT use this for building a brand-new screen in Figma from code, or implementing a component in code for the first time from a design that has no existing implementation yet — those belong to figma-generate-design / figma-use. This skill is specifically for auditing and fixing something that already exists in this codebase.
compatibility: Requires the Figma MCP server (plugin:figma:figma) tools (get_metadata, get_design_context, get_variable_defs, get_screenshot), plus Bash/Read/Edit for this repo. AskUserQuestion and plan mode (EnterPlanMode/ExitPlanMode) are used when available but the workflow degrades gracefully to plain chat questions without them.
---

# Align With Design

Audits one SSA UI Kit component's real implementation against its Figma
design, lets the user decide what to do about any gaps, then implements the
agreed fixes using this repo's existing Emotion/theme conventions. Verification
is code-level only (typecheck, lint, unit tests) — **visual confirmation is
always left to the user**, deliberately, to avoid burning agent time on
something a human will check anyway.

## Step 0 — Get both links before doing anything else

You need two things pointing at the *same* component:

1. A Figma URL with a `?node-id=` pointing at the specific frame/variant set
   for that component (not just the file root).
2. A Storybook URL for that component's story — local
   (`http://localhost:6006/...`) or deployed.

If either is missing, **ask for it** before reading any code or calling any
Figma tool. Don't guess a node-id from the file's page list, and don't infer
a story id by grepping `.stories.tsx` files yourself — the user wants to
supply both deliberately, and a wrong guess wastes the whole downstream
comparison.

## Step 1 — Read the live implementation (source, not screenshots)

Find the component's source directory, normally
`packages/core/src/components/<Name>/`. Read:

- the main component file
- its `styles.ts`/`styles.tsx`
- `types.ts` for the public prop surface
- the `.stories.tsx` file, specifically the story the Storybook link points to

Get the *exact* current values this way — px, font-weight, theme path used,
etc. — rather than inferring them from a rendered screenshot later. Source is
unambiguous; a screenshot of a hover state you didn't trigger is not.

## Step 2 — Pull the Figma design spec

Using the node-id from the link:

- `get_metadata` first if the node is a container with multiple variants —
  find the actual state-bearing children (e.g. a "Number" or variant-set node)
  rather than assuming the top node has everything. Drill freely into the
  children of the node the user gave you, but don't go roaming to other
  pages or frames in the file looking for a state the code has but this node
  doesn't show (e.g. an `:active`/pressed state) — the user pointed you at a
  specific node on purpose; if the code has more states than the design
  shows, that's a Step 5 question, not a reason to go searching.
- `get_design_context` on every relevant node — cover **all** states the
  design shows (default/hover/disabled/selected/focus/etc.), not just the
  first one you find.
- `get_variable_defs` on the same nodes — this is the most important call,
  it gives you the design's actual token names and resolved values, not just
  colors baked into the screenshot.
- `get_screenshot` only as a visual sanity check — never as the source of
  truth for an exact px/color value.

## Step 3 — Map Figma tokens onto this repo's existing theme

This repo's theme is `packages/core/src/themes/main.ts` (the values) plus
`packages/core/src/types/emotion.ts` (the `Colors` type union the `Theme`
type is built from). Components consume it via `theme.colors.*` and
`theme.palette.<variant>.{light,main,dark}` through `@emotion/react`.

For every token value you pulled from Figma, check whether an equivalent
already exists in `main.ts` before proposing anything new — most design
tokens map cleanly onto an existing `palette.*` or `colors.*` entry. Prefer
reusing those over inventing a parallel token namespace that mirrors Figma's
literal naming (e.g. a `pagination.number.selected` block matching Figma's
`miscellaneous/Pagination/number/selected`). Only add a new token when
nothing in the theme is close.

When you do add one, add it in **both** places — `main.ts` (the value) and
`emotion.ts` (the `Colors` type list). They're separate files; it's easy to
update one and forget the other, and TypeScript won't catch a value that
exists but isn't in the type union.

If there's a real choice here (existing-theme mapping vs. a dedicated token
block mirroring Figma's own namespace), ask the user instead of deciding
silently. Default recommendation: reuse the existing theme.

## Step 4 — Build the itemized comparison report

Group findings by component part (for a button-like component: the core
element, icons, layout/spacing, any inputs, any popovers/menus) and give each
group's rows a short ID prefix so the user can reference them later (e.g.
`B1, B2...` for the main button, `L1, L2...` for layout, `M1, M2...` for a
menu — pick prefixes that fit the actual component, don't force a fixed set).

For each row: `ID | Property | Figma value | Current code value | Match`.

Explicitly call out:

- Items that are **already correct** — finding "design and code agree here"
  is as valuable as finding a mismatch, and skipping it makes the rest of the
  report look like it's full of problems when it might mostly be fine. Only
  mark a row ✅ when the match is semantically sound, not just numerically
  coincidental — if the code's value happens to equal an existing token by
  chance but that token's name implies an unrelated purpose, mark it as a
  mismatch or open question (Step 5) instead of a match.
- The existing theme token each proposed fix would map to (from Step 3), so
  the user can see at a glance whether you're reusing or inventing.

## Step 5 — Ask before deciding, don't guess

Two decisions are almost always buried in a report like this:

1. **Token strategy** — reuse the existing theme vs. a dedicated block
   mirroring Figma's namespace (Step 3).
2. **Fix granularity** — which itemized differences to actually apply.
   Default to presenting the full itemized menu and letting the user pick;
   don't unilaterally narrow it to "the important ones" unless asked to.

Not every ambiguity is a token question, though — some are about *mechanism*,
not value. A state can be implemented with a fundamentally different
interaction model in code than in the design (e.g. Figma shows a focus state
as the same background plus a border, while the code swaps to a lighter
background with no border at all) — that's a behavior change, not a color
swap, and deserves its own explicit question rather than being folded into
"token strategy." Likewise, a value that numerically matches an existing
token is only a real ✅ in Step 4 if that token's own name/intent also fits —
if a number happens to match `colors.greyDropdownFocused` by coincidence but
this isn't a dropdown, that's worth a question, not a checkmark.

Treat a mechanism-level mismatch like that as a stronger signal than a plain
value mismatch: it can mean the component's interaction logic is genuinely
missing or out of date, not just unstyled — e.g. the code never implemented
a border-on-focus path at all, rather than implementing one with the wrong
color. Say so plainly when you flag it ("this isn't a color picked
differently, the component has no border-on-focus logic at all") instead of
describing it the same way you'd describe a token swap — it changes what the
user needs to decide (do we add this behavior at all, and where) rather than
which value to plug in.

Other things worth asking about rather than guessing: the Figma file
disagreeing with itself across variants (one shows `"1 / 300"`, another shows
`"Page 1 out of 300"`), a state or variant that exists in code but isn't
shown anywhere in the node(s) the user pointed you at — don't go hunting
other pages or frames in the Figma file for it; the user gave you a specific
link on purpose, so ask whether that state is intentionally code-only or
whether you should be looking somewhere else — or a value that's
close-but-not-exact where you can't tell if it's intentional drift or a
rounding artifact. Don't silently pick one and move on — surfacing these is
the actual point of doing this as a comparison rather than a mechanical
token swap.

## Step 6 — Plan, then implement

Once the user has picked which fixes to apply, use plan mode (if available)
before touching files: list every file you'll touch and the exact change per
file, get it approved, then implement.

Follow this codebase's existing conventions rather than introducing a new one
mid-component:

- Check how sibling files in the same package style things. This repo has
  both template-literal `css\`...\`` and object-style `css({...})` Emotion
  usage — prefer `css({...})` for anything that composes multiple style
  fragments via spread, since merged template literals taking
  `${someSerializedStyles}` cause linter "Term expected" false positives that
  object syntax avoids.
- When a shared style fragment gets spread into more than one variant (e.g.
  a "base" object spread into both a "default" and a "selected" style), watch
  for **pseudo-selector key collisions**: if the base fragment and a variant
  both define the same key (e.g. both have `&:disabled`), a plain object
  spread lets the later one silently overwrite the earlier one's properties
  instead of merging them — unlike concatenated CSS text, where both rules
  would have applied. Pull the genuinely shared piece (e.g.
  `{ cursor: 'default' }`) into its own small object and spread it explicitly
  inside each variant's `&:disabled` block.
- If a shared/base component (a generic `Button`, `Input`, etc.) was relying
  on *this* component's old sizing or padding to achieve some effect — most
  commonly: visually centering content via asymmetric padding, because the
  base component itself sets no explicit `justify-content` — changing that
  sizing can silently break the effect elsewhere. If something looks subtly
  misaligned after a sizing/padding change with no other obvious cause, check
  the shared base component's own flex/alignment rules before re-patching at
  the leaf level.
- If you're adding a new prop for configurability (e.g. a render-prop letting
  consumers control text the design itself shows in more than one wording),
  give it a default that reproduces today's behavior exactly, document it in
  `types.ts`, and don't make it required.

## Step 7 — Verify with code-level checks only

Run these from the **repo root**, not from inside `packages/core` — running
`pnpm test` from inside `packages/core` directly resolves `@ssa-ui-kit/hooks`
to its built UMD bundle instead of source, which throws an unrelated
`self is not defined` error:

- `pnpm --filter ./packages/core ts-check`
- `npx eslint <changed files>` — if it fails on Prettier formatting (common
  after rewriting CSS to object syntax, since long object keys wrap), rerun
  with `--fix`.
- `pnpm test -- --testPathPattern "<Component>.spec"` from the repo root. If
  the very first run throws `self is not defined`, that's a known flaky
  cold-cache issue with the hooks package — just rerun once.
- Update or add unit tests for any new prop or behavior change, and update
  any test that asserts on DOM structure if you changed the tree shape (e.g.
  wrapped a set of buttons in a new flex container).

**Do not** start a dev server, open Storybook, take screenshots, or drive a
browser to confirm the visual result. That verification is explicitly the
user's job for this skill — spending agent time on it is wasted effort since
the user is going to look at it themselves regardless. State plainly in your
summary that the static checks passed and that visual confirmation is on
them.

## Step 8 — Summarize, then iterate on their visual feedback

Close with a short summary: what changed, which files, and which static
checks passed. Don't claim the visual result is correct — you haven't looked
at it.

When the user comes back with visual feedback (a screenshot, or a plain
description like "the text is left-aligned now" or "this background looks
wrong on a grey page"), treat it as a normal bug fix, not a new comparison
pass:

- Find the root cause in code — see the shared-base-component note in Step 6,
  that's the most common root cause for "this one specific thing looks off"
  bugs that show up only after a sizing change.
- Re-run the Step 7 checks after the fix.
- Don't re-open Figma or re-diff from scratch unless the feedback suggests
  the original design read in Step 2 was actually wrong.
