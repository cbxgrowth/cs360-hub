
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Star, MessageSquare, TrendingUp, Users } from 'lucide-react';

interface NPSMetricsCardsProps {
  currentNPS: number;
  npsChange: number;
  totalResponses: number;
  responseRate: number;
}

export const NPSMetricsCards = ({ 
  currentNPS, 
  npsChange, 
  totalResponses, 
  responseRate 
}: NPSMetricsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">NPS Atual</p>
              <p className="text-2xl font-bold text-blue-600">{currentNPS}</p>
              <p className={`text-sm ${npsChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {npsChange >= 0 ? '+' : ''}{npsChange} vs mês anterior
              </p>
            </div>
            <Star className="w-8 h-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Respostas</p>
              <p className="text-2xl font-bold text-green-600">{totalResponses}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">este mês</p>
            </div>
            <MessageSquare className="w-8 h-8 text-green-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Taxa de Resposta</p>
              <p className="text-2xl font-bold text-purple-600">{responseRate}%</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">pesquisa ativa</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Promotores</p>
              <p className="text-2xl font-bold text-orange-600">138</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">68.7% do total</p>
            </div>
            <Users className="w-8 h-8 text-orange-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
