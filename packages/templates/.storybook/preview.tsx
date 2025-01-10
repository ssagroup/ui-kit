import React from 'react';
import '@storybook/react-webpack5';

import { ThemeProvider } from '@emotion/react';
import { mainTheme } from '@ssa-ui-kit/core';

import './style.css';

const preview = {
  parameters: {
    controls: false,
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
