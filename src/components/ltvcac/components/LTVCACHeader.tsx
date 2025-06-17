
import React from 'react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { 
  Settings, 
  Download, 
  Upload, 
  RefreshCw,
  Filter
} from 'lucide-react';
import type { LTVCACFilters } from '@/hooks/useLTVCAC';

interface LTVCACHeaderProps {
  filters: LTVCACFilters;
  isLoading: boolean;
  showFilters: boolean;
  onToggleFilters: () => void;
  onRefreshData: () => void;
  onImportData: () => void;
  onExportData: () => void;
  onOpenConfig: () => void;
}

export const LTVCACHeader: React.FC<LTVCACHeaderProps> = ({
  filters,
  isLoading,
  showFilters,
  onToggleFilters,
  onRefreshData,
  onImportData,
  onExportData,
  onOpenConfig
}) => {
  const hasActiveFilters = Object.values(filters).some(v => 
    v !== 'Todos' && v !== 'all' && v !== '12M' && v !== 1
  );

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Análise LTV & CAC
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Análise avançada de Lifetime Value e Customer Acquisition Cost
        </p>
      </div>
      
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleFilters}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filtros
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-1">
              Ativo
            </Badge>
          )}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onRefreshData}
          disabled={isLoading}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onImportData}
        >
          <Upload className="w-4 h-4 mr-2" />
          Importar
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onExportData}
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenConfig}
        >
          <Settings className="w-4 h-4 mr-2" />
          Configurar
        </Button>
      </div>
    </div>
  );
};
