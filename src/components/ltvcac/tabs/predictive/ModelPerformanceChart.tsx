
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';
import { BarChart3, Target } from 'lucide-react';

const performanceData = [
  { metric: 'Precisão', value: 92, benchmark: 85 },
  { metric: 'Recall', value: 88, benchmark: 80 },
  { metric: 'F1-Score', value: 90, benchmark: 82 },
  { metric: 'AUC', value: 94, benchmark: 87 }
];

const accuracyOverTime = [
  { week: 'Sem 1', accuracy: 78 },
  { week: 'Sem 2', accuracy: 82 },
  { week: 'Sem 3', accuracy: 85 },
  { week: 'Sem 4', accuracy: 88 },
  { week: 'Sem 5', accuracy: 90 },
  { week: 'Sem 6', accuracy: 92 }
];

export const ModelPerformanceChart: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-orange-600" />
          Performance do Modelo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Performance Metrics */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">
            Métricas vs Benchmark
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metric" />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(value) => [`${value}%`, '']} />
              <Bar dataKey="value" fill="#F59E0B" name="Modelo Atual" />
              <Bar dataKey="benchmark" fill="#6B7280" name="Benchmark" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Accuracy Evolution */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">
            Evolução da Precisão
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={accuracyOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis domain={[70, 100]} />
              <Tooltip formatter={(value) => [`${value}%`, 'Precisão']} />
              <Line 
                type="monotone" 
                dataKey="accuracy" 
                stroke="#F59E0B" 
                strokeWidth={3}
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-orange-600" />
              <span className="font-medium text-orange-700">Erro Médio</span>
            </div>
            <p className="text-2xl font-bold text-orange-700">3.2%</p>
            <p className="text-sm text-orange-600">MAPE (Mean Absolute Percentage Error)</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-700">R² Score</span>
            </div>
            <p className="text-2xl font-bold text-green-700">0.94</p>
            <p className="text-sm text-green-600">Coeficiente de Determinação</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
