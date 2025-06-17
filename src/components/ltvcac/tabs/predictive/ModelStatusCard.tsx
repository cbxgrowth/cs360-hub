
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Progress } from '../../../ui/progress';
import { Brain, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';
import { useAICredits } from '../../../../hooks/useAICredits';

interface ModelStatusCardProps {
  isTraining: boolean;
  onRetrainModel: () => void;
}

export const ModelStatusCard: React.FC<ModelStatusCardProps> = ({
  isTraining,
  onRetrainModel
}) => {
  const { consumeCredits, credits } = useAICredits();

  const handleRetrain = async () => {
    const success = await consumeCredits(100, 'Retreinamento do Modelo IA');
    if (success) {
      onRetrainModel();
    }
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-blue-600" />
          Status do Modelo Preditivo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Model Status */}
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Status</p>
              <Badge className="bg-green-100 text-green-800">Ativo</Badge>
            </div>
          </div>

          {/* Model Accuracy */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-blue-600">92%</span>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Precisão</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Muito Alta</p>
            </div>
          </div>

          {/* Last Training */}
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Último Treino</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">7 dias atrás</p>
            </div>
          </div>
        </div>

        {isTraining && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-blue-600">Retreinando modelo...</span>
              <span className="text-sm text-blue-600">65%</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-blue-200">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>Última atualização: hoje às 14:30</p>
            <p>Próxima atualização automática: amanhã</p>
          </div>
          <Button 
            onClick={handleRetrain}
            disabled={isTraining || credits < 100}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isTraining ? 'animate-spin' : ''}`} />
            {isTraining ? 'Treinando...' : 'Retreinar (100 créditos)'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
