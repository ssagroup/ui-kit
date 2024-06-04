import React, { ReactElement } from 'react';
import { ThemeProvider, Theme } from '@emotion/react';
import '@testing-library/dom';
import { render, RenderOptions } from '@testing-library/react';

const AllTheProviders = ({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: Pick<Theme, 'colors' | 'mediaQueries'>;
}) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const customRender = (
  theme: Pick<Theme, 'colors' | 'mediaQueries'>,
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

export const initRender = (theme: Pick<Theme, 'colors' | 'mediaQueries'>) => {
  return customRender.bind(null, theme);
};

export * from '@testing-library/react';

export { customRender as render, mockUseForm };
