import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
        },
      },
    },
    assetsInlineLimit: 4096,
    cssCodeSplit: true,   // CSS por chunk = menos CSS en el primer load
    minify: "esbuild",
    target: "es2015",
    chunkSizeWarningLimit: 800,
  },
  assetsInclude: ["**/*.webp"],
})
