
import React from 'react';
import { Brain, Target, AlertTriangle, Zap, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';

interface AIRecommendation {
  id: number;
  title: string;
  message: string;
  time: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  action: string;
}

interface AIRecommendationsPopoverProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  recommendations: AIRecommendation[];
}

export const AIRecommendationsPopover = ({ isOpen, onOpenChange, recommendations }: AIRecommendationsPopoverProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return AlertTriangle;
      case 'high': return Target;
      case 'medium': return TrendingUp;
      case 'low': return Zap;
      default: return Brain;
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative h-10 w-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <Brain className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-purple-500 text-white text-xs border-2 border-white dark:border-slate-900 animate-pulse">
            {recommendations.length}
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700" align="end">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
            <CardTitle className="text-base flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-purple-500 rounded-lg">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <span>Recomendações IA</span>
              </div>
              <Badge className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs animate-pulse">
                {recommendations.length} insights
              </Badge>
            </CardTitle>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Insights inteligentes para otimizar seu CS
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-80 overflow-y-auto">
              {recommendations.map((recommendation) => {
                const PriorityIcon = getPriorityIcon(recommendation.priority);
                return (
                  <div
                    key={recommendation.id}
                    className="flex items-start p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-100 dark:border-slate-700 last:border-0"
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(recommendation.priority)} flex-shrink-0 mt-2`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-100 flex items-center space-x-1">
                            <PriorityIcon className="w-3 h-3" />
                            <span>{recommendation.title}</span>
                          </p>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ml-2 ${
                              recommendation.priority === 'critical' 
                                ? 'border-red-200 text-red-700 bg-red-50 dark:border-red-800 dark:text-red-300 dark:bg-red-900/20'
                                : recommendation.priority === 'high'
                                ? 'border-orange-200 text-orange-700 bg-orange-50 dark:border-orange-800 dark:text-orange-300 dark:bg-orange-900/20'
                                : 'border-blue-200 text-blue-700 bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:bg-blue-900/20'
                            }`}
                          >
                            {recommendation.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                          {recommendation.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-slate-500 dark:text-slate-500">
                            {recommendation.time}
                          </p>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-xs h-6 px-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:text-purple-300 dark:hover:bg-purple-900/20"
                          >
                            {recommendation.action}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="p-3 border-t border-slate-100 dark:border-slate-700 bg-gradient-to-r from-purple-50/50 to-blue-50/50 dark:from-purple-900/10 dark:to-blue-900/10">
              <Button variant="ghost" size="sm" className="w-full text-xs text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:text-purple-300 dark:hover:bg-purple-900/20">
                <Brain className="w-3 h-3 mr-1" />
                Abrir Dashboard IA Completo
              </Button>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};
