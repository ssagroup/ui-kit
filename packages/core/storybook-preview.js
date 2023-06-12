import { ThemeProvider } from '@emotion/react';
import theme from './src/themes/main';

import './style.css';

export const parameters = {
  controls: { expanded: true, hideNoControlsWarning: true },
};

export const decorators = [
  (Story) => <ThemeProvider theme={theme}>{Story()}</ThemeProvider>,
];
