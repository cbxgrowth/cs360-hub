// Componente SEM React - apenas HTML/CSS
export const NoReactLanding = () => {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CS360° Hub - No React</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                min-height: 100vh;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                font-family: Arial, sans-serif;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }
            
            .container {
                max-width: 600px;
                width: 100%;
                text-align: center;
            }
            
            h1 {
                font-size: 48px;
                margin-bottom: 20px;
                font-weight: bold;
            }
            
            .subtitle {
                font-size: 20px;
                margin-bottom: 30px;
                opacity: 0.9;
            }
            
            .status-box {
                background: rgba(255,255,255,0.1);
                padding: 30px;
                border-radius: 15px;
                margin-bottom: 30px;
                backdrop-filter: blur(10px);
            }
            
            .status-icon {
                font-size: 48px;
                margin-bottom: 15px;
            }
            
            .status-title {
                font-size: 24px;
                margin-bottom: 15px;
            }
            
            .status-message {
                margin-bottom: 20px;
                opacity: 0.9;
            }
            
            .diagnostic-list {
                text-align: left;
                margin-bottom: 30px;
            }
            
            .diagnostic-item {
                padding: 10px 0;
                border-bottom: 1px solid rgba(255,255,255,0.1);
            }
            
            .diagnostic-item:last-child {
                border-bottom: none;
            }
            
            .diagnostic-title {
                font-weight: bold;
                margin-bottom: 5px;
            }
            
            .diagnostic-status {
                font-size: 14px;
                opacity: 0.8;
            }
            
            .buttons {
                display: flex;
                flex-wrap: wrap;
                gap: 15px;
                justify-content: center;
            }
            
            .btn {
                background: white;
                color: #667eea;
                border: none;
                padding: 15px 30px;
                border-radius: 8px;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.2s;
                text-decoration: none;
                display: inline-block;
            }
            
            .btn:hover {
                background: #f0f0f0;
                transform: translateY(-2px);
            }
            
            .footer {
                margin-top: 40px;
                font-size: 14px;
                opacity: 0.7;
            }
            
            .success { color: #00ff00; }
            .error { color: #ff0000; }
            .warning { color: #ffaa00; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>CS360° Hub</h1>
            <p class="subtitle">No React - HTML Puro</p>
            
            <div class="status-box">
                <div class="status-icon">✅</div>
                <div class="status-title">Funcionando Sem React!</div>
                <div class="status-message">
                    Esta página não usa React, não usa JavaScript, não usa build process.
                    Se você está vendo isso, o problema é específico do React/Vite.
                </div>
            </div>
            
            <div class="diagnostic-list">
                <div class="diagnostic-item">
                    <div class="diagnostic-title success">✅ HTML Puro</div>
                    <div class="diagnostic-status">Sem React, sem JavaScript</div>
                </div>
                
                <div class="diagnostic-item">
                    <div class="diagnostic-title success">✅ CSS Inline</div>
                    <div class="diagnostic-status">Estilos embutidos</div>
                </div>
                
                <div class="diagnostic-item">
                    <div class="diagnostic-title success">✅ Sem Build</div>
                    <div class="diagnostic-status">Não precisa de Vite</div>
                </div>
                
                <div class="diagnostic-item">
                    <div class="diagnostic-title success">✅ Sem Dependências</div>
                    <div class="diagnostic-status">Nenhuma biblioteca externa</div>
                </div>
            </div>
            
            <div class="buttons">
                <a href="/ultra-minimal.html" class="btn">🔧 Ultra Minimal</a>
                <a href="/debug.html" class="btn">🔍 Debug Estático</a>
                <a href="/index-pure.html" class="btn">📄 HTML Puro</a>
            </div>
            
            <div class="footer">
                <p><strong>🎯 DIAGNÓSTICO:</strong></p>
                <p>✅ Se esta página funciona = Infraestrutura OK</p>
                <p>❌ Se esta página falha = Problema de servidor</p>
                <p>🔍 Se esta funciona mas React não = Problema de React/Vite</p>
            </div>
        </div>
    </body>
    </html>
  `;
};
