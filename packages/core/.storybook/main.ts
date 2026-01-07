import path from 'node:path';
import { Configuration } from 'webpack';
import type { StorybookConfig } from '@storybook/react-webpack5';
import initWebpackConfig from '../webpack.config';
import initBabelConfig from '../../../babel.config';
import webpack from 'webpack';

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
          '@ssa-ui-kit/utils': path.resolve(
            __dirname,
            '../../utils/src/index.ts',
          ),
          '@ssa-ui-kit/hooks': path.resolve(
            __dirname,
            '../../hooks/src/index.ts',
          ),
          // Hooks package internal aliases - for hooks package's own @hooks/* imports
          '@hooks/useWindowResize': path.resolve(
            __dirname,
            '../../hooks/src/hooks/useWindowResize.tsx',
          ),
          // Ensure only one React instance is used to prevent "Cannot read properties of null (reading 'useContext')" errors
          react: path.resolve(__dirname, '../../../node_modules/react'),
          'react-dom': path.resolve(
            __dirname,
            '../../../node_modules/react-dom',
          ),
          '@storybook-assets': path.resolve(__dirname, './assets'),
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
            resource.request = path.resolve(
              __dirname,
              '../../hooks/src/hooks/useWindowResize.tsx',
            );
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
