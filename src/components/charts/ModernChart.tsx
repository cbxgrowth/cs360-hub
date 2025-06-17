
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ResponsiveContainer } from 'recharts';
import { useChartAnimations } from '../../hooks/useChartAnimations';
import { ModernTooltip } from './ModernTooltip';
import { Eye, EyeOff, Maximize2, Download, RefreshCw } from 'lucide-react';

interface ModernChartProps {
  title: string;
  subtitle?: string;
  icon?: React.ElementType;
  children: React.ReactElement;
  height?: number;
  gradient?: string[];
  isRealtime?: boolean;
  onRefresh?: () => void;
  onExport?: () => void;
  onFullscreen?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const ModernChart: React.FC<ModernChartProps> = ({
  title,
  subtitle,
  icon: Icon,
  children,
  height = 300,
  gradient = ['from-blue-500', 'to-purple-500'],
  isRealtime = false,
  onRefresh,
  onExport,
  onFullscreen,
  className = '',
  style
}) => {
  const { isVisible, ref } = useChartAnimations();
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card 
      ref={ref}
      className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] ${
        isVisible ? 'animate-fade-in' : 'opacity-0'
      } ${className}`}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient[0]} ${gradient[1]} opacity-5 transition-opacity duration-300 ${
        isHovered ? 'opacity-10' : ''
      }`} />
      
      {/* Animated Border */}
      <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${gradient[0]} ${gradient[1]} opacity-0 transition-opacity duration-300 ${
        isHovered ? 'opacity-20' : ''
      } blur-xl -z-10`} />

      <CardHeader className="relative pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {Icon && (
              <div className={`p-2 rounded-xl bg-gradient-to-r ${gradient[0]} ${gradient[1]} shadow-lg transition-transform duration-300 ${
                isHovered ? 'scale-110 rotate-3' : ''
              }`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
            )}
            <div>
              <CardTitle className="text-lg font-bold text-gray-900 dark:text-white transition-colors duration-300">
                {title}
              </CardTitle>
              {subtitle && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isRealtime && (
              <Badge className="animate-pulse bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse" />
                Live
              </Badge>
            )}

            <div className={`flex items-center space-x-1 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
              {onRefresh && (
                <Button variant="ghost" size="sm" onClick={onRefresh}>
                  <RefreshCw className="w-4 h-4" />
                </Button>
              )}
              {onExport && (
                <Button variant="ghost" size="sm" onClick={onExport}>
                  <Download className="w-4 h-4" />
                </Button>
              )}
              {onFullscreen && (
                <Button variant="ghost" size="sm" onClick={onFullscreen}>
                  <Maximize2 className="w-4 h-4" />
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative">
        <div className={`transition-all duration-500 ${isExpanded ? `h-[${height + 100}px]` : `h-[${height}px]`}`}>
          <ResponsiveContainer width="100%" height="100%">
            {children}
          </ResponsiveContainer>
        </div>

        {/* Interactive Elements */}
        <div className={`absolute bottom-4 right-4 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              Atualizado agora
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
