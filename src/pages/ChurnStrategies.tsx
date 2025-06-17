
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { TrendingDown, Target, AlertTriangle, CheckCircle, ArrowLeft, Plus, Users, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const churnTrendData = [
  { month: 'Jan', atual: 3.2, meta: 2.5, previsao: 3.0 },
  { month: 'Fev', atual: 2.8, meta: 2.5, previsao: 2.6 },
  { month: 'Mar', atual: 3.5, meta: 2.5, previsao: 2.4 },
  { month: 'Abr', atual: 2.1, meta: 2.5, previsao: 2.2 },
  { month: 'Mai', atual: 1.8, meta: 2.5, previsao: 2.0 },
  { month: 'Jun', atual: 1.5, meta: 2.5, previsao: 1.8 }
];

const riskSegments = [
  { name: 'Alto Risco', value: 12, color: '#EF4444' },
  { name: 'Médio Risco', value: 28, color: '#F59E0B' },
  { name: 'Baixo Risco', value: 45, color: '#10B981' },
  { name: 'Saudável', value: 165, color: '#3B82F6' }
];

const strategies = [
  {
    id: 1,
    title: "Programa de Onboarding Aprimorado",
    description: "Implementar processo estruturado de 30 dias para novos clientes",
    status: "Ativo",
    impact: "Alto",
    clients: 23,
    reduction: "15%",
    investment: "R$ 25.000"
  },
  {
    id: 2,
    title: "Sistema de Alertas Preditivos",
    description: "IA para identificar clientes em risco antes do churn",
    status: "Em Desenvolvimento",
    impact: "Muito Alto",
    clients: 156,
    reduction: "25%",
    investment: "R$ 45.000"
  },
  {
    id: 3,
    title: "Programa de Fidelidade Premium",
    description: "Benefícios exclusivos para clientes de longo prazo",
    status: "Planejado",
    impact: "Médio",
    clients: 89,
    reduction: "12%",
    investment: "R$ 35.000"
  }
];

const ChurnStrategies = () => {
  const navigate = useNavigate();

  return (
    <AppLayout
      title="Estratégias Anti-Churn"
      description="Gestão de estratégias para redução de cancelamentos"
      icon={<Target className="w-6 h-6 text-white" />}
      gradientColors="bg-gradient-to-r from-red-600 to-pink-600"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => navigate('/app')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Dashboard</span>
          </Button>
          
          <Button className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Nova Estratégia</span>
          </Button>
        </div>

        {/* Métricas de Performance */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Taxa Atual</p>
                  <p className="text-3xl font-bold text-red-600">1.5%</p>
                </div>
                <TrendingDown className="w-8 h-8 text-red-600" />
              </div>
              <p className="text-sm text-green-600 mt-2">-0.3% vs mês anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Meta Mensal</p>
                  <p className="text-3xl font-bold text-orange-600">2.5%</p>
                </div>
                <Target className="w-8 h-8 text-orange-600" />
              </div>
              <p className="text-sm text-green-600 mt-2">Meta atingida</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Clientes Recuperados</p>
                  <p className="text-3xl font-bold text-green-600">6</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-sm text-green-600 mt-2">+1 esta semana</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">ROI Estratégias</p>
                  <p className="text-3xl font-bold text-blue-600">340%</p>
                </div>
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-sm text-blue-600 mt-2">+15% este mês</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tendência de Churn */}
          <Card>
            <CardHeader>
              <CardTitle>Tendência vs Meta</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={churnTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="atual" stroke="#EF4444" strokeWidth={3} name="Taxa Atual" />
                  <Line type="monotone" dataKey="meta" stroke="#F59E0B" strokeWidth={2} strokeDasharray="5 5" name="Meta" />
                  <Line type="monotone" dataKey="previsao" stroke="#8B5CF6" strokeWidth={2} name="Previsão IA" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Segmentação de Risco */}
          <Card>
            <CardHeader>
              <CardTitle>Clientes por Nível de Risco</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={riskSegments}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {riskSegments.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Estratégias */}
        <Card>
          <CardHeader>
            <CardTitle>Estratégias Ativas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {strategies.map((strategy) => (
                <div key={strategy.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{strategy.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">{strategy.description}</p>
                    </div>
                    <Badge 
                      variant={strategy.status === 'Ativo' ? 'default' : strategy.status === 'Em Desenvolvimento' ? 'secondary' : 'outline'}
                    >
                      {strategy.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Impacto</p>
                      <p className="font-semibold">{strategy.impact}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Clientes</p>
                      <p className="font-semibold">{strategy.clients}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Redução</p>
                      <p className="font-semibold text-green-600">{strategy.reduction}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Investimento</p>
                      <p className="font-semibold">{strategy.investment}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end space-x-2 mt-4">
                    <Button variant="outline" size="sm">Ver Detalhes</Button>
                    <Button variant="outline" size="sm">Editar</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ChurnStrategies;
