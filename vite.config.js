import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/it/api': {
        target: 'https://api.omedosoft.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
