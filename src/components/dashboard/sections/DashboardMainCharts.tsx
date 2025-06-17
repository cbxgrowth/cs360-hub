
import React from 'react';
import { DashboardCharts } from '../DashboardCharts';
import { AnalyticsCharts } from '../AnalyticsCharts';
import { InteractiveChart } from '../advanced/InteractiveChart';
import { chartData } from '../data/smartMetricsData';

interface DashboardMainChartsProps {
  sidebarCollapsed: boolean;
  visibleSections: string[];
  visibleCharts: string[];
}

export const DashboardMainCharts = ({ 
  sidebarCollapsed, 
  visibleSections, 
  visibleCharts 
}: DashboardMainChartsProps) => {
  return (
    <div className={`${sidebarCollapsed ? 'xl:col-span-4' : 'xl:col-span-3'} space-y-8 transition-all duration-300`}>
      {/* Gráfico Interativo Principal */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
        <InteractiveChart
          title="Crescimento de Receita com IA"
          subtitle="Análise preditiva com detecção de anomalias"
          data={chartData}
          type="area"
          color="#3B82F6"
          gradient={['from-blue-500', 'to-purple-500']}
          showPrediction={true}
          showAnomalies={true}
          showTarget={true}
          isRealtime={true}
          height={350}
        />
      </div>

      {/* Análise Visual Inteligente */}
      {visibleSections.includes('charts') && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
          <DashboardCharts visibleCharts={visibleCharts} />
        </div>
      )}
      
      {/* Analytics Avançado */}
      {visibleSections.includes('analytics') && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
          <AnalyticsCharts visibleCharts={visibleCharts} />
        </div>
      )}
    </div>
  );
};
