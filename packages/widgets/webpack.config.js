/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const createConfig = require('../../webpack.packages.base');

module.exports = () => {
  const currentConfig = createConfig({
    libraryName: 'SSAWidgets',
    outputPath: path.resolve(__dirname, 'dist'),
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
    },
    externals: {
      react: 'react',
      'react-dom': 'react-dom',
      'react-router-dom': 'react-router-dom',
      '@emotion/core': '@emotion/core',
      '@emotion/css': '@emotion/css',
      '@emotion/react': '@emotion/react',
      '@emotion/styled': '@emotion/styled',
      '@nivo/core': '@nivo/core',
      '@nivo/line': '@nivo/line',
      '@nivo/pie': '@nivo/pie',
    },
  });

  return currentConfig;
};
