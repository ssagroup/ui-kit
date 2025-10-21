import '@testing-library/dom';

import React, { ReactElement } from 'react';

import { Theme, ThemeProvider } from '@emotion/react';
import { render, RenderOptions } from '@testing-library/react';

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

function mockUseForm() {
  return {
    ...jest.requireActual('react-hook-form'),
    register: ({ name }: { name: string }) => ({
      onChange: jest.fn(),
      onBlur: jest.fn(),
      name: name,
      ref: jest.fn(),
    }),
  };
}

export const initRender = (theme: Theme) => {
  return customRender.bind(null, theme);
};

export * from '@testing-library/react';

export { mockUseForm, customRender as render };
