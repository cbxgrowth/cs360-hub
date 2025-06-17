
import React from 'react';
import { ContractForm } from '../ContractForm';
import { ContractImportModal } from './ContractImportModal';
import { ContractViewModal } from './ContractViewModal';
import { ContractRenewalModal } from './ContractRenewalModal';
import type { Contract, TransformedService } from './types/contractTypes';

interface ContractsModalsProps {
  isFormOpen: boolean;
  onFormClose: () => void;
  isImportModalOpen: boolean;
  onImportModalClose: () => void;
  isViewModalOpen: boolean;
  onViewModalClose: () => void;
  isRenewalModalOpen: boolean;
  onRenewalModalClose: () => void;
  selectedContract: Contract | null;
  onContractSubmit: (data: any) => void;
  onImport: (data: any[]) => void;
  clients: any[];
  transformedServices: TransformedService[];
  generateContractNumber: () => string;
}

export const ContractsModals: React.FC<ContractsModalsProps> = ({
  isFormOpen,
  onFormClose,
  isImportModalOpen,
  onImportModalClose,
  isViewModalOpen,
  onViewModalClose,
  isRenewalModalOpen,
  onRenewalModalClose,
  selectedContract,
  onContractSubmit,
  onImport,
  clients,
  transformedServices,
  generateContractNumber
}) => {
  return (
    <>
      <ContractForm
        isOpen={isFormOpen}
        onClose={onFormClose}
        onSubmit={onContractSubmit}
        contract={selectedContract}
        registeredClients={clients}
        registeredServices={transformedServices}
        suggestedContractNumber={generateContractNumber()}
      />

      <ContractImportModal
        isOpen={isImportModalOpen}
        onClose={onImportModalClose}
        onImport={onImport}
      />

      <ContractViewModal
        isOpen={isViewModalOpen}
        onClose={onViewModalClose}
        contract={selectedContract}
      />

      <ContractRenewalModal
        isOpen={isRenewalModalOpen}
        onClose={onRenewalModalClose}
        contract={selectedContract}
        onRenew={onContractSubmit}
      />
    </>
  );
};
