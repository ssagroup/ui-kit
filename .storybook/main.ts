import type { StorybookConfig } from '@storybook/react-webpack5';
const IS_PROD = process.env.STORYBOOK_ENV === 'production';

const refs: StorybookConfig['refs'] = {
  '@ssa-ui-kit/core': {
    title: 'Core',
    url: IS_PROD ? 'https://ui-kit-core.web.app' : 'http://localhost:6006',
  },
  '@ssa-ui-kit/fitness': {
    title: 'Industry-specific widgets',
    url: IS_PROD ? 'https://ui-kit-fitness.web.app/' : 'http://localhost:6007',
  },
  '@ssa-ui-kit/templates': {
    title: 'Templates',
    url: IS_PROD ? 'https://ui-kit-template.web.app/' : 'http://localhost:6008',
  },
  '@ssa-ui-kit/infra-dash': {
    title: 'InfraDash',
    url: IS_PROD
      ? 'https://ui-kit-infra-dash.web.app'
      : 'http://localhost:6009',
  },
};
const config: StorybookConfig = {
  framework: '@storybook/react-webpack5',
  stories: ['./intro.mdx'],
  addons: ['@storybook/addon-docs', '@storybook/addon-webpack5-compiler-babel'],
  refs,
  docs: {},
  managerHead: (head) => `
    ${head}
    <meta name="description" content="SSA UI kit is an open-source React-based library that accelerates frontend development of dashboard and administrative panels" />
  `,
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};
export default config;
