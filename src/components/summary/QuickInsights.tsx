
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { TrendingUp, AlertTriangle, Star } from 'lucide-react';

export const QuickInsights = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Insights Rápidos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-medium text-green-800 dark:text-green-400">Tendência Positiva</span>
          </div>
          <p className="text-sm text-green-700 dark:text-green-300">
            NPS médio aumentou 5 pontos esta semana
          </p>
        </div>
        
        <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
          <div className="flex items-center mb-2">
            <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
            <span className="font-medium text-orange-800 dark:text-orange-400">Atenção Necessária</span>
          </div>
          <p className="text-sm text-orange-700 dark:text-orange-300">
            3 clientes com health score baixo
          </p>
        </div>
        
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center mb-2">
            <Star className="w-5 h-5 text-blue-600 mr-2" />
            <span className="font-medium text-blue-800 dark:text-blue-400">Oportunidade</span>
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            2 clientes prontos para upgrade
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
