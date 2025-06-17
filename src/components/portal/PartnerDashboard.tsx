import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { TrendingUp, Users, DollarSign, Award, Copy, ExternalLink, Target, Calendar, Clock, ArrowUpRight, Plus, Share2, Zap, BarChart3, Eye, Download } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart, Bar } from 'recharts';

const performanceData = [
  { month: 'Jan', vendas: 12, comissao: 3200, leads: 45 },
  { month: 'Fev', vendas: 19, comissao: 4800, leads: 62 },
  { month: 'Mar', vendas: 15, comissao: 3900, leads: 58 },
  { month: 'Abr', vendas: 22, comissao: 5600, leads: 71 },
  { month: 'Mai', vendas: 28, comissao: 7200, leads: 89 },
  { month: 'Jun', vendas: 24, comissao: 6400, leads: 76 }
];

const conversionData = [
  { name: 'Convertidos', value: 156, color: '#10B981' },
  { name: 'Em Avaliação', value: 43, color: '#F59E0B' },
  { name: 'Perdidos', value: 28, color: '#EF4444' }
];

export const PartnerDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  const partnerInfo = {
    name: "Digital Solutions LTDA",
    type: "Revenda Autorizada",
    level: "Gold Partner",
    since: "Janeiro 2023",
    referralLink: "https://app.cs360.com/r/digital-solutions-xyz",
    commission_rate: "35%",
    next_level: "Platinum",
    progress_to_next: 75
  };

  const stats = [
    {
      title: "Leads Este Mês",
      value: "89",
      change: "+24.5%",
      changeType: "positive",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "vs. mês anterior"
    },
    {
      title: "Taxa de Conversão",
      value: "28.4%",
      change: "+5.2%",
      changeType: "positive",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "média do trimestre"
    },
    {
      title: "Comissão Acumulada",
      value: "R$ 45.780",
      change: "+18.7%",
      changeType: "positive",
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "últimos 90 dias"
    },
    {
      title: "NPS Médio Clientes",
      value: "8.7",
      change: "+0.3",
      changeType: "positive",
      icon: Award,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "de 10 pontos"
    }
  ];

  const quickActions = [
    {
      title: "Gerar Link Personalizado",
      description: "Crie um novo link de indicação",
      icon: Plus,
      color: "bg-blue-600",
      action: "create_link"
    },
    {
      title: "Compartilhar Materiais",
      description: "Acesse materiais de marketing",
      icon: Share2,
      color: "bg-green-600",
      action: "share_materials"
    },
    {
      title: "Solicitar Pagamento",
      description: "R$ 12.480 disponível",
      icon: DollarSign,
      color: "bg-purple-600",
      action: "request_payment"
    },
    {
      title: "Agendar Consultoria",
      description: "Sessão estratégica gratuita",
      icon: Calendar,
      color: "bg-orange-600",
      action: "schedule_consultation"
    }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-600">
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center space-x-2 mb-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {entry.name === 'vendas' ? `${entry.value} vendas` :
                 entry.name === 'comissao' ? `R$ ${entry.value}` :
                 `${entry.value} leads`}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(partnerInfo.referralLink);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'create_link':
        break;
      case 'share_materials':
        break;
      case 'request_payment':
        break;
      case 'schedule_consultation':
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Partner Information Card */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900/50 dark:via-blue-900/30 dark:to-indigo-900/30">
        <CardHeader className="bg-inherit">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-4">
              <div>
                <CardTitle className="text-2xl text-gray-900 dark:text-white">{partnerInfo.name}</CardTitle>
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant="outline" className="text-sm bg-white/50">{partnerInfo.type}</Badge>
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">{partnerInfo.level}</Badge>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Parceiro desde {partnerInfo.since}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progresso para {partnerInfo.next_level}</span>
                  <span className="text-sm text-gray-500">{partnerInfo.progress_to_next}%</span>
                </div>
                <Progress value={partnerInfo.progress_to_next} className="h-3" />
                <p className="text-xs text-gray-500">Faltam R$ 15.000 em comissões para o próximo nível</p>
              </div>
            </div>

            <div className="rounded-xl p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm shadow-lg border border-white/20">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Taxa de Comissão</p>
                <p className="text-3xl font-bold text-green-600">{partnerInfo.commission_rate}</p>
              </div>
              
              <div className="space-y-3">
                <div className="text-sm text-gray-600 dark:text-gray-400">Seu Link de Indicação:</div>
                <div className="flex items-center gap-2">
                  <code className="px-3 py-2 rounded text-xs flex-1 truncate bg-gray-100 dark:bg-gray-700">
                    {partnerInfo.referralLink}
                  </code>
                  <Button size="sm" variant="outline" onClick={copyReferralLink}>
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor} shadow-lg`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className={`flex items-center text-sm font-semibold ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-3xl font-bold mb-1 text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{stat.title}</p>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enhanced Performance Chart */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg mr-3">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Performance de Vendas
                  </span>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Análise integrada de vendas e comissões
                  </p>
                </div>
              </CardTitle>
              <div className="flex items-center gap-2">
                <select 
                  value={selectedPeriod} 
                  onChange={(e) => setSelectedPeriod(e.target.value)} 
                  className="text-sm border rounded-lg px-3 py-2 bg-white/50 backdrop-blur-sm"
                >
                  <option value="30">30 dias</option>
                  <option value="90">90 dias</option>
                  <option value="180">6 meses</option>
                </select>
                <Button size="sm" variant="outline" className="bg-white/50 backdrop-blur-sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="vendas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="comissao" x1="0" y1="0" x2="0" y2="1">
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
                    dataKey="vendas" 
                    stroke="#3B82F6" 
                    fill="url(#vendas)" 
                    strokeWidth={3}
                    name="vendas"
                  />
                  <Bar 
                    yAxisId="right"
                    dataKey="comissao" 
                    fill="#10B981" 
                    name="comissao"
                    radius={[4, 4, 0, 0]}
                  />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="leads" 
                    stroke="#F59E0B" 
                    strokeWidth={3}
                    name="leads"
                    dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                <div className="text-xl font-bold text-blue-600">24</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Vendas Jun</div>
              </div>
              <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                <div className="text-xl font-bold text-green-600">R$ 6.4K</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Comissão Jun</div>
              </div>
              <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                <div className="text-xl font-bold text-orange-600">76</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Leads Jun</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Conversion Chart */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg mr-3">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Status dos Leads
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Distribuição e performance de conversão
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
                    </filter>
                  </defs>
                  <Pie 
                    data={conversionData} 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={100}
                    innerRadius={40}
                    dataKey="value" 
                    label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={false}
                    filter="url(#shadow)"
                  >
                    {conversionData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [`${value} leads`, name]}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {conversionData.map((item, index) => (
                <div key={index} className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center justify-center mb-2">
                    <div 
                      className="w-4 h-4 rounded-full mr-2 shadow-sm" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-lg font-bold" style={{ color: item.color }}>{item.value}</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">{item.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="w-5 h-5 mr-2 text-purple-600" />
            Ações Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button 
                key={index} 
                variant="outline" 
                className="h-auto p-6 flex flex-col items-center space-y-3 hover:shadow-lg transition-shadow" 
                onClick={() => handleQuickAction(action.action)}
              >
                <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-gray-900 dark:text-white">{action.title}</p>
                  <p className="text-sm text-gray-500 mt-1">{action.description}</p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-gray-600" />
            Atividade Recente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                type: 'sale',
                message: 'Nova venda realizada: TechCorp Ltda - Plano Professional',
                time: '2 horas atrás',
                value: 'R$ 499'
              },
              {
                type: 'lead',
                message: 'Novo lead gerado: StartupXYZ interessada no plano Growth',
                time: '4 horas atrás',
                value: ''
              },
              {
                type: 'commission',
                message: 'Comissão processada: R$ 1.245,00 creditada',
                time: '1 dia atrás',
                value: 'R$ 1.245'
              },
              {
                type: 'referral',
                message: 'Link de indicação acessado 15 vezes hoje',
                time: '1 dia atrás',
                value: '15 cliques'
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'sale' ? 'bg-green-500' : 
                    activity.type === 'lead' ? 'bg-blue-500' : 
                    activity.type === 'commission' ? 'bg-purple-500' : 
                    'bg-orange-500'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
                {activity.value && (
                  <Badge variant="outline" className="ml-4">{activity.value}</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
