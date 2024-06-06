import React from 'react';
import '@storybook/react-vite';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { Global, ThemeProvider, css } from '@emotion/react';
import { mainTheme } from '@ssa-ui-kit/core';
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
      light: mainTheme,
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
  //     <ThemeProvider theme={mainTheme}>
  //       <Story />
  //     </ThemeProvider>
  //   ),
  // ],
  tags: ['autodocs']
};

export default preview;
