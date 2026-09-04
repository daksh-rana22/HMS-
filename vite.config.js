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
        target: 'http://103.153.58.135:8081',
        changeOrigin: true,
      },
    },
  },
})
