
import React from 'react';
import { TableCell, TableRow } from '../../ui/table';
import { Button } from '../../ui/button';
import { Checkbox } from '../../ui/checkbox';
import { Badge } from '../../ui/badge';
import { 
  Eye, 
  AlertTriangle, 
  Edit, 
  RefreshCw, 
  Trash2, 
  MoreHorizontal,
  Copy,
  Download
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { formatCurrency, formatDate, calculateDaysToExpiry } from '../utils/contractUtils';
import type { Contract } from '../types/contractTypes';

interface ContractsTableRowProps {
  contract: Contract;
  isSelected: boolean;
  onSelect: (contractId: string) => void;
  onEdit: (contract: Contract) => void;
  onView: (contract: Contract) => void;
  onRenew: (contract: Contract) => void;
  onDelete: (contractIds: string[]) => void;
  onDuplicate: (contract: Contract) => void;
}

export const ContractsTableRow: React.FC<ContractsTableRowProps> = ({
  contract,
  isSelected,
  onSelect,
  onEdit,
  onView,
  onRenew,
  onDelete,
  onDuplicate
}) => {
  const daysToExpiry = calculateDaysToExpiry(contract.end_date);

  const getStatusColor = (status: string) => {
    const colors = {
      'active': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      'expired': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      'suspended': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      'cancelled': 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    };
    return colors[status as keyof typeof colors] || colors['active'];
  };

  const getRenewalColor = (status: string) => {
    const colors = {
      'renewed': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      'negotiating': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      'rejected': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
    };
    return colors[status as keyof typeof colors] || colors['pending'];
  };

  const getExpiryColor = (days: number) => {
    if (days < 0) return 'text-red-600 dark:text-red-400';
    if (days <= 30) return 'text-orange-600 dark:text-orange-400';
    if (days <= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-green-600 dark:text-green-400';
  };

  const statusLabels = {
    'active': 'Ativo',
    'expired': 'Vencido',
    'suspended': 'Suspenso',
    'cancelled': 'Cancelado'
  };

  const renewalLabels = {
    'renewed': 'Renovado',
    'pending': 'Pendente',
    'negotiating': 'Em Negociação',
    'rejected': 'Rejeitado'
  };

  return (
    <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-700">
      <TableCell>
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onSelect(contract.id)}
        />
      </TableCell>
      <TableCell>
        <div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {contract.clients?.name || '-'}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {contract.clients?.company || '-'}
          </div>
          {contract.clients?.tier && (
            <Badge variant="outline" className="text-xs mt-1">
              Nível {contract.clients.tier}
            </Badge>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="text-sm font-medium text-gray-900 dark:text-white font-mono">
          {contract.contract_number}
        </div>
        {contract.services && contract.services.length > 0 && (
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            <div className="flex flex-wrap gap-1">
              {contract.services.slice(0, 2).map((service, index) => (
                <span key={index} className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
                  {service}
                </span>
              ))}
              {contract.services.length > 2 && (
                <span className="text-xs text-gray-500">
                  +{contract.services.length - 2} mais
                </span>
              )}
            </div>
          </div>
        )}
      </TableCell>
      <TableCell>
        <div className="text-sm text-gray-900 dark:text-white">
          {formatDate(contract.start_date)}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          até {formatDate(contract.end_date)}
        </div>
      </TableCell>
      <TableCell>
        <div className="text-sm font-medium text-gray-900 dark:text-white">
          {formatCurrency(contract.value)}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {formatCurrency(contract.value / 12)}/mês
        </div>
      </TableCell>
      <TableCell>
        <Badge className={getStatusColor(contract.status)}>
          {statusLabels[contract.status as keyof typeof statusLabels] || contract.status}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge className={getRenewalColor(contract.renewal_status)}>
          {renewalLabels[contract.renewal_status as keyof typeof renewalLabels] || contract.renewal_status}
        </Badge>
      </TableCell>
      <TableCell>
        <div className={`text-sm font-medium ${getExpiryColor(daysToExpiry)}`}>
          {daysToExpiry > 0 ? `${daysToExpiry} dias` : 'Vencido'}
        </div>
        {daysToExpiry <= 30 && daysToExpiry > 0 && (
          <AlertTriangle className="w-4 h-4 text-orange-500 mt-1" />
        )}
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={() => onView(contract)}>
            <Eye className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onEdit(contract)}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onRenew(contract)}>
            <RefreshCw className="w-4 h-4" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => onDuplicate(contract)}>
                <Copy className="w-4 h-4 mr-2" />
                Duplicar Contrato
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="w-4 h-4 mr-2" />
                Exportar PDF
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => onDelete([contract.id])}
                className="text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  );
};
