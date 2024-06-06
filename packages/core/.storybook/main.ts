import { resolve } from 'path';
import { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ["../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))"],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
    'storybook-addon-pseudo-states',
    {
      name: '@storybook/addon-docs',
      options: {
        csfPluginOptions: null,
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [],
          },
        },
      },
    },
  ],
  core: {
    builder: '@storybook/builder-vite'
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
    },
  },
  viteFinal: async (config) => {
    const { mergeConfig } = await import('vite');
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@components': resolve(__dirname, '../src/components'),
          '@themes': resolve(__dirname, '../src/themes'),
          '@styles': resolve(__dirname, '../src/styles'),
          '@global-types': resolve(__dirname, '../src/types'),
        }
      },
      build: {
        rollupOptions: {
          external: [
            "react",
            "react-dom",
            "@emotion/css",
            "@emotion/react",
            "@emotion/styled",
          ],
        }
      }
    })
  },
};

export default config;
