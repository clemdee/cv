import { fileURLToPath, URL } from 'node:url';
import fallbackPlugin from './vite-plugin-fallback';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/cv/",
  plugins: [
    vue(),
    fallbackPlugin(),
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
