import { resolve } from 'node:path';

import { Configuration } from 'webpack';
import type { StorybookConfig } from '@storybook/react-webpack5';
import initWebpackConfig from '../webpack.config';
import initBabelConfig from '../../../babel.config';

const appWebpackConfig: Configuration = initWebpackConfig();

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)', '../src/**/*.mdx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-mdx-gfm', //cspell:disable-line
    'storybook-addon-pseudo-states',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  typescript: {
    check: true,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript', //cspell:disable-line
    //cspell:disable-next-line
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
          // workaround for a react-router bug that can lead to multiple react-router versions
          // being installed across the main package and dependencies that list react-router as a peer dependency
          // https://github.com/remix-run/react-router/issues/12785
          'react-router-dom': resolve(
            __dirname,
            '../node_modules/react-router-dom/dist/index.mjs',
          ),
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
  docs: {
    //👇 See the table below for the list of supported options
    defaultName: 'Documentation',
  },
  managerHead: (head) => `
    ${head}
    <meta name="description" content="SSA UI kit is an open-source React-based library that accelerates frontend development of dashboard and administrative panels" />
  `,
};

export default config;
