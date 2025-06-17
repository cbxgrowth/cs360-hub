import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  FileBarChart, Download, Calendar, TrendingUp, Users, 
  DollarSign, Target, BarChart3, PieChart, Activity,
  Filter, RefreshCw, Mail, Share2
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, ComposedChart } from 'recharts';

const monthlyData = [
  { month: 'Jul', vendas: 18, comissao: 5400, leads: 62, conversao: 29.0 },
  { month: 'Ago', vendas: 22, comissao: 6600, leads: 71, conversao: 31.0 },
  { month: 'Set', vendas: 19, comissao: 5700, leads: 68, conversao: 27.9 },
  { month: 'Out', vendas: 25, comissao: 7500, leads: 84, conversao: 29.8 },
  { month: 'Nov', vendas: 28, comissao: 8400, leads: 89, conversao: 31.5 },
  { month: 'Dez', vendas: 31, comissao: 9300, leads: 95, conversao: 32.6 }
];

const planDistribution = [
  { name: 'Starter', value: 45, color: '#3B82F6', revenue: 8955 },
  { name: 'Professional', value: 67, color: '#10B981', revenue: 33433 },
  { name: 'Growth', value: 32, color: '#F59E0B', revenue: 31968 },
  { name: 'Enterprise', value: 12, color: '#8B5CF6', revenue: 29988 }
];

const conversionFunnel = [
  { stage: 'Visitantes', quantidade: 2450, percentage: 100 },
  { stage: 'Leads', quantidade: 485, percentage: 19.8 },
  { stage: 'Qualificados', quantidade: 156, percentage: 6.4 },
  { stage: 'Proposta', quantidade: 89, percentage: 3.6 },
  { stage: 'Fechados', quantidade: 28, percentage: 1.1 }
];

export const PartnerReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6m');
  const [reportType, setReportType] = useState('performance');

  const EnhancedTooltip = ({ active, payload, label }: any) => {
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
                {entry.name === 'vendas' ? `${entry.value} vendas` :
                 entry.name === 'comissao' ? `R$ ${entry.value}` :
                 entry.name === 'leads' ? `${entry.value} leads` :
                 entry.name === 'conversao' ? `${entry.value}%` :
                 entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const exportReport = (format: string) => {
    console.log(`Exporting report in ${format} format`);
  };

  const scheduleReport = () => {
    console.log('Scheduling automated report');
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-0 shadow-xl">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Relatórios e Analytics</h2>
              <p className="text-gray-600">
                Análise completa do seu desempenho como parceiro
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border rounded-lg px-3 py-2 bg-white/50 backdrop-blur-sm"
              >
                <option value="1m">Último mês</option>
                <option value="3m">Últimos 3 meses</option>
                <option value="6m">Últimos 6 meses</option>
                <option value="1y">Último ano</option>
              </select>
              <Button variant="outline" className="bg-white/50 backdrop-blur-sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Atualizar
              </Button>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Tabs */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-white/50 backdrop-blur-sm">
          <TabsTrigger value="performance" className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Performance</span>
          </TabsTrigger>
          <TabsTrigger value="sales" className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4" />
            <span>Vendas</span>
          </TabsTrigger>
          <TabsTrigger value="conversion" className="flex items-center space-x-2">
            <Target className="w-4 h-4" />
            <span>Conversão</span>
          </TabsTrigger>
          <TabsTrigger value="clients" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Clientes</span>
          </TabsTrigger>
          <TabsTrigger value="automated" className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Automáticos</span>
          </TabsTrigger>
        </TabsList>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Vendas Totais</p>
                    <p className="text-3xl font-bold text-blue-600">143</p>
                    <p className="text-sm text-green-600 font-medium">+23% vs período anterior</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <BarChart3 className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Comissão Total</p>
                    <p className="text-3xl font-bold text-green-600">R$ 42.9K</p>
                    <p className="text-sm text-green-600 font-medium">+18% vs período anterior</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-xl">
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Taxa Conversão</p>
                    <p className="text-3xl font-bold text-purple-600">30.2%</p>
                    <p className="text-sm text-green-600 font-medium">+2.4% vs período anterior</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-xl">
                    <Target className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Clientes Ativos</p>
                    <p className="text-3xl font-bold text-orange-600">156</p>
                    <p className="text-sm text-green-600 font-medium">+15% vs período anterior</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-xl">
                    <Users className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Performance Chart */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg mr-3">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Evolução de Performance
                  </span>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Análise integrada de vendas, comissões e conversão
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <defs>
                      <linearGradient id="vendasGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="comissaoGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                      </linearGradient>
                      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.4} />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 12, fill: '#6B7280', fontWeight: 500 }}
                      axisLine={{ stroke: '#D1D5DB' }}
                    />
                    <YAxis 
                      yAxisId="vendas" 
                      orientation="left"
                      tick={{ fontSize: 12, fill: '#6B7280' }}
                      axisLine={{ stroke: '#D1D5DB' }}
                    />
                    <YAxis 
                      yAxisId="comissao" 
                      orientation="right"
                      tick={{ fontSize: 12, fill: '#6B7280' }}
                      axisLine={{ stroke: '#D1D5DB' }}
                    />
                    <Tooltip content={<EnhancedTooltip />} />
                    <Area 
                      yAxisId="vendas"
                      type="monotone" 
                      dataKey="vendas" 
                      stroke="#3B82F6" 
                      fill="url(#vendasGradient)" 
                      strokeWidth={3}
                      name="vendas"
                      filter="url(#glow)"
                    />
                    <Bar 
                      yAxisId="comissao"
                      dataKey="comissao" 
                      fill="url(#comissaoGradient)" 
                      name="comissao"
                      radius={[4, 4, 0, 0]}
                    />
                    <Line 
                      yAxisId="vendas"
                      type="monotone" 
                      dataKey="conversao" 
                      stroke="#F59E0B" 
                      strokeWidth={3}
                      name="conversao"
                      dot={{ fill: '#F59E0B', strokeWidth: 2, r: 5, filter: 'url(#glow)' }}
                      activeDot={{ r: 7, fill: '#F59E0B', strokeWidth: 3 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-4 gap-4 mt-6">
                <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm">
                  <div className="text-xl font-bold text-blue-600">31</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Vendas Dez</div>
                </div>
                <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm">
                  <div className="text-xl font-bold text-green-600">R$ 9.3K</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Comissão Dez</div>
                </div>
                <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm">
                  <div className="text-xl font-bold text-orange-600">32.6%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Conversão Dez</div>
                </div>
                <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm">
                  <div className="text-xl font-bold text-purple-600">95</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Leads Dez</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sales Tab */}
        <TabsContent value="sales" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Enhanced Distribution by Plan */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg mr-3">
                    <PieChart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      Distribuição por Plano
                    </span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Vendas e receita por tipo de plano
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <defs>
                        <filter id="pieShadow" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="2" dy="2" stdDeviation="4" floodOpacity="0.3"/>
                        </filter>
                      </defs>
                      <Pie
                        data={planDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        innerRadius={50}
                        dataKey="value"
                        label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={false}
                        filter="url(#pieShadow)"
                      >
                        {planDistribution.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color}
                            stroke="#fff"
                            strokeWidth={3}
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value, name) => [`${value} vendas`, name]}
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: 'none',
                          borderRadius: '12px',
                          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {planDistribution.map((plan, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg backdrop-blur-sm">
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-3 shadow-sm" 
                          style={{ backgroundColor: plan.color }}
                        ></div>
                        <div>
                          <p className="text-sm font-medium">{plan.name}</p>
                          <p className="text-xs text-gray-500">{plan.value} vendas</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold" style={{ color: plan.color }}>
                          R$ {(plan.revenue / 1000).toFixed(1)}K
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Monthly Revenue */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg mr-3">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Receita Mensal
                    </span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Evolução das comissões por mês
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#EC4899" stopOpacity={0.8}/>
                        </linearGradient>
                        <filter id="barShadow" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#8B5CF6" floodOpacity="0.3"/>
                        </filter>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.4} />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fontSize: 12, fill: '#6B7280', fontWeight: 500 }}
                        axisLine={{ stroke: '#D1D5DB' }}
                      />
                      <YAxis 
                        tick={{ fontSize: 12, fill: '#6B7280' }}
                        axisLine={{ stroke: '#D1D5DB' }}
                      />
                      <Tooltip 
                        formatter={(value) => [`R$ ${value}`, 'Comissão']}
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: 'none',
                          borderRadius: '12px',
                          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Bar 
                        dataKey="comissao" 
                        fill="url(#barGradient)"
                        radius={[6, 6, 0, 0]}
                        filter="url(#barShadow)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm">
                    <div className="text-xl font-bold text-purple-600">R$ 9.3K</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Dezembro</div>
                  </div>
                  <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm">
                    <div className="text-xl font-bold text-green-600">+10.7%</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">vs Nov</div>
                  </div>
                  <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm">
                    <div className="text-xl font-bold text-orange-600">R$ 42.9K</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Total 6M</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sales Table */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle>Vendas Detalhadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { client: 'TechCorp Ltd', plan: 'Professional', value: 'R$ 499', commission: 'R$ 149.70', date: '15/01/2024' },
                  { client: 'StartupXYZ', plan: 'Growth', value: 'R$ 999', commission: 'R$ 299.70', date: '14/01/2024' },
                  { client: 'Digital Agency', plan: 'Starter', value: 'R$ 199', commission: 'R$ 59.70', date: '12/01/2024' },
                  { client: 'Enterprise Inc', plan: 'Enterprise', value: 'R$ 2.499', commission: 'R$ 874.65', date: '10/01/2024' }
                ].map((sale, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{sale.client}</h4>
                      <p className="text-sm text-gray-600">Plano {sale.plan}</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{sale.value}</p>
                      <p className="text-sm text-gray-600">Valor</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-green-600">{sale.commission}</p>
                      <p className="text-sm text-gray-600">Comissão</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{sale.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conversion Tab */}
        <TabsContent value="conversion" className="space-y-6">
          {/* Conversion Funnel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-orange-600" />
                Funil de Conversão
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversionFunnel.map((stage, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{stage.stage}</span>
                      <div className="text-right">
                        <span className="text-lg font-bold">{stage.quantidade.toLocaleString()}</span>
                        <span className="text-sm text-gray-500 ml-2">({stage.percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${stage.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Conversion Rates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">19.8%</div>
                <div className="text-sm font-medium">Visitante → Lead</div>
                <div className="text-xs text-gray-500 mt-1">+2.3% vs anterior</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">32.1%</div>
                <div className="text-sm font-medium">Lead → Qualificado</div>
                <div className="text-xs text-gray-500 mt-1">+1.8% vs anterior</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">31.5%</div>
                <div className="text-sm font-medium">Proposta → Fechamento</div>
                <div className="text-xs text-gray-500 mt-1">+4.2% vs anterior</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Clients Tab */}
        <TabsContent value="clients" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                Análise de Clientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">156</div>
                  <div className="text-sm text-gray-600">Total Clientes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">89%</div>
                  <div className="text-sm text-gray-600">Retention Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">R$ 1.247</div>
                  <div className="text-sm text-gray-600">LTV Médio</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">8.7</div>
                  <div className="text-sm text-gray-600">NPS Médio</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Automated Reports Tab */}
        <TabsContent value="automated" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
                Relatórios Automáticos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Configure Automated Reports */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-2 border-dashed border-gray-200 hover:border-blue-400 transition-colors">
                    <CardContent className="p-6 text-center">
                      <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                      <h3 className="font-medium mb-2">Relatório Semanal</h3>
                      <p className="text-sm text-gray-600 mb-4">Performance da semana</p>
                      <Button onClick={scheduleReport}>Configurar</Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-dashed border-gray-200 hover:border-green-400 transition-colors">
                    <CardContent className="p-6 text-center">
                      <FileBarChart className="w-8 h-8 text-green-600 mx-auto mb-4" />
                      <h3 className="font-medium mb-2">Relatório Mensal</h3>
                      <p className="text-sm text-gray-600 mb-4">Resumo mensal completo</p>
                      <Button onClick={scheduleReport}>Configurar</Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-dashed border-gray-200 hover:border-purple-400 transition-colors">
                    <CardContent className="p-6 text-center">
                      <Activity className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                      <h3 className="font-medium mb-2">Alertas em Tempo Real</h3>
                      <p className="text-sm text-gray-600 mb-4">Notificações instantâneas</p>
                      <Button onClick={scheduleReport}>Configurar</Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Active Automated Reports */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Relatórios Ativos</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Relatório Semanal de Performance', frequency: 'Toda segunda-feira às 09:00', recipients: 'você', status: 'Ativo' },
                      { name: 'Resumo Mensal de Vendas', frequency: 'Todo dia 1º às 08:00', recipients: 'você + equipe', status: 'Ativo' },
                      { name: 'Alerta de Nueva Venda', frequency: 'Tempo real', recipients: 'você', status: 'Ativo' }
                    ].map((report, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium">{report.name}</h4>
                          <p className="text-sm text-gray-600">{report.frequency} • Enviado para: {report.recipients}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800">{report.status}</Badge>
                          <Button size="sm" variant="outline">Editar</Button>
                          <Button size="sm" variant="outline">
                            <Mail className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Export Options */}
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Download className="w-5 h-5 mr-2 text-gray-600" />
            Opções de Exportação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" onClick={() => exportReport('pdf')} className="h-12">
              <FileBarChart className="w-4 h-4 mr-2" />
              Exportar PDF
            </Button>
            <Button variant="outline" onClick={() => exportReport('excel')} className="h-12">
              <Download className="w-4 h-4 mr-2" />
              Exportar Excel
            </Button>
            <Button variant="outline" onClick={() => exportReport('email')} className="h-12">
              <Mail className="w-4 h-4 mr-2" />
              Enviar por Email
            </Button>
            <Button variant="outline" onClick={() => exportReport('share')} className="h-12">
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar Link
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
