const path = require('path');
const createConfig = require('../../webpack.packages.base');

module.exports = () => {
  const currentConfig = createConfig({
    libraryName: 'SSAUtils',
    outputPath: path.resolve(__dirname, 'dist'),
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  });

  return currentConfig;
};
