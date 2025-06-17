
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Progress } from '../../../ui/progress';
import { AlertTriangle, Shield, TrendingDown } from 'lucide-react';

const riskFactors = [
  {
    factor: 'Aumento do Churn',
    probability: 35,
    impact: 'Alto',
    trend: 'Crescente',
    description: 'Taxa de churn projetada para subir 0.8% nos próximos 3 meses'
  },
  {
    factor: 'Redução ARPU',
    probability: 22,
    impact: 'Médio',
    trend: 'Estável',
    description: 'Pressão competitiva pode reduzir receita por usuário'
  },
  {
    factor: 'Saturação Mercado',
    probability: 18,
    impact: 'Alto',
    trend: 'Crescente',
    description: 'CAC pode aumentar devido à maior competição'
  }
];

export const RiskAnalysisCard: React.FC = () => {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Alto':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'Médio':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Baixo':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 30) return 'text-red-600';
    if (probability >= 15) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <Card className="border-l-4 border-l-orange-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-600" />
          Análise de Riscos IA
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Risk Score */}
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-orange-700">Score de Risco Geral</span>
            <Badge className="bg-orange-100 text-orange-800">Moderado</Badge>
          </div>
          <div className="flex items-center gap-3">
            <Progress value={35} className="flex-1 h-3" />
            <span className="text-lg font-bold text-orange-700">35%</span>
          </div>
          <p className="text-sm text-orange-600 mt-2">
            Baseado em análise de 50+ variáveis de mercado e histórico
          </p>
        </div>

        {/* Risk Factors */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 dark:text-white">
            Principais Fatores de Risco
          </h4>
          
          {riskFactors.map((risk, index) => (
            <Card key={index} className="border border-gray-200 dark:border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900 dark:text-white">
                      {risk.factor}
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {risk.description}
                    </p>
                  </div>
                  <Badge className={getImpactColor(risk.impact)}>
                    {risk.impact}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Probabilidade:
                    </span>
                    <span className={`font-medium ${getProbabilityColor(risk.probability)}`}>
                      {risk.probability}%
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                    <TrendingDown className="w-4 h-4" />
                    {risk.trend}
                  </div>
                </div>

                <Progress value={risk.probability} className="mt-2 h-2" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mitigation Strategies */}
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-green-600" />
              <h4 className="font-medium text-green-700">Estratégias de Mitigação</h4>
            </div>
            <div className="space-y-2 text-sm text-green-700">
              <p>• Implementar programa de retenção para reduzir churn</p>
              <p>• Diversificar canais de aquisição para otimizar CAC</p>
              <p>• Desenvolver produtos premium para aumentar ARPU</p>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};
