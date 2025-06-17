
import React from 'react';
import { FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { getStatusColor } from '../utils/styleUtils';

interface ContractsTabProps {
  client: any;
}

export const ContractsTab = ({ client }: ContractsTabProps) => {
  return (
    <Card className="border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          <FileText className="w-5 h-5" />
          Contratos Ativos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {client.contracts?.map((contract: any, index: number) => (
            <div key={index} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{contract.id}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{contract.service}</p>
                </div>
                <Badge className={getStatusColor(contract.status)}>{contract.status}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-green-600 dark:text-green-400">
                  R$ {(contract.value / 1000).toFixed(0)}k/ano
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Renovação em breve
                </span>
              </div>
            </div>
          )) || (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              Nenhum contrato ativo encontrado
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
