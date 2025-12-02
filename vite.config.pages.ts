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
  // Define Firebase environment variables for build time
  // These are injected into import.meta.env during the build process
  define: {
    'import.meta.env.VITE_FIREBASE_API_KEY': JSON.stringify("AIzaSyBTCjmVvGhVpUer02EwW08toKkmpww6SlU"),
    'import.meta.env.VITE_FIREBASE_AUTH_DOMAIN': JSON.stringify("rankmaster-1a740.firebaseapp.com"),
    'import.meta.env.VITE_FIREBASE_PROJECT_ID': JSON.stringify("rankmaster-1a740"),
    'import.meta.env.VITE_FIREBASE_STORAGE_BUCKET': JSON.stringify("rankmaster-1a740.firebasestorage.app"),
    'import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID': JSON.stringify("678820485112"),
    'import.meta.env.VITE_FIREBASE_APP_ID': JSON.stringify("1:678820485112:web:982ded15636867af74280d"),
  },
});
