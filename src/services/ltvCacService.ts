import { supabase } from '@/integrations/supabase/client';
import type { 
  LTVCalculationParams, 
  CACCalculationParams, 
  CohortAnalysis,
  LTVCACMetrics,
  OptimizationSuggestion 
} from '@/types/ltvcac';

class LTVCACService {
  calculateLTV(params: LTVCalculationParams, model: 'simple' | 'predictive' | 'historical' = 'simple'): number {
    switch (model) {
      case 'simple':
        return this.calculateSimpleLTV(params);
      case 'predictive':
        return this.calculatePredictiveLTV(params);
      case 'historical':
        return this.calculateHistoricalLTV(params);
      default:
        return this.calculateSimpleLTV(params);
    }
  }

  private calculateSimpleLTV(params: LTVCalculationParams): number {
    const { averageRevenue, averageLifespan, grossMargin } = params;
    return averageRevenue * averageLifespan * (grossMargin / 100);
  }

  private calculatePredictiveLTV(params: LTVCalculationParams): number {
    const { averageRevenue, churnRate, grossMargin } = params;
    if (churnRate === 0) return 0;
    return (averageRevenue * (grossMargin / 100)) / (churnRate / 100);
  }

  private calculateHistoricalLTV(params: LTVCalculationParams): number {
    const { averageRevenue, averageLifespan, grossMargin, discountRate = 0.1 } = params;
    let ltv = 0;
    
    for (let month = 1; month <= averageLifespan; month++) {
      ltv += (averageRevenue * (grossMargin / 100)) / Math.pow(1 + discountRate, month / 12);
    }
    
    return ltv;
  }

  calculateCAC(params: CACCalculationParams): number {
    const { marketingCosts, salesCosts, newCustomers } = params;
    if (newCustomers === 0) return 0;
    return (marketingCosts + salesCosts) / newCustomers;
  }

  calculatePaybackPeriod(ltv: number, cac: number, monthlyRevenue: number): number {
    if (monthlyRevenue === 0) return 0;
    return Math.ceil(cac / monthlyRevenue);
  }

  async getMetrics(userId: string): Promise<LTVCACMetrics | null> {
    try {
      const { data: clients, error } = await supabase
        .from('clients')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      if (!clients || clients.length === 0) return null;

      const activeClients = clients.filter(c => c.status === 'Ativo');
      const totalRevenue = clients.reduce((sum, c) => sum + (c.mrr || 0), 0);
      const totalLTV = clients.reduce((sum, c) => sum + (c.ltv || 0), 0);
      const totalCAC = clients.reduce((sum, c) => sum + (c.cac || 0), 0);

      const avgLTV = totalLTV / clients.length;
      const avgCAC = totalCAC / clients.length;
      const avgMRR = totalRevenue / (activeClients.length || 1);

      return {
        current_ltv: avgLTV,
        current_cac: avgCAC,
        ltv_cac_ratio: avgCAC > 0 ? avgLTV / avgCAC : 0,
        payback_period: this.calculatePaybackPeriod(avgLTV, avgCAC, avgMRR),
        customer_lifetime: avgMRR > 0 ? avgLTV / avgMRR : 0,
        monthly_churn_rate: this.calculateChurnRate(clients),
        gross_margin: 70
      };
    } catch (error) {
      console.error('Error getting LTV/CAC metrics:', error);
      return null;
    }
  }

  async getCohortAnalysis(userId: string, startDate: string, endDate: string): Promise<CohortAnalysis[]> {
    try {
      const { data: clients, error } = await supabase
        .from('clients')
        .select('*')
        .eq('user_id', userId)
        .gte('created_at', startDate)
        .lte('created_at', endDate);

      if (error) throw error;

      const cohorts = this.groupByCohort(clients || []);
      
      return cohorts.map(cohort => ({
        cohort: cohort.month,
        customers: cohort.clients.length,
        ltv: this.calculateAverageLTV(cohort.clients),
        cac: this.calculateAverageCAC(cohort.clients),
        ratio: this.calculateRatio(cohort.clients),
        retention_rate: this.calculateRetentionRate(cohort.clients),
        revenue: cohort.clients.reduce((sum: number, c: any) => sum + (c.mrr || 0), 0),
        churn_rate: this.calculateCohortChurnRate(cohort.clients)
      }));
    } catch (error) {
      console.error('Error in cohort analysis:', error);
      return [];
    }
  }

  private groupByCohort(clients: any[]): any[] {
    const cohorts: Record<string, any[]> = {};
    
    clients.forEach(client => {
      const month = new Date(client.created_at).toISOString().slice(0, 7);
      if (!cohorts[month]) {
        cohorts[month] = [];
      }
      cohorts[month].push(client);
    });

    return Object.entries(cohorts).map(([month, clients]) => ({
      month,
      clients
    }));
  }

  private calculateAverageLTV(clients: any[]): number {
    if (clients.length === 0) return 0;
    const total = clients.reduce((sum, client) => sum + (client.ltv || 0), 0);
    return total / clients.length;
  }

  private calculateAverageCAC(clients: any[]): number {
    if (clients.length === 0) return 0;
    const total = clients.reduce((sum, client) => sum + (client.cac || 0), 0);
    return total / clients.length;
  }

  private calculateRatio(clients: any[]): number {
    const avgLTV = this.calculateAverageLTV(clients);
    const avgCAC = this.calculateAverageCAC(clients);
    return avgCAC === 0 ? 0 : avgLTV / avgCAC;
  }

  private calculateRetentionRate(clients: any[]): number {
    const activeClients = clients.filter(c => c.status === 'Ativo').length;
    return clients.length === 0 ? 0 : (activeClients / clients.length) * 100;
  }

  private calculateChurnRate(clients: any[]): number {
    const inactiveClients = clients.filter(c => c.status === 'Inativo').length;
    return clients.length === 0 ? 0 : (inactiveClients / clients.length) * 100;
  }

  private calculateCohortChurnRate(clients: any[]): number {
    return 100 - this.calculateRetentionRate(clients);
  }

  async getOptimizationSuggestions(userId: string): Promise<OptimizationSuggestion[]> {
    const suggestions: OptimizationSuggestion[] = [];

    try {
      const { data: clients } = await supabase
        .from('clients')
        .select('*')
        .eq('user_id', userId);

      if (!clients || clients.length === 0) return suggestions;

      const channelAnalysis = this.analyzeByChannel(clients);
      const bestChannels = channelAnalysis
        .filter(c => c.ratio > 3)
        .sort((a, b) => b.ratio - a.ratio);

      if (bestChannels.length > 0) {
        suggestions.push({
          type: 'channel_optimization',
          priority: 'high',
          title: 'Invista mais nos canais eficientes',
          description: `Canal ${bestChannels[0].channel} tem ratio de ${bestChannels[0].ratio.toFixed(1)}:1`,
          action: `Aumentar investimento em ${bestChannels[0].channel}`,
          potential_impact: `Potencial de reduzir CAC em 20-30%`,
          estimated_roi: 2.5
        });
      }

      const churnRate = this.calculateChurnRate(clients);
      if (churnRate > 5) {
        suggestions.push({
          type: 'churn_reduction',
          priority: 'critical',
          title: 'Taxa de churn elevada',
          description: `${churnRate.toFixed(1)}% dos clientes estão inativos`,
          action: 'Implementar programa de retenção',
          potential_impact: `Reduzir churn pode aumentar LTV em 40%`
        });
      }

      const avgLTV = this.calculateAverageLTV(clients);
      if (avgLTV < 100000) {
        suggestions.push({
          type: 'retention',
          priority: 'high',
          title: 'Oportunidade de aumentar LTV',
          description: 'LTV atual está abaixo do potencial',
          action: 'Focar em upsell e cross-sell',
          potential_impact: `Aumentar LTV em 25% através de upsell`
        });
      }

      return suggestions;
    } catch (error) {
      console.error('Error getting optimization suggestions:', error);
      return suggestions;
    }
  }

  private analyzeByChannel(clients: any[]): any[] {
    const channels: Record<string, any[]> = {};
    
    clients.forEach(client => {
      const channel = client.acquisition_channel || 'unknown';
      if (!channels[channel]) {
        channels[channel] = [];
      }
      channels[channel].push(client);
    });

    return Object.entries(channels).map(([channel, clients]) => ({
      channel,
      customers: clients.length,
      ltv: this.calculateAverageLTV(clients),
      cac: this.calculateAverageCAC(clients),
      ratio: this.calculateRatio(clients)
    }));
  }

  async exportFinancialData(userId: string, format: 'csv' | 'json' = 'csv'): Promise<string> {
    try {
      const { data: clients } = await supabase
        .from('clients')
        .select('*')
        .eq('user_id', userId);

      if (!clients) return '';

      if (format === 'json') {
        return JSON.stringify(clients, null, 2);
      }

      const headers = ['Name', 'Email', 'LTV', 'CAC', 'MRR', 'Status', 'Acquisition Channel', 'Created At'];
      const rows = clients.map(c => [
        c.name,
        c.email,
        c.ltv || 0,
        c.cac || 0,
        c.mrr || 0,
        c.status,
        c.acquisition_channel || 'N/A',
        c.created_at
      ]);

      return [headers, ...rows].map(row => row.join(',')).join('\n');
    } catch (error) {
      console.error('Error exporting financial data:', error);
      return '';
    }
  }
}

export const ltvCacService = new LTVCACService();
