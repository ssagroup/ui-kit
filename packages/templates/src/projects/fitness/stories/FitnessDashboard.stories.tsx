import { ThemeProvider } from '@emotion/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
        <BrowserRouter>
          <ThemeProvider theme={mainTheme}>
            <AuthProvider>
              <Routes>
                <Route path="/*" element={<Story {...args} />} />
              </Routes>
            </AuthProvider>
          </ThemeProvider>
        </BrowserRouter>
      );
    },
  ],
  argTypes: {},
} as Meta<typeof FitnessDashboard>;

export const Default = {};
