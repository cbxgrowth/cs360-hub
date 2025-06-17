
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { TrendingUp, Activity, LineChart, Users, Star } from 'lucide-react';

export const ExecutivePerformance = () => {
  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg mr-3">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white">Performance Executiva</span>
          </div>
          <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 px-3 py-1">
            <Activity className="w-3 h-3 mr-1" />
            Tempo Real
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl p-4 border border-emerald-200/50 dark:border-emerald-700/50">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <LineChart className="w-5 h-5 text-emerald-600 mr-2" />
                <div className="text-2xl lg:text-3xl font-bold text-emerald-600">12</div>
              </div>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Entregas Concluídas</p>
              <div className="text-xs font-bold text-emerald-600 mt-1 flex items-center justify-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +20% vs ontem
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200/50 dark:border-blue-700/50">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-5 h-5 text-blue-600 mr-2" />
                <div className="text-2xl lg:text-3xl font-bold text-blue-600">5</div>
              </div>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Reuniões Estratégicas</p>
              <div className="text-xs font-bold text-blue-600 mt-1">
                Meta: 8 hoje
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-200/50 dark:border-purple-700/50">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-5 h-5 text-purple-600 mr-2" />
                <div className="text-2xl lg:text-3xl font-bold text-purple-600">95%</div>
              </div>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Índice de Excelência</p>
              <div className="text-xs font-bold text-purple-600 mt-1">
                Excepcional
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
