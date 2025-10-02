
import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
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

    if (isAppRoute) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
