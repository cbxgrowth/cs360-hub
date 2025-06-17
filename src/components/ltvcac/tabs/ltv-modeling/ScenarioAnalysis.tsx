
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TrendingUp, Play, RotateCcw } from 'lucide-react';
import { useAICredits } from '../../../../hooks/useAICredits';

const scenarioData = [
  { month: 1, optimistic: 125000, realistic: 110000, pessimistic: 95000 },
  { month: 6, optimistic: 140000, realistic: 125000, pessimistic: 105000 },
  { month: 12, optimistic: 165000, realistic: 145000, pessimistic: 120000 },
  { month: 18, optimistic: 185000, realistic: 160000, pessimistic: 130000 },
  { month: 24, optimistic: 210000, realistic: 180000, pessimistic: 145000 }
];

export const ScenarioAnalysis: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const { consumeCredits, credits } = useAICredits();

  const runScenarioAnalysis = async () => {
    const success = await consumeCredits(20, 'Análise de Cenários');
    if (success) {
      setIsRunning(true);
      setTimeout(() => {
        setIsRunning(false);
        setHasResults(true);
      }, 2000);
    }
  };

  const resetAnalysis = () => {
    setHasResults(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Análise de Cenários
        </CardTitle>
        <div className="flex gap-2">
          {hasResults && (
            <Button variant="outline" size="sm" onClick={resetAnalysis}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Resetar
            </Button>
          )}
          <Button 
            size="sm"
            onClick={runScenarioAnalysis}
            disabled={isRunning || credits < 20}
          >
            <Play className="w-4 h-4 mr-2" />
            {isRunning ? 'Executando...' : 'Executar IA'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {!hasResults ? (
          <div className="text-center py-12">
            <TrendingUp className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Análise de Cenários com IA
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Execute a análise para ver projeções otimistas, realistas e pessimistas
            </p>
            <Badge variant="outline" className="mb-4">
              20 créditos necessários
            </Badge>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Scenarios Summary */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4 text-center">
                  <p className="text-sm font-medium text-green-600">Otimista</p>
                  <p className="text-2xl font-bold text-green-700">R$ 210k</p>
                  <p className="text-xs text-green-600">LTV em 24 meses</p>
                </CardContent>
              </Card>
              
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4 text-center">
                  <p className="text-sm font-medium text-blue-600">Realista</p>
                  <p className="text-2xl font-bold text-blue-700">R$ 180k</p>
                  <p className="text-xs text-blue-600">LTV em 24 meses</p>
                </CardContent>
              </Card>
              
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-4 text-center">
                  <p className="text-sm font-medium text-red-600">Pessimista</p>
                  <p className="text-2xl font-bold text-red-700">R$ 145k</p>
                  <p className="text-xs text-red-600">LTV em 24 meses</p>
                </CardContent>
              </Card>
            </div>

            {/* Scenarios Chart */}
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={scenarioData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  label={{ value: 'Meses', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  label={{ value: 'LTV (R$)', angle: -90, position: 'insideLeft' }}
                  tickFormatter={(value) => `R$ ${(value/1000).toFixed(0)}k`}
                />
                <Tooltip 
                  formatter={(value: any) => [`R$ ${(value/1000).toFixed(0)}k`, '']}
                  labelFormatter={(label) => `Mês ${label}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="optimistic" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  name="Otimista"
                  strokeDasharray="5 5"
                />
                <Line 
                  type="monotone" 
                  dataKey="realistic" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  name="Realista"
                />
                <Line 
                  type="monotone" 
                  dataKey="pessimistic" 
                  stroke="#EF4444" 
                  strokeWidth={3}
                  name="Pessimista"
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>

            {/* Analysis Insights */}
            <Card className="bg-gray-50 dark:bg-gray-800/50">
              <CardContent className="p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Insights da Análise IA
                </h4>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p>• <strong>Cenário Otimista:</strong> Crescimento de receita de 25% a.a. e redução de churn para 2%</p>
                  <p>• <strong>Cenário Realista:</strong> Crescimento moderado de 15% a.a. com churn estável em 3.2%</p>
                  <p>• <strong>Cenário Pessimista:</strong> Crescimento de 8% a.a. com aumento de churn para 4.5%</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
