import * as PlotlyModule from 'plotly.js/dist/plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';

/**
 * The `<Plot>` component, built from react-plotly.js's factory rather than
 * imported from its default entry point.
 *
 * react-plotly.js is CommonJS-only: no `module` field, no `exports` map, no
 * `"type": "module"`. Externalising it from the ESM bundle made webpack emit
 *
 *   import { default as Plot } from 'react-plotly.js';
 *
 * and a spec-compliant ESM loader binds `default` of a CommonJS module to the
 * entire `module.exports` object. `__esModule` is a bundler convention, not
 * part of the interop spec, so `Plot` arrived as
 * `{ __esModule: true, default: PlotComponent }` and React threw
 * "Element type is invalid ... but got: object". Rollup rewrites the dependency
 * into ESM during `vite build`, which is why only `vite dev` ever reproduced
 * it, and only once a chart actually mounted.
 *
 * react-plotly.js is bundled into the kit now (see the externals allowlist in
 * webpack.config.js), so its interop is resolved at build time here rather than
 * in the consumer's module graph. plotly.js stays external — it is ~11 MB
 * prebuilt, and doubling the published bundle to carry it is not worth it — so
 * this module owns the one interop step that remains:
 *
 * `import * as` is the loader-safe way to reference a CommonJS external. Every
 * ESM loader can produce a namespace object for one; what varies is whether the
 * real export lands on `.default` (Node, and Vite for deps it does not
 * pre-bundle) or is spread across the namespace (bundlers that synthesise named
 * exports). Reading `.default` first and falling back to the namespace covers
 * both, which is exactly what react-plotly.js's own entry point fails to do.
 */
const Plotly =
  (PlotlyModule as { default?: typeof PlotlyModule.default }).default ??
  (PlotlyModule as unknown as typeof PlotlyModule.default);

export const Plot = createPlotlyComponent(Plotly);

export default Plot;
