
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';

interface OpportunitiesTabProps {
  client: any;
}

export const OpportunitiesTab = ({ client }: OpportunitiesTabProps) => {
  return (
    <Card className="border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          <TrendingUp className="w-5 h-5" />
          Oportunidades de Crescimento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {client.opportunities?.map((opportunity: string, index: number) => (
            <div key={index} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium text-gray-900 dark:text-white">{opportunity}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 ml-6">
                Potencial de aumento de receita e satisfação do cliente
              </p>
            </div>
          )) || (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              Nenhuma oportunidade identificada no momento
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
