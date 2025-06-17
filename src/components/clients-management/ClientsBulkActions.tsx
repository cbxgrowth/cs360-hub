
import React, { useRef, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { 
  Mail, 
  Download, 
  Trash2, 
  Edit, 
  X,
  Users,
  Filter
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import type { DisplayClient } from './adapters/clientsAdapter';

interface ClientsBulkActionsProps {
  clients: DisplayClient[];
  selectedClients: number[];
  onSelectClient: (clientId: number) => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onBulkAction: (action: string, clientIds: number[]) => void;
}

export const ClientsBulkActions: React.FC<ClientsBulkActionsProps> = ({
  clients,
  selectedClients,
  onSelectClient,
  onSelectAll,
  onClearSelection,
  onBulkAction
}) => {
  const checkboxRef = useRef<React.ElementRef<typeof Checkbox>>(null);
  const allSelected = selectedClients.length === clients.length && clients.length > 0;
  const someSelected = selectedClients.length > 0 && selectedClients.length < clients.length;

  useEffect(() => {
    if (checkboxRef.current) {
      // The Radix UI checkbox primitive uses a button element internally
      const buttonElement = checkboxRef.current as any;
      if (buttonElement && 'indeterminate' in buttonElement) {
        buttonElement.indeterminate = someSelected;
      }
    }
  }, [someSelected]);

  if (selectedClients.length === 0) {
    return null;
  }

  return (
    <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                ref={checkboxRef}
                checked={allSelected}
                onCheckedChange={onSelectAll}
              />
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <Users className="w-3 h-3 mr-1" />
                {selectedClients.length} selecionado(s)
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              className="text-blue-600 hover:text-blue-700"
            >
              <X className="w-4 h-4 mr-1" />
              Limpar seleção
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('export', selectedClients)}
              className="border-blue-300 text-blue-700 hover:bg-blue-100"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('email', selectedClients)}
              className="border-blue-300 text-blue-700 hover:bg-blue-100"
            >
              <Mail className="w-4 h-4 mr-2" />
              Enviar Email
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-300 text-blue-700 hover:bg-blue-100"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editar em Lote
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => onBulkAction('updateTier', selectedClients)}
                >
                  Alterar Nível
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onBulkAction('updateStatus', selectedClients)}
                >
                  Alterar Status
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('delete', selectedClients)}
              className="border-red-300 text-red-700 hover:bg-red-100"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
