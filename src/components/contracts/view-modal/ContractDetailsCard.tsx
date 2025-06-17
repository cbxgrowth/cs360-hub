
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { FileText } from 'lucide-react';

interface ContractDetailsCardProps {
  contractNumber: string;
  renewalStatus: string;
}

export const ContractDetailsCard: React.FC<ContractDetailsCardProps> = ({
  contractNumber,
  renewalStatus
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="w-5 h-5" />
          Detalhes do Contrato
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Número</label>
          <p className="text-gray-900 dark:text-white font-mono">{contractNumber}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Status de Renovação</label>
          <Badge variant="outline" className="ml-2">
            {renewalStatus === 'renewed' ? 'Renovado' :
             renewalStatus === 'pending' ? 'Pendente' :
             renewalStatus === 'negotiating' ? 'Em Negociação' : 'Rejeitado'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
