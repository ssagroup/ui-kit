import type { Preview } from '@storybook/react-webpack5';

import { ThemeProvider } from '@emotion/react';
import theme from '../src/themes/main';

import './style.css';

const preview: Preview = {
  parameters: {
    controls: { expanded: true, hideNoControlsWarning: true },
    options: {
      // Design System (palettes, typography, icons, theming) reads before the
      // components that consume it. Groups not listed here keep their
      // file-load order at the `*` slot.
      storySort: {
        order: ['Design System', 'Components', '*'],
      },
    },
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
