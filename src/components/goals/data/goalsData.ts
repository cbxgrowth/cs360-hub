
export const goalsProgressData = [
  { month: 'Jan', individual: 85, team: 78, company: 92 },
  { month: 'Fev', individual: 88, team: 82, company: 89 },
  { month: 'Mar', individual: 92, team: 85, company: 94 },
  { month: 'Abr', individual: 87, team: 88, company: 91 },
  { month: 'Mai', individual: 90, team: 91, company: 96 },
  { month: 'Jun', individual: 94, team: 89, company: 98 }
];

export const goalsCategoryData = [
  { name: 'Vendas', value: 35, color: '#10B981' },
  { name: 'CS', value: 30, color: '#3B82F6' },
  { name: 'Retenção', value: 20, color: '#8B5CF6' },
  { name: 'Upsell', value: 15, color: '#F59E0B' }
];

export const goalsProgressChartData = [
  { name: 'Aumentar NPS para 80+', progress: 75, color: '#10B981' },
  { name: 'Reduzir Churn para 2%', progress: 60, color: '#F59E0B' },
  { name: 'Atingir 150 novos clientes', progress: 82, color: '#3B82F6' },
  { name: 'Aumentar MRR em 25%', progress: 45, color: '#EF4444' },
  { name: 'Melhorar CSAT para 4.5', progress: 88, color: '#8B5CF6' },
  { name: 'Reduzir tempo resposta', progress: 70, color: '#06B6D4' }
];

export const topGoals = [
  {
    id: 1,
    title: 'Aumentar NPS para 80+',
    category: 'Customer Success',
    progress: 75,
    target: '80 pontos',
    current: '72 pontos',
    deadline: '30/06/2024',
    status: 'on-track',
    team: 'CS Team',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Reduzir Churn para 2%',
    category: 'Retenção',
    progress: 60,
    target: '2%',
    current: '3.2%',
    deadline: '31/07/2024',
    status: 'at-risk',
    team: 'CS Team',
    priority: 'critical'
  },
  {
    id: 3,
    title: 'Atingir 150 novos clientes',
    category: 'Vendas',
    progress: 82,
    target: '150 clientes',
    current: '123 clientes',
    deadline: '31/12/2024',
    status: 'on-track',
    team: 'Sales Team',
    priority: 'medium'
  },
  {
    id: 4,
    title: 'Aumentar MRR em 25%',
    category: 'Upsell',
    progress: 45,
    target: 'R$ 125.000',
    current: 'R$ 112.500',
    deadline: '30/09/2024',
    status: 'behind',
    team: 'Sales Team',
    priority: 'high'
  }
];
