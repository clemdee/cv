import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import fallbackPlugin from './vite-plugin-fallback';
import lsPlugin from './vite-plugin-ls';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/cv/',
  plugins: [
    vue(),
    lsPlugin(),
    fallbackPlugin(),
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
