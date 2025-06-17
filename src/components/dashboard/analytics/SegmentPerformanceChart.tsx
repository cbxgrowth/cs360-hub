
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Users, Eye } from 'lucide-react';

const segmentPerformance = [
  { segment: 'Enterprise', clients: 23, health: 9.2, revenue: 285000, satisfaction: 94 },
  { segment: 'Growth', clients: 67, health: 8.1, revenue: 189000, satisfaction: 87 },
  { segment: 'Professional', clients: 93, health: 7.8, revenue: 127000, satisfaction: 83 }
];

export const SegmentPerformanceChart: React.FC = () => {
  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg text-gray-900 dark:text-white">Performance por Segmento</CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">Health Score médio</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
            3 segmentos
          </Badge>
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={segmentPerformance} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis type="number" domain={[0, 10]} className="text-xs" />
            <YAxis type="category" dataKey="segment" className="text-xs" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border)',
                borderRadius: '8px'
              }}
              formatter={(value: any, name: string, props: any) => [
                name === 'health' ? `${value}/10` : value,
                `Health Score - ${props.payload.clients} clientes`
              ]}
            />
            <Bar dataKey="health" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Melhor</p>
              <p className="text-lg font-bold text-green-600">Enterprise</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Clientes</p>
              <p className="text-lg font-bold text-blue-600">183</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Satisfação Média</p>
              <p className="text-lg font-bold text-purple-600">88%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
