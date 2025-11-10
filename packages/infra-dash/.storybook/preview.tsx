import './style.css';

import { ThemeProvider } from '@emotion/react';
import type { Preview } from '@storybook/react-webpack5';

import { mainTheme } from '@ssa-ui-kit/core';

const preview: Preview = {
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
  tags: ['autodocs'],
};

export default preview;
