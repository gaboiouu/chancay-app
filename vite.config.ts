import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/embarcaciones': {
        target: 'http://localhost:8019',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});