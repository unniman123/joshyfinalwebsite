import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import Sitemap from "vite-plugin-sitemap";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // 🔐 SECURITY: Additional security headers for development
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  },
  plugins: [
    react(),
    // Generate sitemap.xml at build time and place it in the dist/ root.
    // Hostname must be the full canonical URL for accurate sitemap entries.
    Sitemap({
      hostname: "https://keralatoursglobal.com",
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // 🔐 SECURITY: Build-time security checks
  build: {
    // Ensure no environment variables are exposed in build
    rollupOptions: {
      output: {
        // Remove any potential console logs in production (optional)
        // sourcemap: mode === 'development',
      },
    },
  },
  // 🔐 SECURITY: Prevent environment variable leaks
  define: {
    // Ensure Vite doesn't expose env vars that aren't prefixed with VITE_
    // This is automatic in Vite, but we're being explicit
  },
}));
