
import React, { useState } from 'react';
import { Table, TableBody } from '../ui/table';
import { ContractsTableHeader } from './table/ContractsTableHeader';
import { ContractsTableRow } from './table/ContractsTableRow';
import { ContractsBulkActions } from './table/ContractsBulkActions';
import { ContractsEmptyState } from './table/ContractsEmptyState';
import type { Contract } from './types/contractTypes';

interface ContractsTableProps {
  contracts: Contract[];
  onEdit: (contract: Contract) => void;
  onView: (contract: Contract) => void;
  onRenew: (contract: Contract) => void;
  onDelete: (contractIds: string[]) => void;
}

export const ContractsTable: React.FC<ContractsTableProps> = ({
  contracts,
  onEdit,
  onView,
  onRenew,
  onDelete
}) => {
  const [selectedContracts, setSelectedContracts] = useState<string[]>([]);

  const handleSelectContract = (contractId: string) => {
    setSelectedContracts(prev => 
      prev.includes(contractId) 
        ? prev.filter(id => id !== contractId)
        : [...prev, contractId]
    );
  };

  const handleSelectAll = () => {
    if (selectedContracts.length === contracts.length) {
      setSelectedContracts([]);
    } else {
      setSelectedContracts(contracts.map(c => c.id));
    }
  };

  const handleBulkDelete = () => {
    if (selectedContracts.length > 0) {
      onDelete(selectedContracts);
      setSelectedContracts([]);
    }
  };

  const handleDuplicateContract = (contract: Contract) => {
    const duplicatedContract = {
      ...contract,
      id: undefined,
      contract_number: `${contract.contract_number}-COPY`,
      status: 'active'
    };
    onEdit(duplicatedContract);
  };

  if (contracts.length === 0) {
    return <ContractsEmptyState />;
  }

  return (
    <div className="space-y-4">
      <ContractsBulkActions
        selectedCount={selectedContracts.length}
        onBulkDelete={handleBulkDelete}
        onClearSelection={() => setSelectedContracts([])}
      />

      <div className="overflow-x-auto">
        <Table>
          <ContractsTableHeader
            selectedCount={selectedContracts.length}
            totalCount={contracts.length}
            onSelectAll={handleSelectAll}
          />
          <TableBody>
            {contracts.map((contract) => (
              <ContractsTableRow
                key={contract.id}
                contract={contract}
                isSelected={selectedContracts.includes(contract.id)}
                onSelect={handleSelectContract}
                onEdit={onEdit}
                onView={onView}
                onRenew={onRenew}
                onDelete={onDelete}
                onDuplicate={handleDuplicateContract}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
