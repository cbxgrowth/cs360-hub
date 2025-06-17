
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart } from 'recharts';
import { ModernChart } from '../charts/ModernChart';
import { ModernTooltip } from '../charts/ModernTooltip';
import { TrendingUp } from 'lucide-react';

const revenueData = [
  { month: 'Jan', mrr: 420, arr: 5040, crescimento: 8.2, previous_mrr: 388 },
  { month: 'Fev', mrr: 445, arr: 5340, crescimento: 9.1, previous_mrr: 420 },
  { month: 'Mar', mrr: 465, arr: 5580, crescimento: 8.8, previous_mrr: 445 },
  { month: 'Abr', mrr: 485, arr: 5820, crescimento: 9.4, previous_mrr: 465 },
  { month: 'Mai', mrr: 512, arr: 6144, crescimento: 10.2, previous_mrr: 485 },
  { month: 'Jun', mrr: 535, arr: 6420, crescimento: 9.8, previous_mrr: 512 }
];

export const RevenueGrowthChart = () => {
  return (
    <ModernChart
      title="Crescimento de Receita"
      subtitle="MRR e crescimento mensal com predições inteligentes"
      icon={TrendingUp}
      gradient={['from-green-500', 'to-emerald-500']}
      isRealtime={true}
      height={280}
    >
      <AreaChart data={revenueData}>
        <defs>
          <linearGradient id="mrrGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
            <stop offset="50%" stopColor="#10B981" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
          </linearGradient>
          <linearGradient id="crescimentoGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.6}/>
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke="#E5E7EB" 
          strokeOpacity={0.3}
          horizontal={true}
          vertical={false}
        />
        <XAxis 
          dataKey="month" 
          tick={{ fontSize: 12, fill: '#6B7280' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis 
          tick={{ fontSize: 12, fill: '#6B7280' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip 
          content={<ModernTooltip showTrend={true} />}
        />
        <Legend 
          wrapperStyle={{ paddingTop: '20px' }}
          iconType="circle"
        />
        <Area 
          type="monotone" 
          dataKey="mrr" 
          stroke="#10B981" 
          strokeWidth={3}
          fill="url(#mrrGradient)"
          name="MRR (k)"
          filter="url(#glow)"
          dot={{ fill: '#10B981', strokeWidth: 2, r: 5, filter: 'url(#glow)' }}
          activeDot={{ r: 8, stroke: '#10B981', strokeWidth: 3, fill: '#ffffff' }}
        />
        <Line 
          type="monotone" 
          dataKey="crescimento" 
          stroke="#3B82F6" 
          strokeWidth={3}
          name="Crescimento %"
          dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2, fill: '#ffffff' }}
          strokeDasharray="5 5"
        />
      </AreaChart>
    </ModernChart>
  );
};
