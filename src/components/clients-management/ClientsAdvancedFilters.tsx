
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Slider } from '../ui/slider';
import { Filter, RotateCcw, Search, TrendingUp, Users, AlertTriangle } from 'lucide-react';
import type { ClientFilters } from '@/hooks/useClientFilters';

interface ClientsAdvancedFiltersProps {
  filters: ClientFilters;
  onFilterChange: (key: keyof ClientFilters, value: any) => void;
  onResetFilters: () => void;
  filterCounts: {
    tierCounts: Record<string, number>;
    statusCounts: Record<string, number>;
  };
  totalResults: number;
}

export const ClientsAdvancedFilters = ({
  filters,
  onFilterChange,
  onResetFilters,
  filterCounts,
  totalResults
}: ClientsAdvancedFiltersProps) => {
  const filterOptions = {
    tier: ['A', 'B', 'C'],
    status: ['Ativo', 'Risco', 'Inativo'],
    npsCategory: ['Promotor', 'Passivo', 'Detrator'],
    profile: ['Arrojado', 'Moderado', 'Conservador'],
    riskLevel: ['Baixo', 'Médio', 'Alto'],
    dateRange: ['Últimos 7 dias', 'Últimos 30 dias', 'Últimos 90 dias', 'Último ano']
  };

  const getTierColor = (tier: string) => {
    const colors = {
      'A': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'B': 'bg-blue-100 text-blue-800 border-blue-200',
      'C': 'bg-amber-100 text-amber-800 border-amber-200'
    };
    return colors[tier as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'Ativo': 'bg-green-100 text-green-800 border-green-200',
      'Risco': 'bg-orange-100 text-orange-800 border-orange-200',
      'Inativo': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="w-5 h-5 text-blue-600" />
            Filtros Avançados
            <Badge variant="outline" className="ml-2">
              {totalResults} resultado(s)
            </Badge>
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onResetFilters}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Limpar Filtros
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <Search className="w-4 h-4" />
            Buscar Cliente
          </label>
          <input
            type="text"
            placeholder="Nome, email ou contato..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tier Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Nível (Tier)
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="tier"
                  checked={filters.tier === 'Todos'}
                  onChange={() => onFilterChange('tier', 'Todos')}
                  className="mr-2"
                />
                <span className="text-sm">Todos</span>
              </label>
              {filterOptions.tier.map(tier => (
                <label key={tier} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="tier"
                      checked={filters.tier === tier}
                      onChange={() => onFilterChange('tier', tier)}
                      className="mr-2"
                    />
                    <span className="text-sm">Nível {tier}</span>
                  </div>
                  <Badge className={getTierColor(tier)} variant="outline">
                    {filterCounts.tierCounts[tier] || 0}
                  </Badge>
                </label>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Status
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  checked={filters.status === 'Todos'}
                  onChange={() => onFilterChange('status', 'Todos')}
                  className="mr-2"
                />
                <span className="text-sm">Todos</span>
              </label>
              {filterOptions.status.map(status => (
                <label key={status} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      checked={filters.status === status}
                      onChange={() => onFilterChange('status', status)}
                      className="mr-2"
                    />
                    <span className="text-sm">{status}</span>
                  </div>
                  <Badge className={getStatusColor(status)} variant="outline">
                    {filterCounts.statusCounts[status] || 0}
                  </Badge>
                </label>
              ))}
            </div>
          </div>

          {/* NPS Category Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Categoria NPS
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.npsCategory === 'Todos'}
                  onChange={() => onFilterChange('npsCategory', 'Todos')}
                  className="mr-2"
                />
                <span className="text-sm">Todos</span>
              </label>
              {filterOptions.npsCategory.map(category => (
                <label key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.npsCategory === category}
                    onChange={() => onFilterChange('npsCategory', category)}
                    className="mr-2"
                  />
                  <span className="text-sm">{category}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Range Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          {/* MRR Range */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
              Faixa de MRR: R$ {(filters.mrrRange[0] / 1000).toFixed(0)}k - R$ {(filters.mrrRange[1] / 1000).toFixed(0)}k
            </label>
            <Slider
              value={filters.mrrRange}
              onValueChange={(value) => onFilterChange('mrrRange', value as [number, number])}
              max={100000}
              min={0}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>R$ 0</span>
              <span>R$ 100k</span>
            </div>
          </div>

          {/* LTV Range */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
              Faixa de LTV: R$ {(filters.ltvRange[0] / 1000).toFixed(0)}k - R$ {(filters.ltvRange[1] / 1000).toFixed(0)}k
            </label>
            <Slider
              value={filters.ltvRange}
              onValueChange={(value) => onFilterChange('ltvRange', value as [number, number])}
              max={1000000}
              min={0}
              step={10000}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>R$ 0</span>
              <span>R$ 1M</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
