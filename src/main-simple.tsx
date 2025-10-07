import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Versão ULTRA-SIMPLES - sem verificações complexas
console.log('🚀 Starting CS360 Hub - Simple Mode');

// Aguardar DOM estar pronto
const initializeApp = () => {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    console.error('❌ Root element not found');
    return;
  }

  console.log('✅ Root element found, rendering app...');

  // Renderizar diretamente
  const root = createRoot(rootElement);
  root.render(<App />);
  
  console.log('✅ App rendered successfully');
};

// Inicializar quando DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
