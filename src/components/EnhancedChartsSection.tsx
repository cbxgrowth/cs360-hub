import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ScatterChart, Scatter, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Cell, Tooltip } from 'recharts';
import { ModernChart } from './charts/ModernChart';
import { ModernTooltip } from './charts/ModernTooltip';
import { useChartAnimations } from '../hooks/useChartAnimations';
import { Brain, Target, Activity, Zap, TrendingUp, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const npsData = [
  { month: 'Jan', value: 30, trend: 'up', events: 3 },
  { month: 'Fev', value: 35, trend: 'up', events: 2 },
  { month: 'Mar', value: 32, trend: 'down', events: 4 },
  { month: 'Abr', value: 38, trend: 'up', events: 1 },
  { month: 'Mai', value: 40, trend: 'up', events: 2 },
  { month: 'Jun', value: 37, trend: 'down', events: 3 },
  { month: 'Jul', value: 42, trend: 'up', events: 1 },
  { month: 'Ago', value: 45, trend: 'up', events: 2 },
  { month: 'Set', value: 48, trend: 'up', events: 1 },
  { month: 'Out', value: 44, trend: 'down', events: 2 },
  { month: 'Nov', value: 47, trend: 'up', events: 1 },
  { month: 'Dez', value: 50, trend: 'up', events: 0 }
];

const churnRiskData = [
  { ltv: 5, risk: 90, segment: 'A', size: 45, health: 20 },
  { ltv: 8, risk: 85, segment: 'A', size: 32, health: 25 },
  { ltv: 12, risk: 75, segment: 'B', size: 28, health: 35 },
  { ltv: 15, risk: 60, segment: 'B', size: 38, health: 50 },
  { ltv: 18, risk: 45, segment: 'B', size: 42, health: 65 },
  { ltv: 22, risk: 30, segment: 'C', size: 35, health: 75 },
  { ltv: 25, risk: 25, segment: 'C', size: 48, health: 80 },
  { ltv: 30, risk: 15, segment: 'C', size: 52, health: 90 },
  { ltv: 35, risk: 10, segment: 'C', size: 38, health: 95 }
];

const healthScoreData = [
  { range: '0-20', count: 8, label: 'Crítico', color: '#EF4444', percentage: 7.6 },
  { range: '21-40', count: 12, label: 'Risco', color: '#F97316', percentage: 11.4 },
  { range: '41-60', count: 22, label: 'Bom', color: '#EAB308', percentage: 21.0 },
  { range: '61-80', count: 35, label: 'Excelente', color: '#3B82F6', percentage: 33.3 },
  { range: '81-100', count: 28, label: 'Sucesso', color: '#10B981', percentage: 26.7 }
];

const realtimeData = [
  { time: '09:00', active: 45, interactions: 23, satisfaction: 8.2 },
  { time: '10:00', active: 52, interactions: 31, satisfaction: 8.5 },
  { time: '11:00', active: 48, interactions: 28, satisfaction: 8.1 },
  { time: '12:00', active: 38, interactions: 19, satisfaction: 7.8 },
  { time: '13:00', active: 42, interactions: 25, satisfaction: 8.3 },
  { time: '14:00', active: 55, interactions: 34, satisfaction: 8.7 },
  { time: '15:00', active: 49, interactions: 29, satisfaction: 8.4 }
];

interface EnhancedChartsSectionProps {
  visibleCharts: string[];
}

export const EnhancedChartsSection: React.FC<EnhancedChartsSectionProps> = ({ visibleCharts }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('12M');
  const [isRealtime, setIsRealtime] = useState(false);
  const { isVisible, ref } = useChartAnimations();

  const modernCharts = useMemo(() => [
    {
      id: 'nps-evolution',
      title: 'Evolução do NPS com IA',
      subtitle: 'Análise preditiva e tendências inteligentes',
      icon: Brain,
      gradient: ['from-blue-500', 'to-indigo-600'],
      component: (
        <AreaChart data={npsData}>
          <defs>
            <linearGradient id="npsModernGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8}/>
              <stop offset="50%" stopColor="#3B82F6" stopOpacity={0.4}/>
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.05}/>
            </linearGradient>
            <filter id="npsGlow">
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
          <Tooltip content={<ModernTooltip showTrend={true} />} />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#3B82F6" 
            strokeWidth={3}
            fill="url(#npsModernGradient)"
            filter="url(#npsGlow)"
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 5 }}
            activeDot={{ 
              r: 8, 
              stroke: '#3B82F6', 
              strokeWidth: 3, 
              fill: '#ffffff',
              filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))'
            }}
          />
        </AreaChart>
      )
    },
    {
      id: 'churn-risk',
      title: 'Matriz de Risco Inteligente',
      subtitle: 'LTV vs Risco de Churn com Health Score',
      icon: Target,
      gradient: ['from-red-500', 'to-orange-500'],
      component: (
        <ScatterChart data={churnRiskData}>
          <defs>
            <filter id="scatterGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.3} />
          <XAxis 
            dataKey="ltv" 
            tick={{ fontSize: 12, fill: '#6B7280' }}
            name="LTV (k)"
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            dataKey="risk" 
            tick={{ fontSize: 12, fill: '#6B7280' }}
            name="Risco %"
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<ModernTooltip />} />
          <Scatter dataKey="risk" fill="#8884d8">
            {churnRiskData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.health > 70 ? '#10B981' : entry.health > 40 ? '#F59E0B' : '#EF4444'}
                filter="url(#scatterGlow)"
                style={{
                  transform: 'scale(1)',
                  transformOrigin: 'center',
                  transition: 'transform 0.3s ease'
                }}
              />
            ))}
          </Scatter>
        </ScatterChart>
      )
    },
    {
      id: 'health-distribution',
      title: 'Health Score 360°',
      subtitle: 'Distribuição inteligente com insights acionáveis',
      icon: Activity,
      gradient: ['from-green-500', 'to-teal-500'],
      component: (
        <RadarChart data={healthScoreData}>
          <defs>
            <filter id="radarGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <PolarGrid stroke="#E5E7EB" strokeOpacity={0.5} />
          <PolarAngleAxis 
            dataKey="range" 
            tick={{ fontSize: 10, fill: '#6B7280' }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 35]} 
            tick={{ fontSize: 8, fill: '#6B7280' }}
            tickCount={4}
          />
          <Radar
            name="Clientes"
            dataKey="count"
            stroke="#10B981"
            fill="#10B981"
            fillOpacity={0.3}
            strokeWidth={3}
            filter="url(#radarGlow)"
            dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
          />
          <Tooltip content={<ModernTooltip />} />
        </RadarChart>
      )
    },
    {
      id: 'realtime-activity',
      title: 'Atividade em Tempo Real',
      subtitle: 'Monitor de engajamento e satisfação ao vivo',
      icon: Activity,
      gradient: ['from-purple-500', 'to-pink-500'],
      component: (
        <AreaChart data={realtimeData}>
          <defs>
            <linearGradient id="activeModernGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.6}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="interactionModernGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.6}/>
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.3} />
          <XAxis 
            dataKey="time" 
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
            dataKey="active" 
            stackId="1" 
            stroke="#10B981" 
            fill="url(#activeModernGradient)" 
            strokeWidth={2}
            name="Ativos"
          />
          <Area 
            type="monotone" 
            dataKey="interactions" 
            stackId="2" 
            stroke="#8B5CF6" 
            fill="url(#interactionModernGradient)" 
            strokeWidth={2}
            name="Interações"
          />
        </AreaChart>
      )
    }
  ], []);

  const visibleChartsToShow = modernCharts.filter(chart => visibleCharts.includes(chart.id));

  if (visibleChartsToShow.length === 0) return null;

  return (
    <div ref={ref} className={`space-y-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
      {/* Modern Control Panel */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800 dark:to-gray-800 rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Análise Visual Inteligente</h2>
                <p className="text-slate-600 dark:text-slate-400">Gráficos modernos com inteligência artificial</p>
              </div>
            </div>
            <Badge className="animate-pulse bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 border-0">
              <Brain className="w-3 h-3 mr-1" />
              IA Ativada
            </Badge>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant={isRealtime ? "default" : "outline"}
              size="sm"
              onClick={() => setIsRealtime(!isRealtime)}
              className="flex items-center space-x-2 transition-all duration-300 hover:scale-105"
            >
              <Activity className="w-4 h-4" />
              <span>Tempo Real</span>
              {isRealtime && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-1" />}
            </Button>
            
            <div className="flex space-x-1 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm rounded-lg p-1 shadow-inner">
              {['3M', '6M', '12M'].map(period => (
                <button
                  key={period}
                  onClick={() => setSelectedTimeframe(period)}
                  className={`px-4 py-2 text-sm rounded-md transition-all duration-300 ${
                    selectedTimeframe === period
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-600/50'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {visibleChartsToShow.map((chart, index) => (
          <ModernChart
            key={chart.id}
            title={chart.title}
            subtitle={chart.subtitle}
            icon={chart.icon}
            gradient={chart.gradient}
            isRealtime={isRealtime}
            height={320}
            className={`animate-fade-in`}
          >
            {chart.component}
          </ModernChart>
        ))}
      </div>
    </div>
  );
};
