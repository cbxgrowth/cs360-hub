
import React from 'react';
import { ContractsHeader } from './contracts/ContractsHeader';
import { ContractsMetrics } from './contracts/ContractsMetrics';
import { ContractsTabs } from './contracts/ContractsTabs';
import { ContractsModals } from './contracts/ContractsModals';
import { useContractsManagement } from './contracts/hooks/useContractsManagement';

export const ContractsManagement = () => {
  const {
    searchTerm,
    statusFilter,
    isFormOpen,
    isImportModalOpen,
    isViewModalOpen,
    isRenewalModalOpen,
    selectedContract,
    activeTab,
    loading,
    contracts,
    filteredContracts,
    clients,
    transformedServices,
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
  } = useContractsManagement();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ContractsMetrics contracts={contracts} />

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <ContractsHeader
            onImport={() => setIsImportModalOpen(true)}
            onExport={handleExport}
            onNewContract={() => setIsFormOpen(true)}
          />

          <ContractsTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            filteredContracts={filteredContracts}
            contracts={contracts}
            onEdit={handleEditContract}
            onView={handleViewContract}
            onRenew={handleRenewContract}
            onDelete={handleDeleteContract}
          />
        </div>
      </div>

      <ContractsModals
        isFormOpen={isFormOpen}
        onFormClose={() => {
          setIsFormOpen(false);
          setSelectedContract(null);
        }}
        isImportModalOpen={isImportModalOpen}
        onImportModalClose={() => setIsImportModalOpen(false)}
        isViewModalOpen={isViewModalOpen}
        onViewModalClose={() => setIsViewModalOpen(false)}
        isRenewalModalOpen={isRenewalModalOpen}
        onRenewalModalClose={() => setIsRenewalModalOpen(false)}
        selectedContract={selectedContract}
        onContractSubmit={handleContractSubmit}
        onImport={handleImport}
        clients={clients}
        transformedServices={transformedServices}
        generateContractNumber={generateContractNumber}
      />
    </div>
  );
};

export default ContractsManagement;
