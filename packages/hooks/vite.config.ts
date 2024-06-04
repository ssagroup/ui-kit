import { resolve } from "path"
import { defineConfig } from 'vite'
import dts from "vite-plugin-dts"
import react from '@vitejs/plugin-react-swc'

const isProduction = process.env.NODE_ENV == 'production';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "./src/index.ts"),
      name: "SSAHooks",
      formats: ['es'],
    },
    rollupOptions: {
      external: ["react"],
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
    react(),
    dts(),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@hooks': resolve(__dirname, './src/hooks'),
    }
  },
});
