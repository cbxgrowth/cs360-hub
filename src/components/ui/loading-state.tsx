
import React from 'react';
import { Skeleton } from './skeleton';
import { Card, CardContent, CardHeader } from './card';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  type?: 'skeleton' | 'spinner' | 'card' | 'table';
  rows?: number;
  className?: string;
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  type = 'skeleton', 
  rows = 3, 
  className = '',
  message = 'Carregando...'
}) => {
  switch (type) {
    case 'spinner':
      return (
        <div className={`flex items-center justify-center p-8 ${className}`}>
          <div className="flex flex-col items-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">{message}</p>
          </div>
        </div>
      );

    case 'card':
      return (
        <Card className={className}>
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: rows }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </CardContent>
        </Card>
      );

    case 'table':
      return (
        <div className={`space-y-3 ${className}`}>
          <Skeleton className="h-10 w-full" />
          {Array.from({ length: rows }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      );

    default:
      return (
        <div className={`space-y-3 ${className}`}>
          {Array.from({ length: rows }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      );
  }
};

export const LoadingWrapper: React.FC<{
  loading: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}> = ({ loading, children, fallback }) => {
  if (loading) {
    return fallback || <LoadingState />;
  }
  return <>{children}</>;
};
