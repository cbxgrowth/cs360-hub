
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  TrendingUp, 
  AlertTriangle, 
  Target, 
  Users,
  DollarSign,
  Star,
  Activity,
  Sparkles,
  ArrowUpRight,
  Eye
} from 'lucide-react';

export const QuickInsights = () => {
  const insights = [
    {
      id: 'performance',
      title: 'Performance Geral',
      value: '94.8%',
      subtitle: 'Score de Saúde',
      change: '+5.2% este mês',
      changeType: 'positive' as const,
      icon: TrendingUp,
      gradient: 'from-emerald-500 to-green-600',
      bgGradient: 'from-emerald-500/10 to-green-500/10',
      description: 'Excelente performance geral dos clientes',
      actionLabel: 'Ver Detalhes',
      badges: [
        { text: 'Estável', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' },
        { text: 'Crescendo', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' }
      ]
    },
    {
      id: 'revenue',
      title: 'Receita Mensal',
      value: 'R$ 545.2K',
      subtitle: 'MRR Atual',
      change: '+12.8% vs anterior',
      changeType: 'positive' as const,
      icon: DollarSign,
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-500/10 to-indigo-500/10',
      description: 'Crescimento consistente da receita',
      actionLabel: 'Análise Financeira',
      badges: [
        { text: 'Meta: 98%', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
        { text: 'Projeção: R$ 650K', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' }
      ]
    },
    {
      id: 'alerts',
      title: 'Alertas Críticos',
      value: '3',
      subtitle: 'Requerem Atenção',
      change: '-2 resolvidos hoje',
      changeType: 'positive' as const,
      icon: AlertTriangle,
      gradient: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-500/10 to-red-500/10',
      description: 'Clientes com risco de churn',
      actionLabel: 'Resolver Agora',
      badges: [
        { text: 'Alto Risco', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' },
        { text: 'Ação Imediata', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {insights.map((insight) => (
        <Card key={insight.id} className="relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
          <div className={`absolute inset-0 bg-gradient-to-r ${insight.bgGradient}`}></div>
          <CardContent className="relative p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 bg-gradient-to-r ${insight.gradient} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <insight.icon className="w-6 h-6 text-white" />
              </div>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                  {insight.title}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">
                    {insight.value}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {insight.subtitle}
                  </span>
                </div>
              </div>

              <div className={`flex items-center text-sm font-medium ${
                insight.changeType === 'positive' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {insight.changeType === 'positive' ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <AlertTriangle className="w-4 h-4 mr-1" />
                )}
                {insight.change}
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {insight.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {insight.badges.map((badge, index) => (
                  <Badge key={index} className={`${badge.color} text-xs font-medium px-2 py-1`}>
                    {badge.text}
                  </Badge>
                ))}
              </div>

              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-between mt-4 hover:bg-white/50 dark:hover:bg-slate-700/50 transition-colors group/btn"
              >
                <span className="font-medium">{insight.actionLabel}</span>
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-200" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
