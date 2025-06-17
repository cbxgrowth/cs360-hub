
import { useState } from 'react';
import type { Contract } from '../types/contractTypes';

export const useContractsModals = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isRenewalModalOpen, setIsRenewalModalOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);

  return {
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
  };
};
