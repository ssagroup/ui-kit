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
 * The expression must be a *bare* `process.env.NODE_ENV`, with nothing guarding
 * it. Bundlers substitute that literal token sequence and nothing else: a
 * `typeof process === 'undefined'` check in front of it is left untouched, so
 * in a browser — where there is no `process` global — the guard returns `false`
 * before the correctly-substituted value is ever reached, and every diagnostic
 * goes dark for exactly the consumers they exist for. Same bug as the one
 * above, entered from the other side.
 *
 * `try/catch` keeps the guarantee the guard was there for: a runtime that never
 * defines `process` *and* whose bundler substituted nothing (a plain
 * `<script type="module">`, a bare worker) throws a ReferenceError, which is
 * caught here as silence rather than a crash. Erring toward silence is right —
 * no diagnostic is worth crashing a consumer over.
 */
export const isDevEnvironment = (): boolean => {
  try {
    return process.env.NODE_ENV !== 'production';
  } catch {
    return false;
  }
};
