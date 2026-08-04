/**
 * Warns, in development, when more than one copy of `@ssa-ui-kit/core` is
 * loaded into the same runtime.
 *
 * The package ships both a CommonJS and an ESM bundle (`exports.require` →
 * `dist/index.js`, `exports.import` → `dist/index.mjs`). A dependency graph
 * that reaches core *both* ways — a `require` from one dependency, an `import`
 * from the app — loads both files, and each gets its own module scope. Every
 * context the kit creates then exists twice: a `ThemeProvider` from one copy
 * cannot be read by a `useTheme` from the other, a `PopoverTrigger` cannot find
 * the `Popover` that wraps it, and so on.
 *
 * The symptoms are indirect and expensive to chase — "theme is undefined",
 * "usePopoverContext must be used within a Popover" on markup that plainly is
 * — so the point of this module is to name the cause once, up front. It is the
 * same failure that made `useFormContext()` return null when core was
 * CommonJS-only and Vite loaded react-hook-form as ESM; the fix shape is the
 * same too, hence the `resolve.dedupe` hint.
 *
 * Fixing it means making the graph resolve to one copy: `resolve.dedupe` in
 * Vite, `resolve.alias` in webpack, or removing the `npm link` / `file:` /
 * workspace symlink that gave a linked package its own `node_modules`.
 *
 * No-op in production builds — the check costs a global read, but the message
 * is only actionable to someone with the source in front of them.
 */

import { isDevEnvironment } from './environment';

const INSTANCE_KEY = Symbol.for('@ssa-ui-kit/core.instance');

type InstanceRegistry = { count: number };

export const detectDuplicateInstance = (): void => {
  if (!isDevEnvironment()) return;

  const registry = globalThis as typeof globalThis & {
    [INSTANCE_KEY]?: InstanceRegistry;
  };

  const existing = registry[INSTANCE_KEY];

  if (!existing) {
    registry[INSTANCE_KEY] = { count: 1 };
    return;
  }

  existing.count += 1;

  // Only on the second copy: a third adds nothing but noise.
  if (existing.count !== 2) return;

  console.warn(
    '[ssa-ui-kit] Two copies of `@ssa-ui-kit/core` are loaded in this runtime.\n' +
      'React contexts are per-module-instance, so components from one copy cannot ' +
      'see providers from the other — expect "theme is undefined" or ' +
      '"must be used within a <Provider>" errors on markup that looks correct.\n' +
      'This usually means the graph reaches core as both ESM (dist/index.mjs) and ' +
      'CommonJS (dist/index.js), or that a linked package resolves its own copy.\n' +
      'Vite:    resolve: { dedupe: ["@ssa-ui-kit/core"] }\n' +
      'webpack: resolve: { alias: { "@ssa-ui-kit/core": path.resolve("node_modules/@ssa-ui-kit/core") } }',
  );
};
