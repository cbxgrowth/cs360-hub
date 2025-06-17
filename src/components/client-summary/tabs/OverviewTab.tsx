
import React from 'react';
import { Users, Mail, Calendar, FileText, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { getTierColor, getStatusColor } from '../utils/styleUtils';

interface OverviewTabProps {
  client: any;
}

export const OverviewTab = ({ client }: OverviewTabProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Users className="w-5 h-5" />
            Informações do Cliente
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge className={getTierColor(client.tier)}>Nível {client.tier}</Badge>
            <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600 dark:text-gray-400">Contato:</span>
              <span className="font-medium text-gray-900 dark:text-white">{client.contact}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600 dark:text-gray-400">Email:</span>
              <span className="font-medium text-gray-900 dark:text-white">{client.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600 dark:text-gray-400">Última Interação:</span>
              <span className="font-medium text-gray-900 dark:text-white">{client.lastInteraction}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <FileText className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600 dark:text-gray-400">Perfil:</span>
              <span className="font-medium text-gray-900 dark:text-white">{client.profile}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <TrendingUp className="w-5 h-5" />
            Métricas Avançadas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400">Serviços Ativos</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{client.services}</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400">Nível de Confiança</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{client.trust}/5</p>
            </div>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Fim do Contrato</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{client.contractEnd}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
