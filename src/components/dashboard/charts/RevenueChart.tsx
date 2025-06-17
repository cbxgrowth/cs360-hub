
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { DollarSign, Eye, ArrowUpRight } from 'lucide-react';

const revenueData = [
  { month: 'Jan', mrr: 420, arr: 5040, growth: 12 },
  { month: 'Fev', mrr: 445, arr: 5340, growth: 15 },
  { month: 'Mar', mrr: 470, arr: 5640, growth: 18 },
  { month: 'Abr', mrr: 485, arr: 5820, growth: 22 },
  { month: 'Mai', mrr: 520, arr: 6240, growth: 25 },
  { month: 'Jun', mrr: 545, arr: 6540, growth: 28 }
];

export const RevenueChart: React.FC = () => {
  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-3">
          <DollarSign className="w-5 h-5 text-green-600" />
          <div>
            <CardTitle className="text-lg text-gray-900 dark:text-white">
              Crescimento de Receita
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              MRR e ARR ao longo dos meses
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            +28% crescimento
          </Badge>
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border)',
                borderRadius: '8px'
              }}
              formatter={(value, name) => [
                `R$ ${value}k`,
                name === 'mrr' ? 'MRR' : 'ARR'
              ]}
            />
            <Area type="monotone" dataKey="mrr" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
            <Area type="monotone" dataKey="growth" stackId="2" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.4} />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">MRR Atual</p>
            <p className="text-lg font-bold text-green-600">R$ 545k</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">ARR Projetado</p>
            <p className="text-lg font-bold text-blue-600">R$ 6.54M</p>
          </div>
          <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
            Ver detalhes
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
