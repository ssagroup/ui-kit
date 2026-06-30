# @ssa-ui-kit/docs — Documentation POC

A **proof-of-concept** documentation site for the SSA UI Kit, in the style of
[shadcn/ui](https://ui.shadcn.com), built with [Fumadocs](https://fumadocs.dev)
+ Next.js. Storybook stays as the playground / visual-regression fallback; this
site is the human-facing "read the docs" surface.

## What's here

- **3 pages** — an intro/landing page, plus `Button` and `Typeahead` component
  pages, each with a **live, themed, interactive preview** rendered from the real
  `@ssa-ui-kit/core` workspace package.
- **A registry + `<ComponentPreview>` pattern** ([registry/index.tsx](registry/index.tsx),
  [components/component-preview.tsx](components/component-preview.tsx)) — the
  scalable shadcn-style way to add live examples: one example module + one line
  in the registry + one MDX tag.
- **Full-text search, dark mode, nav, TOC** out of the box from Fumadocs UI.

## Run locally

From the **monorepo root** (installs the workspace, including this app):

```bash
pnpm install
pnpm --filter @ssa-ui-kit/docs dev
```

Then open <http://localhost:4000>. The docs live at `/docs`.

> Requires `@ssa-ui-kit/core` to be built first (`pnpm build:core` from the
> root), since this app consumes its `dist` output via `workspace:*`.

## Build

```bash
pnpm --filter @ssa-ui-kit/docs build
```

## Deploy (Vercel)

Deploy as a **separate Vercel project** pointing at this subdirectory:

1. New Project → import the repo.
2. Set **Root Directory** to `apps/docs`.
3. Framework preset: **Next.js** (auto-detected). Build/install commands come
   from [vercel.json](vercel.json).
4. Assign a subdomain, e.g. `docs.<your-domain>`.

This keeps the existing Storybook deployments untouched.

## Key architectural finding (read before a full rollout)

`@ssa-ui-kit/core` ships as a single **UMD bundle** that imports browser-only
chart libraries (plotly, nivo) at module-eval time. Because of that, importing
*anything* from the package (even just `Button`) touches `window` and **cannot be
server-rendered**.

This POC works around it by loading every live example **client-side** via
`next/dynamic(..., { ssr: false })` — the same trade-off shadcn/ui makes for
interactive demos. It's perfectly fine for a docs site.

**Recommendation for production:** ship `@ssa-ui-kit/core` as **ESM with
per-component subpath exports** (e.g. `@ssa-ui-kit/core/button`) so individual
components can be tree-shaken and server-rendered without dragging in the
charting stack. That would unlock SSR/SSG previews and much smaller bundles.

## How to add a component to the docs

1. Add an example module under [registry/examples/](registry/examples) (a client
   component that wraps its content in `<PreviewRoot>` for the Emotion theme).
2. Register it in [registry/index.tsx](registry/index.tsx).
3. Write a page in [content/docs/](content/docs) and drop in
   `<ComponentPreview name="your-demo">` with a fenced code block.
