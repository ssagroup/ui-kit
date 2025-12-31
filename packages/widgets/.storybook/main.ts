import { resolve } from 'node:path';

import { Configuration } from 'webpack';
import type { StorybookConfig } from '@storybook/react-webpack5';
import initWebpackConfig from '../webpack.config';
import initBabelConfig from '../../../babel.config';
import webpack from 'webpack';

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
          // Workspace package aliases - point to source files
          '@ssa-ui-kit/core': resolve(__dirname, '../../core/src/index.ts'),
          '@ssa-ui-kit/hooks': resolve(__dirname, '../../hooks/src/index.ts'),
          '@ssa-ui-kit/utils': resolve(__dirname, '../../utils/src/index.ts'),
          // Path aliases for workspace packages - Core package
          '@components': resolve(__dirname, '../../core/src/components'),
          '@contexts': resolve(__dirname, '../../core/src/contexts'),
          '@themes': resolve(__dirname, '../../core/src/themes'),
          '@styles': resolve(__dirname, '../../core/src/styles'),
          '@global-types': resolve(__dirname, '../../core/src/types'),
          // Widgets-specific component aliases (widgets uses @components for its own components)
          '@components/AccountBalance': resolve(__dirname, '../src/components/AccountBalance'),
          '@components/AccountBalance/AccountBalanceContext': resolve(__dirname, '../src/components/AccountBalance/AccountBalanceContext.tsx'),
          '@components/TradingInfoCard': resolve(__dirname, '../src/components/TradingInfoCard'),
          // Hooks package internal aliases
          '@hooks/useWindowResize': resolve(__dirname, '../../hooks/src/hooks/useWindowResize.tsx'),
          // Ensure only one React instance is used to prevent "Cannot read properties of null (reading 'useContext')" errors
          react: resolve(__dirname, '../../../node_modules/react'),
          'react-dom': resolve(__dirname, '../../../node_modules/react-dom'),
          // workaround for a react-router bug that can lead to multiple react-router versions
          // being installed across the main package and dependencies that list react-router as a peer dependency
          // https://github.com/remix-run/react-router/issues/12785
          'react-router-dom': resolve(
            __dirname,
            '../../../node_modules/react-router-dom/dist/index.mjs',
          ),
        },
      },
      module: {
        ...config.module,
        rules: [
          ...(config.module?.rules || []),
          // Filter out problematic CSS rules from app config that conflict with Storybook
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(appWebpackConfig.module?.rules || []).filter((rule: any) => {
            // Exclude CSS rules that cause issues in Storybook
            if (rule.test && rule.test.toString().includes('css')) {
              return false;
            }
            return true;
          }),
        ],
      },
      plugins: [
        ...(config.plugins || []),
        // Handle TypeScript path mappings for workspace packages
        new webpack.NormalModuleReplacementPlugin(
          /^@hooks\/useWindowResize$/,
          function (resource) {
            resource.request = resolve(__dirname, '../../hooks/src/hooks/useWindowResize.tsx');
          },
        ),
        new webpack.NormalModuleReplacementPlugin(
          /^@components\/AccountBalance$/,
          function (resource) {
            resource.request = resolve(__dirname, '../src/components/AccountBalance/index.ts');
          },
        ),
        new webpack.NormalModuleReplacementPlugin(
          /^@components\/AccountBalance\/AccountBalanceContext$/,
          function (resource) {
            resource.request = resolve(__dirname, '../src/components/AccountBalance/AccountBalanceContext.tsx');
          },
        ),
        new webpack.NormalModuleReplacementPlugin(
          /^@components\/TradingInfoCard$/,
          function (resource) {
            resource.request = resolve(__dirname, '../src/components/TradingInfoCard/index.ts');
          },
        ),
      ],
    };

    return newConfig;
  },
  managerHead: (head) => `
    ${head}
    <meta name="description" content="SSA UI kit is an open-source React-based library that accelerates frontend development of dashboard and administrative panels" />
  `,
};

export default config;
