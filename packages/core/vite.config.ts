import react from '@vitejs/plugin-react-swc'
import { resolve } from "path"
import { defineConfig } from 'vite'
import dts from "vite-plugin-dts"

const isProduction = process.env.NODE_ENV == 'production';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "./src/index.ts"),
      name: "SSACore",
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "@emotion/core",
        "@emotion/css",
        "@emotion/react",
        "@emotion/styled",
      ],
      output: {
        dir: resolve(__dirname, 'dist'),
        entryFileNames: 'index.js',
        format: 'es',
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
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
    }
  },
  plugins: [
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
      '@themes': resolve(__dirname, './src/themes'),
      '@styles': resolve(__dirname, './src/styles'),
      '@global-types': resolve(__dirname, './src/types'),
    }
  },
});
