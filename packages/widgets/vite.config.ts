import react from '@vitejs/plugin-react'
import { resolve } from "path"
import { defineConfig } from 'vite'
import dts from "vite-plugin-dts"
import babel from 'vite-plugin-babel'

const isProduction = process.env.NODE_ENV == 'production';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env,
  },
  build: {
    lib: {
      entry: resolve(__dirname, "./src/index.ts"),
      name: "SSAWidgets",
      formats: ['umd'],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react-router-dom",
        "@emotion/core",
        "@emotion/css",
        "@emotion/react",
        "@emotion/styled",
        "@nivo/core",
        "@nivo/line",
        "@nivo/pie",
        "@nivo/scales"
      ],
      output: {
        dir: resolve(__dirname, 'dist'),
        entryFileNames: 'index.js',
        format: 'umd',
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@emotion/core": "@emotion/core",
          "@emotion/css": "@emotion/css",
          "@emotion/react": "@emotion/react",
          "@emotion/styled": "@emotion/styled",
        },
      },
    },
    sourcemap: isProduction ? true : false,
    emptyOutDir: true,
    minify: 'terser',
    terserOptions: {
      format: {
        comments: false,
      },
      sourceMap: isProduction ? true : false,
      compress: true,
      mangle: true,
    }
  },
  plugins: [
    babel(),
    react({
      jsxImportSource: '@emotion/react'
    }),
    dts({
      outDir: './dist',
      copyDtsFiles: true,
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@components': resolve(__dirname, './src/components'),
    }
  },
});
