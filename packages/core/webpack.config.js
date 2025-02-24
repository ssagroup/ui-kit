const path = require('path');
const createConfig = require('../../webpack.packages.base');

module.exports = () => {
  const currentConfig = createConfig({
    libraryName: 'SSACore',
    outputPath: path.resolve(__dirname, 'dist'),
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@themes': path.resolve(__dirname, './src/themes'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@global-types': path.resolve(__dirname, './src/types'),
    },
  });

  return currentConfig;
};
