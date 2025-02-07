import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr(),
    react({
      babel: {
        presets: ['jotai/babel/preset'],
      },
    }),
  ],
  define: {
    global: {},
  },
  // build: {
  //   chunkSizeWarningLimit: 1600,
  // },
});
