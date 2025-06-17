
import React from 'react';
import { NPSEvolutionChart } from './charts/NPSEvolutionChart';
import { NPSSegmentChart } from './charts/NPSSegmentChart';
import { ResponseRateChart } from './charts/ResponseRateChart';
import { CategoryPerformanceChart } from './charts/CategoryPerformanceChart';

interface NPSChartsProps {
  data: Array<{
    month: string;
    score: number;
    responses: number;
    promoters: number;
    passives: number;
    detractors: number;
  }>;
}

export const NPSCharts: React.FC<NPSChartsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <NPSEvolutionChart data={data} />
      <NPSSegmentChart />
      <ResponseRateChart data={data} />
      <CategoryPerformanceChart data={data} />
    </div>
  );
};
