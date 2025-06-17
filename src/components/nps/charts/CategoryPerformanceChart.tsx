
import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { CustomTooltip, COLORS } from './ChartComponents';

interface CategoryPerformanceChartProps {
  data: Array<{
    month: string;
    score: number;
    responses: number;
    promoters: number;
    passives: number;
    detractors: number;
  }>;
}

export const CategoryPerformanceChart: React.FC<CategoryPerformanceChartProps> = ({ data }) => {
  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-900">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-lg">
          <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-lg"></div>
          <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Performance por Categoria
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.6} />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 13, fontWeight: 500 }}
            />
            <YAxis 
              tick={{ fontSize: 13, fontWeight: 500 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="promoters" 
              fill={COLORS.promoters}
              name="Promotores"
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              dataKey="passives" 
              fill={COLORS.passives}
              name="Passivos"
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              dataKey="detractors" 
              fill={COLORS.detractors}
              name="Detratores"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
