
import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { CustomTooltip } from './ChartComponents';

const segmentData = [
  { segment: 'Nível A', score: 88, count: 25 },
  { segment: 'Nível B', score: 76, count: 42 },
  { segment: 'Nível C', score: 65, count: 18 },
  { segment: 'Novos', score: 72, count: 15 },
  { segment: 'Ativos', score: 83, count: 67 },
  { segment: 'Em Risco', score: 45, count: 8 }
];

export const NPSSegmentChart: React.FC = () => {
  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-900">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-lg">
          <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full shadow-lg"></div>
          <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            NPS por Segmento
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={segmentData} layout="horizontal">
            <defs>
              <linearGradient id="segmentGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.9}/>
                <stop offset="50%" stopColor="#06B6D4" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.9}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.6} />
            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 13, fontWeight: 500 }} />
            <YAxis 
              type="category" 
              dataKey="segment" 
              tick={{ fontSize: 13, fontWeight: 500 }}
              width={90}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="score" 
              fill="url(#segmentGradient)"
              radius={[0, 8, 8, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
