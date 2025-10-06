// Componente ESTÁTICO - sem React, sem JavaScript, apenas HTML
export const StaticLanding = () => {
  return (
    <div dangerouslySetInnerHTML={{
      __html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>CS360° Hub</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .container {
              text-align: center;
              color: white;
              max-width: 600px;
              padding: 20px;
            }
            h1 {
              font-size: 48px;
              margin: 0 0 20px 0;
              font-weight: bold;
            }
            p {
              font-size: 20px;
              margin: 0 0 30px 0;
              opacity: 0.9;
            }
            .success {
              background: rgba(255,255,255,0.1);
              padding: 20px;
              border-radius: 10px;
              margin-bottom: 20px;
            }
            .success-icon {
              font-size: 24px;
              margin-bottom: 10px;
            }
            button {
              background: white;
              color: #667eea;
              border: none;
              padding: 12px 24px;
              border-radius: 6px;
              font-size: 16px;
              font-weight: bold;
              cursor: pointer;
              transition: background 0.2s;
            }
            button:hover {
              background: #f0f0f0;
            }
            .debug {
              position: fixed;
              top: 10px;
              left: 10px;
              background: rgba(0,0,0,0.8);
              color: white;
              padding: 10px;
              border-radius: 5px;
              font-size: 12px;
              font-family: monospace;
            }
          </style>
        </head>
        <body>
          <div class="debug">
            <div>🔍 DEBUG INFO</div>
            <div>Time: <span id="time"></span></div>
            <div>JS: <span id="js-status">Loading...</span></div>
            <div>DOM: <span id="dom-status">Loading...</span></div>
            <div>Network: <span id="network-status">Loading...</span></div>
          </div>
          
          <div class="container">
            <h1>CS360° Hub</h1>
            <p>Customer Success com Inteligência Artificial</p>
            
            <div class="success">
              <div class="success-icon">✅</div>
              <div>Aplicação carregou com sucesso!</div>
            </div>
            
            <button onclick="window.location.href='/login'">
              Continuar
            </button>
          </div>
          
          <script>
            // Debug script
            document.getElementById('time').textContent = new Date().toLocaleTimeString();
            document.getElementById('js-status').textContent = '✅ Working';
            document.getElementById('dom-status').textContent = document.getElementById('root') ? '✅ Found' : '❌ Missing';
            document.getElementById('network-status').textContent = navigator.onLine ? '✅ Online' : '❌ Offline';
            
            // Log para console
            console.log('🔍 StaticLanding Debug:');
            console.log('DOM Root:', document.getElementById('root'));
            console.log('Scripts:', document.scripts.length);
            console.log('Stylesheets:', document.styleSheets.length);
            console.log('Network:', navigator.onLine);
            console.log('User Agent:', navigator.userAgent);
          </script>
        </body>
        </html>
      `
    }} />
  );
};
