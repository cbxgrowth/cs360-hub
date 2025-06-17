
import React from 'react';
import { AnalyticsHeader } from './analytics/AnalyticsHeader';
import { NPSAnalyticsChart } from './analytics/NPSAnalyticsChart';
import { ChurnAnalyticsChart } from './analytics/ChurnAnalyticsChart';
import { SegmentPerformanceChart } from './analytics/SegmentPerformanceChart';
import { CategoryDistributionChart } from './analytics/CategoryDistributionChart';

interface AnalyticsChartsProps {
  visibleCharts: string[];
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ visibleCharts }) => {
  const chartComponents = {
    nps: <NPSAnalyticsChart key="nps" />,
    churn: <ChurnAnalyticsChart key="churn" />,
    segments: <SegmentPerformanceChart key="segments" />,
    categories: <CategoryDistributionChart key="categories" />
  };

  const visibleChartComponents = visibleCharts
    .map(chartId => chartComponents[chartId as keyof typeof chartComponents])
    .filter(Boolean);

  if (visibleChartComponents.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <AnalyticsHeader />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {visibleChartComponents}
      </div>
    </div>
  );
};
