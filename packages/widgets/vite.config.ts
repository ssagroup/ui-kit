import { resolve } from "path"
import { defineConfig } from 'vite'
import dts from "vite-plugin-dts"
import react from '@vitejs/plugin-react'

const isProduction = process.env.NODE_ENV == 'production';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "./src/index.ts"),
      name: "SSAWidgets",
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
          "@emotion/core": "EmotionCore",
          "@emotion/css": "EmotionCSS",
          "@emotion/react": "EmotionReact",
          "@emotion/styled": "EmotionStyled",
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
    react({
      jsxImportSource: '@emotion/react'
    }),
    dts({
      copyDtsFiles: true,
      entryRoot: '',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@components': resolve(__dirname, './src/components'),
    }
  },
});
