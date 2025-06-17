
import { useState, useEffect } from 'react';

export interface DashboardCustomization {
  visibleMetrics: string[];
  visibleCharts: string[];
  visibleSections: string[];
}

const DEFAULT_CUSTOMIZATION: DashboardCustomization = {
  visibleMetrics: [
    'mrr', 'arr', 'clients', 'conversion', 'health', 'nps', 
    'churn', 'engagement', 'ltv', 'cac', 'feature_adoption', 'satisfaction'
  ],
  visibleCharts: [
    'revenue', 'clients', 'health', 'tiers', 'nps', 'churn', 'segments', 'categories'
  ],
  visibleSections: [
    'quickInsights', 'metrics', 'charts', 'analytics', 'sidebar', 'clients'
  ]
};

export const useDashboardCustomization = () => {
  const [customization, setCustomization] = useState<DashboardCustomization>(DEFAULT_CUSTOMIZATION);
  const [lastModified, setLastModified] = useState<Date | null>(null);

  // Carregar configuração salva
  useEffect(() => {
    const saved = localStorage.getItem('dashboard-customization');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCustomization({ ...DEFAULT_CUSTOMIZATION, ...parsed });
        const savedTimestamp = localStorage.getItem('dashboard-customization-timestamp');
        if (savedTimestamp) {
          setLastModified(new Date(savedTimestamp));
        }
      } catch (error) {
        console.error('Erro ao carregar configuração do dashboard:', error);
      }
    }
  }, []);

  // Salvar configuração
  const saveCustomization = (newCustomization: DashboardCustomization) => {
    localStorage.setItem('dashboard-customization', JSON.stringify(newCustomization));
    localStorage.setItem('dashboard-customization-timestamp', new Date().toISOString());
    setCustomization(newCustomization);
    setLastModified(new Date());
  };

  const handleToggleMetric = (metric: string) => {
    const newMetrics = customization.visibleMetrics.includes(metric)
      ? customization.visibleMetrics.filter(m => m !== metric)
      : [...customization.visibleMetrics, metric];
    
    saveCustomization({
      ...customization,
      visibleMetrics: newMetrics
    });
  };

  const handleToggleChart = (chart: string) => {
    const newCharts = customization.visibleCharts.includes(chart)
      ? customization.visibleCharts.filter(c => c !== chart)
      : [...customization.visibleCharts, chart];
    
    saveCustomization({
      ...customization,
      visibleCharts: newCharts
    });
  };

  const handleToggleSection = (section: string) => {
    const newSections = customization.visibleSections.includes(section)
      ? customization.visibleSections.filter(s => s !== section)
      : [...customization.visibleSections, section];
    
    saveCustomization({
      ...customization,
      visibleSections: newSections
    });
  };

  const resetToDefault = () => {
    saveCustomization(DEFAULT_CUSTOMIZATION);
  };

  const exportConfiguration = () => {
    const config = {
      ...customization,
      exportedAt: new Date().toISOString(),
      version: '2.0',
      name: 'CS360° Dashboard Configuration',
      description: 'Configuração personalizada do dashboard'
    };
    
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cs360-dashboard-config-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importConfiguration = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const config = JSON.parse(e.target?.result as string);
        const importedConfig: DashboardCustomization = {
          visibleMetrics: Array.isArray(config.visibleMetrics) ? config.visibleMetrics : DEFAULT_CUSTOMIZATION.visibleMetrics,
          visibleCharts: Array.isArray(config.visibleCharts) ? config.visibleCharts : DEFAULT_CUSTOMIZATION.visibleCharts,
          visibleSections: Array.isArray(config.visibleSections) ? config.visibleSections : DEFAULT_CUSTOMIZATION.visibleSections
        };
        saveCustomization(importedConfig);
      } catch (error) {
        console.error('Erro ao importar configuração:', error);
        alert('Erro ao importar configuração. Verifique se o arquivo é válido.');
      }
    };
    reader.readAsText(file);
  };

  return {
    visibleMetrics: customization.visibleMetrics,
    visibleCharts: customization.visibleCharts,
    visibleSections: customization.visibleSections,
    handleToggleMetric,
    handleToggleChart,
    handleToggleSection,
    resetToDefault,
    exportConfiguration,
    importConfiguration,
    lastModified
  };
};
