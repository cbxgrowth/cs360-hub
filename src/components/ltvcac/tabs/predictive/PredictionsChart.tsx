
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart } from 'recharts';
import { TrendingUp, Brain } from 'lucide-react';

const predictionData = [
  { month: 'Jan', actual: 152000, predicted: 148000, confidence: 92 },
  { month: 'Fev', actual: 148000, predicted: 151000, confidence: 89 },
  { month: 'Mar', actual: 155000, predicted: 154000, confidence: 94 },
  { month: 'Abr', actual: null, predicted: 158000, confidence: 87 },
  { month: 'Mai', actual: null, predicted: 162000, confidence: 85 },
  { month: 'Jun', actual: null, predicted: 167000, confidence: 83 },
  { month: 'Jul', actual: null, predicted: 171000, confidence: 81 },
  { month: 'Ago', actual: null, predicted: 175000, confidence: 78 }
];

export const PredictionsChart: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-600" />
          Previsões LTV - IA Preditiva
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={predictionData}>
            <defs>
              <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis 
              tickFormatter={(value) => `R$ ${(value/1000).toFixed(0)}k`}
            />
            <Tooltip 
              formatter={(value: any, name: string) => {
                if (name === 'actual' || name === 'predicted') {
                  return [`R$ ${(value/1000).toFixed(0)}k`, name === 'actual' ? 'Real' : 'Previsto'];
                }
                return [`${value}%`, 'Confiança'];
              }}
              labelFormatter={(label) => `Mês: ${label}`}
            />
            <Legend />
            
            {/* Confidence Band */}
            <Area
              type="monotone"
              dataKey="confidence"
              fill="url(#confidenceGradient)"
              fillOpacity={0.3}
              stroke="none"
            />
            
            {/* Actual Values */}
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="#10B981" 
              strokeWidth={3}
              name="LTV Real"
              dot={{ fill: '#10B981', strokeWidth: 2, r: 5 }}
              connectNulls={false}
            />
            
            {/* Predicted Values */}
            <Line 
              type="monotone" 
              dataKey="predicted" 
              stroke="#8B5CF6" 
              strokeWidth={3}
              strokeDasharray="5 5"
              name="LTV Previsto"
              dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Prediction Summary */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-purple-600">Próximos 3 Meses</p>
            <p className="text-2xl font-bold text-purple-700">R$ 162k</p>
            <p className="text-xs text-purple-600">LTV médio previsto</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-green-600">Tendência</p>
            <p className="text-2xl font-bold text-green-700">+8.5%</p>
            <p className="text-xs text-green-600">Crescimento projetado</p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-blue-600">Confiança IA</p>
            <p className="text-2xl font-bold text-blue-700">85%</p>
            <p className="text-xs text-blue-600">Precisão do modelo</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
