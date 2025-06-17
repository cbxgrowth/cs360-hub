
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { User } from 'lucide-react';
import type { ContractClient } from '../types/contractTypes';

interface ClientInfoCardProps {
  client?: ContractClient;
}

export const ClientInfoCard: React.FC<ClientInfoCardProps> = ({ client }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <User className="w-5 h-5" />
          Informações do Cliente
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Nome</label>
          <p className="text-gray-900 dark:text-white">{client?.name || '-'}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</label>
          <p className="text-gray-900 dark:text-white">{client?.email || '-'}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Empresa</label>
          <p className="text-gray-900 dark:text-white">{client?.company || '-'}</p>
        </div>
      </CardContent>
    </Card>
  );
};
