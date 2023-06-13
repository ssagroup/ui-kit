import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  framework: '@storybook/react-webpack5',
  stories: ['./**/*.mdx'],
  refs: {
    '@ssa-ui-kit/core': {
      title: 'Core',
      url: 'http://localhost:6006',
    },
  },
};

export default config;
