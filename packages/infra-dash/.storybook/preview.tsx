import type { Preview } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import { mainTheme } from '@ssa-ui-kit/core';

import './style.css';

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
