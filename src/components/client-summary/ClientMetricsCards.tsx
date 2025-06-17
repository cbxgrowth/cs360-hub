
import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, AlertTriangle, FileText } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { getNPSColor, getRiskColor } from './utils/styleUtils';

interface ClientMetricsCardsProps {
  client: any;
}

export const ClientMetricsCards = ({ client }: ClientMetricsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card className="border-gray-200 dark:border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">NPS Score</p>
              <p className={`text-2xl font-bold ${getNPSColor(client.npsCategory)}`}>{client.nps}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{client.npsCategory}</p>
            </div>
            {client.npsCategory === 'Promotor' ? (
              <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
            ) : (
              <TrendingDown className="w-8 h-8 text-red-600 dark:text-red-400" />
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200 dark:border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">LTV Atual</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">R$ {(client.ltv / 1000).toFixed(0)}k</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Proj: R$ {(client.ltvProjected / 1000).toFixed(0)}k</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200 dark:border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Risco de Churn</p>
              <Badge className={getRiskColor(client.riskScore)}>{client.riskScore}%</Badge>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {client.riskScore <= 30 ? 'Baixo' : client.riskScore <= 60 ? 'Médio' : 'Alto'}
              </p>
            </div>
            <AlertTriangle className={`w-8 h-8 ${client.riskScore > 60 ? 'text-red-600 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-400'}`} />
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200 dark:border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Contratos</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{client.contracts?.length || 0}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Ativos</p>
            </div>
            <FileText className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
