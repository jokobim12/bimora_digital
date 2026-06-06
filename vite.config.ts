import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Trigger reload for tailwind config update
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
