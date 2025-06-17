
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Brain, MessageSquare, Target, BarChart3, Zap } from 'lucide-react';

export const ActionsSection = () => {
  const handleNavigateToStrategies = () => {
    window.location.href = '/strategies';
  };

  const handleNavigateToAutomation = () => {
    window.location.href = '/automation';
  };

  const handleNavigateToReports = () => {
    window.location.href = '/reports';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Assistente IA */}
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700 hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-blue-800 dark:text-blue-400 flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Assistente IA
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Insights inteligentes e recomendações personalizadas baseadas em IA
          </p>
          <div className="space-y-2">
            <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">Última análise:</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              "Cliente TechCorp mostra sinais de expansão. Recomenda-se abordagem proativa."
            </div>
          </div>
          <Button 
            size="sm" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleNavigateToAutomation}
          >
            <Zap className="w-4 h-4 mr-2" />
            Acessar IA
          </Button>
        </CardContent>
      </Card>

      {/* Feedback CSAT Recente */}
      <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700 hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-green-800 dark:text-green-400 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Feedback CSAT Recente
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-700 dark:text-green-300">4.7</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Score médio</div>
          </div>
          <div className="space-y-2">
            <div className="text-xs text-green-600 dark:text-green-400 font-medium">Último feedback:</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              "Excelente atendimento e resultados mensuráveis."
            </div>
          </div>
          <Button 
            size="sm" 
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            onClick={handleNavigateToReports}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Ver Relatórios
          </Button>
        </CardContent>
      </Card>

      {/* Ações Recomendadas IA */}
      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700 hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-purple-800 dark:text-purple-400 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Ações Recomendadas IA
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-3 bg-white dark:bg-gray-700 rounded-lg border border-purple-200 dark:border-purple-600">
              <div className="text-xs font-medium text-purple-600 dark:text-purple-400 mb-1">ALTA PRIORIDADE</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">Revisar conta BigCorp - Risco de churn</div>
            </div>
            <div className="p-3 bg-white dark:bg-gray-700 rounded-lg border border-purple-200 dark:border-purple-600">
              <div className="text-xs font-medium text-purple-600 dark:text-purple-400 mb-1">OPORTUNIDADE</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">Upsell Analytics Pro para 5 clientes</div>
            </div>
          </div>
          <Button 
            size="sm" 
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            onClick={handleNavigateToStrategies}
          >
            <Target className="w-4 h-4 mr-2" />
            Ver Estratégias
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
