
import React from 'react';
import { Eye } from 'lucide-react';

export const ContractsEmptyState: React.FC = () => {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
        <Eye className="w-12 h-12 mx-auto" />
      </div>
      <p className="text-gray-500 dark:text-gray-400">Nenhum contrato encontrado</p>
    </div>
  );
};
