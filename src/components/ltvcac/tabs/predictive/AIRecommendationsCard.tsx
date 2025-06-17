
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Brain, Lightbulb, Target, TrendingUp, Star } from 'lucide-react';
import { useAICredits } from '../../../../hooks/useAICredits';

const recommendations = [
  {
    id: 1,
    title: 'Otimizar Canal Google Ads',
    description: 'Ajustar lances para palavras-chave de baixo CAC identificadas pela IA',
    impact: 'Alto',
    effort: 'Baixo',
    priority: 'high',
    estimatedImprovement: '+15% ROI',
    credits: 10
  },
  {
    id: 2,
    title: 'Implementar Onboarding Personalizado',
    description: 'Personalizar jornada baseada no perfil de risco de churn',
    impact: 'Alto',
    effort: 'Médio',
    priority: 'high',
    estimatedImprovement: '-25% Churn',
    credits: 30
  },
  {
    id: 3,
    title: 'Expandir Programa de Referral',
    description: 'Canal com menor CAC e maior LTV identificado pela análise',
    impact: 'Médio',
    effort: 'Baixo',
    priority: 'medium',
    estimatedImprovement: '+20% Leads',
    credits: 15
  }
];

export const AIRecommendationsCard: React.FC = () => {
  const { consumeCredits } = useAICredits();

  const handleImplementRecommendation = async (rec: any) => {
    const success = await consumeCredits(rec.credits, `Implementar: ${rec.title}`);
    if (success) {
      console.log(`Implementando recomendação: ${rec.title}`);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'Alto':
        return <Star className="w-4 h-4 text-yellow-500" />;
      case 'Médio':
        return <TrendingUp className="w-4 h-4 text-blue-500" />;
      default:
        return <Target className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-indigo-600" />
          Recomendações IA Personalizadas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec) => (
          <Card key={rec.id} className="border border-gray-200 dark:border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-indigo-600" />
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {rec.title}
                    </h4>
                    <Badge className={getPriorityColor(rec.priority)}>
                      {rec.priority === 'high' ? 'Alta' : rec.priority === 'medium' ? 'Média' : 'Baixa'} Prioridade
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {rec.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      {getImpactIcon(rec.impact)}
                      <span className="text-gray-600 dark:text-gray-400">
                        Impacto: {rec.impact}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Esforço: {rec.effort}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="font-medium text-green-600">
                        {rec.estimatedImprovement}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                <Badge variant="outline" className="text-indigo-600 border-indigo-200">
                  {rec.credits} créditos IA
                </Badge>
                <Button
                  size="sm"
                  onClick={() => handleImplementRecommendation(rec)}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Implementar IA
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Generate New Recommendations */}
        <Card className="border-2 border-dashed border-indigo-200 bg-indigo-50/50">
          <CardContent className="p-6 text-center">
            <Brain className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h4 className="font-medium text-indigo-700 mb-2">
              Gerar Novas Recomendações
            </h4>
            <p className="text-sm text-indigo-600 mb-4">
              A IA pode analisar seus dados atualizados e gerar recomendações personalizadas
            </p>
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={() => consumeCredits(25, 'Gerar Novas Recomendações IA')}
            >
              <Brain className="w-4 h-4 mr-2" />
              Gerar com IA (25 créditos)
            </Button>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};
