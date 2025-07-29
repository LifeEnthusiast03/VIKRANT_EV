import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  // This is crucial for SPA routing to work in production
  server: {
    historyApiFallback: true,
  },
  preview: {
    historyApiFallback: true,
  }
})
