import { resolve } from 'node:path';

import { Configuration } from 'webpack';
import type { StorybookConfig } from '@storybook/react-webpack5';
import initWebpackConfig from '../webpack.config';
import initBabelConfig from '../../../babel.config';
const appWebpackConfig = initWebpackConfig();

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)', '../src/**/*.mdx'],
  addons: ['@storybook/addon-links', 'storybook-addon-pseudo-states'],
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
  babel: (options: Record<string, unknown>) => ({
    ...options,
    ...initBabelConfig,
  }),
  webpackFinal: (config) => {
    const newConfig: Configuration = {
      ...config,
      resolve: {
        ...config.resolve,
        // Prefer ESM over CommonJS to avoid PR #2773 issue with react-virtualized-auto-sizer
        // https://github.com/plouc/nivo/pull/2773
        mainFields: ['module', 'main'],
        // Ensure webpack uses the 'import' condition from package.json exports field
        conditionNames: ['import', 'require', 'node', 'default'],
        // Ensure .mjs files are resolved
        extensions: ['.mjs', ...(config.resolve?.extensions || [])],
        alias: {
          ...config.resolve?.alias,
          ...appWebpackConfig.resolve?.alias,
          // Ensure only one React instance is used to prevent "Cannot read properties of null (reading 'useContext')" errors
          react: resolve(__dirname, '../../../node_modules/react'),
          'react-dom': resolve(__dirname, '../../../node_modules/react-dom'),
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
  managerHead: (head) => `
    ${head}
    <meta name="description" content="SSA UI kit is an open-source React-based library that accelerates frontend development of dashboard and administrative panels" />
  `,
};

export default config;
