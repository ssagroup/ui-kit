import React, { ReactElement } from 'react';
import { ThemeProvider, Theme } from '@emotion/react';
import '@testing-library/dom';
import { render, RenderOptions } from '@testing-library/react';
import { UseFormReturn } from 'react-hook-form';

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
    register: ({ name }) => ({
      onChange: jest.fn(),
      onBlur: jest.fn(),
      name: name,
    }),
  } as unknown as UseFormReturn;
}

export const initRender = (theme: Theme) => {
  return customRender.bind(null, theme);
};

export * from '@testing-library/react';

export { customRender as render, mockUseForm };
