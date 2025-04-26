import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../labels/static', 
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
