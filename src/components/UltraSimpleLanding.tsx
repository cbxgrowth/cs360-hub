import React from 'react';

// Página extremamente simples sem hooks ou dependências complexas
export const UltraSimpleLanding: React.FC = () => {
  const handleNavigation = (path: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = path;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '800px',
        width: '100%'
      }}>
        
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#1f2937',
            margin: '0 0 20px 0'
          }}>
            CS360° Hub
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#6b7280',
            margin: '0 0 30px 0'
          }}>
            Customer Success com Inteligência Artificial
          </p>
        </div>

        {/* Stats */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          padding: '40px',
          marginBottom: '40px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '30px',
            marginBottom: '40px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#2563eb',
                marginBottom: '8px'
              }}>
                +250%
              </div>
              <div style={{ color: '#6b7280' }}>Aumento em Retenção</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#16a34a',
                marginBottom: '8px'
              }}>
                -60%
              </div>
              <div style={{ color: '#6b7280' }}>Redução de Churn</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#7c3aed',
                marginBottom: '8px'
              }}>
                3x ROI
              </div>
              <div style={{ color: '#6b7280' }}>Retorno Garantido</div>
            </div>
          </div>
          
          {/* Buttons */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '15px',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <button 
              onClick={() => handleNavigation('/login')}
              style={{
                background: '#2563eb',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '600',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#1d4ed8'}
              onMouseOut={(e) => e.currentTarget.style.background = '#2563eb'}
            >
              Fazer Login
            </button>
            
            <button 
              onClick={() => handleNavigation('/register')}
              style={{
                background: '#f3f4f6',
                color: '#374151',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '600',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#e5e7eb'}
              onMouseOut={(e) => e.currentTarget.style.background = '#f3f4f6'}
            >
              Criar Conta
            </button>
            
            <button 
              onClick={() => handleNavigation('/executive-demo')}
              style={{
                background: '#16a34a',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '600',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#15803d'}
              onMouseOut={(e) => e.currentTarget.style.background = '#16a34a'}
            >
              Ver Demo Executivo
            </button>
          </div>
        </div>

        {/* Features */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '24px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🤖</div>
            <h3 style={{
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '8px',
              fontSize: '18px'
            }}>
              IA Preditiva
            </h3>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>
              Previna churn antes que aconteça com machine learning avançado
            </p>
          </div>
          
          <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '24px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📊</div>
            <h3 style={{
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '8px',
              fontSize: '18px'
            }}>
              Analytics Avançado
            </h3>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>
              Insights acionáveis em tempo real com dashboards inteligentes
            </p>
          </div>
          
          <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '24px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🎯</div>
            <h3 style={{
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '8px',
              fontSize: '18px'
            }}>
              Automação Inteligente
            </h3>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>
              Workflows que se adaptam e otimizam automaticamente
            </p>
          </div>
          
          <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '24px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔗</div>
            <h3 style={{
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '8px',
              fontSize: '18px'
            }}>
              Integrações
            </h3>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>
              Conecte com todas suas ferramentas favoritas
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '40px',
          textAlign: 'center'
        }}>
          <p style={{
            color: '#9ca3af',
            fontSize: '16px'
          }}>
            Transforme dados em resultados. Escale seu Customer Success com IA.
          </p>
        </div>
      </div>
    </div>
  );
};
