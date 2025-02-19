import type { Preview } from '@storybook/react';

import { ThemeProvider } from '@emotion/react';
import theme from '../src/themes/main';

import './style.css';

const preview: Preview = {
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
  tags: ['autodocs'],
};

export default preview;
