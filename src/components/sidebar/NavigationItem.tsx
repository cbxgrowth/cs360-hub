
import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface NavigationItemProps {
  icon: LucideIcon;
  label: string;
  path: string;
  color: string;
  isActive: boolean;
  collapsed: boolean;
  isMobile: boolean;
  onClose: () => void;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  icon: Icon,
  label,
  path,
  color,
  isActive,
  collapsed,
  isMobile,
  onClose
}) => {
  const handleClick = () => {
    if (isMobile) {
      onClose();
    }
  };

  const linkContent = (
    <Link
      to={path}
      onClick={handleClick}
      className={`group relative w-full flex items-center py-3 rounded-xl text-left transition-all duration-300 transform hover:scale-105 ${
        isActive
          ? `bg-gradient-to-r ${color} text-white shadow-xl shadow-blue-500/25` 
          : 'text-slate-300 hover:bg-white/10 hover:text-white'
      } ${collapsed ? 'justify-center px-2' : 'px-4 space-x-3'}`}
    >
      <div className={`relative z-10 ${isActive ? 'animate-pulse' : ''}`}>
        <Icon className="w-6 h-6 flex-shrink-0" />
      </div>
      {!collapsed && (
        <>
          <span className="text-sm font-medium relative z-10">{label}</span>
          {isActive && (
            <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          )}
        </>
      )}
      {!isActive && (
        <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300`}></div>
      )}
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {linkContent}
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-slate-800 text-white border-slate-700">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return linkContent;
};
