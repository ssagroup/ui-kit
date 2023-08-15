/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const createConfig = require('../../webpack.packages.base');

module.exports = () => {
  const currentConfig = createConfig({
    libraryName: 'SSACore',
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@themes': path.resolve(__dirname, './src/themes'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
    },
    externals: {
      react: 'react',
      'react-dom': 'react-dom',
      '@emotion/core': '@emotion/core',
      '@emotion/css': '@emotion/css',
      '@emotion/react': '@emotion/react',
      '@emotion/styled': '@emotion/styled',
    },
  });

  return currentConfig;
};
