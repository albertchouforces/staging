import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Static site configuration for Cloudflare Pages deployment
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
  },
  build: {
    chunkSizeWarningLimit: 5000,
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
