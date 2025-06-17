
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Trophy, Brain, Crown, TrendingUp } from 'lucide-react';

const stats = [
  { number: '850%', label: 'ROI Médio no 1º Ano', icon: Trophy, color: 'from-blue-500 to-blue-600' },
  { number: '95%', label: 'Precisão da IA Preditiva', icon: Brain, color: 'from-blue-600 to-indigo-600' },
  { number: '500+', label: 'Líderes Confiam', icon: Crown, color: 'from-purple-600 to-violet-600' },
  { number: '60%', label: 'Redução Média de Churn', icon: TrendingUp, color: 'from-emerald-600 to-green-600' }
];

export const StatsSection = () => {
  return (
    <section className="py-20 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 to-blue-50/80"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200 px-4 py-2 text-base font-semibold">
            <Trophy className="w-4 h-4 mr-2" />
            Resultados Comprovados por Líderes
          </Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 mb-4">
            ROI que Impressiona C-Levels
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Métricas reais de empresas que transformaram Customer Success em motor de crescimento
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-500 border-0 bg-white/95 backdrop-blur-sm hover:-translate-y-3 overflow-hidden">
              <CardContent className="p-6 lg:p-8 text-center">
                <div className={`w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                  <stat.icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                </div>
                <div className="text-2xl lg:text-3xl font-black text-slate-900 mb-3">{stat.number}</div>
                <div className="text-slate-600 font-semibold text-sm lg:text-base">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
