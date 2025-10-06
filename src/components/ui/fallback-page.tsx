import React from 'react';
import { AlertTriangle, RefreshCw, Home, Wifi, WifiOff } from 'lucide-react';

interface FallbackPageProps {
  title?: string;
  message?: string;
  type?: 'error' | 'offline' | 'loading' | 'not-found';
  onRetry?: () => void;
  showHomeButton?: boolean;
}

export function FallbackPage({ 
  title = "Ops! Algo deu errado",
  message = "Ocorreu um erro inesperado ao carregar esta página.",
  type = 'error',
  onRetry,
  showHomeButton = true 
}: FallbackPageProps) {
  const handleReload = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const getIcon = () => {
    switch (type) {
      case 'offline':
        return <WifiOff className="h-16 w-16 text-red-500 mx-auto mb-4" />;
      case 'loading':
        return <RefreshCw className="h-16 w-16 text-blue-500 mx-auto mb-4 animate-spin" />;
      case 'not-found':
        return <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />;
      default:
        return <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'offline':
        return 'Você está offline';
      case 'loading':
        return 'Carregando...';
      case 'not-found':
        return 'Página não encontrada';
      default:
        return title;
    }
  };

  const getMessage = () => {
    switch (type) {
      case 'offline':
        return 'Verifique sua conexão com a internet e tente novamente.';
      case 'loading':
        return 'Por favor, aguarde enquanto carregamos o conteúdo...';
      case 'not-found':
        return 'A página que você procura não foi encontrada.';
      default:
        return message;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full text-center">
        <div className="mb-6">
          {getIcon()}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {getTitle()}
          </h1>
          <p className="text-gray-600">
            {getMessage()}
          </p>
        </div>

        {/* Informações de conectividade */}
        {type === 'offline' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center mb-2">
              <WifiOff className="h-5 w-5 text-yellow-600 mr-2" />
              <span className="text-yellow-800 font-medium">Status da Conexão</span>
            </div>
            <p className="text-yellow-700 text-sm">
              {navigator.onLine ? 'Conexão detectada, mas há problemas de rede' : 'Nenhuma conexão detectada'}
            </p>
          </div>
        )}

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Tentar Novamente
            </button>
          )}
          
          <button
            onClick={handleReload}
            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Recarregar
          </button>
          
          {showHomeButton && (
            <button
              onClick={handleGoHome}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Home className="h-4 w-4 mr-2" />
              Início
            </button>
          )}
        </div>

        {/* Informações de suporte */}
        <div className="mt-6 text-sm text-gray-500">
          <p>
            Se o problema persistir, entre em contato com o suporte em{' '}
            <a 
              href="mailto:suporte@cs360.com" 
              className="text-blue-600 hover:underline"
            >
              suporte@cs360.com
            </a>
          </p>
          
          {/* Informações técnicas para desenvolvimento */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-3 bg-gray-100 rounded text-left text-xs">
              <strong>Debug Info:</strong><br />
              User Agent: {navigator.userAgent.slice(0, 50)}...<br />
              Online: {navigator.onLine ? 'Yes' : 'No'}<br />
              Timestamp: {new Date().toISOString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
