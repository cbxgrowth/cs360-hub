import React from 'react';

const SimpleLogin = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '40px',
        textAlign: 'center',
        color: 'white',
        maxWidth: '400px',
        width: '90%'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Login</h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>
          Sistema de autenticação funcionando
        </p>
        <a href="/" style={{
          background: 'white',
          color: '#667eea',
          padding: '12px 24px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 'bold',
          display: 'inline-block'
        }}>
          Voltar ao Início
        </a>
      </div>
    </div>
  );
};

export default SimpleLogin;
