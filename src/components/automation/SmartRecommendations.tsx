
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Lightbulb, 
  TrendingUp, 
  Target, 
  Users, 
  ArrowRight,
  CheckCircle,
  Zap,
  Brain,
  Star,
  Clock,
  DollarSign
} from 'lucide-react';
import { useAICredits } from '../../hooks/useAICredits';

interface SmartRecommendation {
  id: string;
  type: 'optimization' | 'opportunity' | 'risk' | 'automation';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  effort: string;
  confidence: number;
  roi: string;
  timeline: string;
  actions: string[];
  metrics: string[];
  status: 'new' | 'in-progress' | 'completed' | 'dismissed';
}

const mockRecommendations: SmartRecommendation[] = [
  {
    id: 'rec_001',
    type: 'optimization',
    priority: 'high',
    title: 'Otimizar Fluxo de Onboarding',
    description: 'IA detectou que 35% dos usuários abandonam o onboarding no 3º passo. Recomenda-se simplificar o processo.',
    impact: 'Redução de 40% no abandono',
    effort: 'Médio (2-3 semanas)',
    confidence: 92,
    roi: '+R$ 850k ARR',
    timeline: '3 semanas',
    actions: [
      'Simplificar formulário inicial',
      'Adicionar tutorial interativo',
      'Implementar salvamento automático',
      'Criar checkpoint de progresso'
    ],
    metrics: ['Taxa de Conclusão', '% Abandono', 'Tempo para Ativação'],
    status: 'new'
  },
  {
    id: 'rec_002',
    type: 'opportunity',
    priority: 'high',
    title: 'Campanha Upsell Inteligente',
    description: '47 clientes Growth mostram padrões de uso que indicam necessidade de upgrade para Enterprise.',
    impact: 'Potencial de conversão 78%',
    effort: 'Baixo (1 semana)',
    confidence: 87,
    roi: '+R$ 245k MRR',
    timeline: '1 semana',
    actions: [
      'Segmentar usuários por uso',
      'Criar campanha personalizada',
      'Agendar demos direcionadas',
      'Preparar propostas customizadas'
    ],
    metrics: ['Taxa de Conversão', 'Revenue per User', 'Feature Adoption'],
    status: 'in-progress'
  },
  {
    id: 'rec_003',
    type: 'risk',
    priority: 'high',
    title: 'Prevenção de Churn Proativa',
    description: '12 clientes Enterprise apresentam sinais de risco. IA sugere intervenção imediata.',
    impact: 'Preservar R$ 1.2M ARR',
    effort: 'Alto (4-6 semanas)',
    confidence: 94,
    roi: 'R$ 1.2M preservado',
    timeline: '72 horas para ação',
    actions: [
      'Contato direto com CSM',
      'Análise de health score',
      'Reunião estratégica',
      'Plano de ação personalizado'
    ],
    metrics: ['Health Score', 'NPS', 'Product Usage', 'Support Tickets'],
    status: 'new'
  },
  {
    id: 'rec_004',
    type: 'automation',
    priority: 'medium',
    title: 'Automatizar Qualificação de Leads',
    description: 'Implementar scoring automático baseado em comportamento para melhorar eficiência de vendas.',
    impact: 'Aumento de 60% na eficiência',
    effort: 'Alto (6-8 semanas)',
    confidence: 85,
    roi: '+35% conversão',
    timeline: '2 meses',
    actions: [
      'Definir critérios de scoring',
      'Implementar algoritmo ML',
      'Integrar com CRM',
      'Treinar equipe de vendas'
    ],
    metrics: ['Lead Score Accuracy', 'Conversion Rate', 'Sales Velocity'],
    status: 'new'
  }
];

export const SmartRecommendations = () => {
  const [recommendations, setRecommendations] = useState(mockRecommendations);
  const [selectedType, setSelectedType] = useState('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const { consumeCredits, credits } = useAICredits();

  const handleGenerateRecommendations = async () => {
    const success = await consumeCredits(40, 'Gerar Recomendações Inteligentes');
    if (success) {
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
        // Aqui seria chamada a API para gerar novas recomendações
        console.log('Novas recomendações geradas');
      }, 3000);
    }
  };

  const handleImplementRecommendation = async (recId: string) => {
    const success = await consumeCredits(20, 'Implementar Recomendação');
    if (success) {
      setRecommendations(prev => prev.map(rec => 
        rec.id === recId ? { ...rec, status: 'in-progress' } : rec
      ));
    }
  };

  const handleDismissRecommendation = (recId: string) => {
    setRecommendations(prev => prev.map(rec => 
      rec.id === recId ? { ...rec, status: 'dismissed' } : rec
    ));
  };

  const filteredRecommendations = selectedType === 'all' 
    ? recommendations.filter(rec => rec.status !== 'dismissed')
    : recommendations.filter(rec => rec.type === selectedType && rec.status !== 'dismissed');

  const getTypeIcon = (type: string) => {
    const icons = {
      optimization: Lightbulb,
      opportunity: TrendingUp,
      risk: Target,
      automation: Zap
    };
    return icons[type as keyof typeof icons] || Brain;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      optimization: 'text-yellow-600 bg-yellow-100',
      opportunity: 'text-green-600 bg-green-100',
      risk: 'text-red-600 bg-red-100',
      automation: 'text-blue-600 bg-blue-100'
    };
    return colors[type as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800 border-red-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[priority as keyof typeof colors];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      dismissed: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors];
  };

  return (
    <div className="space-y-6">
      {/* Header with Generation */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold flex items-center space-x-2">
            <Brain className="w-6 h-6 text-purple-600" />
            <span>Recomendações Inteligentes</span>
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Sugestões personalizadas baseadas em análise de dados e IA
          </p>
        </div>
        <Button 
          onClick={handleGenerateRecommendations}
          disabled={isGenerating || credits < 40}
        >
          <Brain className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-pulse' : ''}`} />
          {isGenerating ? 'Gerando...' : 'Gerar Novas (40 créditos)'}
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 overflow-x-auto">
        {[
          { key: 'all', label: 'Todas', icon: Brain },
          { key: 'optimization', label: 'Otimizações', icon: Lightbulb },
          { key: 'opportunity', label: 'Oportunidades', icon: TrendingUp },
          { key: 'risk', label: 'Riscos', icon: Target },
          { key: 'automation', label: 'Automações', icon: Zap }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.key}
              variant={selectedType === tab.key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(tab.key)}
              className="flex items-center space-x-1 whitespace-nowrap"
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRecommendations.map((rec) => {
          const TypeIcon = getTypeIcon(rec.type);
          
          return (
            <Card key={rec.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(rec.type)}`}>
                      <TypeIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{rec.title}</CardTitle>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getPriorityColor(rec.priority)}>
                          {rec.priority === 'high' ? 'Alta' : 
                           rec.priority === 'medium' ? 'Média' : 'Baixa'}
                        </Badge>
                        <Badge className={getStatusColor(rec.status)}>
                          {rec.status === 'new' ? 'Nova' :
                           rec.status === 'in-progress' ? 'Em Andamento' :
                           rec.status === 'completed' ? 'Concluída' : 'Dispensada'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-sm">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium">{rec.confidence}%</span>
                    </div>
                    <Progress value={rec.confidence} className="h-1 w-16 mt-1" />
                  </div>
                </div>
                <p className="text-sm text-gray-600">{rec.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Impact Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-1 mb-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-medium text-green-700">Impacto</span>
                    </div>
                    <p className="text-sm font-semibold text-green-800">{rec.impact}</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-1 mb-1">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-medium text-blue-700">Esforço</span>
                    </div>
                    <p className="text-sm font-semibold text-blue-800">{rec.effort}</p>
                  </div>
                </div>

                {/* ROI and Timeline */}
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-700">ROI:</span>
                    <span className="text-sm font-semibold text-purple-800">{rec.roi}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-semibold text-purple-800">{rec.timeline}</span>
                  </div>
                </div>

                {/* Actions Preview */}
                <div>
                  <p className="text-sm font-medium mb-2">Ações principais:</p>
                  <div className="space-y-1">
                    {rec.actions.slice(0, 2).map((action, index) => (
                      <div key={index} className="flex items-start space-x-2 text-sm">
                        <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{action}</span>
                      </div>
                    ))}
                    {rec.actions.length > 2 && (
                      <p className="text-xs text-gray-500 ml-5">
                        +{rec.actions.length - 2} ações adicionais
                      </p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  {rec.status === 'new' && (
                    <>
                      <Button 
                        onClick={() => handleImplementRecommendation(rec.id)}
                        className="flex-1"
                        disabled={credits < 20}
                      >
                        <Zap className="w-4 h-4 mr-1" />
                        Implementar (20 créditos)
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDismissRecommendation(rec.id)}
                      >
                        Dispensar
                      </Button>
                    </>
                  )}
                  {rec.status === 'in-progress' && (
                    <Button variant="outline" className="flex-1">
                      <Clock className="w-4 h-4 mr-1" />
                      Em Andamento
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    Detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Generation Status */}
      {isGenerating && (
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Brain className="w-5 h-5 text-purple-600 animate-pulse" />
              <div>
                <p className="font-medium text-purple-900">Gerando Recomendações Inteligentes...</p>
                <p className="text-sm text-purple-700">
                  IA está analisando dados e padrões para criar sugestões personalizadas
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {filteredRecommendations.length === 0 && !isGenerating && (
        <Card className="text-center py-12">
          <CardContent>
            <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhuma recomendação encontrada
            </h3>
            <p className="text-gray-600 mb-4">
              Clique em "Gerar Novas" para que a IA analise seus dados e crie recomendações personalizadas.
            </p>
            <Button onClick={handleGenerateRecommendations} disabled={credits < 40}>
              <Brain className="w-4 h-4 mr-2" />
              Gerar Recomendações (40 créditos)
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
