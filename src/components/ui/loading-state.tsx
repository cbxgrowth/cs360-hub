import React, { useState, useEffect } from 'react';
import { Loader2, AlertTriangle, WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FallbackPage } from './fallback-page';

interface LoadingStateProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
  timeout?: number; // Timeout em ms para mostrar fallback
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  size = 'md', 
  text = 'Carregando...', 
  className,
  timeout = 10000 // 10 segundos por padrão
}) => {
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  
  useEffect(() => {
    // Timeout para mostrar fallback se demorar muito
    const timeoutId = setTimeout(() => {
      setIsTimedOut(true);
    }, timeout);
    
    // Listeners de conectividade
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [timeout]);
  
  // Se está offline, mostrar página de offline
  if (isOffline) {
    return <FallbackPage type="offline" onRetry={() => window.location.reload()} />;
  }
  
  // Se demorou muito, mostrar fallback de erro
  if (isTimedOut) {
    return (
      <FallbackPage 
        type="error"
        title="Carregamento demorado"
        message="A página está demorando mais que o normal para carregar. Verifique sua conexão."
        onRetry={() => window.location.reload()}
      />
    );
  }
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className={cn(
      "min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100",
      className
    )}>
      <div className="text-center space-y-4">
        <Loader2 className={cn("animate-spin text-blue-600 mx-auto", sizeClasses[size])} />
        <p className="text-gray-600 font-medium">{text}</p>
        
        {/* Progress bar simulation */}
        <div className="w-64 bg-gray-200 rounded-full h-2 mx-auto">
          <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
        </div>
        
        <p className="text-sm text-gray-500">
          Preparando sua experiência...
        </p>
      </div>
    </div>
  );
};

// Page-specific loading states
export const DashboardLoadingState = () => (
  <LoadingState text="Carregando Dashboard..." className="bg-gradient-to-br from-slate-50 to-gray-100" />
);

export const ClientsLoadingState = () => (
  <LoadingState text="Carregando Clientes..." className="bg-gradient-to-br from-green-50 to-emerald-100" />
);

export const ReportsLoadingState = () => (
  <LoadingState text="Carregando Relatórios..." className="bg-gradient-to-br from-purple-50 to-violet-100" />
);