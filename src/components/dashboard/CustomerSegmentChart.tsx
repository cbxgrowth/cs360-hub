
import React, { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { ModernChart } from '../charts/ModernChart';
import { ModernTooltip } from '../charts/ModernTooltip';
import { Users } from 'lucide-react';

const segmentData = [
  { name: 'Enterprise', value: 25, color: '#3B82F6', clients: 62, revenue: 'R$ 1.2M' },
  { name: 'Growth', value: 35, color: '#8B5CF6', clients: 89, revenue: 'R$ 850k' },
  { name: 'Professional', value: 40, color: '#EC4899', clients: 96, revenue: 'R$ 720k' }
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
      filter="url(#textShadow)"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const CustomerSegmentChart = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <ModernChart
      title="Segmentação de Clientes"
      subtitle="Distribuição por planos com análise de valor"
      icon={Users}
      gradient={['from-blue-500', 'to-purple-500']}
      height={280}
    >
      <PieChart>
        <defs>
          <filter id="textShadow">
            <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="#000000" floodOpacity="0.3"/>
          </filter>
          {segmentData.map((entry, index) => (
            <radialGradient key={index} id={`segmentGradient${index}`} cx="30%" cy="30%">
              <stop offset="0%" stopColor={entry.color} stopOpacity={0.8} />
              <stop offset="100%" stopColor={entry.color} stopOpacity={1} />
            </radialGradient>
          ))}
        </defs>
        <Pie
          data={segmentData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={90}
          innerRadius={40}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
          onMouseLeave={onPieLeave}
          animationBegin={0}
          animationDuration={1000}
        >
          {segmentData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={`url(#segmentGradient${index})`}
              stroke={activeIndex === index ? '#ffffff' : 'none'}
              strokeWidth={activeIndex === index ? 3 : 0}
              style={{
                filter: activeIndex === index ? 'brightness(1.1)' : 'none',
                transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
                transformOrigin: 'center',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </Pie>
        <Tooltip 
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <ModernTooltip 
                  active={active}
                  payload={[
                    { name: 'Participação', value: `${data.value}%`, color: data.color },
                    { name: 'Clientes', value: data.clients, color: data.color },
                    { name: 'Receita', value: data.revenue, color: data.color }
                  ]}
                  label={data.name}
                />
              );
            }
            return null;
          }}
        />
        <Legend 
          verticalAlign="bottom" 
          height={36}
          iconType="circle"
          wrapperStyle={{ paddingTop: '20px' }}
        />
      </PieChart>
    </ModernChart>
  );
};
