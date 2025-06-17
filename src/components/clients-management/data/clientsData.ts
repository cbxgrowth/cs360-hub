
export const clientsData = [
  {
    id: 1,
    name: 'TechCorp LTDA',
    contact: 'Maria Silva',
    email: 'maria@techcorp.com',
    tier: 'A',
    profile: 'Arrojado',
    nps: 85,
    npsCategory: 'Promotor',
    ltv: 120000,
    ltvProjected: 150000,
    contractEnd: '2024-12-15',
    services: 5,
    trust: 3,
    status: 'Ativo',
    lastInteraction: '2024-01-15',
    riskScore: 15,
    opportunities: ['Upgrade Premium', 'Novo Módulo'],
    contracts: [
      { id: 'CT-2024-001', service: 'Premium', status: 'Ativo', value: 12000 },
      { id: 'CT-2024-045', service: 'Support Plus', status: 'Ativo', value: 3000 }
    ]
  },
  {
    id: 2,
    name: 'StartupX',
    contact: 'João Santos',
    email: 'joao@startupx.com',
    tier: 'B',
    profile: 'Moderado',
    nps: 45,
    npsCategory: 'Passivo',
    ltv: 45000,
    ltvProjected: 60000,
    contractEnd: '2024-08-20',
    services: 2,
    trust: 2,
    status: 'Ativo',
    lastInteraction: '2024-01-10',
    riskScore: 65,
    opportunities: ['Cross-sell'],
    contracts: [
      { id: 'CT-2024-012', service: 'Standard', status: 'Ativo', value: 6000 }
    ]
  },
  {
    id: 3,
    name: 'BigCorp S.A.',
    contact: 'Ana Costa',
    email: 'ana@bigcorp.com',
    tier: 'A',
    profile: 'Conservador',
    nps: 25,
    npsCategory: 'Detrator',
    ltv: 200000,
    ltvProjected: 180000,
    contractEnd: '2024-06-30',
    services: 8,
    trust: 1,
    status: 'Risco',
    lastInteraction: '2024-01-05',
    riskScore: 85,
    opportunities: ['Retenção urgente'],
    contracts: [
      { id: 'CT-2024-003', service: 'Enterprise', status: 'Risco', value: 25000 },
      { id: 'CT-2024-004', service: 'Premium Support', status: 'Ativo', value: 8000 }
    ]
  }
];

export const filterOptions = {
  tier: ['Todos', 'A', 'B', 'C'],
  profile: ['Todos', 'Arrojado', 'Moderado', 'Conservador'],
  npsCategory: ['Todos', 'Promotor', 'Passivo', 'Detrator'],
  status: ['Todos', 'Ativo', 'Risco', 'Inativo']
};
