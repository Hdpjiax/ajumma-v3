import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  build: {
    // Split vendor JS from app JS → better cache reuse
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
        },
      },
    },
    // Inline tiny assets (<4KB) as base64 to save round-trips
    assetsInlineLimit: 4096,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Minify with esbuild (default, fastest)
    minify: "esbuild",
  },
  // Serve .webp files correctly in dev
  assetsInclude: ["**/*.webp"],
})
