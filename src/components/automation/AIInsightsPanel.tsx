
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { ScrollArea } from '../ui/scroll-area';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Target,
  Users,
  DollarSign,
  Lightbulb,
  CheckCircle,
  Clock,
  ArrowRight,
  Zap,
  Activity
} from 'lucide-react';

interface AIInsight {
  id: string;
  type: 'prediction' | 'opportunity' | 'risk' | 'optimization';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  confidence: number;
  impact: {
    type: 'revenue' | 'churn' | 'efficiency' | 'satisfaction';
    value: string;
    timeline: string;
  };
  recommendations: string[];
  affectedClients?: string[];
  timestamp: string;
  status: 'new' | 'reviewing' | 'implemented' | 'dismissed';
}

const mockInsights: AIInsight[] = [
  {
    id: '1',
    type: 'risk',
    priority: 'critical',
    title: 'Alto Risco de Churn Detectado',
    description: 'IA identificou padrões comportamentais em 8 clientes Enterprise que indicam 85% de probabilidade de cancelamento nos próximos 15 dias.',
    confidence: 92,
    impact: {
      type: 'churn',
      value: 'R$ 340k ARR em risco',
      timeline: '15 dias'
    },
    recommendations: [
      'Contato imediato com CSM dedicado',
      'Análise personalizada de uso da plataforma',
      'Agendamento de reunião estratégica',
      'Oferta de consultoria premium gratuita'
    ],
    affectedClients: ['TechCorp LTDA', 'InnovaSoft', 'DataMax Solutions'],
    timestamp: '2024-01-20T14:30:00Z',
    status: 'new'
  },
  {
    id: '2',
    type: 'opportunity',
    priority: 'high',
    title: 'Oportunidade de Expansion Revenue',
    description: 'Identificados 12 clientes Growth com padrões de uso que sugerem necessidade de upgrade para Enterprise.',
    confidence: 87,
    impact: {
      type: 'revenue',
      value: '+R$ 89k MRR potencial',
      timeline: '30 dias'
    },
    recommendations: [
      'Campanha direcionada de upsell',
      'Demo personalizada das features Enterprise',
      'Análise de ROI customizada',
      'Proposta de migração gradual'
    ],
    affectedClients: ['StartupXYZ', 'AgileTeam', 'ScaleUp Inc'],
    timestamp: '2024-01-20T12:15:00Z',
    status: 'reviewing'
  },
  {
    id: '3',
    type: 'optimization',
    priority: 'medium',
    title: 'Otimização de Processos de Onboarding',
    description: 'IA sugere automação de 60% das etapas de onboarding baseada em análise de padrões de sucesso.',
    confidence: 94,
    impact: {
      type: 'efficiency',
      value: '40% redução no time-to-value',
      timeline: '45 dias'
    },
    recommendations: [
      'Implementar templates inteligentes',
      'Automatizar check-ins iniciais',
      'Personalizar jornada por segmento',
      'Criar alertas proativos'
    ],
    timestamp: '2024-01-20T10:45:00Z',
    status: 'implemented'
  }
];

export const AIInsightsPanel = () => {
  const [selectedInsight, setSelectedInsight] = useState<AIInsight | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'prediction': return TrendingUp;
      case 'opportunity': return Target;
      case 'risk': return AlertTriangle;
      case 'optimization': return Lightbulb;
      default: return Brain;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'reviewing': return 'bg-yellow-100 text-yellow-800';
      case 'implemented': return 'bg-green-100 text-green-800';
      case 'dismissed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInsights = filter === 'all' 
    ? mockInsights 
    : mockInsights.filter(insight => insight.type === filter);

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold flex items-center space-x-2">
            <Brain className="w-6 h-6 text-purple-600" />
            <span>Insights de IA em Tempo Real</span>
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Análises inteligentes e recomendações baseadas em dados comportamentais
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-green-100 text-green-800 animate-pulse">
            <Activity className="w-3 h-3 mr-1" />
            {mockInsights.length} insights ativos
          </Badge>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 overflow-x-auto">
        {[
          { key: 'all', label: 'Todos', icon: Brain },
          { key: 'risk', label: 'Riscos', icon: AlertTriangle },
          { key: 'opportunity', label: 'Oportunidades', icon: Target },
          { key: 'optimization', label: 'Otimizações', icon: Lightbulb },
          { key: 'prediction', label: 'Predições', icon: TrendingUp }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.key}
              variant={filter === tab.key ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(tab.key)}
              className="flex items-center space-x-1 whitespace-nowrap"
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInsights.map((insight) => {
          const TypeIcon = getTypeIcon(insight.type);
          
          return (
            <Card 
              key={insight.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedInsight(insight)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                      <TypeIcon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base mb-1">{insight.title}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(insight.priority)}>
                          {insight.priority}
                        </Badge>
                        <Badge className={getStatusColor(insight.status)}>
                          {insight.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{insight.description}</p>
                
                {/* Impact Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500">Impacto</div>
                    <div className="font-semibold text-sm text-green-600">
                      {insight.impact.value}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500">Confiança</div>
                    <div className="font-semibold text-sm">{insight.confidence}%</div>
                    <Progress value={insight.confidence} className="h-1 mt-1" />
                  </div>
                </div>

                {/* Quick Preview of Recommendations */}
                <div>
                  <div className="text-xs font-medium text-gray-700 mb-1">
                    Recomendações principais:
                  </div>
                  <div className="text-xs text-gray-600">
                    {insight.recommendations.slice(0, 2).join(' • ')}
                    {insight.recommendations.length > 2 && '...'}
                  </div>
                </div>

                {/* Timestamp */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(insight.timestamp).toLocaleString('pt-BR')}</span>
                  </div>
                  {insight.affectedClients && (
                    <Badge variant="outline" className="text-xs">
                      {insight.affectedClients.length} clientes
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detailed Insight Modal/Panel would go here */}
      {selectedInsight && (
        <Card className="mt-6 border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <span>Detalhes do Insight</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedInsight(null)}>
                ✕
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Análise Detalhada</h4>
                <p className="text-sm text-gray-600 mb-4">{selectedInsight.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Confiança:</span>
                    <span className="text-sm">{selectedInsight.confidence}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Timeline:</span>
                    <span className="text-sm">{selectedInsight.impact.timeline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Impacto:</span>
                    <span className="text-sm font-semibold text-green-600">
                      {selectedInsight.impact.value}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Recomendações</h4>
                <div className="space-y-2">
                  {selectedInsight.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline">
                Dispensar
              </Button>
              <Button>
                <Zap className="w-4 h-4 mr-2" />
                Implementar Ações
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
