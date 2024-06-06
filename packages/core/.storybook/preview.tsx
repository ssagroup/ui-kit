import React from 'react';
import '@storybook/react-vite';
import { Global, ThemeProvider, css } from '@emotion/react';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import theme from '../src/themes/main';
import './style.css';

const GlobalStyles = () => (
  <Global
    styles={css`
      body {
        font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      }
    `}
  />
);

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      light: theme,
  },
  defaultTheme: 'light',
  Provider: ThemeProvider,
  GlobalStyles,
})];

const preview = {
  parameters: {
    controls: { expanded: true, hideNoControlsWarning: true },
  },
  decorators,
  // decorators: [
  //   (Story) => (
  //     <ThemeProvider theme={theme}>
  //       <Story />
  //     </ThemeProvider>
  //   ),
  // ],
  tags: ['autodocs']
};

export default preview;
