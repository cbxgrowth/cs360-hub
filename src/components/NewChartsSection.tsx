
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
import { Sparkles, Zap, TrendingUp, Users, DollarSign, Target } from 'lucide-react';

const revenueData = [
  { name: 'Enterprise', value: 45, color: '#3B82F6', growth: 12.5 },
  { name: 'Professional', value: 30, color: '#10B981', growth: 8.3 },
  { name: 'Starter', value: 20, color: '#F59E0B', growth: 15.7 },
  { name: 'Trial', value: 5, color: '#EF4444', growth: -2.1 }
];

const radarData = [
  { subject: 'Utilização', A: 100, B: 80, C: 60, fullMark: 100 },
  { subject: 'Satisfação', A: 90, B: 75, C: 50, fullMark: 100 },
  { subject: 'Suporte', A: 85, B: 70, C: 45, fullMark: 100 },
  { subject: 'Pagamentos', A: 95, B: 85, C: 70, fullMark: 100 },
  { subject: 'Engajamento', A: 88, B: 65, C: 40, fullMark: 100 },
  { subject: 'Crescimento', A: 92, B: 78, C: 55, fullMark: 100 }
];

const monthlyTrendsData = [
  { month: 'Jan', churn: 4.2, nps: 35, satisfaction: 85, retention: 95.8 },
  { month: 'Fev', churn: 3.8, nps: 38, satisfaction: 87, retention: 96.2 },
  { month: 'Mar', churn: 4.5, nps: 36, satisfaction: 84, retention: 95.5 },
  { month: 'Abr', churn: 3.9, nps: 40, satisfaction: 89, retention: 96.1 },
  { month: 'Mai', churn: 3.2, nps: 42, satisfaction: 91, retention: 96.8 },
  { month: 'Jun', churn: 2.8, nps: 45, satisfaction: 93, retention: 97.2 }
];

const clientSegmentData = [
  { segment: 'Enterprise', clientes: 45, ltv: 250000, cac: 15000, satisfaction: 9.2 },
  { segment: 'Professional', clientes: 67, ltv: 120000, cac: 8000, satisfaction: 8.5 },
  { segment: 'Starter', clientes: 89, ltv: 45000, cac: 3000, satisfaction: 7.8 },
  { segment: 'Trial', clientes: 23, ltv: 0, cac: 500, satisfaction: 6.5 }
];

interface NewChartsSectionProps {
  visibleCharts: string[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl p-4 rounded-xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
        <p className="font-semibold text-slate-900 dark:text-white mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm flex items-center justify-between" style={{ color: entry.color }}>
            <span>{entry.name}:</span>
            <span className="font-medium ml-2">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const NewChartsSection: React.FC<NewChartsSectionProps> = ({ visibleCharts }) => {
  const [animateCharts, setAnimateCharts] = useState(true);

  const charts = [
    {
      id: 'revenue-pie',
      title: 'Distribuição de Receita Inteligente',
      subtitle: 'Por plano com análise de crescimento',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
      component: (
        <div className="relative h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                {revenueData.map((entry, index) => (
                  <linearGradient key={index} id={`revenueGradient${index}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={entry.color} />
                    <stop offset="100%" stopColor={entry.color} stopOpacity={0.6} />
                  </linearGradient>
                ))}
              </defs>
              <Pie
                data={revenueData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={50}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
                animationBegin={0}
                animationDuration={1000}
              >
                {revenueData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`url(#revenueGradient${index})`} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Growth Indicators */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="grid grid-cols-2 gap-2">
              {revenueData.map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg px-2 py-1">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-xs font-medium">{item.name}</span>
                  </div>
                  <span className={`text-xs font-bold ${item.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {item.growth > 0 ? '+' : ''}{item.growth}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'client-segments',
      title: 'Health Score 360° por Nível',
      subtitle: 'Análise multidimensional dos clientes',
      icon: Target,
      color: 'from-blue-500 to-purple-500',
      component: (
        <div className="relative h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <defs>
                <linearGradient id="radarGradientA" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="radarGradientB" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="radarGradientC" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#6B7280" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#6B7280" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <PolarGrid gridType="polygon" stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" className="text-xs font-medium" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} className="text-xs" tickCount={6} />
              <Radar name="Nível A" dataKey="A" stroke="#3B82F6" fill="url(#radarGradientA)" strokeWidth={3} dot={{ r: 4, fill: '#3B82F6' }} />
              <Radar name="Nível B" dataKey="B" stroke="#10B981" fill="url(#radarGradientB)" strokeWidth={3} dot={{ r: 4, fill: '#10B981' }} />
              <Radar name="Nível C" dataKey="C" stroke="#6B7280" fill="url(#radarGradientC)" strokeWidth={3} dot={{ r: 4, fill: '#6B7280' }} />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
          
          {/* Legend with Health Scores */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex justify-center space-x-6">
              <div className="flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg px-3 py-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Nível A (91%)</span>
              </div>
              <div className="flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 rounded-lg px-3 py-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-xs font-medium text-green-700 dark:text-green-300">Nível B (76%)</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700/30 rounded-lg px-3 py-1">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Nível C (55%)</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'monthly-metrics',
      title: 'Tendências Estratégicas',
      subtitle: 'Métricas-chave em tempo real',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      component: (
        <div className="relative h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyTrendsData}>
              <defs>
                <linearGradient id="satisfactionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="npsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="retentionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" className="opacity-30" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="satisfaction" stackId="1" stroke="#8B5CF6" fill="url(#satisfactionGradient)" strokeWidth={2} />
              <Area type="monotone" dataKey="retention" stackId="2" stroke="#3B82F6" fill="url(#retentionGradient)" strokeWidth={2} />
              <Area type="monotone" dataKey="nps" stackId="3" stroke="#10B981" fill="url(#npsGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          
          {/* Metric Cards Overlay */}
          <div className="absolute top-4 right-4 space-y-2">
            <div className="bg-purple-500/20 backdrop-blur-sm rounded-lg px-3 py-1">
              <div className="text-xs font-medium text-purple-700 dark:text-purple-300">Satisfação: 91%</div>
            </div>
            <div className="bg-blue-500/20 backdrop-blur-sm rounded-lg px-3 py-1">
              <div className="text-xs font-medium text-blue-700 dark:text-blue-300">Retenção: 97.2%</div>
            </div>
            <div className="bg-green-500/20 backdrop-blur-sm rounded-lg px-3 py-1">
              <div className="text-xs font-medium text-green-700 dark:text-green-300">NPS: 45</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'segment-analysis',
      title: 'Análise de Segmentos Premium',
      subtitle: 'LTV, CAC e performance por categoria',
      icon: Users,
      color: 'from-orange-500 to-red-500',
      component: (
        <div className="relative h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={clientSegmentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                {clientSegmentData.map((entry, index) => (
                  <linearGradient key={index} id={`segmentGradient${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={index === 0 ? "#3B82F6" : index === 1 ? "#10B981" : index === 2 ? "#F59E0B" : "#EF4444"} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={index === 0 ? "#3B82F6" : index === 1 ? "#10B981" : index === 2 ? "#F59E0B" : "#EF4444"} stopOpacity={0.4}/>
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" className="opacity-30" />
              <XAxis dataKey="segment" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="clientes" radius={[4, 4, 0, 0]}>
                {clientSegmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`url(#segmentGradient${index})`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          
          {/* Performance Indicators */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="grid grid-cols-4 gap-2">
              {clientSegmentData.map((segment, index) => (
                <div key={index} className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-2 text-center">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{segment.segment}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    LTV: {(segment.ltv / 1000).toFixed(0)}k
                  </div>
                  <div className={`text-xs font-medium ${segment.satisfaction > 8 ? 'text-green-600' : segment.satisfaction > 7 ? 'text-yellow-600' : 'text-red-600'}`}>
                    ★ {segment.satisfaction}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
  ];

  const visibleChartsToShow = charts.filter(chart => visibleCharts.includes(chart.id));

  if (visibleChartsToShow.length === 0) return null;

  return (
    <div className="space-y-8 mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics Avançado</h2>
            <p className="text-slate-600 dark:text-slate-400">Insights profundos com visualizações interativas</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl px-4 py-2 border border-purple-200/50 dark:border-purple-700/50">
          <Zap className="w-4 h-4 text-purple-600" />
          <span className="text-sm text-purple-600 font-medium">AI-Powered</span>
        </div>
      </div>

      {/* Enhanced Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8">
        {visibleChartsToShow.map((chart, index) => (
          <div 
            key={chart.id} 
            className={`group relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50 transition-all duration-700 hover:shadow-2xl hover:scale-[1.02] ${
              index === 0 ? 'lg:col-span-1' : ''
            }`}
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.6) 100%)`,
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Animated Background Gradient */}
            <div className={`absolute inset-0 opacity-5 rounded-3xl bg-gradient-to-br ${chart.color} group-hover:opacity-10 transition-opacity duration-500`}></div>
            
            {/* Header */}
            <div className="relative z-10 flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`p-3 bg-gradient-to-r ${chart.color} rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                  <chart.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-600 transition-all duration-300">
                    {chart.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{chart.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 font-medium">Live</span>
              </div>
            </div>

            {/* Chart Content */}
            <div className="relative z-10">
              {chart.component}
            </div>

            {/* Hover Effect Border */}
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${chart.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};
