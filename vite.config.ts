import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from 'rollup-plugin-visualizer';
import { compression } from 'vite-plugin-compression2';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => ({
  // Base path configurável para deploy
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [
    react(),
    // Compressão Gzip
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
      deleteOriginFile: false
    }),
    // Compressão Brotli
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false
    }),
    // Bundle analyzer (apenas em desenvolvimento)
    mode === 'development' && visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Otimizações de build
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    sourcemap: mode === 'development',
    
    rollupOptions: {
      output: {
        // Chunking estratégico
        manualChunks: {
          // Core React
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          
          // UI Components (mais pesados)
          'ui-core': [
            '@radix-ui/react-dialog', 
            '@radix-ui/react-dropdown-menu', 
            '@radix-ui/react-select', 
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-popover'
          ],
          
          // Charts (muito pesado)
          charts: ['recharts'],
          
          // Forms
          forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
          
          // Backend
          supabase: ['@supabase/supabase-js'],
          query: ['@tanstack/react-query'],
          
          // Utilities
          utils: ['date-fns', 'clsx', 'tailwind-merge', 'lucide-react'],
          
          // Lazy loaded pages (páginas maiores em chunks separados)
          'admin-pages': [
            './src/pages/Admin.tsx',
            './src/pages/SuperAdmin.tsx'
          ],
          'analytics-pages': [
            './src/pages/Reports.tsx',
            './src/pages/NPS.tsx',
            './src/pages/LTVCAC.tsx'
          ]
        },
        
        // Otimizar nomes de arquivo para cache
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop().replace('.tsx', '').replace('.ts', '') : 'chunk';
          return `assets/${facadeModuleId}-[hash].js`;
        },
        assetFileNames: 'assets/[name]-[hash][extname]',
        entryFileNames: 'assets/[name]-[hash].js'
      },
      
      // Otimizações de dependências externas
      external: (id) => {
        // Não fazer bundle de dependências muito grandes em dev
        if (mode === 'development') {
          return false;
        }
        return false;
      }
    },
    
    // Configurações de chunk
    chunkSizeWarningLimit: 800,
    
    // Otimizações CSS
    cssCodeSplit: true,
    
    // Configurações de assets
    assetsInlineLimit: 4096
  },
  
  // Otimizações de servidor dev
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: mode === 'development'
    }
  },
  
  // Preview server (para testar build)
  preview: {
    port: 4173,
    host: true
  },
  
  // Otimizações de dependências
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query'
    ],
    exclude: [
      // Dependências que devem ser tratadas como ESM
    ]
  }
}));
