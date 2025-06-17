
import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

export const FeaturesHeader: React.FC = () => {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CS360°
              </span>
              <span className="text-xs text-slate-600 font-medium -mt-1">
                Customer Success Platform
              </span>
            </div>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost">Voltar ao Site</Button>
            </Link>
            <Link to="/app">
              <Button>Entrar</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
