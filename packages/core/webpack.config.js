const path = require('path');
const nodeExternals = require('webpack-node-externals');
const createConfig = require('../../webpack.packages.base');

// Bundle @nivo packages into the library instead of making them external.
// This fixes the "ResponsiveWrapper is an object" issue where @nivo's internal
// modules weren't being resolved correctly in consuming apps.
// Declared separately so the ESM pass can rebuild module-type externals from
// the same list — see webpack.packages.base.js.
const externalsAllowlist = [
  /^@nivo\//, // Bundle all @nivo packages
  /^d3-/, // Bundle d3 dependencies (required by @nivo)

  // Bundle CJS-only packages instead of externalising them.
  //
  // An external in the ESM bundle is emitted as a named-`default` import:
  //
  //   import { default as Plot } from 'react-plotly.js';
  //
  // A spec-compliant ESM loader importing a CommonJS module always binds
  // `default` to the whole `module.exports` object — `__esModule` is a
  // bundler convention, not part of the ESM/CJS interop spec. react-plotly.js
  // is CJS-only (`main: "react-plotly.js"`, no `module`, no `exports`), so
  // `Plot` arrives as `{ __esModule: true, default: PlotComponent }` and
  // React reports "Element type is invalid ... but got: object".
  //
  // Rollup rewrites the dependency into ESM during `vite build`, which is why
  // this was invisible in production builds and only ever reproduced under
  // `vite dev`, where the guarantee depends on whether Vite chose to
  // pre-bundle the dep. Bundling it here removes the interop from the
  // consumer's module graph entirely — the same reasoning as the @nivo
  // "ResponsiveWrapper is an object" fix above.
  //
  // Rule of thumb: externals in an ESM output must genuinely publish ESM.
  /^react-plotly\.js(\/|$)/,
  // plotly.js itself stays external: it is ~11 MB prebuilt, and bundling it
  // would roughly triple the published package. It is CJS-only too, so it is
  // imported as a namespace (`import * as`) — the one external form every ESM
  // loader can produce for a CommonJS module — and unwrapped at runtime in
  // @components/Charts/common/Plot.ts, which is also where react-plotly.js's
  // factory is invoked.

  // @rc-component/color-picker is the same defect as react-plotly.js: it sets
  // `exports.default`, and ships ESM only through the legacy `module` field,
  // which bundlers honour but plain ESM loaders ignore. It is a direct
  // dependency rather than a peer, so nothing needs to dedupe it.
  /^@rc-component\/color-picker(\/|$)/,

  // A bare CSS specifier (`import '@rc-component/color-picker/assets/index.css'`)
  // is only meaningful to a bundler; a plain ESM loader cannot execute it.
  // Let css-loader/style-loader inline it instead of re-exporting the hazard.
  /\.css$/,
];

module.exports = () => {
  const currentConfig = createConfig({
    libraryName: 'SSACore',
    outputPath: path.resolve(__dirname, 'dist'),
    dualOutput: true,
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@themes': path.resolve(__dirname, './src/themes'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@global-types': path.resolve(__dirname, './src/types'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
    externalsAllowlist,
    externals: [nodeExternals({ allowlist: externalsAllowlist })],
  });

  return currentConfig;
};
