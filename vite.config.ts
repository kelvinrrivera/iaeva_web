import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar las dependencias principales
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // Separar Radix UI en su propio chunk
          radix: [
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-avatar',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-label',
            '@radix-ui/react-popover',
            '@radix-ui/react-slot'
          ],
          // Otras librerías grandes
          utils: ['axios', 'framer-motion', 'lucide-react']
        }
      }
    },
    assetsInlineLimit: 4096,
    sourcemap: false,
    chunkSizeWarningLimit: 1000
  }
}));