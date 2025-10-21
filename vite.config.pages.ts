import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Cloudflare Pages specific config - client-only build
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
  },
  build: {
    chunkSizeWarningLimit: 5000,
    outDir: "dist/client",
    rollupOptions: {
      input: "index.html",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
