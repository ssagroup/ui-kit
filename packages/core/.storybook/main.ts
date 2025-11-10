import { Configuration } from 'webpack';

import type { StorybookConfig } from '@storybook/react-webpack5';

import initBabelConfig from '../../../babel.config';
import initWebpackConfig from '../webpack.config';

const appWebpackConfig: Configuration = initWebpackConfig();

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)', '../src/**/*.mdx'],
  addons: [
    'storybook/internal/controls',
    '@storybook/addon-links',
    '@storybook/addon-docs',
    'storybook-addon-pseudo-states',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  typescript: {
    check: true,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
    },
  },
  babel: (options) => ({
    ...options,
    ...initBabelConfig,
  }),
  webpackFinal: (config) => {
    const newConfig: Configuration = {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          ...appWebpackConfig.resolve?.alias,
        },
      },
      module: {
        ...config.module,
        rules: [
          ...(config.module?.rules || []),
          ...(appWebpackConfig.module?.rules || []),
        ],
      },
    };

    return newConfig;
  },
  managerHead: (head) => `
    ${head}
    <meta name="description" content="SSA UI kit is an open-source React-based library that accelerates frontend development of dashboard and administrative panels" />
  `,
};

export default config;
