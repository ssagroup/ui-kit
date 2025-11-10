import '@testing-library/dom';

import React, { ReactElement } from 'react';

import { ThemeProvider } from '@emotion/react';
import { render, RenderOptions } from '@testing-library/react';

import { Theme } from '@ssa-ui-kit/core';

const AllTheProviders = ({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: Theme;
}) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const customRender = (
  theme: Theme,
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) =>
  render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders theme={theme}>{children}</AllTheProviders>
    ),
    ...options,
  });

export const initRender = (theme: Theme) => {
  return customRender.bind(null, theme);
};

export * from '@testing-library/react';

export { customRender as render };
