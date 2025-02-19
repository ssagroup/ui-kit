const path = require('path');
const createConfig = require('../../webpack.packages.base');

module.exports = () => {
  const currentConfig = createConfig({
    libraryName: 'SSAHooks',
    outputPath: path.resolve(__dirname, 'dist'),
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
