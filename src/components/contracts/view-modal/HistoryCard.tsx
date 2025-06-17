
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Clock } from 'lucide-react';
import { formatDate } from '../utils/contractUtils';

interface HistoryCardProps {
  createdAt?: string;
  updatedAt?: string;
}

export const HistoryCard: React.FC<HistoryCardProps> = ({
  createdAt,
  updatedAt
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="w-5 h-5" />
          Histórico
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Criado em</label>
          <p className="text-gray-900 dark:text-white">{formatDate(createdAt)}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Última Atualização</label>
          <p className="text-gray-900 dark:text-white">{formatDate(updatedAt)}</p>
        </div>
      </CardContent>
    </Card>
  );
};
