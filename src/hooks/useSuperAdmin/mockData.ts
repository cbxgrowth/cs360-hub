
import type { SuperAdminStats, InternalUser, SystemAlert } from './types';

export const mockStats: SuperAdminStats = {
  totalAccounts: 1247,
  activeAccounts: 1089,
  trialAccounts: 127,
  totalRevenue: 624350,
  monthlyRevenue: 47200,
  totalUsers: 8943,
  activePartners: 23,
  conversionRate: 15.7,
  systemHealth: {
    uptime: 99.98,
    responseTime: 245,
    errorRate: 0.02,
    activeConnections: 2341
  }
};

export const mockInternalUsers: InternalUser[] = [
  {
    id: '1',
    name: 'Ana Silva',
    email: 'ana.silva@cs360.com',
    role: 'financeiro',
    department: 'Financeiro',
    phone: '(11) 99999-1111',
    status: 'active',
    permissions: ['comissoes', 'notas_fiscais', 'pagamentos'],
    createdAt: '2024-01-15T10:00:00Z',
    lastLogin: '2024-01-20T14:30:00Z'
  },
  {
    id: '2',
    name: 'Carlos Santos',
    email: 'carlos.santos@cs360.com',
    role: 'comercial',
    department: 'Comercial',
    phone: '(11) 99999-2222',
    status: 'active',
    permissions: ['vendas', 'prospecção', 'negociação'],
    createdAt: '2024-01-10T09:00:00Z',
    lastLogin: '2024-01-20T09:15:00Z'
  }
];

export const mockAlerts: SystemAlert[] = [
  {
    id: '1',
    type: 'performance',
    severity: 'medium',
    title: 'Alta latência detectada',
    description: 'Servidor US-East apresentando latência acima de 500ms',
    timestamp: '2024-01-20T14:30:00Z',
    resolved: false,
    assignedTo: 'DevOps Team'
  },
  {
    id: '2',
    type: 'revenue',
    severity: 'high',
    title: 'Queda no MRR detectada',
    description: 'Redução de 3.2% no MRR nas últimas 24h',
    timestamp: '2024-01-20T12:15:00Z',
    resolved: false,
    assignedTo: 'Finance Team'
  }
];
