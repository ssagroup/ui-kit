import React from 'react';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { Global, ThemeProvider, css } from '@emotion/react';
import lightTheme from './theme';
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
      light: lightTheme,
  },
  defaultTheme: 'light',
  Provider: ThemeProvider,
  GlobalStyles,
})];
