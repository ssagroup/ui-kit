import { resolve } from 'node:path';

import {
  Configuration,
  DefinePlugin,
  NormalModuleReplacementPlugin,
  ProvidePlugin,
} from 'webpack';
import type { StorybookConfig } from '@storybook/react-webpack5';
import initWebpackConfig from '../webpack.config';
import initBabelConfig from '../../../babel.config';

const appWebpackConfig: Configuration = initWebpackConfig();

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)', '../src/**/*.mdx'],
  addons: [
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
        // Fallback for Node.js core modules used by Firebase/Firestore server-side code
        // These modules are not needed in the browser and should be ignored
        fallback: {
          ...config.resolve?.fallback,
          util: false,
          stream: false,
          tls: false,
          net: false,
          http: false,
          http2: false,
          zlib: false,
          dns: false,
          process: false,
          os: false,
          fs: false,
          path: false,
          url: false,
        },
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
          // Force @firebase/firestore to use browser build (not Node.js build with gRPC-js)
          // Find the actual pnpm path for @firebase/firestore
          '@firebase/firestore': resolve(
            __dirname,
            '../../../node_modules/.pnpm/@firebase+firestore@4.8.0_@firebase+app@0.13.2/node_modules/@firebase/firestore/dist/index.esm2017.js',
          ),
          // Replace firebase/firestore with direct import to browser build
          // This avoids the re-export chain that causes resolution issues
          'firebase/firestore': resolve(
            __dirname,
            '../../../node_modules/.pnpm/@firebase+firestore@4.8.0_@firebase+app@0.13.2/node_modules/@firebase/firestore/dist/index.esm2017.js',
          ),
        },
        // Prioritize root node_modules to ensure single instance of Emotion
        // This prevents multiple Emotion instances when importing from @ssa-ui-kit/widgets or @ssa-ui-kit/core
        modules: [
          resolve(__dirname, '../../../node_modules'),
          ...(config.resolve?.modules || ['node_modules']),
        ],
      },
      module: {
        ...config.module,
        rules: [
          ...(config.module?.rules || []),
          ...(appWebpackConfig.module?.rules || []),
        ],
      },
      plugins: [
        ...(config.plugins || []),
        // Define process.env for Firebase which expects Node.js environment variables
        new DefinePlugin({
          'process.env': JSON.stringify({
            NODE_ENV: process.env.NODE_ENV || 'development',
            STORYBOOK_FIREBASE_API_KEY:
              process.env.STORYBOOK_FIREBASE_API_KEY || '',
            STORYBOOK_FIREBASE_AUTH_DOMAIN:
              process.env.STORYBOOK_FIREBASE_AUTH_DOMAIN || '',
            STORYBOOK_FIREBASE_PROJECT_ID:
              process.env.STORYBOOK_FIREBASE_PROJECT_ID || '',
            STORYBOOK_FIREBASE_STORAGE_BUCKET:
              process.env.STORYBOOK_FIREBASE_STORAGE_BUCKET || '',
            STORYBOOK_FIREBASE_MESSAGING_SENDERID:
              process.env.STORYBOOK_FIREBASE_MESSAGING_SENDERID || '',
            STORYBOOK_FIREBASE_APP_ID:
              process.env.STORYBOOK_FIREBASE_APP_ID || '',
          }),
        }),
        // Provide a minimal process object for gRPC-js which accesses process directly
        // This creates a global process variable that gRPC-js can access
        new ProvidePlugin({
          process: 'process/browser',
        }),
        // Replace Node.js Firebase Firestore build with browser build
        // This prevents gRPC-js from being loaded (which is Node.js only)
        new NormalModuleReplacementPlugin(
          /@firebase\/firestore\/dist\/index\.node\.cjs\.js/,
          resolve(
            __dirname,
            '../../../node_modules/.pnpm/@firebase+firestore@4.8.0_@firebase+app@0.13.2/node_modules/@firebase/firestore/dist/index.esm2017.js',
          ),
        ),
      ],
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
