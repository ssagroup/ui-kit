/**
 * Whether the kit's development-only diagnostics should run.
 *
 * Read at call time, not at module load, and deliberately *not* resolved when
 * this package is bundled: `webpack.packages.base.js` sets
 * `optimization.nodeEnv: false` so `process.env.NODE_ENV` survives into
 * `dist/`, where the consumer's own bundler substitutes it for their build. A
 * library that bakes in its own `mode` decides the question for everyone —
 * which is how every deprecation warning in this package ended up compiling to
 * `if (true) return;` in the published bundle, silently, while still firing in
 * this repo's Jest runs.
 *
 * The `typeof process` guard is what makes leaving the value unresolved safe:
 * a runtime that never defines `process` (a plain `<script type="module">`, a
 * bare worker) gets silence rather than a ReferenceError. Erring toward silence
 * is right — no diagnostic is worth crashing a consumer over.
 */
export const isDevEnvironment = (): boolean => {
  if (typeof process === 'undefined' || !process.env) return false;

  return process.env.NODE_ENV !== 'production';
};
