import React from 'react';
import '@storybook/react-webpack5';

import { ThemeProvider } from '@emotion/react';
import theme from '../src/themes/main';

import './style.css';

const preview = {
  parameters: {
    controls: { expanded: true, hideNoControlsWarning: true },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
