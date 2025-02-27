import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import deno from "@deno/vite-plugin"
import tailwindcss from '@tailwindcss/vite'

import "react"
import "react-dom"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), deno(), tailwindcss()],
  optimizeDeps: {
    include: ["react/jsx-runtime"]
  },
  base: '/re-evolve/',
})
