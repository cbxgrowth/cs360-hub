
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { CircularProgress } from '../CircularProgress';
import { 
  DollarSign, 
  Target, 
  BarChart3, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  Users,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface LTVCACMetricsProps {
  currentLTV: number;
  currentCAC: number;
  ltvCacRatio: number;
  ltvChange: number;
  cacChange: number;
  customers: number;
  revenue: number;
  paybackPeriod: number;
}

export const LTVCACMetrics: React.FC<LTVCACMetricsProps> = ({
  currentLTV,
  currentCAC,
  ltvCacRatio,
  ltvChange,
  cacChange,
  customers,
  revenue,
  paybackPeriod
}) => {
  const getTrendIcon = (change: number) => {
    if (change > 0) return <ArrowUp className="w-4 h-4" />;
    if (change < 0) return <ArrowDown className="w-4 h-4" />;
    return null;
  };

  const getTrendColor = (change: number, inverse = false) => {
    const positive = inverse ? change < 0 : change > 0;
    return positive ? 'text-green-600' : 'text-red-600';
  };

  const getRatioColor = (ratio: number) => {
    if (ratio >= 5) return 'text-green-600';
    if (ratio >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRatioProgress = (ratio: number) => {
    return Math.round(Math.min((ratio / 8) * 100, 100));
  };

  const metricsData = [
    {
      title: 'Lifetime Value',
      value: `R$ ${(currentLTV / 1000).toFixed(0)}k`,
      subtitle: 'Média por cliente',
      change: `${ltvChange >= 0 ? '+' : ''}${ltvChange.toFixed(1)}% vs período anterior`,
      icon: DollarSign,
      gradient: 'from-green-50 to-emerald-50',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      textColor: 'text-green-700',
      progress: Math.round(Math.min((currentLTV / 200000) * 100, 100)),
      changeColor: getTrendColor(ltvChange)
    },
    {
      title: 'Custo Aquisição',
      value: `R$ ${(currentCAC / 1000).toFixed(1)}k`,
      subtitle: 'Por cliente',
      change: `${cacChange >= 0 ? '+' : ''}${cacChange.toFixed(1)}% vs período anterior`,
      icon: Target,
      gradient: 'from-red-50 to-orange-50',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      textColor: 'text-red-700',
      progress: Math.round(Math.max(100 - (currentCAC / 5000) * 100, 0)),
      changeColor: getTrendColor(cacChange, true)
    },
    {
      title: 'Ratio LTV:CAC',
      value: `${ltvCacRatio.toFixed(1)}:1`,
      subtitle: 'Ideal: >3:1',
      change: ltvCacRatio >= 5 ? 'Excelente' : ltvCacRatio >= 3 ? 'Bom' : 'Crítico',
      icon: BarChart3,
      gradient: 'from-purple-50 to-indigo-50',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      textColor: getRatioColor(ltvCacRatio),
      progress: getRatioProgress(ltvCacRatio),
      changeColor: getRatioColor(ltvCacRatio)
    },
    {
      title: 'Payback Period',
      value: `${paybackPeriod} meses`,
      subtitle: 'Tempo de retorno',
      change: paybackPeriod <= 12 ? 'Rápido' : paybackPeriod <= 18 ? 'Moderado' : 'Lento',
      icon: Calendar,
      gradient: 'from-blue-50 to-cyan-50',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-700',
      progress: Math.round(Math.max(100 - (paybackPeriod / 24) * 100, 0)),
      changeColor: paybackPeriod <= 12 ? 'text-green-600' : paybackPeriod <= 18 ? 'text-yellow-600' : 'text-red-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsData.map((metric, index) => (
          <Card key={index} className={`border-0 shadow-lg bg-gradient-to-br ${metric.gradient}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className={`text-sm font-medium ${metric.iconColor}`}>{metric.title}</p>
                  <p className={`text-3xl font-bold ${metric.textColor}`}>{metric.value}</p>
                  <p className={`text-xs ${metric.iconColor} mt-1`}>{metric.subtitle}</p>
                </div>
                <div className={`w-12 h-12 ${metric.iconBg} rounded-full flex items-center justify-center`}>
                  <metric.icon className={`w-6 h-6 ${metric.iconColor}`} />
                </div>
              </div>
              
              {/* Progress Circle */}
              <div className="flex items-center justify-between">
                <CircularProgress 
                  value={metric.progress} 
                  color={metric.iconColor.includes('green') ? 'green' : 
                         metric.iconColor.includes('red') ? 'red' : 
                         metric.iconColor.includes('purple') ? 'purple' : 'blue'} 
                  size={40} 
                />
                <div className="flex items-center space-x-1">
                  {getTrendIcon(index === 0 ? ltvChange : index === 1 ? cacChange : 0)}
                  <span className={`text-xs font-medium ${metric.changeColor}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-blue-600">Clientes Ativos</p>
                <p className="text-3xl font-bold text-blue-700">{customers.toLocaleString()}</p>
                <p className="text-xs text-blue-600 mt-1">Total de clientes</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-green-600">Receita Mensal</p>
                <p className="text-3xl font-bold text-green-700">
                  R$ {(revenue / 1000).toFixed(0)}k
                </p>
                <p className="text-xs text-green-600 mt-1">Receita recorrente</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
