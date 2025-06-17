
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ComposedChart, RadialBarChart, RadialBar, ScatterChart, Scatter
} from 'recharts';
import { 
  TrendingUp, Users, DollarSign, Target, Activity, 
  BarChart3, PieChart as PieChartIcon, Calendar, Award
} from 'lucide-react';

const performanceData = [
  { month: 'Jan', receita: 450000, usuarios: 1200, conversao: 12.5, nps: 8.2, metas: 85 },
  { month: 'Fev', receita: 485000, usuarios: 1350, conversao: 14.2, nps: 8.4, metas: 88 },
  { month: 'Mar', receita: 520000, usuarios: 1480, conversao: 15.8, nps: 8.7, metas: 92 },
  { month: 'Abr', receita: 495000, usuarios: 1420, conversao: 13.9, nps: 8.1, metas: 87 },
  { month: 'Mai', receita: 568000, usuarios: 1580, conversao: 16.2, nps: 8.9, metas: 94 },
  { month: 'Jun', receita: 612000, usuarios: 1720, conversao: 17.5, nps: 9.1, metas: 96 }
];

const departmentData = [
  { name: 'Customer Success', value: 35, performance: 94, color: '#10B981' },
  { name: 'Vendas', value: 30, performance: 88, color: '#3B82F6' },
  { name: 'Marketing', value: 20, performance: 85, color: '#8B5CF6' },
  { name: 'Produto', value: 15, performance: 91, color: '#F59E0B' }
];

const kpiData = [
  { name: 'ROI', value: 245, target: 200, color: '#10B981' },
  { name: 'CAC', value: 180, target: 220, color: '#3B82F6' },
  { name: 'LTV', value: 2840, target: 2500, color: '#8B5CF6' },
  { name: 'Churn', value: 3.2, target: 5.0, color: '#EF4444' }
];

const regionData = [
  { region: 'Sudeste', receita: 2400000, clientes: 850, crescimento: 15.2 },
  { region: 'Sul', receita: 1200000, clientes: 420, crescimento: 12.8 },
  { region: 'Nordeste', receita: 890000, clientes: 320, crescimento: 18.5 },
  { region: 'Centro-Oeste', receita: 650000, clientes: 230, crescimento: 10.3 },
  { region: 'Norte', receita: 420000, clientes: 150, crescimento: 22.1 }
];

interface ReportsDashboardProps {
  dateRange: string;
}

export const ReportsDashboard: React.FC<ReportsDashboardProps> = ({ dateRange }) => {
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
                  entry.name === 'conversao' ? `${entry.value}%` :
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

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Receita Total</p>
                <p className="text-3xl font-bold text-green-700 dark:text-green-300">R$ 3.1M</p>
                <div className="flex items-center mt-2">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    +18.5% vs anterior
                  </Badge>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Usuários Ativos</p>
                <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">8.7K</p>
                <div className="flex items-center mt-2">
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                    +12.3% vs anterior
                  </Badge>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg">
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
                <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">15.8%</p>
                <div className="flex items-center mt-2">
                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                    +2.4% vs anterior
                  </Badge>
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
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">NPS Score</p>
                <p className="text-3xl font-bold text-orange-700 dark:text-orange-300">8.7</p>
                <div className="flex items-center mt-2">
                  <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
                    +0.6 vs anterior
                  </Badge>
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
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Performance Geral
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Análise integrada de todas as métricas principais
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="receitaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="usuariosGradient" x1="0" y1="0" x2="0" y2="1">
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
                fill="url(#receitaGradient)" 
                strokeWidth={3}
                name="receita"
              />
              <Area 
                yAxisId="right"
                type="monotone" 
                dataKey="usuarios" 
                stroke="#3B82F6" 
                fill="url(#usuariosGradient)" 
                strokeWidth={3}
                name="usuarios"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="conversao" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                name="conversao"
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 8, fill: '#8B5CF6', strokeWidth: 2 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="nps" 
                stroke="#F59E0B" 
                strokeWidth={3}
                name="nps"
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 8, fill: '#F59E0B', strokeWidth: 2 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Department Performance & KPI Radials */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
                <PieChartIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Performance por Departamento
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value, performance }) => `${name}: ${value}% (${performance}%)`}
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 shadow-lg">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                KPIs vs Metas
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadialBarChart innerRadius="30%" outerRadius="90%" data={kpiData}>
                <RadialBar 
                  dataKey="value" 
                  cornerRadius={10} 
                  label={{ position: 'insideStart', fill: '#fff' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="circle"
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Regional Analysis */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 shadow-lg">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              Análise Regional
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={regionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="receitaBarGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.6}/>
                </linearGradient>
                <linearGradient id="clientesBarGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.6}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.4} />
              <XAxis 
                dataKey="region" 
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
              <Bar 
                yAxisId="left"
                dataKey="receita" 
                fill="url(#receitaBarGradient)" 
                name="receita"
                radius={[4, 4, 0, 0]}
                strokeWidth={1}
                stroke="#10B981"
              />
              <Bar 
                yAxisId="right"
                dataKey="clientes" 
                fill="url(#clientesBarGradient)" 
                name="clientes"
                radius={[4, 4, 0, 0]}
                strokeWidth={1}
                stroke="#3B82F6"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
