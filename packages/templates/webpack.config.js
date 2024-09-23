/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const createConfig = require('../../webpack.packages.base');

module.exports = () => {
  const currentConfig = createConfig({
    libraryName: 'SSATemplates',
    outputPath: path.resolve(__dirname, 'dist'),
    alias: {
      '@': path.resolve(__dirname, './src/projects'),
      '@trading': path.resolve('./src/projects/trading'),
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
      '@nivo/pie': '@nivo/pie',
      '@nivo/line': '@nivo/line',
    },
  });

  return currentConfig;
};
