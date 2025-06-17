import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Filter, 
  RotateCcw, 
  Calendar,
  Users,
  Target,
  BarChart3,
  GitBranch
} from 'lucide-react';
import type { LTVCACFilters } from '@/hooks/useLTVCAC';

interface LTVCACFiltersComponentProps {
  filters: LTVCACFilters;
  onFilterChange: (key: keyof LTVCACFilters, value: any) => void;
  onResetFilters: () => void;
  isExpanded: boolean;
  onToggleExpanded: () => void;
}

export const LTVCACFiltersComponent: React.FC<LTVCACFiltersComponentProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  isExpanded,
  onToggleExpanded
}) => {
  const timeRangeOptions = [
    { value: '3M', label: '3 Meses' },
    { value: '6M', label: '6 Meses' },
    { value: '12M', label: '12 Meses' },
    { value: '24M', label: '24 Meses' },
    { value: 'ALL', label: 'Todos os Dados' }
  ];

  const segmentOptions = [
    { value: 'Todos', label: 'Todos os Segmentos' },
    { value: 'Enterprise', label: 'Enterprise' },
    { value: 'Growth', label: 'Growth' },
    { value: 'Starter', label: 'Starter' }
  ];

  const channelOptions = [
    { value: 'all', label: 'Todos os Canais' },
    { value: 'google', label: 'Google Ads' },
    { value: 'facebook', label: 'Facebook Ads' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'organic', label: 'Orgânico' },
    { value: 'referral', label: 'Referral' },
    { value: 'email', label: 'Email Marketing' }
  ];

  const modelOptions = [
    { value: 1, label: 'Tradicional', description: 'Cálculo padrão baseado em médias históricas' },
    { value: 2, label: 'IA Preditivo', description: 'Machine Learning com previsões avançadas' },
    { value: 3, label: 'Cohort Avançado', description: 'Análise por coortes com segmentação' }
  ];

  const cohortOptions = [
    { value: 'all', label: 'Todas as Coortes' },
    { value: '2024-Q1', label: 'Q1 2024' },
    { value: '2024-Q2', label: 'Q2 2024' },
    { value: '2023-Q4', label: 'Q4 2023' },
    { value: '2023-Q3', label: 'Q3 2023' }
  ];

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.timeRange !== '12M') count++;
    if (filters.segment !== 'Todos') count++;
    if (filters.channel !== 'all') count++;
    if (filters.model !== 1) count++;
    if (filters.cohort !== 'all') count++;
    return count;
  };

  return (
    <Card className="border-blue-200 dark:border-blue-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="w-5 h-5 text-blue-600" />
            Filtros Avançados
            {getActiveFiltersCount() > 0 && (
              <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                {getActiveFiltersCount()} ativo{getActiveFiltersCount() > 1 ? 's' : ''}
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onResetFilters}
              className="flex items-center gap-2"
              disabled={getActiveFiltersCount() === 0}
            >
              <RotateCcw className="w-4 h-4" />
              Limpar
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onToggleExpanded}
            >
              {isExpanded ? 'Ocultar' : 'Expandir'}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Período de Análise */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Período de Análise
              </label>
              <div className="space-y-2">
                {timeRangeOptions.map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="timeRange"
                      checked={filters.timeRange === option.value}
                      onChange={() => onFilterChange('timeRange', option.value)}
                      className="mr-2 text-blue-600"
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Segmento de Cliente */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Segmento de Cliente
              </label>
              <div className="space-y-2">
                {segmentOptions.map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="segment"
                      checked={filters.segment === option.value}
                      onChange={() => onFilterChange('segment', option.value)}
                      className="mr-2 text-blue-600"
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Canal de Aquisição */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Canal de Aquisição
              </label>
              <select
                value={filters.channel}
                onChange={(e) => onFilterChange('channel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
              >
                {channelOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            {/* Modelo de Cálculo */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Modelo de Cálculo LTV
              </label>
              <div className="space-y-3">
                {modelOptions.map(option => (
                  <div key={option.value} className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    filters.model === option.value 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`} onClick={() => onFilterChange('model', option.value)}>
                    <div className="flex items-center mb-1">
                      <input
                        type="radio"
                        name="model"
                        checked={filters.model === option.value}
                        onChange={() => onFilterChange('model', option.value)}
                        className="mr-2 text-blue-600"
                      />
                      <span className="font-medium text-sm">{option.label}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 ml-6">
                      {option.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Análise por Coorte */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <GitBranch className="w-4 h-4" />
                Análise por Coorte
              </label>
              <select
                value={filters.cohort}
                onChange={(e) => onFilterChange('cohort', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white mb-4"
              >
                {cohortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  💡 <strong>Dica:</strong> Use análise por coorte para entender como diferentes grupos de clientes se comportam ao longo do tempo.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
