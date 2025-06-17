
import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  // Add debugging
  console.log('useTheme called, context:', context);
  
  if (context === undefined) {
    console.error('useTheme must be used within a ThemeProvider. Current context:', context);
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    // Apenas para a aplicação, não afeta o website
    const saved = localStorage.getItem('app-theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  // Add debugging
  console.log('ThemeProvider rendering with theme:', theme);

  useEffect(() => {
    localStorage.setItem('app-theme', theme);
    
    // Aplica o tema apenas ao body quando está na aplicação
    const isAppRoute = window.location.pathname.startsWith('/app') || 
                      window.location.pathname.startsWith('/nps') ||
                      window.location.pathname.startsWith('/clients') ||
                      window.location.pathname.startsWith('/contracts') ||
                      window.location.pathname.startsWith('/services') ||
                      window.location.pathname.startsWith('/ltv-cac') ||
                      window.location.pathname.startsWith('/strategies') ||
                      window.location.pathname.startsWith('/automation') ||
                      window.location.pathname.startsWith('/reports') ||
                      window.location.pathname.startsWith('/admin') ||
                      window.location.pathname.startsWith('/super-admin') ||
                      window.location.pathname.startsWith('/partners') ||
                      window.location.pathname.startsWith('/campaigns') ||
                      window.location.pathname.startsWith('/partner-portal') ||
                      window.location.pathname.startsWith('/goals') ||
                      window.location.pathname.startsWith('/profile');

    console.log('Theme effect - isAppRoute:', isAppRoute, 'pathname:', window.location.pathname);

    if (isAppRoute) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    console.log('toggleTheme called, current theme:', theme);
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setTheme = (newTheme: 'light' | 'dark') => {
    console.log('setTheme called with:', newTheme);
    setThemeState(newTheme);
  };

  const contextValue = { theme, toggleTheme, setTheme };
  console.log('ThemeProvider context value:', contextValue);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
