/// <reference types="vitest" />

import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import react from '@vitejs/plugin-react';
import path from 'path'

export default defineConfig({
  plugins: [reactRefresh(),react()],
   server: {
    port: 3000,
  },
  resolve: {
    alias: {
      'components': path.resolve(__dirname, 'src/components'),
      'styles': path.resolve(__dirname, 'src/styles'),
      'utils': path.resolve(__dirname, 'src/utils'),
      'screens': path.resolve(__dirname, 'src/screens'),
      'layouts': path.resolve(__dirname, 'src/layouts')
    }
  },
  test: {
    globals: true,
    environment: "happy-dom",
    exclude: ["node_modules"],
    include: ["**/*.spec.{ts,tsx}"],
    coverage: {
      provider: "c8",
    },
    clearMocks: true,
    setupFiles: ["./src/test/mocks"],
  }
})



