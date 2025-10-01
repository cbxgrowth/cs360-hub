export interface LTVCalculationParams {
  averageRevenue: number;
  averageLifespan: number;
  churnRate: number;
  grossMargin: number;
  discountRate?: number;
}

export interface CACCalculationParams {
  marketingCosts: number;
  salesCosts: number;
  newCustomers: number;
  period?: 'month' | 'quarter' | 'year';
}

export interface CohortAnalysis {
  cohort: string;
  customers: number;
  ltv: number;
  cac: number;
  ratio: number;
  retention_rate: number;
  revenue: number;
  churn_rate: number;
}

export interface LTVCACMetrics {
  current_ltv: number;
  current_cac: number;
  ltv_cac_ratio: number;
  payback_period: number;
  customer_lifetime: number;
  monthly_churn_rate: number;
  gross_margin: number;
}

export interface OptimizationSuggestion {
  type: 'channel_optimization' | 'churn_reduction' | 'pricing' | 'retention' | 'acquisition';
  priority: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  action: string;
  potential_impact?: string;
  estimated_roi?: number;
}
