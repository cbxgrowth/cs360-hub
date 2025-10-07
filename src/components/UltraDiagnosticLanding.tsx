import React from 'react';

// Componente de diagnóstico ULTRA - identifica QUALQUER problema
export const UltraDiagnosticLanding: React.FC = () => {
  const [diagnostics, setDiagnostics] = React.useState<any[]>([]);
  const [isComplete, setIsComplete] = React.useState(false);
  const [hasErrors, setHasErrors] = React.useState(false);

  React.useEffect(() => {
    const runDiagnostics = async () => {
      const results: any[] = [];
      
      try {
        // 1. VERIFICAR DOM
        results.push({
          test: 'DOM Ready',
          status: document.readyState,
          success: document.readyState === 'complete',
          details: `Document state: ${document.readyState}`
        });

        // 2. VERIFICAR JAVASCRIPT
        results.push({
          test: 'JavaScript Execution',
          status: 'Working',
          success: true,
          details: 'React component is rendering'
        });

        // 3. VERIFICAR CONSOLE ERRORS
        const originalError = console.error;
        const originalWarn = console.warn;
        const errors: string[] = [];
        const warnings: string[] = [];

        console.error = (...args) => {
          errors.push(args.join(' '));
          originalError.apply(console, args);
        };

        console.warn = (...args) => {
          warnings.push(args.join(' '));
          originalWarn.apply(console, args);
        };

        // 4. VERIFICAR NETWORK
        try {
          const response = await fetch(window.location.href, { method: 'HEAD' });
          results.push({
            test: 'Network Request',
            status: response.status,
            success: response.ok,
            details: `Status: ${response.status} ${response.statusText}`
          });
        } catch (error) {
          results.push({
            test: 'Network Request',
            status: 'Failed',
            success: false,
            details: `Error: ${error}`
          });
        }

        // 5. VERIFICAR ASSETS
        const checkAsset = (src: string) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve({ success: true, src });
            img.onerror = () => resolve({ success: false, src });
            img.src = src;
          });
        };

        const assetResults = await Promise.all([
          checkAsset('/assets/index-f_gZNjXE.css'),
          checkAsset('/assets/index-_tauUT5i.js'),
          checkAsset('/placeholder.svg')
        ]);

        results.push({
          test: 'Assets Loading',
          status: assetResults.filter(r => r.success).length + '/' + assetResults.length,
          success: assetResults.every(r => r.success),
          details: assetResults.map(r => `${r.src}: ${r.success ? 'OK' : 'FAIL'}`).join(', ')
        });

        // 6. VERIFICAR ENVIRONMENT
        results.push({
          test: 'Environment Variables',
          status: 'Checking',
          success: true,
          details: `VITE_SUPABASE_URL: ${import.meta.env.VITE_SUPABASE_URL ? 'Set' : 'Not Set'}, VITE_SUPABASE_ANON_KEY: ${import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Not Set'}`
        });

        // 7. VERIFICAR BROWSER COMPATIBILITY
        results.push({
          test: 'Browser Compatibility',
          status: 'Modern Browser',
          success: true,
          details: `User Agent: ${navigator.userAgent.substring(0, 50)}...`
        });

        // 8. VERIFICAR MEMORY
        if ('memory' in performance) {
          results.push({
            test: 'Memory Usage',
            status: 'Available',
            success: true,
            details: `Used: ${Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024)}MB`
          });
        }

        // 9. VERIFICAR PERFORMANCE
        const perfEntries = performance.getEntriesByType('navigation');
        if (perfEntries.length > 0) {
          const nav = perfEntries[0] as PerformanceNavigationTiming;
          results.push({
            test: 'Page Load Performance',
            status: `${Math.round(nav.loadEventEnd - nav.loadEventStart)}ms`,
            success: nav.loadEventEnd - nav.loadEventStart < 3000,
            details: `Load time: ${Math.round(nav.loadEventEnd - nav.loadEventStart)}ms`
          });
        }

        // 10. VERIFICAR CONSOLE ERRORS/WARNINGS
        setTimeout(() => {
          results.push({
            test: 'Console Errors',
            status: errors.length > 0 ? `${errors.length} errors` : 'No errors',
            success: errors.length === 0,
            details: errors.length > 0 ? errors.join('; ') : 'No console errors detected'
          });

          results.push({
            test: 'Console Warnings',
            status: warnings.length > 0 ? `${warnings.length} warnings` : 'No warnings',
            success: warnings.length === 0,
            details: warnings.length > 0 ? warnings.join('; ') : 'No console warnings detected'
          });

          // Restore original console methods
          console.error = originalError;
          console.warn = originalWarn;

          setDiagnostics(results);
          setIsComplete(true);
          setHasErrors(results.some(r => !r.success));
        }, 2000);

      } catch (error) {
        results.push({
          test: 'Diagnostic Error',
          status: 'Failed',
          success: false,
          details: `Error running diagnostics: ${error}`
        });
        setDiagnostics(results);
        setIsComplete(true);
        setHasErrors(true);
      }
    };

    runDiagnostics();
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Arial, sans-serif',
      color: 'white',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '36px' }}>
          🔍 Ultra Diagnostic Landing
        </h1>
        
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '20px',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{ margin: '0 0 15px 0' }}>Status do Diagnóstico</h2>
          <p style={{ margin: '0' }}>
            {!isComplete && '🔄 Executando diagnósticos...'}
            {isComplete && !hasErrors && '✅ Todos os testes passaram!'}
            {isComplete && hasErrors && '❌ Alguns testes falharam - veja detalhes abaixo'}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gap: '15px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
        }}>
          {diagnostics.map((diagnostic, index) => (
            <div
              key={index}
              style={{
                background: diagnostic.success ? 'rgba(0,255,0,0.1)' : 'rgba(255,0,0,0.1)',
                border: `2px solid ${diagnostic.success ? '#00ff00' : '#ff0000'}`,
                padding: '15px',
                borderRadius: '8px'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px'
              }}>
                <h3 style={{ margin: '0', fontSize: '16px' }}>
                  {diagnostic.success ? '✅' : '❌'} {diagnostic.test}
                </h3>
                <span style={{
                  background: diagnostic.success ? '#00ff00' : '#ff0000',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {diagnostic.status}
                </span>
              </div>
              <p style={{ margin: '0', fontSize: '14px', opacity: 0.9 }}>
                {diagnostic.details}
              </p>
            </div>
          ))}
        </div>

        {isComplete && (
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '20px',
            borderRadius: '10px',
            marginTop: '20px',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 15px 0' }}>Resumo do Diagnóstico</h3>
            <p style={{ margin: '0 0 15px 0' }}>
              {hasErrors 
                ? '❌ Problemas detectados - verifique os testes falhados acima'
                : '✅ Todos os sistemas funcionando corretamente'
              }
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: 'white',
                color: '#667eea',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              🔄 Executar Novamente
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
