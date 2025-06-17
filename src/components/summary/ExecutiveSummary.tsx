
import React from 'react';
import { FunctionalityPanel } from '../common/FunctionalityPanel';
import { FunctionalityGrid } from '../common/FunctionalityGrid';
import { MetricCard } from '../common/MetricCard';
import { SectionDivider } from '../common/SectionDivider';
import { ExecutiveMetrics } from './ExecutiveMetrics';
import { ExecutivePerformance } from './ExecutivePerformance';
import { PriorityActions } from './PriorityActions';
import { TodaySchedule } from './TodaySchedule';
import { RecentActivities } from './RecentActivities';
import { QuickInsights } from './QuickInsights';
import { ExecutiveQuickActions } from './ExecutiveQuickActions';
import { BarChart3, Activity, Zap, Calendar, Clock, Lightbulb } from 'lucide-react';

export const ExecutiveSummary = () => {
  return (
    <div className="space-y-8">
      {/* Métricas Executivas */}
      <FunctionalityPanel
        title="Painel Executivo"
        description="Visão estratégica completa do Customer Success"
        icon={BarChart3}
        iconGradient="from-blue-600 to-indigo-600"
        badges={[
          { text: 'Tempo Real', variant: 'secondary', icon: Activity },
          { text: 'IA Ativa', variant: 'default', icon: Zap }
        ]}
        variant="gradient"
        size="lg"
      >
        <ExecutiveMetrics />
      </FunctionalityPanel>

      <SectionDivider title="Performance e Ações" icon={Activity} />

      <FunctionalityGrid columns={2} gap="lg">
        {/* Performance Executiva */}
        <ExecutivePerformance />

        {/* Ações Prioritárias */}
        <PriorityActions />
      </FunctionalityGrid>

      <SectionDivider title="Agenda e Atividades" icon={Calendar} />

      <FunctionalityGrid columns={3} gap="md">
        {/* Agenda de Hoje */}
        <FunctionalityPanel
          title="Agenda de Hoje"
          icon={Calendar}
          iconGradient="from-green-600 to-emerald-600"
          variant="glass"
          size="sm"
        >
          <TodaySchedule />
        </FunctionalityPanel>

        {/* Atividades Recentes */}
        <FunctionalityPanel
          title="Atividades Recentes"
          icon={Clock}
          iconGradient="from-purple-600 to-pink-600"
          variant="glass"
          size="sm"
        >
          <RecentActivities />
        </FunctionalityPanel>

        {/* Insights Rápidos */}
        <FunctionalityPanel
          title="Insights Rápidos"
          icon={Lightbulb}
          iconGradient="from-orange-600 to-red-600"
          variant="glass"
          size="sm"
        >
          <QuickInsights />
        </FunctionalityPanel>
      </FunctionalityGrid>

      <SectionDivider />

      {/* Ações Rápidas */}
      <div className="flex justify-center">
        <ExecutiveQuickActions />
      </div>
    </div>
  );
};
