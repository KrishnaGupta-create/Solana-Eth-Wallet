import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite' 
import react from '@vitejs/plugin-react' 
export default defineConfig({ plugins: [react()], server: { proxy: { '/api': 'http://localhost:3001' } } })

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Any fetch('/api/...') in React gets forwarded to the backend
      "/api": "http://localhost:3001",
    },
  },
})
