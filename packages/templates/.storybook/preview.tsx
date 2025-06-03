import type { Preview } from '@storybook/react-webpack5';
import { ThemeProvider } from '@emotion/react';
import { mainTheme } from '@ssa-ui-kit/core';

import './style.css';

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
