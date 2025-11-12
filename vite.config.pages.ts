import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite configuration for Cloudflare Pages deployment
// This builds a static SPA that can be deployed to Cloudflare Pages
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
  },
  build: {
    chunkSizeWarningLimit: 5000,
    outDir: "dist",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
});
