// Componente MÍNIMO - sem hooks, sem imports complexos, sem dependências
export const MinimalLanding = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      color: 'white',
      textAlign: 'center',
      padding: '20px'
    }}>
      <div>
        <h1 style={{ fontSize: '48px', margin: '0 0 20px 0' }}>
          CS360° Hub
        </h1>
        <p style={{ fontSize: '20px', margin: '0 0 30px 0', opacity: 0.9 }}>
          Customer Success com IA
        </p>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>✅</div>
          <div>Aplicação carregou com sucesso!</div>
        </div>
        <button
          onClick={() => window.location.href = '/login'}
          style={{
            background: 'white',
            color: '#667eea',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};
