import type { StorybookConfig } from "@storybook/react-vite";

const IS_PROD = process.env.STORYBOOK_ENV === 'production';
const refs = {
  '@ssa-ui-kit/core': {
    title: 'Core',
    url: IS_PROD ? 'https://ui-kit-core.web.app' : 'http://localhost:6006',
  },
  '@ssa-ui-kit/fitness': {
    title: 'Fitness Widgets',
    url: IS_PROD ? 'https://ui-kit-fitness.web.app/' : 'http://localhost:6007',
  },
};

const config: StorybookConfig = {
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  stories: ['./intro.mdx'],
  addons: [{
    name: '@storybook/addon-docs',
    options: {
      csfPluginOptions: null,
      mdxPluginOptions: {
        mdxCompileOptions: {
          remarkPlugins: [],
        },
      },
    },
  }, "@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", "@storybook/addon-themes"],
  refs,
  typescript: {
    reactDocgen: 'react-docgen-typescript'
  },
  docs: {
    autodocs: false,
  },
};
export default config;
