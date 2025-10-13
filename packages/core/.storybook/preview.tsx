import './style.css';

import { ThemeProvider } from '@emotion/react';
import type { Preview } from '@storybook/react-webpack5';

import theme from '../src/themes/main';

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
