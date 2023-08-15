/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const createConfig = require('../../webpack.packages.base');

module.exports = () => {
  const currentConfig = createConfig({
    libraryName: 'SSAUtils',
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  });

  return currentConfig;
};
