import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import viteImagemin from 'vite-plugin-imagemin';


export default defineConfig(({ mode }) => ({
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    splitVendorChunkPlugin(),

    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 80,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
      webp: {
        quality: 80,
        lossless: false,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ['react', 'react-dom'],
  },
  build: {
    outDir: "dist",
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    sourcemap: mode === 'development',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': [
            'react', 
            'react-dom',
            'react/jsx-runtime',
          ],
          'vendor-router': [
            'react-router-dom',
          ],
          'vendor-i18n': [
            'react-i18next',
            'i18next', 
            'i18next-browser-languagedetector'
          ],
          'vendor-axios': [
            'axios'
          ],
          'vendor-ui': [
            'react-hook-form',
            'react-intersection-observer',
            'react-day-picker',
            '@tanstack/react-query',
            'framer-motion',
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-aspect-ratio',
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-collapsible',
            '@radix-ui/react-context-menu',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-hover-card',
            '@radix-ui/react-label',
            '@radix-ui/react-menubar',
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-progress',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-select',
            '@radix-ui/react-separator',
            '@radix-ui/react-slider',
            '@radix-ui/react-slot',
            '@radix-ui/react-switch',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-toggle',
            '@radix-ui/react-toggle-group',
            '@radix-ui/react-tooltip'
          ]
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        hoistTransitiveImports: false,
        preserveModules: false,
      }
    },
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
        pure_funcs: mode === 'production' ? ['console.log', 'console.debug'] : []
      }
    }
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom',
      'react/jsx-runtime', 
      'react-router-dom', 
      'i18next', 
      'react-i18next', 
      'framer-motion',
      '@tanstack/react-query',
      'axios',
    ],
    force: true,
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    }
  }
}));