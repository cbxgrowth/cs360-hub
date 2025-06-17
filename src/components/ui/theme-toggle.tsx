
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from './button';
import { useTheme } from '../../contexts/ThemeContext';

export const ThemeToggle = () => {
  console.log('ThemeToggle component rendering');
  
  const { theme, toggleTheme } = useTheme();
  
  console.log('ThemeToggle - got theme:', theme);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="w-9 h-9 rounded-full bg-white/10 dark:bg-slate-700/50 backdrop-blur-sm border border-white/20 dark:border-slate-600/50 hover:bg-white/20 dark:hover:bg-slate-600/50 transition-all duration-300"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
