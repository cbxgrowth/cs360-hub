
import React from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description: string;
  badges?: Array<{
    icon?: LucideIcon;
    text: string;
    variant?: 'default' | 'success' | 'info' | 'warning';
  }>;
  actions?: React.ReactNode;
  gradient?: string;
  compact?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  badges = [],
  actions,
  gradient = 'from-blue-600 via-purple-600 to-indigo-600',
  compact = false
}) => {
  const getBadgeClasses = (variant: string = 'default') => {
    const variants = {
      default: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
      info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
    };
    return variants[variant as keyof typeof variants] || variants.default;
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5 rounded-3xl"></div>
      <div className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-3xl shadow-xl">
        <div className={`p-6 ${compact ? 'lg:p-6' : 'lg:p-8'}`}>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-4">
              <div>
                <h1 className={`font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-blue-900 dark:from-white dark:via-indigo-100 dark:to-blue-100 bg-clip-text text-transparent leading-tight ${
                  compact ? 'text-3xl lg:text-4xl' : 'text-4xl lg:text-5xl'
                }`}>
                  {title}
                </h1>
                {badges.length > 0 && (
                  <div className="flex items-center gap-3 mt-3">
                    {badges.map((badge, index) => (
                      <Badge key={index} className={`px-3 py-1 font-medium ${getBadgeClasses(badge.variant)}`}>
                        {badge.icon && <badge.icon className="w-3 h-3 mr-1.5" />}
                        {badge.text}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <p className={`text-slate-600 dark:text-slate-300 font-medium max-w-2xl leading-relaxed ${
                compact ? 'text-base' : 'text-lg'
              }`}>
                {description}
              </p>
            </div>
            
            {actions && (
              <div className="flex items-center gap-3">
                {actions}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
