
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Clock, CheckCircle, AlertTriangle, Target } from 'lucide-react';

export const ExecutiveMetrics = () => {
  const metrics = [
    {
      title: 'Ações Críticas',
      value: '8',
      description: 'Requer atenção',
      icon: Clock,
      gradient: 'from-red-500/10 to-red-600/10',
      iconGradient: 'from-red-500 to-red-600',
      textColor: 'text-red-600 dark:text-red-400'
    },
    {
      title: 'Concluídas',
      value: '12',
      description: '+20% vs ontem',
      icon: CheckCircle,
      gradient: 'from-emerald-500/10 to-green-500/10',
      iconGradient: 'from-emerald-500 to-green-500',
      textColor: 'text-emerald-600 dark:text-emerald-400'
    },
    {
      title: 'Riscos Ativos',
      value: '3',
      description: 'Monitorar',
      icon: AlertTriangle,
      gradient: 'from-orange-500/10 to-red-500/10',
      iconGradient: 'from-orange-500 to-red-500',
      textColor: 'text-orange-600 dark:text-orange-400'
    },
    {
      title: 'Performance',
      value: '85%',
      description: 'Excelente',
      icon: Target,
      gradient: 'from-purple-500/10 to-pink-500/10',
      iconGradient: 'from-purple-500 to-pink-500',
      textColor: 'text-purple-600 dark:text-purple-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className={`absolute inset-0 bg-gradient-to-r ${metric.gradient}`}></div>
          <CardContent className="relative p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">{metric.title}</p>
                <p className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">{metric.value}</p>
                <p className={`text-xs font-medium mt-1 ${metric.textColor}`}>{metric.description}</p>
              </div>
              <div className={`p-3 bg-gradient-to-r ${metric.iconGradient} rounded-xl shadow-lg`}>
                <metric.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
