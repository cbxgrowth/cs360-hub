import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importar contextos essenciais
import { ThemeProvider } from './contexts/ThemeContext';
import { LoadingProvider } from './contexts/LoadingContext';

// Componentes básicos primeiro (sem dependências complexas)
const SimpleLanding = React.lazy(() => import('./components/SimpleLanding'));
const SimpleLogin = React.lazy(() => import('./components/SimpleLogin'));
const SimpleRegister = React.lazy(() => import('./components/SimpleRegister'));

// Páginas principais (com fallbacks)
const Landing = React.lazy(() => import('./pages/Landing'));
const Features = React.lazy(() => import('./pages/Features'));
const Pricing = React.lazy(() => import('./pages/Pricing'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));

// Dashboard básico (sem dependências complexas)
const DashboardBasic = React.lazy(() => import('./pages/App'));

// Componentes de loading otimizados
const LoadingState = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    fontFamily: 'Arial, sans-serif'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid rgba(255,255,255,0.3)',
        borderTop: '4px solid white',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 20px'
      }}></div>
      <h2 style={{ margin: '0', fontWeight: '500' }}>CS360° Hub</h2>
      <p style={{ margin: '10px 0 0 0', opacity: 0.8 }}>Carregando aplicação...</p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  </div>
);

// Error Boundary para capturar erros
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          fontFamily: 'Arial, sans-serif'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '500px', padding: '20px' }}>
            <h2 style={{ margin: '0 0 20px 0' }}>Ops! Algo deu errado</h2>
            <p style={{ margin: '0 0 20px 0', opacity: 0.8 }}>
              Estamos trabalhando para resolver este problema.
            </p>
            <button 
              onClick={() => window.location.reload()}
              style={{
                background: 'white',
                color: '#667eea',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// App com restauração gradual
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LoadingProvider>
          <Router>
            <div className="App">
              <Suspense fallback={<LoadingState />}>
                <Routes>
                  {/* Rotas públicas básicas */}
                  <Route path="/" element={<Landing />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  
                  {/* Dashboard básico */}
                  <Route path="/dashboard" element={<DashboardBasic />} />
                  
                  {/* Fallback para rotas não encontradas */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </div>
          </Router>
        </LoadingProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
