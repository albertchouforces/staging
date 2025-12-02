import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Cloudflare Pages-specific Vite configuration
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
  },
  build: {
    chunkSizeWarningLimit: 5000,
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Cloudflare Pages compatibility
  base: "/",
});
