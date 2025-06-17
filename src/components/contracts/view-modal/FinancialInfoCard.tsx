
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { DollarSign } from 'lucide-react';
import { formatCurrency } from '../utils/contractUtils';

interface FinancialInfoCardProps {
  value: number;
}

export const FinancialInfoCard: React.FC<FinancialInfoCardProps> = ({ value }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <DollarSign className="w-5 h-5" />
          Informações Financeiras
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Valor Total</label>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(value)}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Valor Mensal</label>
          <p className="text-gray-900 dark:text-white">{formatCurrency(value / 12)}</p>
        </div>
      </CardContent>
    </Card>
  );
};
