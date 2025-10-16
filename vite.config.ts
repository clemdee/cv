import { fileURLToPath, URL } from 'node:url';
import lsPlugin from './vite-plugin-ls';
import fallbackPlugin from './vite-plugin-fallback';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/cv/",
  plugins: [
    vue(),
    lsPlugin(),
    fallbackPlugin(),
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
