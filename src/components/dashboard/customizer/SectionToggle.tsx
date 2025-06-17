
import React from 'react';
import { Badge } from '../../ui/badge';
import { Switch } from '../../ui/switch';
import { Eye, EyeOff } from 'lucide-react';
import { CustomizationOption } from './customizationData';

interface SectionToggleProps {
  item: CustomizationOption;
  isVisible: boolean;
  onToggle: () => void;
  type: 'metric' | 'chart' | 'section';
}

export const SectionToggle = ({ 
  item, 
  isVisible, 
  onToggle, 
  type 
}: SectionToggleProps) => {
  const getTypeColors = () => {
    switch (type) {
      case 'metric':
        return {
          bg: 'bg-blue-100 dark:bg-blue-900/30',
          text: 'text-blue-600 dark:text-blue-400',
          hover: 'hover:bg-blue-50 dark:hover:bg-blue-900/20'
        };
      case 'chart':
        return {
          bg: 'bg-purple-100 dark:bg-purple-900/30',
          text: 'text-purple-600 dark:text-purple-400',
          hover: 'hover:bg-purple-50 dark:hover:bg-purple-900/20'
        };
      case 'section':
        return {
          bg: 'bg-indigo-100 dark:bg-indigo-900/30',
          text: 'text-indigo-600 dark:text-indigo-400',
          hover: 'hover:bg-indigo-50 dark:hover:bg-indigo-900/20'
        };
    }
  };

  const colors = getTypeColors();

  return (
    <div className={`
      flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-600 
      ${colors.hover} transition-all duration-200 
      ${isVisible ? 'bg-white dark:bg-gray-800 shadow-sm' : 'bg-gray-50 dark:bg-gray-900/50'}
      group cursor-pointer
    `} onClick={onToggle}>
      <div className="flex items-center space-x-3">
        <div className={`p-2.5 rounded-lg ${colors.bg} group-hover:scale-110 transition-transform duration-200`}>
          <item.icon className={`w-4 h-4 ${colors.text}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {item.name}
            </p>
            {item.category && (
              <Badge 
                variant="outline" 
                className="text-xs px-2 py-0.5 bg-white/50 dark:bg-gray-800/50"
              >
                {item.category}
              </Badge>
            )}
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="flex items-center">
          {isVisible ? (
            <Eye className="w-4 h-4 text-green-500" />
          ) : (
            <EyeOff className="w-4 h-4 text-gray-400" />
          )}
        </div>
        <Switch
          checked={isVisible}
          onCheckedChange={onToggle}
          className="data-[state=checked]:bg-blue-600"
        />
      </div>
    </div>
  );
};
