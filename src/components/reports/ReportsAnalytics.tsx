
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  Treemap, FunnelChart, Funnel, LabelList
} from 'recharts';
import { 
  Brain, TrendingUp, Users, Target, Activity, 
  Zap, Eye, MousePointer, ShoppingCart, Calendar
} from 'lucide-react';

const cohortAnalysis = [
  { month: 'Mês 0', jan: 100, fev: 100, mar: 100, abr: 100 },
  { month: 'Mês 1', jan: 85, fev: 88, mar: 90, abr: 92 },
  { month: 'Mês 3', jan: 72, fev: 76, mar: 81, abr: 84 },
  { month: 'Mês 6', jan: 65, fev: 69, mar: 75, abr: 78 },
  { month: 'Mês 12', jan: 58, fev: 62, mar: 68, abr: 72 }
];

const conversionFunnel = [
  { name: 'Visitantes', value: 100000, fill: '#3B82F6' },
  { name: 'Leads', value: 18500, fill: '#10B981' },
  { name: 'Qualificados', value: 5200, fill: '#8B5CF6' },
  { name: 'Oportunidades', value: 1850, fill: '#F59E0B' },
  { name: 'Fechamentos', value: 420, fill: '#EF4444' }
];

const behaviorData = [
  { page: 'Homepage', views: 45200, time: 145, bounce: 32.5 },
  { page: 'Produtos', views: 23400, time: 220, bounce: 28.1 },
  { page: 'Pricing', views: 18700, time: 180, bounce: 24.8 },
  { page: 'Blog', views: 12300, time: 195, bounce: 35.2 },
  { page: 'Contato', views: 8900, time: 85, bounce: 45.6 }
];

const predictiveData = [
  { month: 'Jul', atual: 52000, previsao: 0, confidence: 0 },
  { month: 'Ago', atual: 48000, previsao: 0, confidence: 0 },
  { month: 'Set', atual: 61000, previsao: 0, confidence: 0 },
  { month: 'Out', atual: 0, previsao: 58000, confidence: 85 },
  { month: 'Nov', atual: 0, previsao: 65000, confidence: 78 },
  { month: 'Dez', atual: 0, previsao: 72000, confidence: 72 }
];

const segmentData = [
  { name: 'Enterprise', size: 15, value: 2800000, growth: 18.5, color: '#10B981' },
  { name: 'SMB', size: 45, value: 1200000, growth: 22.3, color: '#3B82F6' },
  { name: 'Startup', size: 40, value: 450000, growth: 35.2, color: '#8B5CF6' }
];

interface ReportsAnalyticsProps {
  dateRange: string;
  filters: any;
}

export const ReportsAnalytics: React.FC<ReportsAnalyticsProps> = ({ dateRange, filters }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-600">
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center space-x-3 mb-2">
              <div 
                className="w-4 h-4 rounded-full shadow-sm" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* AI Insights Header */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Analytics Inteligente
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Análises avançadas com IA e insights preditivos
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400">
                <Zap className="w-3 h-3 mr-1" />
                IA Ativa
              </Badge>
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-500">
                <Brain className="w-4 h-4 mr-2" />
                Gerar Insights
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Predictive Analytics */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Previsões com IA
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Projeções baseadas em machine learning
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={predictiveData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="atualGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="previsaoGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.4} />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12, fill: '#6B7280' }}
                axisLine={{ stroke: '#D1D5DB' }}
                tickLine={{ stroke: '#D1D5DB' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#6B7280' }}
                axisLine={{ stroke: '#D1D5DB' }}
                tickLine={{ stroke: '#D1D5DB' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="circle"
              />
              <Area 
                type="monotone" 
                dataKey="atual" 
                stroke="#3B82F6" 
                fill="url(#atualGradient)" 
                strokeWidth={3}
                name="Dados Reais"
              />
              <Area 
                type="monotone" 
                dataKey="previsao" 
                stroke="#10B981" 
                fill="url(#previsaoGradient)" 
                strokeWidth={3}
                strokeDasharray="5 5"
                name="Previsão IA"
              />
            </AreaChart>
          </ResponsiveContainer>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">85%</p>
              <p className="text-sm text-gray-600">Precisão Modelo</p>
            </div>
            <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">+12%</p>
              <p className="text-sm text-gray-600">Crescimento Previsto</p>
            </div>
            <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">72%</p>
              <p className="text-sm text-gray-600">Confiança Out</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cohort Analysis & Conversion Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 shadow-lg">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                Análise de Cohort
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={cohortAnalysis} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.4} />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={{ stroke: '#D1D5DB' }}
                  tickLine={{ stroke: '#D1D5DB' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={{ stroke: '#D1D5DB' }}
                  tickLine={{ stroke: '#D1D5DB' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="circle"
                />
                <Line type="monotone" dataKey="jan" stroke="#3B82F6" strokeWidth={3} name="Jan Cohort" />
                <Line type="monotone" dataKey="fev" stroke="#10B981" strokeWidth={3} name="Fev Cohort" />
                <Line type="monotone" dataKey="mar" stroke="#8B5CF6" strokeWidth={3} name="Mar Cohort" />
                <Line type="monotone" dataKey="abr" stroke="#F59E0B" strokeWidth={3} name="Abr Cohort" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 shadow-lg">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Funil de Conversão
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversionFunnel.map((stage, index) => {
                const percentage = index === 0 ? 100 : (stage.value / conversionFunnel[0].value) * 100;
                return (
                  <div key={stage.name} className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">{stage.name}</span>
                      <div className="text-right">
                        <span className="text-lg font-bold">{stage.value.toLocaleString()}</span>
                        <span className="text-sm text-gray-500 ml-2">({percentage.toFixed(1)}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6">
                      <div 
                        className="h-6 rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                        style={{ 
                          width: `${percentage}%`,
                          background: `linear-gradient(90deg, ${stage.fill}CC, ${stage.fill})`
                        }}
                      >
                        <span className="text-white text-xs font-medium">
                          {index > 0 && `${((stage.value / conversionFunnel[index - 1].value) * 100).toFixed(1)}%`}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Behavior Analysis */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Análise de Comportamento
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-4 font-bold text-gray-900 dark:text-white">Página</th>
                  <th className="text-left p-4 font-bold text-gray-900 dark:text-white">Visualizações</th>
                  <th className="text-left p-4 font-bold text-gray-900 dark:text-white">Tempo Médio</th>
                  <th className="text-left p-4 font-bold text-gray-900 dark:text-white">Taxa de Rejeição</th>
                  <th className="text-left p-4 font-bold text-gray-900 dark:text-white">Performance</th>
                </tr>
              </thead>
              <tbody>
                {behaviorData.map((page, index) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/50 dark:hover:from-purple-900/10 dark:hover:to-pink-900/10 transition-all duration-200">
                    <td className="p-4 font-semibold text-gray-900 dark:text-white">{page.page}</td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">{page.views.toLocaleString()}</td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">{page.time}s</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900 dark:text-white">{page.bounce}%</span>
                        <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              page.bounce < 30 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                              page.bounce < 40 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                              'bg-gradient-to-r from-red-500 to-pink-500'
                            }`}
                            style={{ width: `${page.bounce}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className={`${
                        page.bounce < 30 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        page.bounce < 40 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {page.bounce < 30 ? 'Excelente' : page.bounce < 40 ? 'Bom' : 'Precisa Melhorar'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Segment Analysis */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 shadow-lg">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Análise por Segmento
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {segmentData.map((segment, index) => (
              <div key={index} className="p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{segment.name}</h3>
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: segment.color }}
                  ></div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Tamanho do Segmento</p>
                    <p className="text-2xl font-bold" style={{ color: segment.color }}>{segment.size}%</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receita</p>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                      R$ {(segment.value / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Crescimento</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-lg font-semibold text-green-600">+{segment.growth}%</p>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Forte
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
