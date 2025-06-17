
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Brain, Zap, TrendingUp, Target, Users, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';

interface AIMetric {
  id: string;
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: React.ElementType;
  color: string;
  description: string;
}

const aiMetrics: AIMetric[] = [
  {
    id: 'predictions_accuracy',
    title: 'Precisão de Predições',
    value: '89.2%',
    change: '+3.2%',
    trend: 'up',
    icon: Brain,
    color: 'purple',
    description: 'Precisão média dos modelos de IA'
  },
  {
    id: 'automated_actions',
    title: 'Ações Automatizadas',
    value: 247,
    change: '+18',
    trend: 'up',
    icon: Zap,
    color: 'blue',
    description: 'Ações executadas automaticamente'
  },
  {
    id: 'revenue_impact',
    title: 'Impacto na Receita',
    value: 'R$ 1.2M',
    change: '+34%',
    trend: 'up',
    icon: DollarSign,
    color: 'green',
    description: 'Receita gerada através da IA'
  },
  {
    id: 'churn_prevented',
    title: 'Churn Prevenido',
    value: 15,
    change: '+5',
    trend: 'up',
    icon: Target,
    color: 'orange',
    description: 'Clientes salvos por intervenções IA'
  }
];

const aiInsights = [
  {
    id: 'insight_1',
    type: 'opportunity',
    priority: 'high',
    title: 'Oportunidade de Upsell Detectada',
    description: 'TechCorp LTDA mostra padrões de uso que indicam necessidade do plano Enterprise',
    confidence: 92,
    potentialValue: 'R$ 45k ARR',
    recommendedAction: 'Agendar reunião comercial',
    timeframe: '72h',
    factors: ['Uso acima da média', 'Solicitações de suporte específicas', 'Crescimento da equipe']
  },
  {
    id: 'insight_2',
    type: 'risk',
    priority: 'urgent',
    title: 'Risco de Churn Identificado',
    description: 'BigCorp S.A. apresenta sinais de insatisfação e possível cancelamento',
    confidence: 87,
    potentialValue: 'R$ 120k ARR em risco',
    recommendedAction: 'Intervenção imediata do CS',
    timeframe: '24h',
    factors: ['NPS baixo (3)', 'Redução de 40% no uso', 'Tickets de suporte negativos']
  },
  {
    id: 'insight_3',
    type: 'success',
    priority: 'medium',
    title: 'Estratégia de Retenção Eficaz',
    description: 'Programa de onboarding personalizado aumentou retenção em 23%',
    confidence: 95,
    potentialValue: 'R$ 890k ARR protegido',
    recommendedAction: 'Escalar estratégia',
    timeframe: '1 semana',
    factors: ['Engajamento aumentado', 'NPS melhorado', 'Tempo para valor reduzido']
  }
];

export const AutomationDashboard = () => {
  const getMetricColor = (color: string) => {
    const colors = {
      purple: 'from-purple-500 to-purple-600',
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      orange: 'from-orange-500 to-orange-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      urgent: 'bg-red-100 text-red-800 border-red-200',
      high: 'bg-orange-100 text-orange-800 border-orange-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  const getInsightIcon = (type: string) => {
    const icons = {
      opportunity: TrendingUp,
      risk: AlertTriangle,
      success: CheckCircle
    };
    return icons[type as keyof typeof icons] || Brain;
  };

  return (
    <div className="space-y-6">
      {/* AI Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {aiMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${getMetricColor(metric.color)} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    {metric.change}
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{metric.value}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{metric.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">{metric.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* AI Insights */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <span>Insights de IA em Tempo Real</span>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
              {aiInsights.length} ativos
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {aiInsights.map((insight) => {
            const Icon = getInsightIcon(insight.type);
            return (
              <div key={insight.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{insight.title}</h4>
                        <Badge className={getPriorityColor(insight.priority)}>
                          {insight.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{insight.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                        <div className="bg-gray-50 dark:bg-gray-700 rounded p-2">
                          <div className="text-xs text-gray-500 dark:text-gray-400">Confiança</div>
                          <div className="font-semibold text-sm">{insight.confidence}%</div>
                          <Progress value={insight.confidence} className="h-1 mt-1" />
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded p-2">
                          <div className="text-xs text-gray-500 dark:text-gray-400">Valor Potencial</div>
                          <div className="font-semibold text-sm text-green-600">{insight.potentialValue}</div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded p-2">
                          <div className="text-xs text-gray-500 dark:text-gray-400">Prazo</div>
                          <div className="font-semibold text-sm text-orange-600">{insight.timeframe}</div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Fatores identificados:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {insight.factors.map((factor, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {factor}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <span className="font-medium text-blue-600 dark:text-blue-400">
                            Ação recomendada:
                          </span>
                          <span className="ml-1 text-gray-600 dark:text-gray-400">
                            {insight.recommendedAction}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};
