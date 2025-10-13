import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ThemeProvider } from '@emotion/react';
import type { Meta } from '@storybook/react-webpack5';

import { mainTheme } from '@ssa-ui-kit/core';

import { AuthProvider } from '../hooks/useAuth';

import { FitnessDashboard } from '..';

export default {
  title: 'Templates/Fitness Dashboard',
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
