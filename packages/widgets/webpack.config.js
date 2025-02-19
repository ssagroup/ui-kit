const path = require('path');
const createConfig = require('../../webpack.packages.base');

module.exports = () => {
  const currentConfig = createConfig({
    libraryName: 'SSAWidgets',
    outputPath: path.resolve(__dirname, 'dist'),
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
    },
  });

  return currentConfig;
};
