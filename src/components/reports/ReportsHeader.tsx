
import React from 'react';
import { Button } from '../ui/button';
import { BarChart3, Download, RefreshCw, Filter, Calendar, Settings, Plus } from 'lucide-react';

interface ReportsHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  dateRange: string;
  onDateRangeChange: (range: string) => void;
  onRefresh: () => void;
  onExportAll: () => void;
}

export const ReportsHeader: React.FC<ReportsHeaderProps> = ({
  activeTab,
  onTabChange,
  dateRange,
  onDateRangeChange,
  onRefresh,
  onExportAll
}) => {
  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
    { id: 'templates', label: 'Templates', icon: Download },
    { id: 'dashboards', label: 'Dashboards', icon: Settings },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'scheduler', label: 'Agendamentos', icon: Calendar }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Central de Relatórios
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Geração, visualização e análise de relatórios avançados
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={dateRange}
              onChange={(e) => onDateRangeChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 dark:text-white"
            >
              <option value="7d">Últimos 7 dias</option>
              <option value="30d">Últimos 30 dias</option>
              <option value="90d">Últimos 90 dias</option>
              <option value="6m">Últimos 6 meses</option>
              <option value="1y">Último ano</option>
              <option value="custom">Personalizado</option>
            </select>
            
            <Button variant="outline" size="sm" onClick={onRefresh}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Atualizar
            </Button>
            
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtros Avançados
            </Button>
            
            <Button size="sm" onClick={onExportAll} className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Download className="w-4 h-4 mr-2" />
              Exportar Tudo
            </Button>
          </div>
        </div>

        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-600/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
