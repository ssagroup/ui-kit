const appWebpackConfig = require('../webpack.base.js')();

const packages = ['core'];

module.exports = {
  stories: packages.map(
    (pkgName) => `../packages/${pkgName}/src/**/*.stories.@(js|jsx|ts|tsx|mdx)`,
  ),
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-mdx-gfm',
  ],
  // staticDirs: packages.map((pkgName) => `../packages/${pkgName}/public`),
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
    },
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      ...appWebpackConfig.resolve.alias,
    };

    // TODO: this is unsafe to rely just on the last item.
    config.plugins.push(
      appWebpackConfig.plugins[appWebpackConfig.plugins.length - 1],
    );
    return config;
  },
  docs: {
    autodocs: true,
  },
};
