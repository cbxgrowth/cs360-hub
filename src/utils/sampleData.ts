
import { Client } from '@/hooks/useClients';
import { DatabaseContract } from '@/types/database';

export const sampleClients: Omit<Client, 'id' | 'user_id' | 'created_at' | 'updated_at'>[] = [
  {
    name: 'TechCorp Solutions',
    email: 'contact@techcorp.com',
    company: 'TechCorp Solutions',
    phone: '+55 11 99999-1234',
    tier: 'A',
    status: 'Ativo',
    mrr: 12500,
    ltv: 150000,
    cac: 2500,
    health_score: 92,
    nps_score: 8,
    nps_category: 'Promotor',
    last_interaction: '2024-06-15',
    acquisition_channel: 'Indicação',
    acquisition_date: '2023-01-15',
    responsible_cs: 'João Silva',
    industry: 'Tecnologia',
    company_size: 'Média',
    notes: 'Cliente estratégico com potencial de expansão',
    trust: 95,
    contractEnd: '2024-12-31',
    services: ['Consultoria', 'Suporte Premium']
  },
  {
    name: 'Inovação Digital',
    email: 'contato@inovacaodigital.com',
    company: 'Inovação Digital Ltda',
    phone: '+55 11 88888-5678',
    tier: 'B',
    status: 'Ativo',
    mrr: 8500,
    ltv: 85000,
    cac: 1800,
    health_score: 78,
    nps_score: 7,
    nps_category: 'Passivo',
    last_interaction: '2024-06-14',
    acquisition_channel: 'Marketing Digital',
    acquisition_date: '2023-05-20',
    responsible_cs: 'Maria Santos',
    industry: 'Marketing',
    company_size: 'Pequena',
    notes: 'Necessita mais atenção no onboarding',
    trust: 82,
    contractEnd: '2024-10-15',
    services: ['Plataforma Básica', 'Treinamento']
  },
  {
    name: 'Global Finance Corp',
    email: 'admin@globalfinance.com',
    company: 'Global Finance Corp',
    phone: '+55 11 77777-9012',
    tier: 'A',
    status: 'Risco',
    mrr: 15000,
    ltv: 120000,
    cac: 3200,
    health_score: 65,
    nps_score: 5,
    nps_category: 'Detrator',
    last_interaction: '2024-06-10',
    acquisition_channel: 'Vendas Diretas',
    acquisition_date: '2022-11-30',
    responsible_cs: 'Carlos Oliveira',
    industry: 'Financeiro',
    company_size: 'Grande',
    notes: 'Cliente em risco - necessita ação imediata',
    trust: 58,
    contractEnd: '2024-08-30',
    services: ['Enterprise Suite', 'Suporte 24/7']
  }
];

export const sampleContracts = [
  {
    contract_number: 'CONT-2024-001',
    value: 150000,
    start_date: '2024-01-01',
    end_date: '2024-12-31',
    status: 'active',
    renewal_status: 'pending',
    services: ['Consultoria Estratégica', 'Suporte Premium', 'Treinamento']
  },
  {
    contract_number: 'CONT-2024-002',
    value: 85000,
    start_date: '2024-03-01',
    end_date: '2024-12-31',
    status: 'active',
    renewal_status: 'confirmed',
    services: ['Plataforma SaaS', 'Suporte Básico']
  }
];

export const createSampleData = async (userId: string) => {
  // Esta função será chamada para popular dados de exemplo
  return {
    clients: sampleClients.map(client => ({ ...client, user_id: userId })),
    contracts: sampleContracts.map(contract => ({ ...contract, user_id: userId }))
  };
};
