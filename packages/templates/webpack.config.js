/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const createConfig = require('../../webpack.packages.base');

module.exports = () => {
  const currentConfig = createConfig({
    libraryName: 'SSATemplates',
    outputPath: path.resolve(__dirname, 'dist'),
    alias: {
      '@icons': path.resolve(__dirname, './src/icons'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@': path.resolve(__dirname, './src/projects'),
      '@fintech': path.resolve('./src/projects/fintech'),
      '@fitness': path.resolve('./src/projects/fitness'),
      '@hr': path.resolve('./src/projects/hr'),
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
