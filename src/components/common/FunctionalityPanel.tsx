
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FunctionalityPanelProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  iconGradient?: string;
  headerAction?: React.ReactNode;
  badges?: Array<{
    text: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
    icon?: LucideIcon;
  }>;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gradient' | 'glass';
}

export const FunctionalityPanel: React.FC<FunctionalityPanelProps> = ({
  title,
  description,
  icon: Icon,
  iconGradient = 'from-blue-600 to-indigo-600',
  headerAction,
  badges = [],
  children,
  className,
  size = 'md',
  variant = 'default'
}) => {
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    gradient: 'bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-800 dark:to-blue-900/20 border border-blue-200/50 dark:border-blue-700/50',
    glass: 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/50'
  };

  return (
    <Card className={cn(
      'shadow-xl hover:shadow-2xl transition-all duration-300',
      variantClasses[variant],
      className
    )}>
      <CardHeader className={cn('space-y-4', sizeClasses[size])}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={cn(
              'p-3 rounded-xl shadow-lg bg-gradient-to-r',
              iconGradient
            )}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                {title}
              </CardTitle>
              {description && (
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {description}
                </p>
              )}
            </div>
          </div>
          {headerAction && (
            <div className="flex items-center space-x-2">
              {headerAction}
            </div>
          )}
        </div>
        
        {badges.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {badges.map((badge, index) => (
              <Badge 
                key={index}
                variant={badge.variant || 'default'}
                className="px-3 py-1 font-medium"
              >
                {badge.icon && <badge.icon className="w-3 h-3 mr-1.5" />}
                {badge.text}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      
      <CardContent className={cn(sizeClasses[size], 'pt-0')}>
        {children}
      </CardContent>
    </Card>
  );
};
