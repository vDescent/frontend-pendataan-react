import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // Penting agar path tetap root
  plugins: [tailwindcss(), react()],
  build: {
    outDir: 'dist' // Vercel default mencari folder ini
  }
})
