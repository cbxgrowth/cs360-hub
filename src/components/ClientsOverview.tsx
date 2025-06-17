
import React from 'react';
import { Users, TrendingUp, AlertTriangle, Star, DollarSign, Target } from 'lucide-react';

export const ClientsOverview = () => {
  const overviewData = [
    {
      title: 'Total de Clientes',
      value: '247',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'NPS Médio',
      value: '68',
      change: '+5pts',
      trend: 'up',
      icon: Star,
      color: 'green'
    },
    {
      title: 'LTV Médio',
      value: 'R$ 89k',
      change: '+18%',
      trend: 'up',
      icon: DollarSign,
      color: 'purple'
    },
    {
      title: 'Clientes em Risco',
      value: '23',
      change: '-8%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      title: 'CAC Médio',
      value: 'R$ 3.2k',
      change: '-12%',
      trend: 'down',
      icon: Target,
      color: 'orange'
    },
    {
      title: 'Taxa de Retenção',
      value: '94%',
      change: '+2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'cyan'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      red: 'from-red-500 to-red-600',
      orange: 'from-orange-500 to-orange-600',
      cyan: 'from-cyan-500 to-cyan-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {overviewData.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-colors h-full">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${getColorClasses(item.color)} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-medium ${getTrendColor(item.trend)}`}>
                  {item.change}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{item.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
