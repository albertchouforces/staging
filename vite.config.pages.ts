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
    outDir: "dist-pages",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // Expose Firebase environment variables to the client
    "import.meta.env.VITE_FIREBASE_API_KEY": JSON.stringify(process.env.VITE_FIREBASE_API_KEY || ""),
    "import.meta.env.VITE_FIREBASE_AUTH_DOMAIN": JSON.stringify(process.env.VITE_FIREBASE_AUTH_DOMAIN || ""),
    "import.meta.env.VITE_FIREBASE_PROJECT_ID": JSON.stringify(process.env.VITE_FIREBASE_PROJECT_ID || ""),
    "import.meta.env.VITE_FIREBASE_STORAGE_BUCKET": JSON.stringify(process.env.VITE_FIREBASE_STORAGE_BUCKET || ""),
    "import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || ""),
    "import.meta.env.VITE_FIREBASE_APP_ID": JSON.stringify(process.env.VITE_FIREBASE_APP_ID || ""),
  },
});
