import React from 'react';
import { CircularProgress } from './CircularProgress';
import { TrendingUp, TrendingDown, Users, DollarSign, Target, AlertTriangle, Star, Clock, Zap, HeartHandshake, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

const allMetrics = [
  {
    id: 'churn',
    title: 'Churn Rate',
    value: '5.2%',
    subtitle: 'Taxa de Cancelamento - Clientes perdidos no período',
    description: 'Fórmula: (Clientes Perdidos ÷ Total Inicial) × 100. Meta: <5% anual',
    color: 'red' as const,
    icon: AlertTriangle,
    trend: { value: '+1.2%', direction: 'up' as const }
  },
  {
    id: 'nps',
    title: 'Net Promoter Score',
    value: 42,
    subtitle: 'Promotores: 57% | Neutros: 31% | Detratores: 12%',
    description: 'Fórmula: % Promotores - % Detratores. Meta: >50',
    color: 'green' as const,
    isPercentage: true,
    icon: Star,
    trend: { value: '+8%', direction: 'up' as const }
  },
  {
    id: 'health',
    title: 'Customer Health Score',
    value: 72,
    subtitle: 'Avaliação geral baseada em engajamento e uso',
    description: 'Verde (saudável), Amarelo (atenção), Vermelho (risco)',
    color: 'blue' as const,
    isPercentage: true,
    icon: Target,
    trend: { value: '+4%', direction: 'up' as const }
  },
  {
    id: 'ltv',
    title: 'Customer Lifetime Value',
    value: 'R$ 124k',
    subtitle: 'Valor médio × Tempo de permanência',
    description: 'Meta: LTV deve ser 3-5x maior que CAC',
    color: 'green' as const,
    icon: DollarSign,
    trend: { value: '+12%', direction: 'up' as const }
  },
  {
    id: 'ttv',
    title: 'Time-to-Value',
    value: '12 dias',
    subtitle: 'Tempo para primeiro resultado real',
    description: 'Reduzir TTV aumenta retenção',
    color: 'blue' as const,
    icon: Clock,
    trend: { value: '-2 dias', direction: 'up' as const }
  },
  {
    id: 'adoption',
    title: 'Feature Adoption',
    value: '68%',
    subtitle: 'Engajamento com funcionalidades-chave',
    description: 'Preditor de churn e oportunidades de upsell',
    color: 'blue' as const,
    progress: 68,
    target: 80,
    icon: Zap
  },
  {
    id: 'csat',
    title: 'Customer Satisfaction',
    value: '4.6/5',
    subtitle: 'CSAT - Satisfação com interações',
    description: 'Avaliação imediata de experiências específicas',
    color: 'green' as const,
    progress: 92,
    target: 95,
    icon: HeartHandshake
  },
  {
    id: 'retention',
    title: 'Retention Rate',
    value: '94.8%',
    subtitle: 'Taxa de Retenção',
    description: 'Fórmula: [(Fim - Novos) ÷ Início] × 100',
    color: 'green' as const,
    progress: 95,
    target: 97,
    icon: Users
  },
  {
    id: 'nrr',
    title: 'Net Revenue Retention',
    value: '118%',
    subtitle: 'Expansão vs Redução de Receita',
    description: 'Meta: >100% (crescimento líquido). Upsell vs Downgrade',
    color: 'green' as const,
    progress: 118,
    target: 120,
    icon: TrendingUp
  },
  {
    id: 'sla',
    title: 'Ticket SLA',
    value: '2.4h',
    subtitle: 'Tempo Médio de Resolução',
    description: 'Eficiência do suporte e correlação com satisfação',
    color: 'blue' as const,
    icon: Clock,
    trend: { value: '-15min', direction: 'up' as const }
  },
  {
    id: 'mrr',
    title: 'Monthly Recurring Revenue',
    value: 'R$ 485k',
    subtitle: 'Receita Recorrente Mensal',
    description: 'Base de crescimento sustentável',
    color: 'green' as const,
    icon: DollarSign,
    trend: { value: '+8%', direction: 'up' as const }
  },
  {
    id: 'cac',
    title: 'Customer Acquisition Cost',
    value: 'R$ 2.8k',
    subtitle: 'CAC - Custo de Aquisição',
    description: 'Comparar com LTV para sustentabilidade',
    color: 'blue' as const,
    icon: Target,
    trend: { value: '-5%', direction: 'up' as const }
  }
];

const getColorClasses = (color: string) => {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    red: 'from-red-500 to-red-600'
  };
  return colors[color as keyof typeof colors] || colors.blue;
};

interface CustomizableMetricsCardsProps {
  visibleMetrics: string[];
}

export const CustomizableMetricsCards: React.FC<CustomizableMetricsCardsProps> = ({ visibleMetrics }) => {
  const metricsToShow = allMetrics.filter(metric => visibleMetrics.includes(metric.id));

  if (metricsToShow.length === 0) return null;

  // Split into main metrics (first 4) and additional metrics
  const mainMetrics = metricsToShow.slice(0, 4);
  const additionalMetrics = metricsToShow.slice(4);

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Main Metrics */}
        {mainMetrics.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainMetrics.map((metric, index) => (
              <div key={metric.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all group">
                
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${getColorClasses(metric.color)} flex items-center justify-center`}>
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                  {metric.trend && (
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                      metric.trend.direction === 'up' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                    }`}>
                      {metric.trend.direction === 'up' ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {metric.trend.value}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">{metric.title}</h3>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 cursor-help transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium mb-1 text-gray-900 dark:text-white">{metric.subtitle}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{metric.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                
                <div className="flex items-center space-x-4">
                  {typeof metric.value === 'number' ? (
                    <CircularProgress 
                      value={metric.value} 
                      color={metric.color}
                      size={60}
                    />
                  ) : (
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</div>
                  )}
                  
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      {metric.subtitle}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Additional Metrics */}
        {additionalMetrics.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalMetrics.map((metric, index) => (
              <div key={metric.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all group">
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">{metric.title}</h3>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-4 h-4 text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 cursor-help transition-colors" />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium mb-1 text-gray-900 dark:text-white">{metric.subtitle}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{metric.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  {metric.icon && (
                    <metric.icon className={`w-5 h-5 ${
                      metric.color === 'blue' ? 'text-blue-500 dark:text-blue-400' : 
                      metric.color === 'green' ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'
                    }`} />
                  )}
                </div>
                
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{metric.value}</div>
                
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  {metric.subtitle}
                </div>
                
                {metric.progress && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>Atual: {metric.progress}%</span>
                      {metric.target && <span>Meta: {metric.target}%</span>}
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${getColorClasses(metric.color)}`}
                        style={{ width: `${Math.min(metric.progress, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                {metric.trend && (
                  <div className={`flex items-center mt-3 text-xs font-medium ${
                    metric.trend.direction === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {metric.trend.direction === 'up' ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {metric.trend.value}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};
