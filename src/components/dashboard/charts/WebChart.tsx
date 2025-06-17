
import React from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Activity, TrendingUp } from 'lucide-react';

const webData = [
  {
    subject: 'Performance',
    A: 120,
    B: 110,
    fullMark: 150
  },
  {
    subject: 'Qualidade',
    A: 98,
    B: 130,
    fullMark: 150
  },
  {
    subject: 'Engajamento',
    A: 86,
    B: 130,
    fullMark: 150
  },
  {
    subject: 'Satisfação',
    A: 99,
    B: 100,
    fullMark: 150
  },
  {
    subject: 'Eficiência',
    A: 85,
    B: 90,
    fullMark: 150
  },
  {
    subject: 'Crescimento',
    A: 65,
    B: 85,
    fullMark: 150
  }
];

export const WebChart = () => {
  return (
    <Card className="shadow-xl border-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Análise Multidimensional
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Visualização em teia dos KPIs principais
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400">
              <TrendingUp className="w-3 h-3 mr-1" />
              Tempo Real
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={webData} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
            <defs>
              <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <PolarGrid 
              stroke="#E5E7EB" 
              strokeWidth={1}
              gridType="polygon"
            />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fontSize: 12, fill: '#6B7280', fontWeight: 500 }}
              className="text-gray-700 dark:text-gray-300"
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 150]} 
              tick={{ fontSize: 10, fill: '#9CA3AF' }}
              tickCount={4}
            />
            <Radar
              name="Atual"
              dataKey="A"
              stroke="#6366F1"
              fill="url(#colorA)"
              strokeWidth={3}
              dot={{ fill: '#6366F1', strokeWidth: 2, r: 4 }}
            />
            <Radar
              name="Meta"
              dataKey="B"
              stroke="#8B5CF6"
              fill="url(#colorB)"
              strokeWidth={3}
              dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
            />
          </RadarChart>
        </ResponsiveContainer>
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <div className="text-2xl font-bold text-indigo-600">87%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Performance Geral</div>
          </div>
          <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">93%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Meta Atingida</div>
          </div>
          <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">+5.2%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">vs. Anterior</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
