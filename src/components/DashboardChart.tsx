
import React, { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { ModernChart } from './charts/ModernChart';
import { ModernTooltip } from './charts/ModernTooltip';
import { BarChart3, TrendingUp, PieChart as PieChartIcon, Activity } from 'lucide-react';

interface DashboardChartProps {
  title: string;
  type: 'line' | 'area' | 'bar' | 'pie';
  data: any[];
  dataKey?: string;
  xAxisKey?: string;
  color?: string;
  height?: number;
}

export const DashboardChart: React.FC<DashboardChartProps> = ({
  title,
  type,
  data,
  dataKey = 'value',
  xAxisKey = 'name',
  color = '#3B82F6',
  height = 300
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const getIcon = () => {
    switch (type) {
      case 'line': return TrendingUp;
      case 'area': return Activity;
      case 'bar': return BarChart3;
      case 'pie': return PieChartIcon;
      default: return BarChart3;
    }
  };

  const getGradient = () => {
    const colorMap: { [key: string]: string[] } = {
      '#3B82F6': ['from-blue-500', 'to-indigo-500'],
      '#10B981': ['from-green-500', 'to-emerald-500'],
      '#8B5CF6': ['from-purple-500', 'to-violet-500'],
      '#F59E0B': ['from-amber-500', 'to-orange-500'],
      '#EF4444': ['from-red-500', 'to-rose-500']
    };
    return colorMap[color] || ['from-blue-500', 'to-indigo-500'];
  };

  const renderChart = () => {
    const commonProps = {
      data,
      onMouseEnter: (_: any, index: number) => setActiveIndex(index),
      onMouseLeave: () => setActiveIndex(null)
    };

    switch (type) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <defs>
              <linearGradient id={`lineGradient-${title}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                <stop offset="100%" stopColor={color} stopOpacity={1} />
              </linearGradient>
              <filter id="lineShadow">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor={color} floodOpacity="0.3"/>
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.3} />
            <XAxis 
              dataKey={xAxisKey} 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<ModernTooltip />} />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={`url(#lineGradient-${title})`}
              strokeWidth={3}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 8, stroke: color, strokeWidth: 3, fill: '#ffffff', filter: 'url(#lineShadow)' }}
              filter="url(#lineShadow)"
            />
          </LineChart>
        );
      
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id={`areaGradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.3} />
            <XAxis 
              dataKey={xAxisKey} 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<ModernTooltip />} />
            <Area 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              fill={`url(#areaGradient-${title})`}
              strokeWidth={3}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: color, strokeWidth: 2, fill: '#ffffff' }}
            />
          </AreaChart>
        );
      
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <defs>
              <linearGradient id={`barGradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={1} />
                <stop offset="100%" stopColor={color} stopOpacity={0.7} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.3} />
            <XAxis 
              dataKey={xAxisKey} 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<ModernTooltip />} />
            <Bar 
              dataKey={dataKey} 
              fill={`url(#barGradient-${title})`} 
              radius={[6, 6, 0, 0]}
              style={{
                filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
              }}
            />
          </BarChart>
        );
      
      case 'pie':
        const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
        return (
          <PieChart>
            <defs>
              {data.map((_, index) => (
                <radialGradient key={index} id={`pieGradient${index}-${title}`} cx="30%" cy="30%">
                  <stop offset="0%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0.8} />
                  <stop offset="100%" stopColor={COLORS[index % COLORS.length]} stopOpacity={1} />
                </radialGradient>
              ))}
            </defs>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={90}
              innerRadius={30}
              fill="#8884d8"
              dataKey={dataKey}
              animationBegin={0}
              animationDuration={1000}
            >
              {data.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={`url(#pieGradient${index}-${title})`}
                  stroke={activeIndex === index ? '#ffffff' : 'none'}
                  strokeWidth={activeIndex === index ? 2 : 0}
                />
              ))}
            </Pie>
            <Tooltip content={<ModernTooltip />} />
          </PieChart>
        );
      
      default:
        return null;
    }
  };

  return (
    <ModernChart
      title={title}
      icon={getIcon()}
      gradient={getGradient()}
      height={height}
    >
      {renderChart()}
    </ModernChart>
  );
};
