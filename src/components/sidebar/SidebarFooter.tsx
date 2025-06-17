
import React, { useState, useEffect } from 'react';
import { BarChart3, ChevronUp, ChevronDown, Zap, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface SidebarFooterProps {
  collapsed: boolean;
  onToggle?: () => void;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({ collapsed, onToggle }) => {
  const [aiCredits, setAiCredits] = useState(1247);
  const [lastUsed, setLastUsed] = useState('2min');
  // Footer sempre inicia colapsado
  const [footerExpanded, setFooterExpanded] = useState(false);

  // Simula uso de créditos em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      // Chance aleatória de usar créditos (30% de chance a cada 15 segundos)
      if (Math.random() < 0.3) {
        const usage = Math.floor(Math.random() * 5) + 1; // 1-5 créditos por uso
        setAiCredits(prev => Math.max(0, prev - usage));
        
        // Atualiza o tempo da última utilização
        const times = ['agora', '1min', '2min', '3min'];
        setLastUsed(times[Math.floor(Math.random() * times.length)]);
      }
    }, 15000); // Verifica a cada 15 segundos

    return () => clearInterval(interval);
  }, []);

  const handleFooterToggle = () => {
    setFooterExpanded(!footerExpanded);
    if (onToggle) {
      onToggle();
    }
  };

  if (collapsed) {
    return (
      <div className="border-t border-slate-700/50 bg-slate-900 p-2 flex justify-center items-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg cursor-pointer">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-slate-800 text-white border-slate-700">
            <p>Créditos de IA: {aiCredits.toLocaleString()}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    );
  }

  return (
    <div className="border-t border-slate-700/50 bg-slate-900">
      {/* Toggle Button */}
      <div className="px-4 py-3 border-b border-slate-700/30">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleFooterToggle}
          className="w-full flex items-center justify-center hover:bg-slate-700/50 text-slate-300 hover:text-white transition-colors"
        >
          {footerExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronUp className="w-4 h-4" />
          )}
        </Button>
      </div>
      
      {/* Footer Content - only show when expanded */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
        footerExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="p-4 space-y-4">
          {/* AI Credits Section */}
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg p-3 border border-purple-700/30">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs font-semibold text-purple-300">Créditos IA</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-purple-400 font-medium">Ativo</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">{aiCredits.toLocaleString()}</span>
                <span className="text-xs text-slate-400">disponíveis</span>
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-slate-700/50 rounded-full h-1.5">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(10, (aiCredits / 2000) * 100)}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Último uso: {lastUsed}</span>
                <span className="text-purple-400 font-medium">Premium</span>
              </div>
            </div>
          </div>

          {/* Company Header */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-semibold text-white truncate">CS360°</h3>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <p className="text-xs text-slate-400">Customer Success Platform</p>
            </div>
          </div>

          {/* Plan Information */}
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400">Plano Atual</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-600/20 text-blue-400 border border-blue-600/30">
                Premium
              </span>
            </div>
            <div className="text-xs text-slate-300">
              Recursos avançados ativos
            </div>
          </div>

          {/* System Status */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Sistema</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-400 font-medium">Online</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Sincronização</span>
              <span className="text-slate-300">Ativa</span>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Última atualização</span>
              <span className="text-slate-300">há 2min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
