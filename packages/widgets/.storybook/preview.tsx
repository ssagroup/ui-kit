import React from 'react';
import '@storybook/react-webpack5';

import { ThemeProvider } from '@emotion/react';
import { FullscreenModeProvider, mainTheme } from '@ssa-ui-kit/core';

import './style.css';

const preview = {
  parameters: {
    controls: { expanded: true, hideNoControlsWarning: true },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={mainTheme}>
        <FullscreenModeProvider>
          <Story />
        </FullscreenModeProvider>
      </ThemeProvider>
    ),
  ],
};

export default preview;
