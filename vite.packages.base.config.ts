import { resolve } from "path"
import { defineConfig } from 'vite'
import dts from "vite-plugin-dts"
import react from '@vitejs/plugin-react'

const isProduction = process.env.NODE_ENV == 'production';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "./src/main.tsx"),
      name: "SSACore",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        dir: resolve(__dirname, 'dist'),
        entryFileNames: 'index.js',
        format: 'es',
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          // tailwindcss: "tailwindcss",
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
  },
});
