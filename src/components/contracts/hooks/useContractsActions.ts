
import { useToast } from '../../../hooks/use-toast';
import { exportContractsToCSV } from '../utils/contractUtils';
import type { Contract } from '../types/contractTypes';

interface UseContractsActionsProps {
  filteredContracts: Contract[];
  createContract: (data: any) => Promise<any>;
  updateContract: (id: string, data: any) => Promise<any>;
  deleteContract: (id: string) => Promise<any>;
  refetch: () => void;
  selectedContract: Contract | null;
  setSelectedContract: (contract: Contract | null) => void;
  setIsFormOpen: (open: boolean) => void;
  setIsViewModalOpen: (open: boolean) => void;
  setIsRenewalModalOpen: (open: boolean) => void;
}

export const useContractsActions = ({
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
}: UseContractsActionsProps) => {
  const { toast } = useToast();

  const handleExport = () => {
    if (filteredContracts.length === 0) {
      toast({
        title: "Aviso",
        description: "Não há contratos para exportar",
        variant: "destructive",
      });
      return;
    }
    
    exportContractsToCSV(filteredContracts);
    toast({
      title: "Sucesso",
      description: "Contratos exportados com sucesso",
    });
  };

  const handleImport = async (data: any[]) => {
    try {
      console.log('Contratos importados:', data);
      for (const contractData of data) {
        await createContract(contractData);
      }
      
      toast({
        title: "Sucesso",
        description: `${data.length} contratos importados com sucesso`,
      });
      
      refetch();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao importar contratos",
        variant: "destructive",
      });
    }
  };

  const handleContractSubmit = async (data: any) => {
    try {
      if (selectedContract) {
        await updateContract(selectedContract.id, data);
        toast({
          title: "Sucesso",
          description: "Contrato atualizado com sucesso",
        });
      } else {
        await createContract(data);
        toast({
          title: "Sucesso",
          description: "Contrato criado com sucesso",
        });
      }
      
      refetch();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar contrato",
        variant: "destructive",
      });
    }
  };

  const handleEditContract = (contract: Contract) => {
    setSelectedContract(contract);
    setIsFormOpen(true);
  };

  const handleViewContract = (contract: Contract) => {
    setSelectedContract(contract);
    setIsViewModalOpen(true);
  };

  const handleRenewContract = (contract: Contract) => {
    setSelectedContract(contract);
    setIsRenewalModalOpen(true);
  };

  const handleDeleteContract = async (contractIds: string[]) => {
    try {
      for (const id of contractIds) {
        await deleteContract(id);
      }
      
      toast({
        title: "Sucesso",
        description: `${contractIds.length} contrato(s) excluído(s) com sucesso`,
      });
      
      refetch();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir contratos",
        variant: "destructive",
      });
    }
  };

  return {
    handleExport,
    handleImport,
    handleContractSubmit,
    handleEditContract,
    handleViewContract,
    handleRenewContract,
    handleDeleteContract,
  };
};
