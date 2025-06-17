
import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ModernTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  formatter?: (value: any, name: string) => [string, string];
  labelFormatter?: (label: string) => string;
  showTrend?: boolean;
  gradientColors?: string[];
}

export const ModernTooltip: React.FC<ModernTooltipProps> = ({
  active,
  payload,
  label,
  formatter,
  labelFormatter,
  showTrend = false,
  gradientColors = ['#3B82F6', '#8B5CF6']
}) => {
  if (!active || !payload?.length) return null;

  const formatValue = (value: any, name: string) => {
    if (formatter) return formatter(value, name);
    
    if (typeof value === 'number') {
      if (name.includes('%') || name.toLowerCase().includes('taxa')) {
        return [`${value}%`, name];
      }
      if (name.toLowerCase().includes('mrr') || name.toLowerCase().includes('receita')) {
        return [`R$ ${(value / 1000).toFixed(0)}k`, name];
      }
      return [value.toLocaleString(), name];
    }
    return [value, name];
  };

  const getTrendDirection = (currentValue: number, previousValue?: number) => {
    if (!previousValue) return null;
    return currentValue > previousValue ? 'up' : 'down';
  };

  return (
    <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-0 shadow-2xl rounded-xl p-4 min-w-[200px] transform transition-all duration-300 scale-105">
      <div className="space-y-3">
        {label && (
          <div className="text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">
            {labelFormatter ? labelFormatter(label) : label}
          </div>
        )}
        
        <div className="space-y-2">
          {payload.map((entry, index) => {
            const [formattedValue, formattedName] = formatValue(entry.value, entry.name || entry.dataKey);
            const trendDirection = showTrend ? getTrendDirection(entry.value, entry.payload?.previous) : null;
            
            return (
              <div key={index} className="flex items-center justify-between space-x-3">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full shadow-lg"
                    style={{ 
                      backgroundColor: entry.color,
                      boxShadow: `0 0 8px ${entry.color}40`
                    }}
                  />
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                    {formattedName}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant="secondary" 
                    className="text-xs font-bold bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-gray-900 dark:text-white border-0"
                  >
                    {formattedValue}
                  </Badge>
                  
                  {trendDirection && (
                    <div className={`p-1 rounded-full ${
                      trendDirection === 'up' 
                        ? 'bg-green-100 dark:bg-green-900/30' 
                        : 'bg-red-100 dark:bg-red-900/30'
                    }`}>
                      {trendDirection === 'up' ? (
                        <TrendingUp className="w-3 h-3 text-green-600 dark:text-green-400" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-600 dark:text-red-400" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
