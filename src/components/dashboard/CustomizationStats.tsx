
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  BarChart3, 
  Eye, 
  EyeOff, 
  Calendar,
  Download,
  Upload,
  Info
} from 'lucide-react';
import { useDashboard } from './hooks/useDashboard';

export const CustomizationStats = () => {
  const { 
    visibleMetrics, 
    visibleCharts, 
    visibleSections, 
    lastModified,
    exportConfiguration
  } = useDashboard();

  const totalMetrics = 8; // Total de métricas disponíveis
  const totalCharts = 6; // Total de gráficos disponíveis  
  const totalSections = 6; // Total de seções disponíveis

  const visibilityPercentage = Math.round(
    ((visibleMetrics.length + visibleCharts.length + visibleSections.length) / 
     (totalMetrics + totalCharts + totalSections)) * 100
  );

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Status da Personalização
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {visibilityPercentage}% dos elementos estão visíveis
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Badge 
              variant="outline" 
              className="bg-white/50 dark:bg-gray-800/50 text-xs"
            >
              <Eye className="w-3 h-3 mr-1" />
              {visibleMetrics.length + visibleCharts.length + visibleSections.length} ativos
            </Badge>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={exportConfiguration}
              className="text-xs"
            >
              <Download className="w-3 h-3 mr-1" />
              Exportar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Badge variant="outline" className="text-xs">
                {visibleMetrics.length}/{totalMetrics}
              </Badge>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Métricas</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Badge variant="outline" className="text-xs">
                {visibleCharts.length}/{totalCharts}
              </Badge>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Gráficos</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Badge variant="outline" className="text-xs">
                {visibleSections.length}/{totalSections}
              </Badge>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Seções</p>
          </div>
        </div>

        {lastModified && (
          <div className="flex items-center justify-center mt-3 pt-3 border-t border-blue-200 dark:border-blue-700">
            <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
              <Calendar className="w-3 h-3 mr-1" />
              Última modificação: {lastModified.toLocaleDateString('pt-BR')} às {lastModified.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
