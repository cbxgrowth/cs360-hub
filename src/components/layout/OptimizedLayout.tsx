
import React, { memo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LoadingProvider } from '@/contexts/LoadingContext';

interface LayoutProps {
  children: React.ReactNode;
}

const HeaderContent = memo(() => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CS360°
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium -mt-1">
              Customer Success Platform
            </p>
          </div>
          {profile?.company_name && (
            <span className="hidden sm:inline text-sm text-gray-600 dark:text-gray-400 truncate max-w-48">
              {profile.company_name}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <User className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline truncate max-w-32">
              {profile?.full_name || user?.email}
            </span>
            <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
              {profile?.plan_type || 'starter'}
            </span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSignOut}
            className="flex items-center space-x-1 sm:space-x-2 h-8 px-2 sm:px-3"
          >
            <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Sair</span>
          </Button>
        </div>
      </div>
    </header>
  );
});

HeaderContent.displayName = 'HeaderContent';

export const OptimizedLayout = memo<LayoutProps>(({ children }) => {
  return (
    <LoadingProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <HeaderContent />
        
        <main className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </LoadingProvider>
  );
});

OptimizedLayout.displayName = 'OptimizedLayout';
