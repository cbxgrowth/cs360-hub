
import React from 'react';
import { EnhancedChartsSection } from './EnhancedChartsSection';

interface ChartsSectionProps {
  visibleCharts: string[];
}

export const ChartsSection: React.FC<ChartsSectionProps> = ({ visibleCharts }) => {
  return <EnhancedChartsSection visibleCharts={visibleCharts} />;
};
