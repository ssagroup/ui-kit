const path = require('path');
const createConfig = require('../../webpack.packages.base');

module.exports = () => {
  const currentConfig = createConfig({
    libraryName: 'SSAInfraDash',
    outputPath: path.resolve(__dirname, 'dist'),
    alias: {
      '@shared': path.resolve(__dirname, './src/shared'),
      '@components': path.resolve(__dirname, './src/components'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@features': path.resolve(__dirname, './src/features'),
      'react-use/lib/usePrevious': path.resolve(
        __dirname,
        '../../node_modules/react-use/lib/usePrevious.js',
      ),
    },
  });

  return currentConfig;
};
