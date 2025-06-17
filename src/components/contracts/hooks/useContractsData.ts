
import { useState, useEffect } from 'react';
import { useContracts } from '../../../hooks/useContracts';
import { useClients } from '../../../hooks/useClients';
import { useServices } from '../../../hooks/useServices';
import type { Contract, TransformedService } from '../types/contractTypes';

export const useContractsData = () => {
  const { contracts: rawContracts, loading, error, createContract, updateContract, deleteContract, refetch } = useContracts();
  const { clients } = useClients();
  const { services } = useServices();

  // Transform raw contracts to match our Contract interface
  const contracts: Contract[] = rawContracts.map(contract => ({
    ...contract,
    services: contract.services || [],
    clients: contract.clients ? {
      ...contract.clients,
      tier: 'B' // Set default tier since it doesn't exist in the client data
    } : undefined
  }));

  // Transform services to match expected format
  const transformedServices: TransformedService[] = services.map(service => ({
    id: parseInt(service.id.slice(0, 8), 16),
    name: service.name,
    category: service.category
  }));

  const generateContractNumber = () => {
    const currentYear = new Date().getFullYear();
    const existingContracts = rawContracts.filter((c: any) => 
      c.contract_number?.includes(currentYear.toString())
    );
    const nextNumber = existingContracts.length + 1;
    return `CT-${currentYear}-${nextNumber.toString().padStart(3, '0')}`;
  };

  return {
    contracts,
    clients,
    transformedServices,
    loading,
    error,
    createContract,
    updateContract,
    deleteContract,
    refetch,
    generateContractNumber,
  };
};
