
import React from 'react';
import { Badge } from '../../ui/badge';
import { AlertTriangle } from 'lucide-react';
import { calculateDaysToExpiry } from '../utils/contractUtils';

interface ContractStatusBadgeProps {
  status: string;
  endDate: string;
}

export const ContractStatusBadge: React.FC<ContractStatusBadgeProps> = ({
  status,
  endDate
}) => {
  const daysToExpiry = calculateDaysToExpiry(endDate);
  const isExpiringSoon = daysToExpiry <= 30 && daysToExpiry > 0;
  const isExpired = daysToExpiry < 0;

  const getStatusColor = (status: string) => {
    const colors = {
      'active': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      'expired': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      'suspended': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      'cancelled': 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    };
    return colors[status as keyof typeof colors] || colors['active'];
  };

  return (
    <div className="flex items-center justify-between">
      <Badge className={getStatusColor(status)}>
        {status === 'active' ? 'Ativo' : 
         status === 'expired' ? 'Vencido' :
         status === 'suspended' ? 'Suspenso' : 'Cancelado'}
      </Badge>
      
      {(isExpiringSoon || isExpired) && (
        <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
          <AlertTriangle className="w-4 h-4" />
          <span className="text-sm font-medium">
            {isExpired ? 'Contrato Vencido' : `Vence em ${daysToExpiry} dias`}
          </span>
        </div>
      )}
    </div>
  );
};
