import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/", // <-- Change this to an absolute root path
  plugins: [
    react()
  ]
})