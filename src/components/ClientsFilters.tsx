
import React from 'react';
import { Filter, Calendar, DollarSign } from 'lucide-react';
import { ClientFilter } from '../pages/Clients';

interface ClientsFiltersProps {
  filters: ClientFilter;
  onFiltersChange: (filters: ClientFilter) => void;
}

export const ClientsFilters: React.FC<ClientsFiltersProps> = ({ filters, onFiltersChange }) => {
  const updateFilter = (key: keyof ClientFilter, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: 'profile' | 'level' | 'status' | 'npsCategory', value: string) => {
    const currentArray = filters[key];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-colors">
      <div className="flex items-center mb-4">
        <Filter className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filtros Avançados</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Perfil */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Perfil</label>
          <div className="space-y-2">
            {['Arrojado', 'Moderado', 'Conservador'].map(profile => (
              <label key={profile} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.profile.includes(profile)}
                  onChange={() => toggleArrayFilter('profile', profile)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{profile}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Nível */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Nível</label>
          <div className="space-y-2">
            {['A', 'B', 'C'].map(level => (
              <label key={level} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.level.includes(level)}
                  onChange={() => toggleArrayFilter('level', level)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Nível {level}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Status</label>
          <div className="space-y-2">
            {['Ativo', 'Risco', 'Inativo', 'Cancelado'].map(status => (
              <label key={status} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.status.includes(status)}
                  onChange={() => toggleArrayFilter('status', status)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{status}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Categoria NPS */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Categoria NPS</label>
          <div className="space-y-2">
            {['Promotor', 'Passivo', 'Detrator'].map(category => (
              <label key={category} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.npsCategory.includes(category)}
                  onChange={() => toggleArrayFilter('npsCategory', category)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{category}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Faixa LTV */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block flex items-center">
            <DollarSign className="w-4 h-4 mr-1" />
            Faixa LTV (R$)
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.ltvRange[0]}
              onChange={(e) => updateFilter('ltvRange', [Number(e.target.value), filters.ltvRange[1]])}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.ltvRange[1]}
              onChange={(e) => updateFilter('ltvRange', [filters.ltvRange[0], Number(e.target.value)])}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Faixa CAC */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block flex items-center">
            <DollarSign className="w-4 h-4 mr-1" />
            Faixa CAC (R$)
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.cacRange[0]}
              onChange={(e) => updateFilter('cacRange', [Number(e.target.value), filters.cacRange[1]])}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.cacRange[1]}
              onChange={(e) => updateFilter('cacRange', [filters.cacRange[0], Number(e.target.value)])}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
