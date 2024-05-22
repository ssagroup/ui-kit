/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const createConfig = require('../../webpack.packages.base');

module.exports = () => {
  const currentConfig = createConfig({
    libraryName: 'SSAHOCs',
    outputPath: path.resolve(__dirname, 'dist'),
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@hocs': path.resolve(__dirname, './src/hocs'),
    },
    externals: {
      react: 'react',
      '@emotion/core': '@emotion/core',
      '@emotion/css': '@emotion/css',
      '@emotion/react': '@emotion/react',
      '@emotion/styled': '@emotion/styled',
    },
  });

  return currentConfig;
};
