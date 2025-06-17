
import React from 'react';
import { Button } from '../../ui/button';
import { RefreshCw, Download, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ChartsHeader: React.FC = () => {
  const { toast } = useToast();

  const handleRefresh = () => {
    toast({
      title: "Atualizando dados",
      description: "Os gráficos estão sendo atualizados com os dados mais recentes.",
    });
    
    // Simulate refresh with a delay
    setTimeout(() => {
      toast({
        title: "Dados atualizados",
        description: "Os gráficos foram atualizados com sucesso.",
      });
    }, 1500);
  };

  const handleExport = () => {
    toast({
      title: "Exportando dados",
      description: "Os dados dos gráficos estão sendo preparados para download.",
    });
    
    // Simulate export functionality
    setTimeout(() => {
      // Create a simple CSV data for demonstration
      const csvData = `Métrica,Valor,Data
Receita,R$ 545.2K,${new Date().toLocaleDateString()}
Clientes Ativos,1.234,${new Date().toLocaleDateString()}
Taxa de Conversão,4.8%,${new Date().toLocaleDateString()}
Churn Rate,2.1%,${new Date().toLocaleDateString()}`;
      
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `analise-visual-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Exportação concluída",
        description: "Os dados foram exportados com sucesso.",
      });
    }, 1000);
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Análise Visual Inteligente</h2>
          <p className="text-gray-600 dark:text-gray-400">Métricas principais em tempo real</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-white/80 dark:bg-slate-700 hover:bg-white dark:hover:bg-slate-600 transition-all duration-200 hover:scale-105"
          onClick={handleRefresh}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Atualizar
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-white/80 dark:bg-slate-700 hover:bg-white dark:hover:bg-slate-600 transition-all duration-200 hover:scale-105"
          onClick={handleExport}
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar
        </Button>
      </div>
    </div>
  );
};
