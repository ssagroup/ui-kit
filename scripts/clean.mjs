#!/usr/bin/env node
/**
 * Removes a package's build output *and* its TypeScript incremental cache.
 *
 * Both must go together. `tsc --build` trusts its `tsBuildInfoFile` over the
 * filesystem, so deleting `dist` alone leaves the cache claiming everything is
 * already emitted — the next build then "succeeds" while producing no .d.ts
 * files at all. The breakage surfaces later, in a *different* package, as
 * confusing `has no exported member` errors.
 *
 * `tsBuildInfoFile` now points inside `dist/`, so removing `dist` is normally
 * enough. This script also clears the legacy root-level locations so that
 * checkouts predating that change, and any stray `*.tsbuildinfo`, are cleaned.
 *
 * Run from a package directory (`pnpm clean`) or across the workspace
 * (`pnpm clean:all`).
 */
import { existsSync, readdirSync, rmSync } from 'node:fs';
import { basename, resolve } from 'node:path';

const cwd = process.cwd();
const targets = ['dist', 'tsbuildcache'];

const removed = [];

for (const target of targets) {
  const path = resolve(cwd, target);
  if (existsSync(path)) {
    rmSync(path, { recursive: true, force: true });
    removed.push(target);
  }
}

// Legacy/stray incremental caches left at the package root.
for (const entry of readdirSync(cwd)) {
  if (entry.endsWith('.tsbuildinfo')) {
    rmSync(resolve(cwd, entry), { force: true });
    removed.push(entry);
  }
}

const label = basename(cwd);
console.log(
  removed.length
    ? `clean(${label}): removed ${removed.join(', ')}`
    : `clean(${label}): nothing to remove`,
);
