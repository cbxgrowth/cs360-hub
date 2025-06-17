
import React from 'react';
import { TableHead, TableHeader, TableRow } from '../../ui/table';
import { Checkbox } from '../../ui/checkbox';

interface ContractsTableHeaderProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
}

export const ContractsTableHeader: React.FC<ContractsTableHeaderProps> = ({
  selectedCount,
  totalCount,
  onSelectAll
}) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-12">
          <Checkbox
            checked={selectedCount === totalCount && totalCount > 0}
            onCheckedChange={onSelectAll}
          />
        </TableHead>
        <TableHead>Cliente</TableHead>
        <TableHead>Contrato</TableHead>
        <TableHead>Período</TableHead>
        <TableHead>Valor</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Renovação</TableHead>
        <TableHead>Vencimento</TableHead>
        <TableHead>Ações</TableHead>
      </TableRow>
    </TableHeader>
  );
};
