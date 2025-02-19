/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setupTests.ts'],
    include: [
      // 'test/*.{test,spec}.?(c|m)[jt]s?(x)',
      'test/integration/*.{test,spec}.?(c|m)[jt]s?(x)',
      'test/unit/**/*/*.{test,spec}.?(c|m)[jt]s?(x)',
    ],
  },
})
