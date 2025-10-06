import React, { useState, useEffect } from 'react';

// Componente de diagnóstico para identificar problemas
export const DiagnosticLanding: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<any>(null);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const runDiagnostics = async () => {
      const results: any = {
        timestamp: new Date().toISOString(),
        errors: [],
        warnings: [],
        checks: {}
      };

      try {
        // 1. Verificar DOM
        results.checks.dom = {
          rootElement: !!document.getElementById('root'),
          body: !!document.body,
          head: !!document.head
        };

        // 2. Verificar JavaScript
        results.checks.javascript = {
          react: typeof React !== 'undefined',
          useState: typeof useState !== 'undefined',
          useEffect: typeof useEffect !== 'undefined',
          window: typeof window !== 'undefined',
          document: typeof document !== 'undefined'
        };

        // 3. Verificar imports
        try {
          const { Environment } = await import('@/utils/environment');
          results.checks.environment = {
            available: true,
            isProduction: Environment.isProduction(),
            isDevelopment: Environment.isDevelopment()
          };
        } catch (error) {
          results.errors.push(`Environment import failed: ${error}`);
        }

        // 4. Verificar CSS
        const stylesheets = Array.from(document.styleSheets);
        results.checks.css = {
          stylesheetsCount: stylesheets.length,
          hasIndexCss: stylesheets.some(sheet => 
            sheet.href && sheet.href.includes('index.css')
          )
        };

        // 5. Verificar network
        try {
          const response = await fetch('/placeholder.svg', { method: 'HEAD' });
          results.checks.network = {
            serverReachable: response.ok,
            status: response.status
          };
        } catch (error) {
          results.errors.push(`Network check failed: ${error}`);
        }

        // 6. Verificar console errors
        const originalError = console.error;
        const originalWarn = console.warn;
        const capturedErrors: string[] = [];
        const capturedWarnings: string[] = [];

        console.error = (...args) => {
          capturedErrors.push(args.join(' '));
          originalError.apply(console, args);
        };

        console.warn = (...args) => {
          capturedWarnings.push(args.join(' '));
          originalWarn.apply(console, args);
        };

        // Aguardar um pouco para capturar erros
        setTimeout(() => {
          results.checks.console = {
            errors: capturedErrors,
            warnings: capturedWarnings
          };
          
          // Restaurar console original
          console.error = originalError;
          console.warn = originalWarn;
          
          setDiagnostics(results);
          setErrors(capturedErrors);
        }, 1000);

      } catch (error) {
        results.errors.push(`Diagnostic failed: ${error}`);
        setDiagnostics(results);
      }
    };

    runDiagnostics();
  }, []);

  if (!diagnostics) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8fafc',
        fontFamily: 'monospace'
      }}>
        <div>🔍 Executando diagnósticos...</div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      padding: '20px',
      fontFamily: 'monospace',
      fontSize: '14px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: '#1f2937', marginBottom: '20px' }}>
          🔍 Diagnostic Report - {diagnostics.timestamp}
        </h1>

        {/* Errors */}
        {errors.length > 0 && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '6px',
            padding: '15px',
            marginBottom: '20px'
          }}>
            <h3 style={{ color: '#dc2626', margin: '0 0 10px 0' }}>❌ Errors Found:</h3>
            {errors.map((error, i) => (
              <div key={i} style={{ color: '#dc2626', marginBottom: '5px' }}>
                {error}
              </div>
            ))}
          </div>
        )}

        {/* DOM Check */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#1f2937' }}>🌐 DOM Check:</h3>
          <div style={{ background: '#f9fafb', padding: '10px', borderRadius: '4px' }}>
            <div>Root Element: {diagnostics.checks.dom?.rootElement ? '✅' : '❌'}</div>
            <div>Body: {diagnostics.checks.dom?.body ? '✅' : '❌'}</div>
            <div>Head: {diagnostics.checks.dom?.head ? '✅' : '❌'}</div>
          </div>
        </div>

        {/* JavaScript Check */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#1f2937' }}>⚡ JavaScript Check:</h3>
          <div style={{ background: '#f9fafb', padding: '10px', borderRadius: '4px' }}>
            <div>React: {diagnostics.checks.javascript?.react ? '✅' : '❌'}</div>
            <div>useState: {diagnostics.checks.javascript?.useState ? '✅' : '❌'}</div>
            <div>useEffect: {diagnostics.checks.javascript?.useEffect ? '✅' : '❌'}</div>
            <div>Window: {diagnostics.checks.javascript?.window ? '✅' : '❌'}</div>
            <div>Document: {diagnostics.checks.javascript?.document ? '✅' : '❌'}</div>
          </div>
        </div>

        {/* Environment Check */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#1f2937' }}>🔧 Environment Check:</h3>
          <div style={{ background: '#f9fafb', padding: '10px', borderRadius: '4px' }}>
            <div>Environment Available: {diagnostics.checks.environment?.available ? '✅' : '❌'}</div>
            <div>Production Mode: {diagnostics.checks.environment?.isProduction ? '✅' : '❌'}</div>
            <div>Development Mode: {diagnostics.checks.environment?.isDevelopment ? '✅' : '❌'}</div>
          </div>
        </div>

        {/* CSS Check */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#1f2937' }}>🎨 CSS Check:</h3>
          <div style={{ background: '#f9fafb', padding: '10px', borderRadius: '4px' }}>
            <div>Stylesheets Count: {diagnostics.checks.css?.stylesheetsCount || 0}</div>
            <div>Index CSS: {diagnostics.checks.css?.hasIndexCss ? '✅' : '❌'}</div>
          </div>
        </div>

        {/* Network Check */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#1f2937' }}>🌐 Network Check:</h3>
          <div style={{ background: '#f9fafb', padding: '10px', borderRadius: '4px' }}>
            <div>Server Reachable: {diagnostics.checks.network?.serverReachable ? '✅' : '❌'}</div>
            <div>Status: {diagnostics.checks.network?.status || 'Unknown'}</div>
          </div>
        </div>

        {/* Console Errors */}
        {diagnostics.checks.console?.errors?.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: '#dc2626' }}>🚨 Console Errors:</h3>
            <div style={{ background: '#fef2f2', padding: '10px', borderRadius: '4px' }}>
              {diagnostics.checks.console.errors.map((error: string, i: number) => (
                <div key={i} style={{ color: '#dc2626', marginBottom: '5px' }}>
                  {error}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Console Warnings */}
        {diagnostics.checks.console?.warnings?.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: '#d97706' }}>⚠️ Console Warnings:</h3>
            <div style={{ background: '#fffbeb', padding: '10px', borderRadius: '4px' }}>
              {diagnostics.checks.console.warnings.map((warning: string, i: number) => (
                <div key={i} style={{ color: '#d97706', marginBottom: '5px' }}>
                  {warning}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginTop: '20px'
        }}>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            🔄 Reload Page
          </button>
          
          <button
            onClick={() => {
              console.clear();
              console.log('🔍 Manual Diagnostic Started');
              console.log('DOM Root:', document.getElementById('root'));
              console.log('React:', typeof React);
              console.log('Window:', typeof window);
              console.log('Document:', typeof document);
            }}
            style={{
              background: '#10b981',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            🔍 Manual Check
          </button>
        </div>
      </div>
    </div>
  );
};
