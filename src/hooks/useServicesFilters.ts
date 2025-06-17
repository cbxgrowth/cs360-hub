
import { useState, useMemo } from 'react';
import type { Service } from './useServices';

export interface ServiceFilters {
  search: string;
  category: string;
  status: string;
  priceRange: [number, number];
  clientRange: [number, number];
  mrrRange: [number, number];
}

export const useServicesFilters = (services: Service[]) => {
  const [filters, setFilters] = useState<ServiceFilters>({
    search: '',
    category: 'todos',
    status: 'todos',
    priceRange: [0, 10000],
    clientRange: [0, 500],
    mrrRange: [0, 500000],
  });

  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredServices = useMemo(() => {
    let filtered = services.filter(service => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          service.name.toLowerCase().includes(searchLower) ||
          (service.description && service.description.toLowerCase().includes(searchLower)) ||
          service.category.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.category !== 'todos' && service.category !== filters.category) {
        return false;
      }

      // Status filter
      if (filters.status !== 'todos') {
        const serviceStatus = service.active ? 'ativo' : 'inativo';
        if (serviceStatus !== filters.status) {
          return false;
        }
      }

      // Price range filter
      const servicePrice = Number(service.price) || 0;
      if (servicePrice < filters.priceRange[0] || servicePrice > filters.priceRange[1]) {
        return false;
      }

      return true;
    });

    // Sorting
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Service];
      let bValue: any = b[sortBy as keyof Service];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [services, filters, sortBy, sortOrder]);

  const updateFilter = (key: keyof ServiceFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      category: 'todos',
      status: 'todos',
      priceRange: [0, 10000],
      clientRange: [0, 500],
      mrrRange: [0, 500000],
    });
  };

  const handleSortChange = (field: string, order: 'asc' | 'desc') => {
    setSortBy(field);
    setSortOrder(order);
  };

  return {
    filters,
    filteredServices,
    updateFilter,
    resetFilters,
    sortBy,
    sortOrder,
    handleSortChange
  };
};
