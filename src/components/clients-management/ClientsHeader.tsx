
import React from 'react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Upload, Download, Plus, Users, FileJson, FileSpreadsheet, ChevronDown } from 'lucide-react';

interface ClientsHeaderProps {
  onImport: () => void;
  onExport: (format?: 'json' | 'excel') => void;
  onNewClient: () => void;
}

export const ClientsHeader = ({ onImport, onExport, onNewClient }: ClientsHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-border">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestão de Clientes</h1>
          <p className="text-sm text-muted-foreground">Administração completa da sua base de clientes</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button variant="outline" onClick={onImport} className="flex items-center space-x-2">
          <Upload className="w-4 h-4" />
          <span>Importar</span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Exportar</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onExport('json')}>
              <FileJson className="w-4 h-4 mr-2" />
              Exportar JSON
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onExport('excel')}>
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Exportar Excel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button onClick={onNewClient} className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Novo Cliente
        </Button>
      </div>
    </div>
  );
};
