import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Versão otimizada para Cursor - sem verificações problemáticas
console.log('🚀 Starting CS360 Hub - Full Application Mode');

// Função de inicialização robusta
const initializeApp = () => {
  try {
    const rootElement = document.getElementById("root");
    
    if (!rootElement) {
      console.error('❌ Root element not found');
      return;
    }

    console.log('✅ Root element found, rendering full application...');

    // Renderizar aplicação completa
    const root = createRoot(rootElement);
    root.render(<App />);
    
    console.log('✅ Full application rendered successfully');
    console.log('🎉 CS360 Hub with all features loaded successfully');
    
  } catch (error) {
    console.error('❌ Failed to initialize full application:', error);
    
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
            <p style="font-size: 20px; margin-bottom: 30px;">Application Error - Using Fallback</p>
            <p style="font-size: 16px; margin-bottom: 30px; opacity: 0.8;">
              The full application failed to load. Please try refreshing the page.
            </p>
            <button onclick="window.location.reload()" style="
              background: white;
              color: #667eea;
              border: none;
              padding: 15px 30px;
              border-radius: 8px;
              font-size: 16px;
              font-weight: bold;
              cursor: pointer;
              margin: 0 10px;
            ">
              Reload App
            </button>
            <button onclick="window.location.href='/index-bypass.html'" style="
              background: rgba(255,255,255,0.2);
              color: white;
              border: 2px solid white;
              padding: 15px 30px;
              border-radius: 8px;
              font-size: 16px;
              font-weight: bold;
              cursor: pointer;
              margin: 0 10px;
            ">
              Use Simple Version
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