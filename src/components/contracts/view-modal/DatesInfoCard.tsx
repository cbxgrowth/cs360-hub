
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { CalendarIcon } from 'lucide-react';
import { formatDate, calculateDaysToExpiry } from '../utils/contractUtils';

interface DatesInfoCardProps {
  startDate: string;
  endDate: string;
}

export const DatesInfoCard: React.FC<DatesInfoCardProps> = ({
  startDate,
  endDate
}) => {
  const daysToExpiry = calculateDaysToExpiry(endDate);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <CalendarIcon className="w-5 h-5" />
          Datas Importantes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Data de Início</label>
          <p className="text-gray-900 dark:text-white">{formatDate(startDate)}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Data de Término</label>
          <p className="text-gray-900 dark:text-white">{formatDate(endDate)}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Dias para Vencimento</label>
          <p className={`font-medium ${
            daysToExpiry < 0 ? 'text-red-600' :
            daysToExpiry <= 30 ? 'text-orange-600' : 'text-green-600'
          }`}>
            {daysToExpiry < 0 ? 'Vencido' : `${daysToExpiry} dias`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
