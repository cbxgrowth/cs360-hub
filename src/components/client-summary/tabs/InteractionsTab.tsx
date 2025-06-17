
import React from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';

interface InteractionsTabProps {
  client: any;
}

export const InteractionsTab = ({ client }: InteractionsTabProps) => {
  return (
    <Card className="border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          <Calendar className="w-5 h-5" />
          Histórico de Interações
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">Reunião de Alinhamento</h4>
              <span className="text-sm text-gray-500 dark:text-gray-400">{client.lastInteraction}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Discussão sobre novas funcionalidades e roadmap do produto.
            </p>
          </div>
          <div className="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">Suporte Técnico</h4>
              <span className="text-sm text-gray-500 dark:text-gray-400">2024-01-10</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Resolução de problema de integração - ticket resolvido com sucesso.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
