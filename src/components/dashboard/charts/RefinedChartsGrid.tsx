
import React from 'react';
import { RevenueChart } from './RevenueChart';
import { ClientsChart } from './ClientsChart';
import { HealthScoreChart } from './HealthScoreChart';
import { TierDistributionChart } from './TierDistributionChart';
import { PerformanceBySegmentChart } from './PerformanceBySegmentChart';
import { CategoryDistributionChart } from './CategoryDistributionChart';
import { NPSChart } from './NPSChart';
import { ChurnAnalysisChart } from './ChurnAnalysisChart';
import { Cell } from 'recharts';

interface RefinedChartsGridProps {
  visibleCharts: string[];
}

export const RefinedChartsGrid: React.FC<RefinedChartsGridProps> = ({ visibleCharts }) => {
  const chartComponents = {
    revenue: <RevenueChart key="revenue" />,
    clients: <ClientsChart key="clients" />,
    health: <HealthScoreChart key="health" />,
    tiers: <TierDistributionChart key="tiers" />,
    nps: <NPSChart key="nps" />,
    churn: <ChurnAnalysisChart key="churn" />,
    segment: <PerformanceBySegmentChart key="segment" />,
    category: <CategoryDistributionChart key="category" />,
  };

  // Displaying all refined charts by default to showcase the new dashboard layout.
  const chartsToDisplay = [
    'revenue', 
    'clients', 
    'tiers', 
    'health', 
    'nps', 
    'churn', 
    'segment', 
    'category'
  ];

  const visibleChartComponents = chartsToDisplay
    .map(chartId => chartComponents[chartId as keyof typeof chartComponents])
    .filter(Boolean);

  if (visibleChartComponents.length === 0) {
    return (
        <div className="text-center py-10 text-gray-500">
            Nenhum gráfico para exibir.
        </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {visibleChartComponents}
    </div>
  );
};
