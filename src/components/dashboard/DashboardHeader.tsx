
import React from 'react';
import { Activity, Sparkles } from 'lucide-react';
import { PageHeader } from '../common/PageHeader';
import { AdvancedDashboardCustomizer } from './customizer/AdvancedDashboardCustomizer';

interface DashboardHeaderProps {
  onToggleMetric: (metric: string) => void;
  onToggleChart: (chart: string) => void;
  onToggleSection: (section: string) => void;
  visibleMetrics: string[];
  visibleCharts: string[];
  visibleSections: string[];
  onExportConfig: () => void;
  onImportConfig: (file: File) => void;
  onResetToDefault: () => void;
}

export const DashboardHeader = ({
  onToggleMetric,
  onToggleChart,
  onToggleSection,
  visibleMetrics,
  visibleCharts,
  visibleSections,
  onExportConfig,
  onImportConfig,
  onResetToDefault
}: DashboardHeaderProps) => {
  const badges = [
    {
      icon: Activity,
      text: 'Tempo Real',
      variant: 'success' as const
    },
    {
      icon: Sparkles,
      text: 'IA Ativa',
      variant: 'info' as const
    }
  ];

  const actions = (
    <AdvancedDashboardCustomizer
      onToggleMetric={onToggleMetric}
      onToggleChart={onToggleChart}
      onToggleSection={onToggleSection}
      visibleMetrics={visibleMetrics}
      visibleCharts={visibleCharts}
      visibleSections={visibleSections}
      onExportConfig={onExportConfig}
      onImportConfig={onImportConfig}
      onResetToDefault={onResetToDefault}
    />
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard Principal"
        description="Visão geral completa do seu Customer Success"
        badges={badges}
        actions={actions}
      />
    </div>
  );
};
