
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Badge } from '../../ui/badge';
import { Layout, BarChart3, PieChart } from 'lucide-react';
import { SectionToggle } from './SectionToggle';
import { metricOptions, chartOptions, sectionOptions } from './customizationData';

interface CustomizerTabsProps {
  visibleMetrics: string[];
  visibleCharts: string[];
  visibleSections: string[];
  onToggleMetric: (metricId: string) => void;
  onToggleChart: (chartId: string) => void;
  onToggleSection: (sectionId: string) => void;
}

export const CustomizerTabs = ({
  visibleMetrics,
  visibleCharts,
  visibleSections,
  onToggleMetric,
  onToggleChart,
  onToggleSection
}: CustomizerTabsProps) => {
  return (
    <Tabs defaultValue="sections" className="w-full">
      <div className="px-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sections" className="flex items-center space-x-2">
            <Layout className="w-4 h-4" />
            <span>Seções</span>
          </TabsTrigger>
          <TabsTrigger value="metrics" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Métricas</span>
          </TabsTrigger>
          <TabsTrigger value="charts" className="flex items-center space-x-2">
            <PieChart className="w-4 h-4" />
            <span>Gráficos</span>
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="px-6 py-4 max-h-96 overflow-y-auto">
        <TabsContent value="sections" className="space-y-4 mt-0">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              Seções do Dashboard
            </h4>
            <Badge variant="outline" className="text-xs">
              {visibleSections.length}/{sectionOptions.length} ativas
            </Badge>
          </div>

          <div className="space-y-3">
            {sectionOptions.map((section) => (
              <SectionToggle
                key={section.id}
                item={section}
                isVisible={visibleSections.includes(section.id)}
                onToggle={() => onToggleSection(section.id)}
                type="section"
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4 mt-0">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              Indicadores Principais
            </h4>
            <Badge variant="outline" className="text-xs">
              {visibleMetrics.length}/{metricOptions.length} ativos
            </Badge>
          </div>

          <div className="space-y-3">
            {metricOptions.map((metric) => (
              <SectionToggle
                key={metric.id}
                item={metric}
                isVisible={visibleMetrics.includes(metric.id)}
                onToggle={() => onToggleMetric(metric.id)}
                type="metric"
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="charts" className="space-y-4 mt-0">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              Gráficos Analytics
            </h4>
            <Badge variant="outline" className="text-xs">
              {visibleCharts.length}/{chartOptions.length} ativos
            </Badge>
          </div>

          <div className="space-y-3">
            {chartOptions.map((chart) => (
              <SectionToggle
                key={chart.id}
                item={chart}
                isVisible={visibleCharts.includes(chart.id)}
                onToggle={() => onToggleChart(chart.id)}
                type="chart"
              />
            ))}
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
};
