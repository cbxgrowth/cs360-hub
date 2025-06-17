
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  DollarSign,
  Target,
  Lightbulb,
  Zap,
  BarChart3,
  ArrowUp,
  ArrowDown,
  Clock
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

export const AIInsightsDashboard = () => {
  const aiInsights = [
    {
      type: 'opportunity',
      title: 'Oportunidade de Crescimento',
      description: 'Clientes do plano Professional com alta utilização podem ser upgrades para Enterprise',
      impact: 'Alto',
      value: '+R$ 127K MRR potencial',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      type: 'risk',
      title: 'Risco de Churn Identificado',
      description: '18 contas Enterprise com baixo engagement nas últimas 4 semanas',
      impact: 'Crítico',
      value: 'R$ 89K em risco',
      icon: AlertTriangle,
      color: 'text-red-600'
    },
    {
      type: 'optimization',
      title: 'Otimização de Recursos',
      description: 'Funcionalidade de automação subutilizada em 67% das contas Growth',
      impact: 'Médio',
      value: '34% melhoria esperada',
      icon: Zap,
      color: 'text-blue-600'
    },
    {
      type: 'trend',
      title: 'Tendência de Mercado',
      description: 'Aumento de 23% na demanda por relatórios avançados',
      impact: 'Alto',
      value: 'Nova feature sugerida',
      icon: BarChart3,
      color: 'text-purple-600'
    }
  ];

  const predictiveData = [
    { month: 'Jan', mrr: 624, predicted: 630 },
    { month: 'Fev', mrr: 642, predicted: 648 },
    { month: 'Mar', mrr: 658, predicted: 665 },
    { month: 'Abr', mrr: 673, predicted: 682 },
    { month: 'Mai', mrr: 689, predicted: 698 },
    { month: 'Jun', mrr: 0, predicted: 715 }
  ];

  const churnPrediction = [
    { segment: 'Starter', risk: 15, count: 87 },
    { segment: 'Professional', risk: 8, count: 32 },
    { segment: 'Growth', risk: 12, count: 29 },
    { segment: 'Enterprise', risk: 5, count: 3 }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center space-x-2">
            <Brain className="w-6 h-6 text-blue-600" />
            <span>Insights de IA</span>
          </h2>
          <p className="text-muted-foreground">Análises preditivas e recomendações inteligentes</p>
        </div>
        <Badge className="bg-blue-100 text-blue-800">
          <Lightbulb className="w-3 h-3 mr-1" />
          4 Insights Ativos
        </Badge>
      </div>

      {/* AI Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {aiInsights.map((insight, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <insight.icon className={`w-5 h-5 ${insight.color}`} />
                  <span className="text-lg">{insight.title}</span>
                </div>
                <Badge variant={insight.impact === 'Crítico' ? 'destructive' : insight.impact === 'Alto' ? 'default' : 'secondary'}>
                  {insight.impact}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{insight.description}</p>
              <div className="flex items-center justify-between">
                <span className={`font-bold text-lg ${insight.color}`}>{insight.value}</span>
                <Button size="sm" variant="outline">Ver Detalhes</Button>
              </div>
            </CardContent>
            <div className={`absolute bottom-0 left-0 right-0 h-1 ${insight.color.replace('text-', 'bg-')}`}></div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Predictive MRR */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Previsão de MRR (IA)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={predictiveData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  `R$ ${value}K`,
                  name === 'mrr' ? 'MRR Real' : 'Previsão IA'
                ]} />
                <Line type="monotone" dataKey="mrr" stroke="#3B82F6" strokeWidth={3} />
                <Line type="monotone" dataKey="predicted" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <ArrowUp className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-800">Crescimento Projetado: +3.8% próximo mês</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Churn Risk Prediction */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>Previsão de Churn</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {churnPrediction.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: COLORS[index] }}></div>
                    <span className="font-medium">{item.segment}</span>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${item.risk > 10 ? 'text-red-600' : item.risk > 5 ? 'text-yellow-600' : 'text-green-600'}`}>
                      {item.risk}% risco
                    </div>
                    <div className="text-sm text-muted-foreground">{item.count} contas</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-yellow-600" />
                <span className="font-medium text-yellow-800">Ação recomendada em 15 contas nos próximos 7 dias</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>Recomendações Estratégicas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Retenção</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Implementar programa de onboarding personalizado para novos usuários Enterprise
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Implementar
              </Button>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="font-medium">Upsell</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Criar campanha direcionada para clientes Professional com alta utilização
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Criar Campanha
              </Button>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-5 h-5 text-purple-600" />
                <span className="font-medium">Produto</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Desenvolver nova funcionalidade de relatórios avançados baseada na demanda
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Priorizar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
