import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Versão otimizada para Cursor - sem verificações problemáticas
console.log('🚀 Starting CS360 Hub - Cursor Optimized Mode');

// Função de inicialização robusta
const initializeApp = () => {
  try {
    const rootElement = document.getElementById("root");
    
    if (!rootElement) {
      console.error('❌ Root element not found');
      return;
    }

    console.log('✅ Root element found, rendering app...');

    // Renderizar diretamente sem verificações complexas
    const root = createRoot(rootElement);
    root.render(<App />);
    
    console.log('✅ App rendered successfully');
    
    // Log de sucesso
    console.log('🎉 CS360 Hub loaded successfully in Cursor environment');
    
  } catch (error) {
    console.error('❌ Failed to initialize app:', error);
    
    // Fallback com HTML simples
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-align: center;
          padding: 20px;
        ">
          <div>
            <h1 style="font-size: 48px; margin-bottom: 20px;">CS360° Hub</h1>
            <p style="font-size: 20px; margin-bottom: 30px;">React Error - Using Fallback</p>
            <button onclick="window.location.reload()" style="
              background: white;
              color: #667eea;
              border: none;
              padding: 15px 30px;
              border-radius: 8px;
              font-size: 16px;
              font-weight: bold;
              cursor: pointer;
            ">
              Reload App
            </button>
          </div>
        </div>
      `;
    }
  }
};

// Inicializar quando DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Tratamento de erros globais (simplificado)
window.addEventListener('error', (event) => {
  console.error('❌ Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('❌ Unhandled promise rejection:', event.reason);
});
