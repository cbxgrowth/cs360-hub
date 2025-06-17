
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { TrendingUp, TrendingDown, Users, FileText, Target, DollarSign, Activity, Eye, ArrowUpRight } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  description?: string;
  gradient: string;
  bgGradient: string;
  badges?: Array<{ text: string; color: string }>;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  description, 
  gradient,
  bgGradient,
  badges = []
}) => {
  return (
    <Card className="relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
      <div className={`absolute inset-0 bg-gradient-to-r ${bgGradient}`}></div>
      <CardContent className="relative p-4 lg:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 bg-gradient-to-r ${gradient} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Eye className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="space-y-3">
          <div>
            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">{title}</p>
            <p className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
          </div>

          {change && (
            <div className={`flex items-center text-xs font-bold ${
              changeType === 'positive' ? 'text-emerald-600 dark:text-emerald-400' : 
              changeType === 'negative' ? 'text-red-600 dark:text-red-400' : 
              'text-slate-600 dark:text-slate-400'
            }`}>
              {changeType === 'positive' ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : changeType === 'negative' ? (
                <TrendingDown className="w-3 h-3 mr-1" />
              ) : (
                <Activity className="w-3 h-3 mr-1" />
              )}
              {change}
            </div>
          )}

          {description && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{description}</p>
          )}

          {badges.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {badges.map((badge, index) => (
                <Badge key={index} className={`${badge.color} text-xs px-2 py-1 font-medium`}>
                  {badge.text}
                </Badge>
              ))}
            </div>
          )}

          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-between mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/50 dark:hover:bg-slate-700/50 group/btn"
          >
            <span className="text-xs font-medium">Ver Detalhes</span>
            <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-200" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface DashboardMetricsProps {
  visibleMetrics: string[];
}

export const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ visibleMetrics }) => {
  const metricsData = {
    clients: {
      title: "Clientes Ativos",
      value: 183,
      change: "+12% vs mês anterior",
      changeType: "positive" as const,
      icon: <Users className="w-5 h-5 lg:w-6 lg:h-6 text-white" />,
      description: "Total de clientes ativos",
      gradient: "from-blue-500 to-indigo-500",
      bgGradient: "from-blue-500/10 to-indigo-500/10",
      badges: [{ text: 'Crescendo', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' }]
    },
    contracts: {
      title: "Contratos Vigentes",
      value: 197,
      change: "+8% vs mês anterior",
      changeType: "positive" as const,
      icon: <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-white" />,
      description: "Contratos em andamento",
      gradient: "from-emerald-500 to-green-500",
      bgGradient: "from-emerald-500/10 to-green-500/10",
      badges: [{ text: 'Estável', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' }]
    },
    mrr: {
      title: "MRR Total",
      value: "R$ 545k",
      change: "+15% vs mês anterior",
      changeType: "positive" as const,
      icon: <DollarSign className="w-5 h-5 lg:w-6 lg:h-6 text-white" />,
      description: "Receita mensal recorrente",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/10 to-pink-500/10",
      badges: [{ text: 'Meta: 98%', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' }]
    },
    goals: {
      title: "Metas Alcançadas",
      value: "28/30",
      change: "93.3% de conclusão",
      changeType: "positive" as const,
      icon: <Target className="w-5 h-5 lg:w-6 lg:h-6 text-white" />,
      description: "Metas do mês atual",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-500/10 to-red-500/10",
      badges: [{ text: 'Excelente', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' }]
    }
  };

  const visibleMetricsData = visibleMetrics
    .map(metricId => metricsData[metricId as keyof typeof metricsData])
    .filter(Boolean);

  if (visibleMetricsData.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {visibleMetricsData.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};
