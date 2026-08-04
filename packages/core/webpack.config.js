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
