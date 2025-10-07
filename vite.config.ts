import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Configuração MÍNIMA do Vite - sem otimizações complexas
export default defineConfig({
  // Base path fixo - sem variáveis de ambiente
  base: '/',
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Configuração mínima
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    
    rollupOptions: {
      output: {
        // Nomes simples
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: 'assets/[name].js'
      }
    }
  },
  
  server: {
    host: "::",
    port: 8080,
    // Configuração para SPA - redirecionar todas as rotas para index.html
    historyApiFallback: true
  },
  
  // Configuração para SPA no build
  preview: {
    port: 4173,
    host: true
  }
});
