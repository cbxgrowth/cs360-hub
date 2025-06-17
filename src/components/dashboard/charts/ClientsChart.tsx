
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Users, Eye, ArrowUpRight } from 'lucide-react';

const clientsData = [
  { month: 'Jan', new: 15, churned: 3, total: 118 },
  { month: 'Fev', new: 12, churned: 2, total: 128 },
  { month: 'Mar', new: 18, churned: 4, total: 142 },
  { month: 'Abr', new: 22, churned: 3, total: 161 },
  { month: 'Mai', new: 16, churned: 2, total: 175 },
  { month: 'Jun', new: 9, churned: 1, total: 183 }
];

export const ClientsChart: React.FC = () => {
  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-3">
          <Users className="w-5 h-5 text-blue-600" />
          <div>
            <CardTitle className="text-lg text-gray-900 dark:text-white">
              Evolução de Clientes
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Novos clientes vs. Churn
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            183 ativos
          </Badge>
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={clientsData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border)',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="new" fill="#10B981" name="Novos" radius={[4, 4, 0, 0]} />
            <Bar dataKey="churned" fill="#EF4444" name="Churn" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Net Growth</p>
            <p className="text-lg font-bold text-green-600">+8 clientes</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Churn Rate</p>
            <p className="text-lg font-bold text-red-600">0.5%</p>
          </div>
          <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
            Analisar
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
