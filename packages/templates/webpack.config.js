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
  });

  return currentConfig;
};
