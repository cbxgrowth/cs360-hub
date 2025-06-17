
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { FileText } from 'lucide-react';
import { ContractStatusBadge } from './view-modal/ContractStatusBadge';
import { ClientInfoCard } from './view-modal/ClientInfoCard';
import { ContractDetailsCard } from './view-modal/ContractDetailsCard';
import { FinancialInfoCard } from './view-modal/FinancialInfoCard';
import { DatesInfoCard } from './view-modal/DatesInfoCard';
import { ServicesCard } from './view-modal/ServicesCard';
import { HistoryCard } from './view-modal/HistoryCard';

interface ContractViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  contract: any;
}

export const ContractViewModal: React.FC<ContractViewModalProps> = ({
  isOpen,
  onClose,
  contract
}) => {
  if (!contract) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Visualizar Contrato - {contract.contract_number}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <ContractStatusBadge 
            status={contract.status} 
            endDate={contract.end_date} 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ClientInfoCard client={contract.clients} />
            <ContractDetailsCard 
              contractNumber={contract.contract_number}
              renewalStatus={contract.renewal_status}
            />
            <FinancialInfoCard value={contract.value} />
            <DatesInfoCard 
              startDate={contract.start_date}
              endDate={contract.end_date}
            />
          </div>

          <ServicesCard services={contract.services} />
          <HistoryCard 
            createdAt={contract.created_at}
            updatedAt={contract.updated_at}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
