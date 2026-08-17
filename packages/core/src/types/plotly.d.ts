/**
 * `plotly.js/dist/plotly.js` is the prebuilt UMD bundle — the exact module
 * react-plotly.js loads internally. It ships no type declarations of its own
 * (only the package root is typed, by @types/plotly.js), so declare the deep
 * path here.
 *
 * The `.js` is required, not stylistic: plotly.js has no `exports` map, and a
 * plain ESM loader will not extension-guess a deep path. react-plotly.js's own
 * `require('plotly.js/dist/plotly')` is fine only because bundlers resolve it.
 *
 * Modelled as a default export because that is what an ESM loader gives a
 * CommonJS module: `import * as ns` yields `{ default: module.exports }`.
 * `@components/Charts/common/Plot.ts` unwraps it and explains why.
 */
declare module 'plotly.js/dist/plotly.js' {
  import * as Plotly from 'plotly.js';

  const plotly: typeof Plotly;
  export default plotly;
}
