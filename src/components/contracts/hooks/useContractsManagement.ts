
import { useState, useEffect } from 'react';
import { useToast } from '../../../hooks/use-toast';
import { useContractsData } from './useContractsData';
import { useContractsFilters } from './useContractsFilters';
import { useContractsModals } from './useContractsModals';
import { useContractsActions } from './useContractsActions';

export const useContractsManagement = () => {
  const [activeTab, setActiveTab] = useState('list');
  const { toast } = useToast();

  // Data management
  const {
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
  } = useContractsData();

  // Filters management
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredContracts,
  } = useContractsFilters(contracts);

  // Modals management
  const {
    isFormOpen,
    setIsFormOpen,
    isImportModalOpen,
    setIsImportModalOpen,
    isViewModalOpen,
    setIsViewModalOpen,
    isRenewalModalOpen,
    setIsRenewalModalOpen,
    selectedContract,
    setSelectedContract,
  } = useContractsModals();

  // Actions management
  const {
    handleExport,
    handleImport,
    handleContractSubmit,
    handleEditContract,
    handleViewContract,
    handleRenewContract,
    handleDeleteContract,
  } = useContractsActions({
    filteredContracts,
    createContract,
    updateContract,
    deleteContract,
    refetch,
    selectedContract,
    setSelectedContract,
    setIsFormOpen,
    setIsViewModalOpen,
    setIsRenewalModalOpen,
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Erro",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return {
    // State
    searchTerm,
    statusFilter,
    isFormOpen,
    isImportModalOpen,
    isViewModalOpen,
    isRenewalModalOpen,
    selectedContract,
    activeTab,
    loading,
    error,
    
    // Data
    contracts,
    filteredContracts,
    clients,
    transformedServices,
    
    // Actions
    setSearchTerm,
    setStatusFilter,
    setIsFormOpen,
    setIsImportModalOpen,
    setIsViewModalOpen,
    setIsRenewalModalOpen,
    setSelectedContract,
    setActiveTab,
    handleExport,
    handleImport,
    handleContractSubmit,
    handleEditContract,
    handleViewContract,
    handleRenewContract,
    handleDeleteContract,
    generateContractNumber,
  };
};
