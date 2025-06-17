
import React from 'react';
import { FileText, Upload, Download, Plus } from 'lucide-react';
import { Button } from '../ui/button';

interface ContractsHeaderProps {
  onImport: () => void;
  onExport: () => void;
  onNewContract: () => void;
}

export const ContractsHeader: React.FC<ContractsHeaderProps> = ({
  onImport,
  onExport,
  onNewContract
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-3">
        <FileText className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Gestão de Contratos
        </h2>
      </div>
      <div className="flex items-center space-x-3">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onImport}
          className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <Upload className="w-4 h-4 mr-2" />
          Importar
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onExport}
          className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar
        </Button>
        <Button 
          size="sm" 
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
          onClick={onNewContract}
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Contrato
        </Button>
      </div>
    </div>
  );
};
