
import React from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { CustomTooltip } from './ChartComponents';

interface ResponseRateChartProps {
  data: Array<{
    month: string;
    score: number;
    responses: number;
    promoters: number;
    passives: number;
    detractors: number;
  }>;
}

export const ResponseRateChart: React.FC<ResponseRateChartProps> = ({ data }) => {
  // Calculate response rate data
  const responseRateData = data.map(item => ({
    month: item.month,
    responses: item.responses,
    rate: Math.round((item.responses / 200) * 100) // Assuming 200 is target responses
  }));

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-900">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-lg">
          <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg"></div>
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Taxa de Resposta
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={responseRateData}>
            <defs>
              <linearGradient id="responseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.6} />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 13, fontWeight: 500 }}
            />
            <YAxis 
              tick={{ fontSize: 13, fontWeight: 500 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="rate" 
              stroke="#8B5CF6"
              strokeWidth={3}
              fill="url(#responseGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
