
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { LoadingState } from '@/components/ui/loading-state';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingState />;
  }

  if (!user) {
    // Redirecionar para login mantendo a URL de destino
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
