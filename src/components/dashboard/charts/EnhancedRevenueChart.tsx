
import React from 'react';
import { 
  ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { DollarSign, TrendingUp, ArrowUp } from 'lucide-react';

const revenueData = [
  { month: 'Jan', receita: 450000, meta: 480000, crescimento: 12.5, usuarios: 1200 },
  { month: 'Fev', receita: 485000, meta: 500000, crescimento: 14.2, usuarios: 1350 },
  { month: 'Mar', receita: 520000, meta: 520000, crescimento: 15.8, usuarios: 1480 },
  { month: 'Abr', receita: 495000, meta: 540000, crescimento: 13.9, usuarios: 1420 },
  { month: 'Mai', receita: 568000, meta: 560000, crescimento: 16.2, usuarios: 1580 },
  { month: 'Jun', receita: 612000, meta: 580000, crescimento: 17.5, usuarios: 1720 }
];

export const EnhancedRevenueChart = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-600 backdrop-blur-sm">
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center space-x-3 mb-2">
              <div 
                className="w-4 h-4 rounded-full shadow-sm" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {entry.name}: {
                  entry.name === 'receita' || entry.name === 'meta' ? 
                    `R$ ${(entry.value / 1000).toFixed(0)}k` :
                  entry.name === 'crescimento' ? `${entry.value}%` :
                  entry.name === 'usuarios' ? `${entry.value.toLocaleString()}` :
                  entry.value
                }
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-xl border-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-teal-900/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Performance de Receita Avançada
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Análise integrada com metas e crescimento
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
              <ArrowUp className="w-3 h-3 mr-1" />
              +18.5%
            </Badge>
            <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
              <TrendingUp className="w-3 h-3 mr-1" />
              Meta Superada
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="receitaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="metaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.6}/>
                <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.1}/>
              </linearGradient>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#10B981" floodOpacity="0.3"/>
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.4} />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12, fill: '#6B7280', fontWeight: 500 }}
              axisLine={{ stroke: '#D1D5DB', strokeWidth: 1 }}
              tickLine={{ stroke: '#D1D5DB' }}
            />
            <YAxis 
              yAxisId="receita"
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={{ stroke: '#D1D5DB' }}
              tickLine={{ stroke: '#D1D5DB' }}
              domain={[400000, 650000]}
            />
            <YAxis 
              yAxisId="crescimento" 
              orientation="right"
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={{ stroke: '#D1D5DB' }}
              tickLine={{ stroke: '#D1D5DB' }}
              domain={[10, 20]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
            />
            
            <Area 
              yAxisId="receita"
              type="monotone" 
              dataKey="receita" 
              stroke="#10B981" 
              fill="url(#receitaGradient)" 
              strokeWidth={4}
              name="receita"
              filter="url(#shadow)"
            />
            
            <Area 
              yAxisId="receita"
              type="monotone" 
              dataKey="meta" 
              stroke="#06B6D4" 
              fill="url(#metaGradient)" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="meta"
            />
            
            <Line 
              yAxisId="crescimento"
              type="monotone" 
              dataKey="crescimento" 
              stroke="#F59E0B" 
              strokeWidth={3}
              name="crescimento"
              dot={{ fill: '#F59E0B', strokeWidth: 3, r: 6, filter: 'url(#shadow)' }}
              activeDot={{ r: 8, fill: '#F59E0B', strokeWidth: 3, filter: 'url(#shadow)' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
        
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm">
            <div className="text-xl font-bold text-green-600">R$ 612K</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Receita Atual</div>
          </div>
          <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm">
            <div className="text-xl font-bold text-cyan-600">R$ 580K</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Meta Mensal</div>
          </div>
          <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm">
            <div className="text-xl font-bold text-orange-600">17.5%</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Crescimento</div>
          </div>
          <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm">
            <div className="text-xl font-bold text-purple-600">105.5%</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">% da Meta</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
