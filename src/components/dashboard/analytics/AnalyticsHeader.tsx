
import React from 'react';
import { Button } from '../../ui/button';
import { RefreshCw, Download } from 'lucide-react';

export const AnalyticsHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Avançado</h2>
        <p className="text-gray-600 dark:text-gray-400">Análises detalhadas de performance e satisfação</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" className="bg-white/80 dark:bg-slate-700 hover:bg-white dark:hover:bg-slate-600">
          <RefreshCw className="w-4 h-4 mr-2" />
          Atualizar
        </Button>
        <Button variant="outline" size="sm" className="bg-white/80 dark:bg-slate-700 hover:bg-white dark:hover:bg-slate-600">
          <Download className="w-4 h-4 mr-2" />
          Exportar
        </Button>
      </div>
    </div>
  );
};
