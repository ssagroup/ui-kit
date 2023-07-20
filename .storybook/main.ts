import type { StorybookConfig } from '@storybook/react-webpack5';
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
  framework: '@storybook/react-webpack5',
  stories: ['./intro.mdx'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {},
    },
    '@storybook/addon-mdx-gfm',
  ],
  refs,
  docs: {
    autodocs: false,
  },
};
export default config;
