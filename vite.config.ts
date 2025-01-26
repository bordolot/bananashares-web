/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: [
      // 'test/*.{test,spec}.?(c|m)[jt]s?(x)',
      'test/integration/*.{test,spec}.?(c|m)[jt]s?(x)',
      'test/unit/**/*/*.{test,spec}.?(c|m)[jt]s?(x)',
    ],
  },
})
