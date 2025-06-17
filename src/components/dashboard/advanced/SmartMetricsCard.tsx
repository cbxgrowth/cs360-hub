
import React from 'react';
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface SmartMetricsCardProps {
  title: string;
  value: string | number;
  previousValue?: string | number;
  target?: number;
  trend: 'up' | 'down' | 'stable';
  change: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  insight: string;
  prediction?: string;
  alertLevel?: 'none' | 'info' | 'warning' | 'success' | 'error';
  className?: string;
  style?: React.CSSProperties;
}

export const SmartMetricsCard = ({
  title,
  value,
  target,
  trend,
  change,
  icon: Icon,
  color,
  bgColor,
  insight,
  prediction,
  alertLevel = 'none',
  className = '',
  style
}: SmartMetricsCardProps) => {
  const getProgressValue = () => {
    if (!target) return 0;
    const numericValue = typeof value === 'string' ? 
      parseFloat(value.replace(/[^\d.-]/g, '')) : value;
    return Math.min((numericValue / target) * 100, 100);
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4" />;
      case 'down': return <TrendingDown className="w-4 h-4" />;
      default: return null;
    }
  };

  const getAlertIcon = () => {
    switch (alertLevel) {
      case 'warning': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'info': return <Info className="w-4 h-4 text-blue-500" />;
      default: return null;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-600 dark:text-green-400';
      case 'down': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <Card 
      className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
      style={style}
    >
      <div className={`absolute inset-0 ${bgColor} opacity-20`}></div>
      
      <CardContent className="relative p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 ${bgColor} rounded-xl shadow-md`}>
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
          <div className="flex items-center space-x-2">
            {getAlertIcon()}
            <div className={`flex items-center space-x-1 text-sm font-medium ${getTrendColor()}`}>
              {getTrendIcon()}
              <span>{change}</span>
            </div>
          </div>
        </div>

        {/* Value */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>

        {/* Progress */}
        {target && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
              <span>Meta: {typeof target === 'number' && target > 1000 ? 
                `${(target/1000).toFixed(0)}k` : target}</span>
              <span>{getProgressValue().toFixed(0)}%</span>
            </div>
            <Progress value={getProgressValue()} className="h-2" />
          </div>
        )}

        {/* Insight */}
        <div className="space-y-2">
          <Badge variant="outline" className="text-xs font-medium">
            💡 Insight IA
          </Badge>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            {insight}
          </p>
          
          {prediction && (
            <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-xs font-medium text-blue-700 dark:text-blue-300">
                🔮 Previsão: {prediction}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
