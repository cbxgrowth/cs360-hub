
import React from 'react';
import { Button } from '../../ui/button';
import { Trash2 } from 'lucide-react';

interface ContractsBulkActionsProps {
  selectedCount: number;
  onBulkDelete: () => void;
  onClearSelection: () => void;
}

export const ContractsBulkActions: React.FC<ContractsBulkActionsProps> = ({
  selectedCount,
  onBulkDelete,
  onClearSelection
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
      <div className="flex items-center justify-between">
        <span className="text-sm text-blue-700 dark:text-blue-300">
          {selectedCount} contrato(s) selecionado(s)
        </span>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={onBulkDelete}
            className="text-red-600 border-red-300 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Excluir Selecionados
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={onClearSelection}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};
