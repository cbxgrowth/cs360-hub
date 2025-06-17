
import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '../ui/button';

interface SidebarHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  collapsed,
  onToggle
}) => {
  return (
    <div className="p-4 border-b border-slate-700/50 bg-white/5 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className={`flex items-center ${collapsed ? 'justify-center w-full' : 'space-x-3'}`}>
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div>
                <h2 className="text-lg font-bold text-white">
                  CS360°
                </h2>
                <p className="text-xs text-slate-400 font-medium">Customer Success Platform</p>
              </div>
            </div>
          )}
          {collapsed && (
            <h2 className="text-base font-bold text-white leading-none">
              CS360°
            </h2>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="p-2 hover:bg-white/10 text-slate-300 hover:text-white transition-colors rounded-lg"
          title={collapsed ? "Expandir sidebar" : "Recolher sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
};
