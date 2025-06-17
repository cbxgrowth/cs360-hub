
import React from 'react';
import { Search } from 'lucide-react';

interface FiltersState {
  tier: string;
  profile: string;
  npsCategory: string;
  status: string;
}

interface ClientsFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filters: FiltersState;
  onFiltersChange: (filters: FiltersState) => void;
  filterOptions: {
    tier: string[];
    profile: string[];
    npsCategory: string[];
    status: string[];
  };
}

export const ClientsFilters = ({
  searchTerm,
  onSearchChange,
  filters,
  onFiltersChange,
  filterOptions
}: ClientsFiltersProps) => {
  const handleFilterChange = (key: keyof FiltersState, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar por nome, contato ou email..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>
      
      <div className="flex gap-2">
        {Object.entries(filterOptions).map(([key, options]) => (
          <select
            key={key}
            value={filters[key as keyof FiltersState]}
            onChange={(e) => handleFilterChange(key as keyof FiltersState, e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ))}
      </div>
    </div>
  );
};
