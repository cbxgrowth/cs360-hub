
import { useState, useMemo } from 'react';

export interface LTVCACData {
  month: string;
  ltv: number;
  cac: number;
  ratio: number;
  cacEfficiency: number;
  customers: number;
  revenue: number;
}

export interface LTVCACFilters {
  timeRange: string;
  segment: string;
  channel: string;
  model: number;
  cohort: string;
}

export interface LTVCACInsight {
  type: 'warning' | 'success' | 'info' | 'critical';
  title: string;
  description: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
  priority: 'high' | 'medium' | 'low';
  action?: string;
}

const defaultFilters: LTVCACFilters = {
  timeRange: '12M',
  segment: 'Todos',
  channel: 'all',
  model: 1,
  cohort: 'all'
};

// Dados simulados mais realistas
const ltvCacBaseData: LTVCACData[] = [
  { month: 'Jan', ltv: 142000, cac: 2800, ratio: 50.7, cacEfficiency: 78, customers: 145, revenue: 620000 },
  { month: 'Fev', ltv: 145000, cac: 2750, ratio: 52.7, cacEfficiency: 82, customers: 158, revenue: 685000 },
  { month: 'Mar', ltv: 148000, cac: 2650, ratio: 55.8, cacEfficiency: 85, customers: 172, revenue: 742000 },
  { month: 'Abr', ltv: 151000, cac: 2600, ratio: 58.1, cacEfficiency: 87, customers: 189, revenue: 798000 },
  { month: 'Mai', ltv: 149000, cac: 2550, ratio: 58.4, cacEfficiency: 89, customers: 203, revenue: 856000 },
  { month: 'Jun', ltv: 152000, cac: 2450, ratio: 62.0, cacEfficiency: 92, customers: 218, revenue: 912000 }
];

export const useLTVCAC = () => {
  const [filters, setFilters] = useState<LTVCACFilters>(defaultFilters);
  const [isLoading, setIsLoading] = useState(false);

  // Dados filtrados baseados nos filtros aplicados
  const filteredData = useMemo(() => {
    let data = [...ltvCacBaseData];
    
    // Aplicar filtros de tempo
    if (filters.timeRange === '3M') {
      data = data.slice(-3);
    } else if (filters.timeRange === '6M') {
      data = data.slice(-6);
    }
    
    // Simular variações por segmento
    if (filters.segment === 'Enterprise') {
      data = data.map(d => ({ ...d, ltv: d.ltv * 1.3, cac: d.cac * 1.1 }));
    } else if (filters.segment === 'Starter') {
      data = data.map(d => ({ ...d, ltv: d.ltv * 0.7, cac: d.cac * 0.8 }));
    }
    
    return data;
  }, [filters]);

  // Métricas atuais
  const currentMetrics = useMemo(() => {
    const latest = filteredData[filteredData.length - 1];
    const previous = filteredData[filteredData.length - 2];
    
    return {
      currentLTV: latest?.ltv || 0,
      currentCAC: latest?.cac || 0,
      ltvCacRatio: latest ? latest.ltv / latest.cac : 0,
      ltvChange: previous ? ((latest.ltv - previous.ltv) / previous.ltv) * 100 : 0,
      cacChange: previous ? ((latest.cac - previous.cac) / previous.cac) * 100 : 0,
      customers: latest?.customers || 0,
      revenue: latest?.revenue || 0,
      paybackPeriod: latest ? Math.round(latest.cac / (latest.revenue / latest.customers / 12)) : 0
    };
  }, [filteredData]);

  // Insights inteligentes
  const insights = useMemo((): LTVCACInsight[] => {
    const { currentLTV, currentCAC, ltvCacRatio, cacChange } = currentMetrics;
    const insights: LTVCACInsight[] = [];

    // Análise do ratio LTV:CAC
    if (ltvCacRatio < 3) {
      insights.push({
        type: 'critical',
        title: 'Ratio LTV:CAC Crítico',
        description: 'Seu ratio está abaixo do mínimo recomendado de 3:1',
        value: `${ltvCacRatio.toFixed(1)}:1`,
        trend: 'down',
        priority: 'high',
        action: 'Otimizar custos de aquisição ou aumentar LTV'
      });
    } else if (ltvCacRatio > 5) {
      insights.push({
        type: 'success',
        title: 'Excelente Ratio LTV:CAC',
        description: 'Ratio acima do ideal, considere investir mais em aquisição',
        value: `${ltvCacRatio.toFixed(1)}:1`,
        trend: 'up',
        priority: 'medium',
        action: 'Escalar investimentos em marketing'
      });
    }

    // Análise de tendência CAC
    if (cacChange > 10) {
      insights.push({
        type: 'warning',
        title: 'CAC Aumentando Rapidamente',
        description: 'Custos de aquisição subiram mais de 10% no período',
        value: `+${cacChange.toFixed(1)}%`,
        trend: 'up',
        priority: 'high',
        action: 'Revisar estratégias de marketing'
      });
    } else if (cacChange < -5) {
      insights.push({
        type: 'success',
        title: 'Otimização de CAC Efetiva',
        description: 'Redução significativa nos custos de aquisição',
        value: `${cacChange.toFixed(1)}%`,
        trend: 'down',
        priority: 'low'
      });
    }

    // Análise de LTV
    if (currentLTV < 100000) {
      insights.push({
        type: 'warning',
        title: 'LTV Baixo',
        description: 'Lifetime Value abaixo da média do mercado',
        value: `R$ ${(currentLTV / 1000).toFixed(0)}k`,
        trend: 'stable',
        priority: 'medium',
        action: 'Focar em retenção e upsell'
      });
    }

    return insights;
  }, [currentMetrics]);

  const updateFilter = (key: keyof LTVCACFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const exportData = () => {
    const csvContent = [
      'Mês,LTV,CAC,Ratio,Eficiência CAC,Clientes,Receita',
      ...filteredData.map(d => 
        `${d.month},${d.ltv},${d.cac},${d.ratio},${d.cacEfficiency},${d.customers},${d.revenue}`
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ltv-cac-data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return {
    filters,
    filteredData,
    currentMetrics,
    insights,
    isLoading,
    updateFilter,
    resetFilters,
    exportData
  };
};
