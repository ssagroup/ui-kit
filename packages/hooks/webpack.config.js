/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const createConfig = require('../../webpack.packages.base');

module.exports = () => {
  const currentConfig = createConfig({
    libraryName: 'SSAHooks',
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
    },
    externals: {
      react: 'react',
    },
  });

  return currentConfig;
};
