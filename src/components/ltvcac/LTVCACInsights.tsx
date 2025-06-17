
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  XCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  Lightbulb,
  Target
} from 'lucide-react';
import type { LTVCACInsight } from '@/hooks/useLTVCAC';

interface LTVCACInsightsProps {
  insights: LTVCACInsight[];
  onActionClick?: (insight: LTVCACInsight) => void;
}

export const LTVCACInsights: React.FC<LTVCACInsightsProps> = ({
  insights,
  onActionClick
}) => {
  const getInsightIcon = (type: LTVCACInsight['type']) => {
    switch (type) {
      case 'critical':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getTrendIcon = (trend: LTVCACInsight['trend']) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4" />;
      case 'down':
        return <TrendingDown className="w-4 h-4" />;
      case 'stable':
        return <Minus className="w-4 h-4" />;
    }
  };

  const getInsightCardClass = (type: LTVCACInsight['type']) => {
    switch (type) {
      case 'critical':
        return 'border-l-4 border-l-red-500 bg-red-50/50 dark:bg-red-900/10';
      case 'warning':
        return 'border-l-4 border-l-yellow-500 bg-yellow-50/50 dark:bg-yellow-900/10';
      case 'success':
        return 'border-l-4 border-l-green-500 bg-green-50/50 dark:bg-green-900/10';
      case 'info':
        return 'border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-900/10';
    }
  };

  const getPriorityBadge = (priority: LTVCACInsight['priority']) => {
    const classes = {
      high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    };
    
    return (
      <Badge className={classes[priority]}>
        {priority === 'high' ? 'Alta' : priority === 'medium' ? 'Média' : 'Baixa'} Prioridade
      </Badge>
    );
  };

  if (insights.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Lightbulb className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Nenhum insight disponível
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Seus dados LTV/CAC estão dentro dos parâmetros esperados.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-600" />
          Insights Inteligentes
          <Badge variant="outline" className="ml-2">
            {insights.length} insight{insights.length > 1 ? 's' : ''}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => (
          <Card key={index} className={getInsightCardClass(insight.type)}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getInsightIcon(insight.type)}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {insight.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {insight.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getPriorityBadge(insight.priority)}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Valor:
                    </span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {insight.value}
                    </span>
                    {getTrendIcon(insight.trend)}
                  </div>
                </div>

                {insight.action && onActionClick && (
                  <Button
                    onClick={() => onActionClick(insight)}
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Target className="w-4 h-4" />
                    Ação Sugerida
                  </Button>
                )}
              </div>

              {insight.action && (
                <div className="mt-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200/50 dark:border-gray-600/50">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Ação recomendada:</strong> {insight.action}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};
