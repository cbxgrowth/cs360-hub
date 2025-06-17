
import { useState, useMemo } from 'react';
import type { DisplayClient } from '@/components/clients-management/adapters/clientsAdapter';

export interface ClientFilters {
  search: string;
  tier: string;
  status: string;
  npsCategory: string;
  mrrRange: [number, number];
  ltvRange: [number, number];
  riskLevel: string;
  dateRange: string;
}

export const useClientFilters = (clients: DisplayClient[]) => {
  const [filters, setFilters] = useState<ClientFilters>({
    search: '',
    tier: 'Todos',
    status: 'Todos',
    npsCategory: 'Todos',
    mrrRange: [0, 50000],
    ltvRange: [0, 500000],
    riskLevel: 'Todos',
    dateRange: 'Todos'
  });

  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredClients = useMemo(() => {
    let filtered = clients.filter(client => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          client.name.toLowerCase().includes(searchLower) ||
          client.email.toLowerCase().includes(searchLower) ||
          (client.contact && client.contact.toLowerCase().includes(searchLower));
        if (!matchesSearch) return false;
      }

      // Tier filter
      if (filters.tier !== 'Todos' && client.tier !== filters.tier) {
        return false;
      }

      // Status filter
      if (filters.status !== 'Todos' && client.status !== filters.status) {
        return false;
      }

      // NPS Category filter
      if (filters.npsCategory !== 'Todos' && client.npsCategory !== filters.npsCategory) {
        return false;
      }

      // MRR range filter
      const clientMRR = client.ltv || 0; // Using ltv as MRR equivalent
      if (clientMRR < filters.mrrRange[0] || clientMRR > filters.mrrRange[1]) {
        return false;
      }

      // LTV range filter
      const clientLTV = client.ltvProjected || 0;
      if (clientLTV < filters.ltvRange[0] || clientLTV > filters.ltvRange[1]) {
        return false;
      }

      // Risk level filter
      if (filters.riskLevel !== 'Todos') {
        const riskLevel = client.riskScore > 70 ? 'Alto' : 
                         client.riskScore > 40 ? 'Médio' : 'Baixo';
        if (riskLevel !== filters.riskLevel) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof DisplayClient];
      let bValue: any = b[sortBy as keyof DisplayClient];

      // Handle different data types
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
  }, [clients, filters, sortBy, sortOrder]);

  const updateFilter = (key: keyof ClientFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      tier: 'Todos',
      status: 'Todos',
      npsCategory: 'Todos',
      mrrRange: [0, 50000],
      ltvRange: [0, 500000],
      riskLevel: 'Todos',
      dateRange: 'Todos'
    });
  };

  const getFilterCounts = () => {
    const tierCounts: Record<string, number> = {};
    const statusCounts: Record<string, number> = {};
    const npsCounts: Record<string, number> = {};

    clients.forEach(client => {
      // Tier counts
      tierCounts[client.tier] = (tierCounts[client.tier] || 0) + 1;
      
      // Status counts
      statusCounts[client.status] = (statusCounts[client.status] || 0) + 1;
      
      // NPS counts
      if (client.npsCategory) {
        npsCounts[client.npsCategory] = (npsCounts[client.npsCategory] || 0) + 1;
      }
    });

    return { tierCounts, statusCounts, npsCounts };
  };

  const handleSortChange = (field: string, order: 'asc' | 'desc') => {
    setSortBy(field);
    setSortOrder(order);
  };

  return {
    filters,
    filteredClients,
    updateFilter,
    resetFilters,
    getFilterCounts,
    sortBy,
    sortOrder,
    handleSortChange
  };
};
