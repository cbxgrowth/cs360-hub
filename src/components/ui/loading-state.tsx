import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingStateProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  size = 'md', 
  text = 'Carregando...', 
  className 
}) => {
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