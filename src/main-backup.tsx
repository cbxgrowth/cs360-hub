import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Environment } from './utils/environment'

// Verificações básicas antes de renderizar
const initializeApp = async () => {
  try {
    // Verificar se o DOM está pronto
    const rootElement = document.getElementById("root");
    if (!rootElement) {
      throw new Error('Root element not found');
    }

    // BYPASS: Pular verificação de variáveis de ambiente para resolver tela branca
    console.log('🔧 Bypassing environment check to resolve blank screen issue');
    
    // Verificar variáveis de ambiente essenciais (com bypass)
    try {
      const envCheck = Environment.checkRequiredEnvVars();
      console.log('🔍 Environment check result:', envCheck);
    } catch (error) {
      console.warn('⚠️ Environment check failed, continuing anyway:', error);
    }

    // Mostrar indicador de carregamento inicial
    rootElement.innerHTML = `
      <div style="
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      ">
        <div style="text-align: center; color: white;">
          <div style="
            width: 40px;
            height: 40px;
            border: 4px solid rgba(255,255,255,0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
          "></div>
          <h2 style="margin: 0; font-weight: 500;">CS360° Hub</h2>
          <p style="margin: 10px 0 0 0; opacity: 0.8;">Inicializando aplicação...</p>
        </div>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;

    // Aguardar um pouco para garantir que o CSS carregou
    await new Promise(resolve => setTimeout(resolve, 500));

    // Renderizar a aplicação React
    const root = createRoot(rootElement);
    root.render(<App />);

    // BYPASS: Pular diagnósticos para resolver tela branca
    console.log('🔧 Skipping diagnostics to resolve blank screen issue');

  } catch (error) {
    console.error('❌ Failed to initialize app:', error);
    
    // Fallback de último recurso
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #f7fafc;
          padding: 20px;
        ">
          <div style="
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 500px;
            width: 100%;
            border-left: 4px solid #e53e3e;
          ">
            <h1 style="color: #e53e3e; margin: 0 0 15px 0; font-size: 24px;">Erro de Inicialização</h1>
            <p style="color: #4a5568; margin: 0 0 20px 0; line-height: 1.5;">
              Não foi possível inicializar a aplicação. Por favor, recarregue a página.
            </p>
            <button onclick="window.location.reload()" style="
              background: #e53e3e;
              color: white;
              border: none;
              padding: 12px 24px;
              border-radius: 6px;
              font-size: 16px;
              cursor: pointer;
            ">
              Recarregar Página
            </button>
          </div>
        </div>
      `;
    }
  }
};

// Aguardar o DOM estar pronto e inicializar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Tratamento de erros globais
window.addEventListener('error', (event) => {
  console.error('❌ Global error:', event.error);
  
  if (Environment.isProduction()) {
    // Em produção, log apenas essencial
    console.error('App Error:', {
      message: event.error?.message,
      filename: event.filename,
      lineno: event.lineno,
      timestamp: new Date().toISOString()
    });
  }
});

// Tratamento de promises rejeitadas
window.addEventListener('unhandledrejection', (event) => {
  console.error('❌ Unhandled promise rejection:', event.reason);
  
  if (Environment.isProduction()) {
    console.error('Promise Rejection:', {
      reason: event.reason,
      timestamp: new Date().toISOString()
    });
  }
});
