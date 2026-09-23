import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// base must match the GitHub Pages repo name for project-site deployment
export default defineConfig({
  base: '/community-welfare-hub/',
  plugins: [react(), tailwindcss()],
})
