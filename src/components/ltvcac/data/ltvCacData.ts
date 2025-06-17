
export const ltvCacData = [
  { 
    month: 'Jan', 
    ltv: 142000, 
    cac: 2800, 
    ratio: 50.7, 
    cacEfficiency: 78,
    customers: 145,
    revenue: 620000,
    churnRate: 3.2,
    arpu: 4275
  },
  { 
    month: 'Fev', 
    ltv: 145000, 
    cac: 2750, 
    ratio: 52.7, 
    cacEfficiency: 82,
    customers: 158,
    revenue: 685000,
    churnRate: 2.9,
    arpu: 4335
  },
  { 
    month: 'Mar', 
    ltv: 148000, 
    cac: 2650, 
    ratio: 55.8, 
    cacEfficiency: 85,
    customers: 172,
    revenue: 742000,
    churnRate: 2.7,
    arpu: 4314
  },
  { 
    month: 'Abr', 
    ltv: 151000, 
    cac: 2600, 
    ratio: 58.1, 
    cacEfficiency: 87,
    customers: 189,
    revenue: 798000,
    churnRate: 2.5,
    arpu: 4222
  },
  { 
    month: 'Mai', 
    ltv: 149000, 
    cac: 2550, 
    ratio: 58.4, 
    cacEfficiency: 89,
    customers: 203,
    revenue: 856000,
    churnRate: 2.8,
    arpu: 4217
  },
  { 
    month: 'Jun', 
    ltv: 152000, 
    cac: 2450, 
    ratio: 62.0, 
    cacEfficiency: 92,
    customers: 218,
    revenue: 912000,
    churnRate: 2.3,
    arpu: 4183
  }
];

export const cacAnalysisData = [
  {
    channel: 'Google Ads',
    cac: 2450,
    volume: 35,
    efficiency: 92,
    trend: 'down',
    conversions: 145,
    cost: 355250
  },
  {
    channel: 'Facebook Ads',
    cac: 2800,
    volume: 28,
    efficiency: 78,
    trend: 'down',
    conversions: 98,
    cost: 274400
  },
  {
    channel: 'LinkedIn',
    cac: 3900,
    volume: 15,
    efficiency: 65,
    trend: 'up',
    conversions: 52,
    cost: 202800
  },
  {
    channel: 'Orgânico',
    cac: 650,
    volume: 12,
    efficiency: 95,
    trend: 'stable',
    conversions: 42,
    cost: 27300
  },
  {
    channel: 'Referral',
    cac: 1000,
    volume: 8,
    efficiency: 88,
    trend: 'down',
    conversions: 28,
    cost: 28000
  },
  {
    channel: 'Email',
    cac: 320,
    volume: 2,
    efficiency: 98,
    trend: 'stable',
    conversions: 7,
    cost: 2240
  }
];

export const cacOptimizationSuggestions = [
  {
    channel: 'Google Ads',
    currentCAC: 2450,
    optimizedCAC: 2100,
    targetCAC: 2100,
    savingsPotential: 350,
    potentialSaving: 350,
    priority: 'high' as const,
    action: 'Otimizar palavras-chave de cauda longa e melhorar Quality Score',
    actions: [
      'Otimizar palavras-chave de cauda longa',
      'Melhorar Quality Score das campanhas',
      'Implementar remarketing estratégico'
    ],
    difficulty: 'Média',
    timeframe: '2-4 semanas'
  },
  {
    channel: 'Facebook Ads',
    currentCAC: 2800,
    optimizedCAC: 2200,
    targetCAC: 2200,
    savingsPotential: 600,
    potentialSaving: 600,
    priority: 'medium' as const,
    action: 'Refinar targeting por interesses e testar novos formatos',
    actions: [
      'Refinar targeting por interesses',
      'Testar novos formatos de creative',
      'Implementar lookalike audiences'
    ],
    difficulty: 'Baixa',
    timeframe: '1-2 semanas'
  },
  {
    channel: 'LinkedIn',
    currentCAC: 3900,
    optimizedCAC: 3200,
    targetCAC: 3200,
    savingsPotential: 700,
    potentialSaving: 700,
    priority: 'low' as const,
    action: 'Focar em InMail patrocinado e otimizar segmentação',
    actions: [
      'Focar em InMail patrocinado',
      'Otimizar segmentação por cargo',
      'Melhorar copy das campanhas'
    ],
    difficulty: 'Alta',
    timeframe: '4-6 semanas'
  }
];

export const cohortData = [
  { cohort: '2024-Q1', month1: 95, month3: 87, month6: 76, month12: 68 },
  { cohort: '2024-Q2', month1: 96, month3: 89, month6: 78, month12: null },
  { cohort: '2023-Q4', month1: 94, month3: 85, month6: 74, month12: 65 },
  { cohort: '2023-Q3', month1: 93, month3: 84, month6: 73, month12: 64 }
];

export const calculationModels = [
  {
    id: 'traditional',
    name: 'Modelo Tradicional',
    description: 'ARPU / Churn Rate',
    accuracy: 75,
    active: true,
    ltv: 145000
  },
  {
    id: 'cohort',
    name: 'Análise de Coorte',
    description: 'Baseado em coortes de clientes',
    accuracy: 85,
    active: false,
    ltv: 152000
  },
  {
    id: 'predictive',
    name: 'IA Preditivo',
    description: 'Machine Learning avançado',
    accuracy: 92,
    active: false,
    ltv: 168000
  }
];

export const cohortAnalysis = [
  { 
    period: 'Q1 2024', 
    cohort: 'Q1 2024',
    size: 145,
    retention30: 92, 
    retention90: 78, 
    retention180: 65, 
    retention_12m: 65,
    ltv: 145000,
    ltv_3m: 45000,
    ltv_6m: 78000,
    ltv_12m: 145000,
    ltv_24m: 198000
  },
  { 
    period: 'Q2 2024', 
    cohort: 'Q2 2024',
    size: 158,
    retention30: 94, 
    retention90: 82, 
    retention180: 69, 
    retention_12m: 69,
    ltv: 152000,
    ltv_3m: 48000,
    ltv_6m: 82000,
    ltv_12m: 152000,
    ltv_24m: 205000
  },
  { 
    period: 'Q3 2024', 
    cohort: 'Q3 2024',
    size: 172,
    retention30: 89, 
    retention90: 75, 
    retention180: 62, 
    retention_12m: 62,
    ltv: 138000,
    ltv_3m: 42000,
    ltv_6m: 75000,
    ltv_12m: 138000,
    ltv_24m: 185000
  },
  { 
    period: 'Q4 2023', 
    cohort: 'Q4 2023',
    size: 134,
    retention30: 87, 
    retention90: 73, 
    retention180: 58, 
    retention_12m: 58,
    ltv: 132000,
    ltv_3m: 38000,
    ltv_6m: 71000,
    ltv_12m: 132000,
    ltv_24m: 178000
  }
];

export const clientRanking = [
  { 
    id: '1',
    client: 'TechCorp', 
    name: 'TechCorp',
    segment: 'Enterprise',
    ltv: 285000, 
    cac: 3200, 
    ratio: 89.1, 
    tier: 'Enterprise',
    nps: 85,
    churn_risk: 15,
    monthly_revenue: 12500
  },
  { 
    id: '2',
    client: 'StartupX', 
    name: 'StartupX',
    segment: 'Growth',
    ltv: 142000, 
    cac: 2100, 
    ratio: 67.6, 
    tier: 'Growth',
    nps: 72,
    churn_risk: 25,
    monthly_revenue: 6800
  },
  { 
    id: '3',
    client: 'BusinessY', 
    name: 'BusinessY',
    segment: 'Standard',
    ltv: 98000, 
    cac: 1800, 
    ratio: 54.4, 
    tier: 'Standard',
    nps: 68,
    churn_risk: 35,
    monthly_revenue: 4200
  },
  { 
    id: '4',
    client: 'CompanyZ', 
    name: 'CompanyZ',
    segment: 'Basic',
    ltv: 76000, 
    cac: 1500, 
    ratio: 50.7, 
    tier: 'Basic',
    nps: 58,
    churn_risk: 45,
    monthly_revenue: 2800
  }
];

export const segmentData = [
  { 
    segment: 'Enterprise', 
    ltv: 285000, 
    cac: 3500, 
    ratio: 81.4,
    customers: 45, 
    clients: 45,
    revenue: 2800000,
    avgContract: 62222,
    churnRate: 2.1,
    payback: 8
  },
  { 
    segment: 'Growth', 
    ltv: 165000, 
    cac: 2800, 
    ratio: 58.9,
    customers: 128, 
    clients: 128,
    revenue: 1950000,
    avgContract: 15234,
    churnRate: 3.5,
    payback: 12
  },
  { 
    segment: 'Standard', 
    ltv: 98000, 
    cac: 2200, 
    ratio: 44.5,
    customers: 256, 
    clients: 256,
    revenue: 1420000,
    avgContract: 5547,
    churnRate: 5.2,
    payback: 16
  },
  { 
    segment: 'Basic', 
    ltv: 62000, 
    cac: 1800, 
    ratio: 34.4,
    customers: 389, 
    clients: 389,
    revenue: 890000,
    avgContract: 2288,
    churnRate: 7.8,
    payback: 22
  }
];
