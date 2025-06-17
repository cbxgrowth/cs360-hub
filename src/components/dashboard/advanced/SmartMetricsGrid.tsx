
import React from 'react';
import { SmartMetricsCard } from './SmartMetricsCard';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Target,
  Activity,
  Award,
  Zap,
  BarChart3,
  Clock,
  AlertTriangle,
  ThumbsUp,
  UserCheck,
  Calendar,
  ShoppingCart,
  Star,
  HeartHandshake,
  TrendingDown
} from 'lucide-react';

interface SmartMetricsGridProps {
  visibleMetrics: string[];
}

export const SmartMetricsGrid = ({ visibleMetrics }: SmartMetricsGridProps) => {
  const allMetrics = [
    {
      id: 'mrr',
      title: "Receita Recorrente Mensal",
      value: "R$ 524.780",
      previousValue: "R$ 483.120",
      target: 600000,
      trend: 'up' as const,
      change: "+8.6%",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      insight: "Crescimento sustentável mantido por 3 meses consecutivos. Projeção indica atingir meta em 2 meses.",
      prediction: "R$ 615.000 em 60 dias",
      alertLevel: 'none' as const
    },
    {
      id: 'arr',
      title: "Receita Recorrente Anual",
      value: "R$ 6.3M",
      target: 7200000,
      trend: 'up' as const,
      change: "+12.4%",
      icon: BarChart3,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      insight: "ARR crescendo consistentemente. Expansão de clientes enterprise impulsionando crescimento.",
      prediction: "R$ 7.1M até final do ano"
    },
    {
      id: 'clients',
      title: "Clientes Ativos",
      value: 1247,
      target: 1500,
      trend: 'up' as const,
      change: "+12.3%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      insight: "Taxa de conversão melhorou 15% este mês. Foco em onboarding está gerando resultados.",
      prediction: "1.380 clientes em 30 dias"
    },
    {
      id: 'conversion',
      title: "Taxa de Conversão",
      value: "28.4%",
      target: 35,
      trend: 'up' as const,
      change: "+2.1%",
      icon: Target,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      insight: "Otimizações no funil de vendas impactaram positivamente. Continue investindo em automação.",
      alertLevel: 'warning' as const
    },
    {
      id: 'health',
      title: "Health Score Médio",
      value: "8.7",
      target: 9,
      trend: 'up' as const,
      change: "+0.3",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      insight: "Melhoria consistente na satisfação. Clientes estão respondendo bem às novas features."
    },
    {
      id: 'nps',
      title: "Net Promoter Score",
      value: "72",
      target: 80,
      trend: 'up' as const,
      change: "+5",
      icon: Award,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      insight: "NPS em excelente patamar. Foco em manter qualidade do atendimento."
    },
    {
      id: 'churn',
      title: "Taxa de Churn",
      value: "2.8%",
      target: 2,
      trend: 'down' as const,
      change: "-0.5%",
      icon: TrendingDown,
      color: "text-red-600",
      bgColor: "bg-red-50",
      insight: "Redução consistente do churn. Estratégias de retenção estão funcionando.",
      alertLevel: 'success' as const
    },
    {
      id: 'engagement',
      title: "Engajamento Médio",
      value: "85.4%",
      target: 90,
      trend: 'up' as const,
      change: "+3.2%",
      icon: Zap,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      insight: "Usuários mais ativos. Novas funcionalidades estão sendo bem adotadas."
    },
    {
      id: 'ltv',
      title: "Lifetime Value",
      value: "R$ 89.2k",
      target: 100000,
      trend: 'up' as const,
      change: "+18.7%",
      icon: BarChart3,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      insight: "LTV crescente indica valor entregue aos clientes. Manter estratégia atual."
    },
    {
      id: 'cac',
      title: "Custo de Aquisição",
      value: "R$ 2.1k",
      target: 1800,
      trend: 'down' as const,
      change: "-8.2%",
      icon: ShoppingCart,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      insight: "CAC em redução devido otimização de campanhas digitais."
    },
    {
      id: 'feature_adoption',
      title: "Adoção de Features",
      value: "67.3%",
      target: 75,
      trend: 'up' as const,
      change: "+4.1%",
      icon: Activity,
      color: "text-violet-600",
      bgColor: "bg-violet-50",
      insight: "Melhoria na documentação e onboarding aumentou adoção."
    },
    {
      id: 'support_tickets',
      title: "Tickets de Suporte",
      value: "142",
      target: 100,
      trend: 'down' as const,
      change: "-12%",
      icon: HeartHandshake,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      insight: "Redução significativa com melhoria do produto e FAQ."
    },
    {
      id: 'satisfaction',
      title: "Satisfação do Cliente",
      value: "9.1",
      target: 9,
      trend: 'up' as const,
      change: "+0.4",
      icon: Star,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      insight: "Satisfação acima da meta. Clientes valorizando qualidade do suporte."
    },
    {
      id: 'response_time',
      title: "Tempo de Resposta",
      value: "1.2h",
      target: 1,
      trend: 'down' as const,
      change: "-15%",
      icon: Clock,
      color: "text-green-500",
      bgColor: "bg-green-50",
      insight: "Melhoria contínua no tempo de resposta do suporte."
    },
    {
      id: 'renewal_rate',
      title: "Taxa de Renovação",
      value: "94.2%",
      target: 95,
      trend: 'up' as const,
      change: "+2.1%",
      icon: UserCheck,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
      insight: "Alta taxa de renovação indica valor percebido pelos clientes."
    },
    {
      id: 'expansion_revenue',
      title: "Receita de Expansão",
      value: "R$ 45.8k",
      target: 50000,
      trend: 'up' as const,
      change: "+23.4%",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      insight: "Upsells e cross-sells gerando receita adicional significativa."
    }
  ];

  const displayedMetrics = allMetrics.filter(metric => 
    visibleMetrics.includes(metric.id)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {displayedMetrics.map((metric, index) => (
        <SmartMetricsCard
          key={metric.id}
          {...metric}
          className="animate-fade-in hover:scale-105 transition-all duration-300"
          style={{ animationDelay: `${index * 100}ms` }}
        />
      ))}
    </div>
  );
};
