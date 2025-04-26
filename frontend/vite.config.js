import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: '../labels/static/index.html',  // después del build, dónde estará
          dest: '../../templates'              // destino: BASE_DIR/templates/
        }
      ]
    })
  ],
  build: {
    outDir: '../labels/static',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  base: '/static/', // recuerda esto para que busque bien el js/css
})