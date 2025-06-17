
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Brain, TrendingUp, Target, Users, Lightbulb, Zap, RefreshCw, CheckCircle } from 'lucide-react';
import { useAICredits } from '../../hooks/useAICredits';

interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  confidence: number;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  category: 'retention' | 'growth' | 'efficiency' | 'satisfaction';
  estimatedImpact: string;
  estimatedEffort: string;
  suggestedActions: string[];
  kpis: string[];
  createdAt: string;
}

const mockRecommendations: AIRecommendation[] = [
  {
    id: 'rec_001',
    title: 'Programa de Retenção Personalizado',
    description: 'IA identificou padrão de churn em clientes com 6-8 meses. Criar programa de engajamento personalizado.',
    confidence: 89,
    priority: 'high',
    category: 'retention',
    estimatedImpact: 'Redução de 25% no churn',
    estimatedEffort: '3-4 semanas',
    suggestedActions: [
      'Implementar sistema de alertas preditivos',
      'Criar jornada de re-engajamento automática',
      'Desenvolver conteúdo personalizado por segmento'
    ],
    kpis: ['Taxa de Churn', 'Tempo de Vida do Cliente', 'Engajamento'],
    createdAt: '2024-06-15T09:00:00Z'
  },
  {
    id: 'rec_002',
    title: 'Otimização de Onboarding',
    description: 'Análise mostra que 40% dos usuários abandonam no 3º dia. Otimizar processo de onboarding.',
    confidence: 94,
    priority: 'urgent',
    category: 'efficiency',
    estimatedImpact: 'Aumento de 35% na ativação',
    estimatedEffort: '2-3 semanas',
    suggestedActions: [
      'Simplificar setup inicial',
      'Adicionar tutorial interativo',
      'Implementar checkpoints de progresso'
    ],
    kpis: ['Taxa de Ativação', 'Tempo para Primeiro Valor', 'Abandono'],
    createdAt: '2024-06-15T08:30:00Z'
  },
  {
    id: 'rec_003',
    title: 'Programa de Expansão de Contas',
    description: 'Clientes enterprise mostram potencial para upgrade. Criar estratégia de upsell direcionada.',
    confidence: 76,
    priority: 'medium',
    category: 'growth',
    estimatedImpact: 'Aumento de 20% no ARR',
    estimatedEffort: '4-6 semanas',
    suggestedActions: [
      'Identificar triggers de upgrade',
      'Treinar equipe comercial',
      'Criar propostas personalizadas'
    ],
    kpis: ['Revenue per Customer', 'Taxa de Upgrade', 'Expansão'],
    createdAt: '2024-06-15T07:45:00Z'
  }
];

interface StrategyRecommendationsProps {
  onCreateStrategy?: (recommendation: AIRecommendation) => void;
}

export const StrategyRecommendations: React.FC<StrategyRecommendationsProps> = ({ 
  onCreateStrategy 
}) => {
  const [recommendations, setRecommendations] = useState(mockRecommendations);
  const [isGenerating, setIsGenerating] = useState(false);
  const { consumeCredits, credits } = useAICredits();

  const handleGenerateRecommendations = async () => {
    const success = await consumeCredits(50, 'Gerar Recomendações de Estratégia');
    if (success) {
      setIsGenerating(true);
      
      // Simular geração de recomendações
      setTimeout(() => {
        setIsGenerating(false);
        // Aqui normalmente faria uma chamada para a API de IA
        console.log('Novas recomendações geradas');
      }, 3000);
    }
  };

  const handleCreateStrategyFromRecommendation = async (recommendation: AIRecommendation) => {
    const success = await consumeCredits(25, 'Criar Estratégia da Recomendação IA');
    if (success && onCreateStrategy) {
      onCreateStrategy(recommendation);
    }
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      urgent: 'bg-red-100 text-red-800 border-red-200',
      high: 'bg-orange-100 text-orange-800 border-orange-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[priority as keyof typeof colors];
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      retention: Target,
      growth: TrendingUp,
      efficiency: Zap,
      satisfaction: Users
    };
    return icons[category as keyof typeof icons] || Lightbulb;
  };

  return (
    <div className="space-y-6">
      {/* Header with Generation Button */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Brain className="w-6 h-6 text-purple-600" />
              <div>
                <CardTitle className="text-purple-900">Recomendações de IA</CardTitle>
                <p className="text-sm text-purple-700">
                  Estratégias inteligentes baseadas em análise de dados
                </p>
              </div>
            </div>
            <Button 
              onClick={handleGenerateRecommendations}
              disabled={isGenerating || credits < 50}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
              {isGenerating ? 'Gerando...' : 'Gerar Novas (50 créditos)'}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {recommendations.map((rec) => {
          const CategoryIcon = getCategoryIcon(rec.category);
          
          return (
            <Card key={rec.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <CategoryIcon className="w-5 h-5 text-blue-600" />
                    <Badge className={getPriorityColor(rec.priority)}>
                      {rec.priority === 'urgent' ? 'Urgente' :
                       rec.priority === 'high' ? 'Alta' :
                       rec.priority === 'medium' ? 'Média' : 'Baixa'}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">
                      {rec.confidence}% confiança
                    </div>
                    <Progress value={rec.confidence} className="h-1 w-20" />
                  </div>
                </div>
                <CardTitle className="text-lg">{rec.title}</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">{rec.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Impact & Effort */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-green-700">Impacto Estimado</p>
                    <p className="text-sm font-semibold text-green-800">{rec.estimatedImpact}</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-blue-700">Esforço Estimado</p>
                    <p className="text-sm font-semibold text-blue-800">{rec.estimatedEffort}</p>
                  </div>
                </div>

                {/* Suggested Actions */}
                <div>
                  <p className="text-sm font-medium mb-2">Ações Sugeridas:</p>
                  <ul className="space-y-1">
                    {rec.suggestedActions.slice(0, 2).map((action, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* KPIs */}
                <div>
                  <p className="text-sm font-medium mb-2">KPIs de Acompanhamento:</p>
                  <div className="flex flex-wrap gap-1">
                    {rec.kpis.map((kpi, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {kpi}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Button 
                    onClick={() => handleCreateStrategyFromRecommendation(rec)}
                    className="flex-1"
                    disabled={credits < 25}
                  >
                    <Zap className="w-4 h-4 mr-1" />
                    Criar Estratégia (25 créditos)
                  </Button>
                  <Button variant="outline" size="sm">
                    Detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {isGenerating && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
              <div>
                <p className="font-medium text-blue-900">Gerando Recomendações...</p>
                <p className="text-sm text-blue-700">
                  A IA está analisando seus dados para gerar novas estratégias personalizadas
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
