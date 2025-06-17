
import React from 'react';
import { FunctionalityPanel } from '../common/FunctionalityPanel';
import { FunctionalityGrid } from '../common/FunctionalityGrid';
import { MetricCard } from '../common/MetricCard';
import { SectionDivider } from '../common/SectionDivider';
import { 
  BarChart3, 
  Brain, 
  Sparkles, 
  TrendingUp, 
  Activity, 
  Users,
  DollarSign,
  Target
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  metrics?: Array<{
    title: string;
    value: string | number;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
    color?: 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'indigo';
    icon: React.ComponentType<any>;
  }>;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  metrics = []
}) => {
  const defaultMetrics = [
    {
      title: 'Receita Recorrente',
      value: 'R$ 524.780',
      change: '+8.6%',
      trend: 'up' as const,
      color: 'green' as const,
      icon: DollarSign
    },
    {
      title: 'Clientes Ativos',
      value: 1247,
      change: '+12.3%',
      trend: 'up' as const,
      color: 'blue' as const,
      icon: Users
    },
    {
      title: 'Taxa de Conversão',
      value: '28.4%',
      change: '+2.1%',
      trend: 'up' as const,
      color: 'purple' as const,
      icon: Target
    },
    {
      title: 'Health Score Médio',
      value: '8.7',
      change: '+0.3',
      trend: 'up' as const,
      color: 'orange' as const,
      icon: TrendingUp
    }
  ];

  const displayMetrics = metrics.length > 0 ? metrics : defaultMetrics;

  return (
    <div className="space-y-8">
      {/* Header com Métricas */}
      <FunctionalityPanel
        title="Dashboard Principal"
        description="Visão geral completa do seu Customer Success"
        icon={BarChart3}
        iconGradient="from-blue-600 to-indigo-600"
        badges={[
          { text: 'Tempo Real', variant: 'secondary', icon: Activity },
          { text: 'IA Ativa', variant: 'default', icon: Sparkles }
        ]}
        variant="gradient"
        size="lg"
      >
        <FunctionalityGrid columns={4} gap="md">
          {displayMetrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              trend={metric.trend}
              icon={metric.icon}
              color={metric.color}
              size="sm"
            />
          ))}
        </FunctionalityGrid>
      </FunctionalityPanel>

      <SectionDivider title="Análises Inteligentes" icon={Brain} />

      {/* Conteúdo Principal */}
      {children}
    </div>
  );
};
