import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // https://github.com/react-hook-form/react-hook-form/issues/8281
      'react-hook-form': path.resolve(
        __dirname,
        './node_modules/react-hook-form/dist/index.cjs.js',
      ),
    },
  },
  esbuild: {
    legalComments: 'none',
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});
