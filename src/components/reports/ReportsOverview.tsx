
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ComposedChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { 
  TrendingUp, Users, DollarSign, Target, Activity, 
  BarChart3, PieChart as PieChartIcon, Calendar, Award,
  ArrowUp, ArrowDown, Minus, Zap
} from 'lucide-react';

const overviewData = [
  { month: 'Jan', receita: 450000, usuarios: 1200, leads: 320, conversoes: 85, nps: 8.2 },
  { month: 'Fev', receita: 485000, usuarios: 1350, leads: 380, conversoes: 102, nps: 8.4 },
  { month: 'Mar', receita: 520000, usuarios: 1480, leads: 420, conversoes: 118, nps: 8.7 },
  { month: 'Abr', receita: 495000, usuarios: 1420, leads: 395, conversoes: 95, nps: 8.1 },
  { month: 'Mai', receita: 568000, usuarios: 1580, leads: 445, conversoes: 132, nps: 8.9 },
  { month: 'Jun', receita: 612000, usuarios: 1720, leads: 485, conversoes: 148, nps: 9.1 }
];

const topReports = [
  { name: 'Performance Geral', views: 1250, trend: 'up', change: 12.5 },
  { name: 'Análise de Vendas', views: 980, trend: 'up', change: 8.3 },
  { name: 'Relatório NPS', views: 750, trend: 'down', change: -3.2 },
  { name: 'Métricas CS', views: 645, trend: 'up', change: 15.7 },
  { name: 'Dashboard Executivo', views: 520, trend: 'up', change: 22.1 }
];

const teamPerformance = [
  { team: 'Customer Success', performance: 94, target: 90, color: '#10B981' },
  { team: 'Vendas', performance: 88, target: 85, color: '#3B82F6' },
  { team: 'Marketing', performance: 82, target: 80, color: '#8B5CF6' },
  { team: 'Produto', performance: 91, target: 88, color: '#F59E0B' },
  { team: 'Suporte', performance: 89, target: 85, color: '#EF4444' }
];

const kpiComparison = [
  { metric: 'ROI', current: 245, previous: 220, target: 250 },
  { metric: 'CAC', current: 180, previous: 195, target: 150 },
  { metric: 'LTV', current: 2840, previous: 2650, target: 3000 },
  { metric: 'Churn', current: 3.2, previous: 4.1, target: 2.5 },
  { metric: 'NPS', current: 8.7, previous: 8.3, target: 9.0 }
];

interface ReportsOverviewProps {
  dateRange: string;
  filters: any;
}

export const ReportsOverview: React.FC<ReportsOverviewProps> = ({ dateRange, filters }) => {
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
                {entry.name}: {
                  entry.name === 'receita' ? `R$ ${(entry.value / 1000).toFixed(0)}k` :
                  entry.name === 'usuarios' ? `${entry.value.toLocaleString()}` :
                  entry.name === 'nps' ? `${entry.value}/10` :
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

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-600" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-600" />;
      default: return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600 dark:text-green-400';
    if (change < 0) return 'text-red-600 dark:text-red-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Receita Total</p>
                <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">R$ 3.13M</p>
                <div className="flex items-center mt-2">
                  <ArrowUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-sm font-medium text-green-600">+14.2%</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Usuários Ativos</p>
                <p className="text-3xl font-bold text-green-700 dark:text-green-300">8,750</p>
                <div className="flex items-center mt-2">
                  <ArrowUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-sm font-medium text-green-600">+8.7%</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Taxa Conversão</p>
                <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">18.4%</p>
                <div className="flex items-center mt-2">
                  <ArrowUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-sm font-medium text-green-600">+3.2%</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">NPS Médio</p>
                <p className="text-3xl font-bold text-orange-700 dark:text-orange-300">8.7</p>
                <div className="flex items-center mt-2">
                  <ArrowUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-sm font-medium text-green-600">+0.4</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Performance Chart */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Visão Geral de Performance
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Métricas principais consolidadas
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                <Zap className="w-3 h-3 mr-1" />
                Atualizado agora
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={450}>
            <ComposedChart data={overviewData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="receitaAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="usuariosAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
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
                yAxisId="left"
                tick={{ fontSize: 12, fill: '#6B7280' }}
                axisLine={{ stroke: '#D1D5DB' }}
                tickLine={{ stroke: '#D1D5DB' }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right"
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
                yAxisId="left"
                type="monotone" 
                dataKey="receita" 
                stroke="#10B981" 
                fill="url(#receitaAreaGradient)" 
                strokeWidth={3}
                name="receita"
              />
              <Area 
                yAxisId="right"
                type="monotone" 
                dataKey="usuarios" 
                stroke="#3B82F6" 
                fill="url(#usuariosAreaGradient)" 
                strokeWidth={3}
                name="usuarios"
              />
              <Bar 
                yAxisId="right"
                dataKey="conversoes" 
                fill="#8B5CF6" 
                name="conversoes"
                radius={[4, 4, 0, 0]}
                opacity={0.8}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="nps" 
                stroke="#F59E0B" 
                strokeWidth={4}
                name="nps"
                dot={{ fill: '#F59E0B', strokeWidth: 3, r: 6 }}
                activeDot={{ r: 9, fill: '#F59E0B', strokeWidth: 3 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Reports Activity & Team Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Reports */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Relatórios Mais Acessados
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topReports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-200">
                  <div className="flex items-center space-x-3">
                    <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                      #{index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{report.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{report.views} visualizações</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(report.trend)}
                    <span className={`text-sm font-medium ${getChangeColor(report.change)}`}>
                      {report.change > 0 ? '+' : ''}{report.change}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Performance Radar */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 shadow-lg">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                Performance por Equipe
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={teamPerformance}>
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis 
                  dataKey="team" 
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]}
                  tick={{ fontSize: 10, fill: '#6B7280' }}
                />
                <Radar
                  name="Performance"
                  dataKey="performance"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.3}
                  strokeWidth={3}
                />
                <Radar
                  name="Meta"
                  dataKey="target"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.1}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="circle"
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* KPI Comparison Table */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900 dark:to-gray-900">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-slate-500 to-gray-500 shadow-lg">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent">
              Comparativo de KPIs
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-4 font-bold text-gray-900 dark:text-white">Métrica</th>
                  <th className="text-left p-4 font-bold text-gray-900 dark:text-white">Atual</th>
                  <th className="text-left p-4 font-bold text-gray-900 dark:text-white">Anterior</th>
                  <th className="text-left p-4 font-bold text-gray-900 dark:text-white">Meta</th>
                  <th className="text-left p-4 font-bold text-gray-900 dark:text-white">Variação</th>
                  <th className="text-left p-4 font-bold text-gray-900 dark:text-white">Status</th>
                </tr>
              </thead>
              <tbody>
                {kpiComparison.map((kpi, index) => {
                  const change = ((kpi.current - kpi.previous) / kpi.previous) * 100;
                  const targetAchieved = kpi.current >= kpi.target;
                  
                  return (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all duration-200">
                      <td className="p-4 font-semibold text-gray-900 dark:text-white">{kpi.metric}</td>
                      <td className="p-4 text-gray-700 dark:text-gray-300 font-medium">{kpi.current}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-400">{kpi.previous}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-400">{kpi.target}</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          {getTrendIcon(change > 0 ? 'up' : change < 0 ? 'down' : 'same')}
                          <span className={getChangeColor(change)}>
                            {change > 0 ? '+' : ''}{change.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge className={
                          targetAchieved
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }>
                          {targetAchieved ? 'Meta Atingida' : 'Abaixo da Meta'}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
