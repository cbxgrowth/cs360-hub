
import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Search, 
  Filter, 
  X, 
  SortAsc, 
  SortDesc,
  Save,
  History
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '../ui/dropdown-menu';
import type { ClientFilters } from '@/hooks/useClientFilters';

interface ClientsSearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filters: ClientFilters;
  onFilterChange: (key: keyof ClientFilters, value: any) => void;
  onResetFilters: () => void;
  totalResults: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSortChange: (field: string, order: 'asc' | 'desc') => void;
}

export const ClientsSearchBar: React.FC<ClientsSearchBarProps> = ({
  searchTerm,
  onSearchChange,
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
  sortBy,
  sortOrder,
  onSortChange
}) => {
  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'search') return value !== '';
    if (key === 'mrrRange') return value[0] !== 0 || value[1] !== 50000;
    if (key === 'ltvRange') return value[0] !== 0 || value[1] !== 500000;
    return value !== 'Todos';
  }).length;

  const sortOptions = [
    { label: 'Nome', value: 'name' },
    { label: 'Data de Criação', value: 'created_at' },
    { label: 'MRR', value: 'mrr' },
    { label: 'LTV', value: 'ltv' },
    { label: 'Health Score', value: 'health_score' },
    { label: 'Risk Score', value: 'risk_score' },
    { label: 'NPS', value: 'nps_score' }
  ];

  const quickFilters = [
    { label: 'Ativos', key: 'status', value: 'Ativo' },
    { label: 'Em Risco', key: 'status', value: 'Risco' },
    { label: 'Tier A', key: 'tier', value: 'A' },
    { label: 'Tier B', key: 'tier', value: 'B' },
    { label: 'Tier C', key: 'tier', value: 'C' },
    { label: 'NPS Alto (9-10)', key: 'npsCategory', value: 'Promotor' },
    { label: 'NPS Baixo (0-6)', key: 'npsCategory', value: 'Detrator' }
  ];

  return (
    <div className="space-y-4">
      {/* Main Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar por nome, email, empresa..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSearchChange('')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-6 w-6"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Sort Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
              Ordenar
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {sortOptions.map(option => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => onSortChange(option.value, sortBy === option.value && sortOrder === 'asc' ? 'desc' : 'asc')}
                className="flex items-center justify-between"
              >
                <span>{option.label}</span>
                {sortBy === option.value && (
                  sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Advanced Filters */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filtros
              {activeFiltersCount > 0 && (
                <Badge className="ml-1 px-1.5 py-0.5 text-xs">{activeFiltersCount}</Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <div className="p-3">
              <div className="font-medium text-sm mb-2">Status</div>
              <div className="space-y-1">
                {['Todos', 'Ativo', 'Risco', 'Inativo'].map(status => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={filters.status === status}
                    onCheckedChange={() => onFilterChange('status', status)}
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                ))}
              </div>
            </div>
            
            <DropdownMenuSeparator />
            
            <div className="p-3">
              <div className="font-medium text-sm mb-2">Tier</div>
              <div className="space-y-1">
                {['Todos', 'A', 'B', 'C'].map(tier => (
                  <DropdownMenuCheckboxItem
                    key={tier}
                    checked={filters.tier === tier}
                    onCheckedChange={() => onFilterChange('tier', tier)}
                  >
                    {tier === 'Todos' ? 'Todos' : `Nível ${tier}`}
                  </DropdownMenuCheckboxItem>
                ))}
              </div>
            </div>

            <DropdownMenuSeparator />
            
            <div className="p-3">
              <div className="font-medium text-sm mb-2">NPS</div>
              <div className="space-y-1">
                {['Todos', 'Promotor', 'Passivo', 'Detrator'].map(nps => (
                  <DropdownMenuCheckboxItem
                    key={nps}
                    checked={filters.npsCategory === nps}
                    onCheckedChange={() => onFilterChange('npsCategory', nps)}
                  >
                    {nps}
                  </DropdownMenuCheckboxItem>
                ))}
              </div>
            </div>

            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={onResetFilters} className="text-red-600">
              <X className="w-4 h-4 mr-2" />
              Limpar Filtros
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Save Filter */}
        <Button variant="outline" size="sm">
          <Save className="w-4 h-4 mr-2" />
          Salvar Filtro
        </Button>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground self-center">Filtros rápidos:</span>
        {quickFilters.map(filter => (
          <Button
            key={`${filter.key}-${filter.value}`}
            variant={filters[filter.key as keyof ClientFilters] === filter.value ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange(filter.key as keyof ClientFilters, 
              filters[filter.key as keyof ClientFilters] === filter.value ? 'Todos' : filter.value)}
            className="text-xs"
          >
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{totalResults} cliente(s) encontrado(s)</span>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onResetFilters} className="text-xs">
            <X className="w-3 h-3 mr-1" />
            Limpar {activeFiltersCount} filtro(s)
          </Button>
        )}
      </div>
    </div>
  );
};
