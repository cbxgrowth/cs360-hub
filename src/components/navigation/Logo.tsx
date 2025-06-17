
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  isCompact?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ isCompact = false }) => {
  return (
    <Link to="/" className="flex items-center group relative">
      <div className="relative">
        <div className="flex flex-col">
          <span className={`font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300 ${
            isCompact ? 'text-lg' : 'text-2xl'
          }`}>
            CS360°
          </span>
          {!isCompact && (
            <span className="text-xs text-slate-600 font-medium -mt-1">
              Customer Success Platform
            </span>
          )}
        </div>
        
        {/* Subtle glow effect on hover */}
        <div className={`absolute inset-0 font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300 ${
          isCompact ? 'text-lg' : 'text-2xl'
        }`}>
          CS360°
        </div>
      </div>
      
      {/* Compact mode tooltip */}
      {isCompact && (
        <div className="absolute left-full ml-3 px-2 py-1 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-50">
          CS360° Customer Success Platform
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45" />
        </div>
      )}
    </Link>
  );
};
