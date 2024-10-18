import { ThemeProvider } from '@emotion/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import type { Meta } from '@storybook/react';
import { mainTheme } from '@ssa-ui-kit/core';
import { AuthProvider } from '../hooks/useAuth';
import { FitnessDashboard } from '..';

export default {
  title: 'Templates/FitnessDashboard',
  component: FitnessDashboard,
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
    },
  },
  decorators: [
    (Story, { args }) => {
      return (
        <ThemeProvider theme={mainTheme}>
          <AuthProvider>
            <RouterProvider
              router={createBrowserRouter([
                {
                  path: '/*',
                  element: <Story {...args} />,
                },
              ])}
            />
          </AuthProvider>
        </ThemeProvider>
      );
    },
  ],
  argTypes: {},
} as Meta<typeof FitnessDashboard>;

export const Default = {};
