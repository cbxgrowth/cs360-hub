
import React from 'react';
import { Card, CardContent } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { CheckCircle, Circle, Brain, BarChart3, TrendingUp } from 'lucide-react';

interface LTVModel {
  id: string;
  name: string;
  description: string;
  accuracy: number;
  complexity: string;
  formula: string;
  active: boolean;
}

interface ModelSelectorProps {
  models: LTVModel[];
  selectedModel: string;
  onModelSelect: (modelId: string) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  models,
  selectedModel,
  onModelSelect
}) => {
  const getModelIcon = (modelId: string) => {
    switch (modelId) {
      case 'traditional':
        return <BarChart3 className="w-6 h-6" />;
      case 'cohort':
        return <TrendingUp className="w-6 h-6" />;
      case 'predictive':
        return <Brain className="w-6 h-6" />;
      default:
        return <BarChart3 className="w-6 h-6" />;
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Baixa':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Média':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Alta':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-600';
    if (accuracy >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Selecionar Modelo LTV
        </h3>
        <Badge variant="outline">
          {models.filter(m => m.active).length} modelo(s) ativo(s)
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {models.map((model) => (
          <Card 
            key={model.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedModel === model.id 
                ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
            }`}
            onClick={() => onModelSelect(model.id)}
          >
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      selectedModel === model.id 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {getModelIcon(model.id)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {model.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {model.description}
                      </p>
                    </div>
                  </div>
                  {selectedModel === model.id ? (
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400" />
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Precisão
                    </span>
                    <span className={`font-medium ${getAccuracyColor(model.accuracy)}`}>
                      {model.accuracy}%
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Complexidade
                    </span>
                    <Badge className={getComplexityColor(model.complexity)}>
                      {model.complexity}
                    </Badge>
                  </div>

                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      <strong>Fórmula:</strong> {model.formula}
                    </p>
                  </div>
                </div>

                {!model.active && (
                  <Button size="sm" variant="outline" className="w-full">
                    Ativar Modelo
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
