import '@/styles/globalStyles.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { mainTheme, Theme as T } from '@ssa-ui-kit/core';

import { router } from './routes.tsx';
import { ThemeProvider } from '@emotion/react';

declare module '@emotion/react' {
  export interface Theme extends T {}
}

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={mainTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
