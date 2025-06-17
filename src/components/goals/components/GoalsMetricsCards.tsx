
import React from 'react';
import { Card, CardContent } from '../../ui/card';
import { Target, CheckCircle, Users, Clock } from 'lucide-react';

const metricsData = [
  {
    title: 'Metas Ativas',
    value: '24',
    subtitle: '+3 este mês',
    icon: Target,
    gradient: 'from-green-50 to-emerald-50',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    textColor: 'text-green-700'
  },
  {
    title: 'Taxa de Conclusão',
    value: '87%',
    subtitle: '+5% vs mês anterior',
    icon: CheckCircle,
    gradient: 'from-blue-50 to-cyan-50',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    textColor: 'text-blue-700'
  },
  {
    title: 'Colaboradores',
    value: '156',
    subtitle: 'Envolvidos',
    icon: Users,
    gradient: 'from-purple-50 to-pink-50',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    textColor: 'text-purple-700'
  },
  {
    title: 'Metas Vencendo',
    value: '7',
    subtitle: 'Próximos 30 dias',
    icon: Clock,
    gradient: 'from-orange-50 to-red-50',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    textColor: 'text-orange-700'
  }
];

export const GoalsMetricsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {metricsData.map((metric, index) => (
        <Card key={index} className={`border-0 shadow-lg bg-gradient-to-br ${metric.gradient}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${metric.iconColor}`}>{metric.title}</p>
                <p className={`text-3xl font-bold ${metric.textColor}`}>{metric.value}</p>
                <p className={`text-xs ${metric.iconColor} mt-1`}>{metric.subtitle}</p>
              </div>
              <div className={`w-12 h-12 ${metric.iconBg} rounded-full flex items-center justify-center`}>
                <metric.icon className={`w-6 h-6 ${metric.iconColor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
