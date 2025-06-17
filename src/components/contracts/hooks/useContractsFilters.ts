
import { useState } from 'react';
import type { Contract } from '../types/contractTypes';

export const useContractsFilters = (contracts: Contract[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');

  const filteredContracts = contracts.filter((contract: Contract) => {
    const matchesSearch = 
      contract.clients?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.contract_number?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Todos' || contract.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredContracts,
  };
};
