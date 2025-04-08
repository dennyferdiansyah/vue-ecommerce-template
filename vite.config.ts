import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: {
    port: parseInt(process.env.PORT || '5173'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'reka-ui': path.resolve(__dirname, 'node_modules/reka-ui'),
    }
  }
})
