
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import { Users, Target, TrendingUp } from 'lucide-react';

const clientsRadarData = [
  {
    metric: 'Satisfação',
    atual: 85,
    meta: 90,
    fullMark: 100
  },
  {
    metric: 'Retenção',
    atual: 92,
    meta: 95,
    fullMark: 100
  },
  {
    metric: 'Engajamento',
    atual: 78,
    meta: 85,
    fullMark: 100
  },
  {
    metric: 'LTV/CAC',
    atual: 88,
    meta: 90,
    fullMark: 100
  },
  {
    metric: 'Health Score',
    atual: 82,
    meta: 85,
    fullMark: 100
  },
  {
    metric: 'NPS',
    atual: 76,
    meta: 80,
    fullMark: 100
  }
];

export const ClientsWebChart = () => {
  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg mr-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Performance de Clientes
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Análise multidimensional da base de clientes
              </p>
            </div>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <div className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 rounded-full">
              <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Tempo Real</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={clientsRadarData} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <PolarGrid 
                stroke="#E5E7EB" 
                strokeOpacity={0.3}
                radialLines={true}
              />
              <PolarAngleAxis 
                dataKey="metric" 
                tick={{ 
                  fontSize: 12, 
                  fill: '#6B7280', 
                  fontWeight: 'medium' 
                }}
                className="text-gray-700 dark:text-gray-300"
              />
              <PolarRadiusAxis 
                angle={0} 
                domain={[0, 100]} 
                tick={{ fontSize: 10, fill: '#9CA3AF' }}
                axisLine={false}
                tickCount={6}
              />
              <Radar
                name="Performance Atual"
                dataKey="atual"
                stroke="#8B5CF6"
                fill="#8B5CF6"
                fillOpacity={0.3}
                strokeWidth={3}
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 5 }}
                filter="url(#glow)"
              />
              <Radar
                name="Meta"
                dataKey="meta"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.1}
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="circle"
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
            <Users className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900 dark:text-white">247</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Clientes</div>
          </div>
          <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900 dark:text-white">92%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Taxa Retenção</div>
          </div>
          <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
            <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900 dark:text-white">82%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Health Score</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
