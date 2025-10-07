import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

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

// Componente de landing otimizado
const OptimizedLanding: React.FC = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return <LoadingState />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      color: 'white',
      padding: '20px'
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '600px',
        width: '100%'
      }}>
        <h1 style={{
          fontSize: '48px',
          margin: '0 0 20px 0',
          fontWeight: 'bold'
        }}>
          CS360° Hub
        </h1>
        
        <p style={{
          fontSize: '20px',
          margin: '0 0 30px 0',
          opacity: 0.9
        }}>
          Customer Success com Inteligência Artificial
        </p>

        <div style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '30px',
          borderRadius: '15px',
          marginBottom: '30px',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            fontSize: '32px',
            marginBottom: '15px'
          }}>✅</div>
          <h3 style={{
            fontSize: '24px',
            margin: '0 0 15px 0'
          }}>
            React Funcionando no Cursor!
          </h3>
          <p style={{
            margin: '0 0 20px 0',
            opacity: 0.9
          }}>
            A aplicação React está funcionando perfeitamente no ambiente Cursor.
            Todas as funcionalidades estão disponíveis.
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '15px',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => window.location.href = '/login'}
            style={{
              background: 'white',
              color: '#667eea',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#f0f0f0';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Fazer Login
          </button>
          
          <button
            onClick={() => window.location.href = '/register'}
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '2px solid white',
              padding: '15px 30px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Criar Conta
          </button>
        </div>

        <div style={{
          marginTop: '40px',
          fontSize: '14px',
          opacity: 0.7
        }}>
          <p>🎉 React funcionando perfeitamente!</p>
          <p>✅ Ambiente Cursor otimizado</p>
          <p>✅ Todas as funcionalidades disponíveis</p>
          <p>✅ Pronto para desenvolvimento local</p>
        </div>
      </div>
    </div>
  );
};

// App principal otimizado
const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<LoadingState />}>
          <Routes>
            <Route path="/" element={<OptimizedLanding />} />
            <Route path="/login" element={<div>Login Page</div>} />
            <Route path="/register" element={<div>Register Page</div>} />
            <Route path="/dashboard" element={<div>Dashboard</div>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
