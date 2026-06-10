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
    // cssCodeSplit: false => un solo CSS bundle, evita pantalla blanca
    // en movil cuando los chunks CSS llegan fuera de orden
    cssCodeSplit: false,
    minify: "esbuild",
    // Subir limite de warning de chunks (el bundle es intencionalmente grande)
    chunkSizeWarningLimit: 800,
  },
  assetsInclude: ["**/*.webp"],
})
