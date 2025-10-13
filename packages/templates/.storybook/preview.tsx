import './style.css';

import { ThemeProvider } from '@emotion/react';
import type { Preview } from '@storybook/react-webpack5';

import { mainTheme } from '@ssa-ui-kit/core';

const preview: Preview = {
  parameters: {
    controls: {
      disable: true,
    },
    actions: {
      disable: true,
    },
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={mainTheme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
