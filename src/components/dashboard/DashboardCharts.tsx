
import React from 'react';
import { ChartsHeader } from './charts/ChartsHeader';
import { RefinedChartsGrid } from './charts/RefinedChartsGrid';

interface DashboardChartsProps {
  visibleCharts: string[];
}

export const DashboardCharts: React.FC<DashboardChartsProps> = ({ visibleCharts }) => {
  // Adicionar os novos gráficos em formato teia aos gráficos visíveis por padrão
  const enhancedVisibleCharts = [
    'web',
    'enhanced-revenue', 
    'customer-health-web',
    ...visibleCharts
  ];

  return (
    <div className="space-y-8">
      <ChartsHeader />
      <RefinedChartsGrid visibleCharts={enhancedVisibleCharts} />
    </div>
  );
};
