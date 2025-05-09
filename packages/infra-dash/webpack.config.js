const path = require('path');
const createConfig = require('../../webpack.packages.base');

module.exports = () => {
  const currentConfig = createConfig({
    libraryName: 'SSAInfraDash',
    outputPath: path.resolve(__dirname, 'dist'),
  });

  return currentConfig;
};
