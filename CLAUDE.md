# CLAUDE.md

- When a component gets a new story or its props change, update its Storybook docs page (the `*.mdx` next to the stories) to match. Don't update the Fumadocs site (`apps/docs`); it is expected to be dropped.
- Stories meant only for developers to eyeball changes (e.g. all form fields in one row to check alignment) go in `*.dev.stories.tsx` next to the component, titled `Dev Playground/...`. `sb:dev` (`pnpm sb:core`) shows them via `STORYBOOK_DEV_STORIES=true`; builds never do, so they don't ship. Normal stories keep the plain `*.stories.tsx` name.
