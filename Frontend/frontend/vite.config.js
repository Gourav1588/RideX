import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false // Disable the error overlay
    },
    watch: {
      usePolling: true // Use polling for file changes
    }
  },
  optimizeDeps: {
    exclude: ['@socket.io/component-emitter'] // Exclude problematic dependencies
  }
})
