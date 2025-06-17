
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionDividerProps {
  title?: string;
  icon?: LucideIcon;
  iconColor?: string;
  className?: string;
  variant?: 'default' | 'gradient' | 'minimal';
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  title,
  icon: Icon,
  iconColor = 'text-blue-600',
  className,
  variant = 'default'
}) => {
  const variantClasses = {
    default: 'border-t border-gray-200 dark:border-gray-700',
    gradient: 'bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent h-px',
    minimal: 'border-t border-gray-100 dark:border-gray-800'
  };

  if (!title && !Icon) {
    return <div className={cn('my-8', variantClasses[variant], className)} />;
  }

  return (
    <div className={cn('relative my-8', className)}>
      <div className={variantClasses[variant]} />
      {(title || Icon) && (
        <div className="absolute inset-0 flex justify-center">
          <div className="bg-white dark:bg-gray-900 px-4 py-2 flex items-center space-x-2">
            {Icon && <Icon className={cn('w-5 h-5', iconColor)} />}
            {title && (
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {title}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
