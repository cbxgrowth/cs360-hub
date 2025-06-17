
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Menu, X, LogIn, Sparkles, ArrowRight } from 'lucide-react';

interface ActionButtonsProps {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
  isCompact?: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  isMenuOpen, 
  onMenuToggle, 
  isCompact = false 
}) => {
  return (
    <div className="flex items-center space-x-3">
      {/* Desktop Buttons */}
      <div className="hidden lg:flex items-center space-x-3">
        <Link to="/login">
          <Button 
            variant="ghost" 
            className={`group relative overflow-hidden hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 font-semibold border border-transparent hover:border-blue-200 hover:shadow-md ${
              isCompact ? 'px-3 py-2 text-sm h-9' : 'px-4 py-2 h-10'
            }`}
          >
            <div className="flex items-center relative z-10">
              <LogIn className={`mr-2 transition-all duration-300 ${
                isCompact ? 'w-3 h-3' : 'w-4 h-4'
              }`} />
              <span className={isCompact ? 'hidden xl:inline' : ''}>Entrar</span>
            </div>
            
            {/* Hover effect background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
        </Link>
        
        <Link to="/register">
          <Button 
            className={`group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 font-bold hover:scale-105 border-0 ${
              isCompact ? 'px-4 py-2 text-sm h-9' : 'px-6 py-2 h-10'
            }`}
          >
            <div className="flex items-center relative z-10">
              <Sparkles className={`mr-2 transition-all duration-300 ${
                isCompact ? 'w-3 h-3' : 'w-4 h-4'
              }`} />
              <span className={isCompact ? 'hidden xl:inline' : ''}>
                {isCompact ? 'Teste' : 'Teste Grátis'}
              </span>
              <ArrowRight className={`ml-1 transition-all duration-300 group-hover:translate-x-1 ${
                isCompact ? 'w-3 h-3' : 'w-4 h-4'
              }`} />
            </div>
            
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
          </Button>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onMenuToggle}
        className={`lg:hidden group relative overflow-hidden hover:bg-blue-50 transition-all duration-300 border border-transparent hover:border-blue-200 ${
          isMenuOpen ? 'bg-blue-50 text-blue-600 border-blue-200' : ''
        }`}
      >
        <div className="relative z-10">
          {isMenuOpen ? (
            <X className="w-5 h-5 transition-transform duration-300 rotate-90" />
          ) : (
            <Menu className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
          )}
        </div>
        
        {/* Hover effect background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Button>
    </div>
  );
};
