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
import webpack from 'webpack';

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
    // Debug: Log webpack resolve configuration
    console.log('[Webpack Debug] Resolve config:', {
      mainFields: config.resolve?.mainFields,
      conditionNames: config.resolve?.conditionNames,
      fullySpecified: config.resolve?.fullySpecified,
      modules: config.resolve?.modules,
    });

    const newConfig: Configuration = {
      ...config,
      resolve: {
        ...config.resolve,
        // Prefer ESM over CommonJS to avoid PR #2773 issue with react-virtualized-auto-sizer
        // https://github.com/plouc/nivo/pull/2773
        // CRITICAL: Override Storybook's default ['browser', 'module', 'main'] to prioritize 'module'
        // The 'browser' field often points to UMD/CJS builds which cause ESM interop issues
        // This MUST come before other resolve options to ensure it's not overridden
        mainFields: (() => {
          const fields = ['module', 'main'];
          console.log(
            '[Webpack Debug] Setting mainFields to:',
            fields,
            '(was:',
            config.resolve?.mainFields,
            ')',
          );
          return fields;
        })(),
        // Ensure webpack uses the 'import' condition from package.json exports field
        conditionNames: ['import', 'require', 'node', 'default'],
        // Ensure .mjs files are resolved
        extensions: ['.mjs', ...(config.resolve?.extensions || [])],
        // Allow webpack to resolve ESM imports without explicit file extensions
        // This fixes "InternMap is not a constructor" error with d3-array/internmap
        fullySpecified: false,
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
          // CRITICAL: Alias internmap to its ESM source to match d3-array's ESM imports
          // Using ESM source for both ensures proper module interop
          // This must come before appWebpackConfig to prevent overrides
          internmap: resolve(
            __dirname,
            '../../../node_modules/internmap/src/index.js',
          ),
          // Now merge appWebpackConfig aliases
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
          '@components': resolve(__dirname, '../../core/src/components'),
          '@contexts': resolve(__dirname, '../../core/src/contexts'),
          '@themes': resolve(__dirname, '../../core/src/themes'),
          '@styles': resolve(__dirname, '../../core/src/styles'),
          '@global-types': resolve(__dirname, '../../core/src/types'),
          // Widgets-specific component aliases (widgets uses @components for its own components)
          '@components/AccountBalance': resolve(
            __dirname,
            '../../widgets/src/components/AccountBalance',
          ),
          '@components/AccountBalance/AccountBalanceContext': resolve(
            __dirname,
            '../../widgets/src/components/AccountBalance/AccountBalanceContext.tsx',
          ),
          '@components/TradingInfoCard': resolve(
            __dirname,
            '../../widgets/src/components/TradingInfoCard',
          ),
          // Hooks package internal aliases
          '@hooks/useWindowResize': resolve(
            __dirname,
            '../../hooks/src/hooks/useWindowResize.tsx',
          ),
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
          // Force @firebase/firestore to use browser build (not Node.js build with gRPC-js)
          '@firebase/firestore': resolve(
            __dirname,
            '../../../node_modules/@firebase/firestore/dist/index.esm2017.js',
          ),
          // Replace firebase/firestore with direct import to browser build
          // This avoids the re-export chain that causes resolution issues
          'firebase/firestore': resolve(
            __dirname,
            '../../../node_modules/@firebase/firestore/dist/index.esm2017.js',
          ),
        },
        // Prioritize root node_modules to ensure single instance of Emotion
        // This prevents multiple Emotion instances when importing from @ssa-ui-kit/widgets or @ssa-ui-kit/core
        // NOTE: This can cause issues with d3-array/internmap resolution, so we keep local node_modules first
        // for d3 packages, but prioritize root for other packages via alias
        modules: [
          // Keep local node_modules first to avoid d3-array/internmap version conflicts
          'node_modules',
          resolve(__dirname, '../../../node_modules'),
          ...(config.resolve?.modules || []).filter(
            (m) => m !== 'node_modules',
          ),
        ],
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
        // NOTE: We're NOT replacing d3-array - let webpack use the ESM source via mainFields: ['module', 'main']
        // The dist file is UMD which causes module type mismatch. The ESM source is correct.
        // We just need to ensure internmap is properly resolved when d3-array imports it.
        // CRITICAL: Force internmap to use ESM source via NormalModuleReplacementPlugin
        // This ensures InternMap constructor is properly available to d3-array
        // Match any request containing 'internmap' - be very aggressive to catch all variations
        // Using ESM source matches d3-array's ESM source for consistent module types
        new webpack.NormalModuleReplacementPlugin(
          /internmap/,
          function (resource) {
            // Replace any internmap import with the ESM source file
            // This catches: 'internmap', 'internmap/index.js', 'internmap/src/index.js', etc.
            const newPath = resolve(
              __dirname,
              '../../../node_modules/internmap/src/index.js',
            );
            console.log(
              '[Webpack Debug] internmap replacement:',
              resource.request,
              '->',
              newPath,
              '| context:',
              resource.context,
            );
            resource.request = newPath;
          },
        ),
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
        new webpack.NormalModuleReplacementPlugin(
          /^@components\/AccountBalance$/,
          function (resource) {
            resource.request = resolve(
              __dirname,
              '../../widgets/src/components/AccountBalance/index.ts',
            );
          },
        ),
        new webpack.NormalModuleReplacementPlugin(
          /^@components\/AccountBalance\/AccountBalanceContext$/,
          function (resource) {
            resource.request = resolve(
              __dirname,
              '../../widgets/src/components/AccountBalance/AccountBalanceContext.tsx',
            );
          },
        ),
        new webpack.NormalModuleReplacementPlugin(
          /^@components\/TradingInfoCard$/,
          function (resource) {
            resource.request = resolve(
              __dirname,
              '../../widgets/src/components/TradingInfoCard/index.ts',
            );
          },
        ),
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
            '../../../node_modules/@firebase/firestore/dist/index.esm2017.js',
          ),
        ),
        // Handle firebase/firestore imports - replace with browser build
        new NormalModuleReplacementPlugin(
          /^firebase\/firestore$/,
          function (resource) {
            resource.request = resolve(
              __dirname,
              '../../../node_modules/@firebase/firestore/dist/index.esm2017.js',
            );
          },
        ),
      ],
    };

    // Debug: Log final resolve config
    const aliases = newConfig.resolve?.alias as Record<string, string> | undefined;
    console.log('[Webpack Debug] Final resolve config:', {
      mainFields: newConfig.resolve?.mainFields,
      conditionNames: newConfig.resolve?.conditionNames,
      fullySpecified: newConfig.resolve?.fullySpecified,
      hasD3ArrayAlias: !!aliases?.['d3-array'],
      hasInternmapAlias: !!aliases?.internmap,
    });

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
