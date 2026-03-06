const path = require('path');
const nodeExternals = require('webpack-node-externals');
const createConfig = require('../../webpack.packages.base');

module.exports = () => {
  const currentConfig = createConfig({
    libraryName: 'SSAWidgets',
    outputPath: path.resolve(__dirname, 'dist'),
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
    },
    // Override externals to bundle @nivo packages
    // This fixes the "ResponsiveWrapper is an object" issue where @nivo's
    // internal modules weren't being resolved correctly in consuming apps
    externals: [
      nodeExternals({
        // Bundle @nivo packages into the library instead of making them external
        // This ensures @nivo's internal module resolution works correctly
        allowlist: [
          /^@nivo\//, // Bundle all @nivo packages
          /^d3-/, // Bundle d3 dependencies (required by @nivo)
        ],
      }),
    ],
  });

  return currentConfig;
};
