import React from 'react';
import '@storybook/react-vite';
import { ThemeProvider } from '@emotion/react';
import { mainTheme } from '@ssa-ui-kit/core';
import './style.css';

const preview = {
  parameters: {
    controls: { expanded: true, hideNoControlsWarning: true },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={mainTheme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs']
};

export default preview;
