
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  previousValue?: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  color?: 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'indigo';
  description?: string;
  badge?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  previousValue,
  change,
  trend = 'neutral',
  icon: Icon,
  color = 'blue',
  description,
  badge,
  size = 'md'
}) => {
  const colorClasses = {
    blue: {
      gradient: 'from-blue-500/10 to-blue-600/10',
      iconGradient: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-200/50 dark:border-blue-700/50'
    },
    green: {
      gradient: 'from-emerald-500/10 to-green-500/10',
      iconGradient: 'from-emerald-500 to-green-500',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-200/50 dark:border-emerald-700/50'
    },
    red: {
      gradient: 'from-red-500/10 to-red-600/10',
      iconGradient: 'from-red-500 to-red-600',
      textColor: 'text-red-600 dark:text-red-400',
      border: 'border-red-200/50 dark:border-red-700/50'
    },
    purple: {
      gradient: 'from-purple-500/10 to-pink-500/10',
      iconGradient: 'from-purple-500 to-pink-500',
      textColor: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-200/50 dark:border-purple-700/50'
    },
    orange: {
      gradient: 'from-orange-500/10 to-red-500/10',
      iconGradient: 'from-orange-500 to-red-500',
      textColor: 'text-orange-600 dark:text-orange-400',
      border: 'border-orange-200/50 dark:border-orange-700/50'
    },
    indigo: {
      gradient: 'from-indigo-500/10 to-purple-500/10',
      iconGradient: 'from-indigo-500 to-purple-500',
      textColor: 'text-indigo-600 dark:text-indigo-400',
      border: 'border-indigo-200/50 dark:border-indigo-700/50'
    }
  };

  const sizeClasses = {
    sm: { padding: 'p-4', iconSize: 'w-4 h-4', titleSize: 'text-lg', valueSize: 'text-xl' },
    md: { padding: 'p-6', iconSize: 'w-5 h-5', titleSize: 'text-xl', valueSize: 'text-2xl' },
    lg: { padding: 'p-8', iconSize: 'w-6 h-6', titleSize: 'text-2xl', valueSize: 'text-3xl' }
  };

  const getTrendIcon = () => {
    if (trend === 'up') return TrendingUp;
    if (trend === 'down') return TrendingDown;
    return null;
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-600 dark:text-green-400';
    if (trend === 'down') return 'text-red-600 dark:text-red-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  const TrendIcon = getTrendIcon();
  const currentColor = colorClasses[color];
  const currentSize = sizeClasses[size];

  return (
    <Card className={cn(
      'relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105',
      currentColor.border
    )}>
      <div className={cn('absolute inset-0 bg-gradient-to-r', currentColor.gradient)}></div>
      <CardContent className={cn('relative', currentSize.padding)}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{title}</p>
            <p className={cn('font-bold text-gray-900 dark:text-white', currentSize.valueSize)}>{value}</p>
            {description && (
              <p className={cn('text-xs font-medium mt-1', currentColor.textColor)}>{description}</p>
            )}
          </div>
          <div className={cn('p-3 bg-gradient-to-r rounded-xl shadow-lg', currentColor.iconGradient)}>
            <Icon className={cn('text-white', currentSize.iconSize)} />
          </div>
        </div>
        
        {(change || badge) && (
          <div className="flex items-center justify-between">
            {change && TrendIcon && (
              <div className={cn('flex items-center space-x-1', getTrendColor())}>
                <TrendIcon className="w-4 h-4" />
                <span className="text-sm font-medium">{change}</span>
              </div>
            )}
            {badge && (
              <Badge variant="secondary" className="text-xs">
                {badge}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
