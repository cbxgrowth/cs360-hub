
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { TrendingUp, Eye } from 'lucide-react';

const healthScoreData = [
  { segment: 'Enterprise', score: 9.2, count: 23 },
  { segment: 'Mid-Market', score: 8.7, count: 45 },
  { segment: 'SMB', score: 7.9, count: 89 },
  { segment: 'Startup', score: 7.2, count: 67 }
];

export const HealthScoreChart: React.FC = () => {
  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-3">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          <div>
            <CardTitle className="text-lg text-gray-900 dark:text-white">
              Health Score por Segmento
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Saúde dos clientes por categoria
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
            Média: 8.3
          </Badge>
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={healthScoreData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis type="number" domain={[0, 10]} className="text-xs" />
            <YAxis type="category" dataKey="segment" className="text-xs" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border)',
                borderRadius: '8px'
              }}
              formatter={(value, name, props) => [
                `${value}/10`,
                `Health Score - ${props.payload.count} clientes`
              ]}
            />
            <Bar dataKey="score" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Melhor Segmento</p>
              <p className="text-lg font-bold text-green-600">Enterprise (9.2)</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Requer Atenção</p>
              <p className="text-lg font-bold text-orange-600">Startup (7.2)</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
