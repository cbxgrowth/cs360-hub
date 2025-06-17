
export interface ROIFormData {
  currentCustomers: string;
  averageMonthlyRevenue: string;
  currentChurnRate: string;
  customerAcquisitionCost: string;
}

export interface ROIResults {
  currentLTV: number;
  projectedLTV: number;
  churnReduction: number;
  roiPercentage: number;
  monthlySavings: number;
}

export const calculateROI = (formData: ROIFormData): ROIResults => {
  const customers = parseInt(formData.currentCustomers) || 0;
  const monthlyRevenue = parseFloat(formData.averageMonthlyRevenue) || 0;
  const churnRate = parseFloat(formData.currentChurnRate) || 0;
  const cac = parseFloat(formData.customerAcquisitionCost) || 0;

  // Cálculos baseados nos benefícios do CS360°
  const currentLTV = monthlyRevenue / (churnRate / 100);
  const improvedChurnRate = churnRate * 0.6; // 40% de redução no churn
  const projectedLTV = monthlyRevenue / (improvedChurnRate / 100);
  
  const churnReduction = 40; // 40% de redução
  const monthlySavings = customers * (projectedLTV - currentLTV) * (churnRate / 100 / 12);
  const annualSavings = monthlySavings * 12;
  const cs360Cost = 6000; // Custo anual estimado
  const roiPercentage = ((annualSavings - cs360Cost) / cs360Cost) * 100;

  return {
    currentLTV,
    projectedLTV,
    churnReduction,
    roiPercentage,
    monthlySavings
  };
};
