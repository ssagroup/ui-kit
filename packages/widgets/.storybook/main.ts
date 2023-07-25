import type { StorybookConfig } from '@storybook/react-webpack5';
import initWebpackConfig from '../webpack.config';
appWebpackConfig = initWebpackConfig();

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-mdx-gfm', // cspell:disable-line
  ],
  staticDirs: ['../public'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript', // cspell:disable-line
    // cspell:disable-next-line
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
    },
  },
  webpackFinal: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      ...appWebpackConfig.resolve.alias,
    };

    return config;
  },
  docs: {
    autodocs: true, // cspell:disable-line
  },
};

export default config;
