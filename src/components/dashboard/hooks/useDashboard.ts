
import { useDashboardCustomization } from './useDashboardCustomization';

export const useDashboard = () => {
  const customization = useDashboardCustomization();

  return {
    visibleMetrics: customization.visibleMetrics,
    visibleCharts: customization.visibleCharts,
    visibleSections: customization.visibleSections,
    handleToggleMetric: customization.handleToggleMetric,
    handleToggleChart: customization.handleToggleChart,
    handleToggleSection: customization.handleToggleSection,
    resetToDefault: customization.resetToDefault,
    exportConfiguration: customization.exportConfiguration,
    importConfiguration: customization.importConfiguration,
    lastModified: customization.lastModified
  };
};
