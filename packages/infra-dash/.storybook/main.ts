import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { Configuration } from 'webpack';
import type { StorybookConfig } from '@storybook/react-webpack5';
import initWebpackConfig from '../webpack.config';
import initBabelConfig from '../../../babel.config';
import webpack from 'webpack';

const appWebpackConfig: Configuration = initWebpackConfig();

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)', '../**/*.mdx'],
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  babel: (options: any) => ({
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
        // Fallback for Node.js core modules used by dependencies
        fallback: {
          ...config.resolve?.fallback,
          stream: false,
        },
        alias: {
          ...config.resolve?.alias,
          ...appWebpackConfig.resolve?.alias,
          // Workspace package aliases - point to source files
          '@ssa-ui-kit/core': resolve(__dirname, '../../core/src/index.ts'),
          '@ssa-ui-kit/hooks': resolve(__dirname, '../../hooks/src/index.ts'),
          '@ssa-ui-kit/utils': resolve(__dirname, '../../utils/src/index.ts'),
          '@ssa-ui-kit/widgets': resolve(
            __dirname,
            '../../widgets/src/index.ts',
          ),
          // Path aliases for workspace packages - Core package
          // @components points to core for core's internal imports (e.g., @components/Button)
          // @components/* imports from infra-dash are handled by NormalModuleReplacementPlugin below
          '@components': resolve(__dirname, '../../core/src/components'),
          '@contexts': resolve(__dirname, '../../core/src/contexts'),
          '@themes': resolve(__dirname, '../../core/src/themes'),
          '@styles': resolve(__dirname, '../../core/src/styles'),
          '@global-types': resolve(__dirname, '../../core/src/types'),
          '@shared': resolve(__dirname, '../src/shared'),
          // Hooks package internal aliases
          '@hooks/useWindowResize': resolve(
            __dirname,
            '../../hooks/src/hooks/useWindowResize.tsx',
          ),
          // Ensure only one React instance is used to prevent "Cannot read properties of null (reading 'useContext')" errors
          react: resolve(__dirname, '../../../node_modules/react'),
          'react-dom': resolve(__dirname, '../../../node_modules/react-dom'),
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
            resource.request = resolve(
              __dirname,
              '../../hooks/src/hooks/useWindowResize.tsx',
            );
          },
        ),
        // Handle @components/* imports - check infra-dash components first, then core
        new webpack.NormalModuleReplacementPlugin(
          /^@components\/(.+)$/,
          function (resource) {
            const match = resource.request.match(/^@components\/(.+)$/);
            if (!match) return;

            const componentName = match[1];

            // Try infra-dash components first
            const infraDashPath = resolve(
              __dirname,
              `../src/components/${componentName}`,
            );
            const corePath = resolve(
              __dirname,
              `../../core/src/components/${componentName}`,
            );

            // Try different file extensions
            const extensions = ['', '.tsx', '.ts', '/index.tsx', '/index.ts'];
            for (const ext of extensions) {
              const infraDashFile = infraDashPath + ext;
              if (existsSync(infraDashFile)) {
                resource.request = infraDashFile;
                return;
              }
            }

            // Fallback to core
            for (const ext of extensions) {
              const coreFile = corePath + ext;
              if (existsSync(coreFile)) {
                resource.request = coreFile;
                return;
              }
            }

            // If not found, default to infra-dash (will show error if doesn't exist)
            resource.request = infraDashPath;
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
