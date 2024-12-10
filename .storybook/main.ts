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
    '@storybook/addon-controls',
  ],
  refs,
  docs: {
    autodocs: false,
  },
  managerHead: (head) => `
    ${head}
    <meta name="description" content="SSA UI kit is an open-source React-based library that accelerates frontend development of dashboard and administrative panels" />
  `,
};
export default config;
