
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar, ScatterChart, Scatter } from 'recharts';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

const evolutionData = [
  { month: 'Jan', clientes: 198, churned: 12, novos: 25, receita: 485000, nps: 72 },
  { month: 'Fev', clientes: 211, churned: 8, novos: 21, receita: 520000, nps: 74 },
  { month: 'Mar', clientes: 224, churned: 15, novos: 28, receita: 548000, nps: 71 },
  { month: 'Abr', clientes: 237, churned: 9, novos: 22, receita: 578000, nps: 76 },
  { month: 'Mai', clientes: 250, churned: 11, novos: 24, receita: 612000, nps: 78 },
  { month: 'Jun', clientes: 247, churned: 18, novos: 15, receita: 595000, nps: 75 }
];

const correlationData = [
  { nps: 85, retencao: 95, ltv: 45000 },
  { nps: 72, retencao: 88, ltv: 32000 },
  { nps: 68, retencao: 82, ltv: 28000 },
  { nps: 79, retencao: 91, ltv: 38000 },
  { nps: 82, retencao: 93, ltv: 42000 },
  { nps: 65, retencao: 78, ltv: 25000 },
  { nps: 88, retencao: 97, ltv: 48000 },
  { nps: 70, retencao: 85, ltv: 30000 },
  { nps: 76, retencao: 89, ltv: 35000 },
  { nps: 83, retencao: 94, ltv: 44000 }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-600 backdrop-blur-sm">
        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center space-x-2 mb-1">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {entry.name}: {
                typeof entry.value === 'number' && entry.value > 1000 
                  ? `${(entry.value / 1000).toFixed(0)}k` 
                  : entry.value
              }
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const EnhancedClientsCharts = () => {
  return (
    <div className="space-y-8">
      {/* Evolução de Performance */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg mr-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Evolução de Performance
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Crescimento da base de clientes e métricas de retenção
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={evolutionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="clientesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="receitaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.4} />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={{ stroke: '#D1D5DB' }}
                />
                <YAxis 
                  yAxisId="left"
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={{ stroke: '#D1D5DB' }}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right"
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={{ stroke: '#D1D5DB' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="clientes" 
                  stroke="#3B82F6" 
                  fill="url(#clientesGradient)" 
                  strokeWidth={3}
                  name="Total Clientes"
                />
                <Bar 
                  yAxisId="left"
                  dataKey="novos" 
                  fill="#10B981" 
                  name="Novos Clientes"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  yAxisId="left"
                  dataKey="churned" 
                  fill="#EF4444" 
                  name="Churn"
                  radius={[4, 4, 0, 0]}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="nps" 
                  stroke="#F59E0B" 
                  strokeWidth={3}
                  name="NPS Score"
                  dot={{ fill: '#F59E0B', strokeWidth: 2, r: 6 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Análise de Correlação */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-teal-900/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg mr-4">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Correlação NPS vs Retenção
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Análise da relação entre satisfação e retenção de clientes
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart data={correlationData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.4} />
                <XAxis 
                  type="number" 
                  dataKey="nps" 
                  name="NPS Score"
                  domain={[60, 90]}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <YAxis 
                  type="number" 
                  dataKey="retencao" 
                  name="Taxa de Retenção (%)"
                  domain={[75, 100]}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-600">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Cliente</p>
                          <div className="space-y-1">
                            <div className="text-sm text-gray-700 dark:text-gray-300">NPS: {data.nps}</div>
                            <div className="text-sm text-gray-700 dark:text-gray-300">Retenção: {data.retencao}%</div>
                            <div className="text-sm text-gray-700 dark:text-gray-300">LTV: R$ {(data.ltv / 1000).toFixed(0)}k</div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter 
                  dataKey="ltv" 
                  fill="#8B5CF6"
                  stroke="#7C3AED"
                  strokeWidth={2}
                  r={8}
                  fillOpacity={0.7}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
