
export interface SuperAdminStats {
  totalAccounts: number;
  activeAccounts: number;
  trialAccounts: number;
  totalRevenue: number;
  monthlyRevenue: number;
  totalUsers: number;
  activePartners: number;
  conversionRate: number;
  systemHealth: {
    uptime: number;
    responseTime: number;
    errorRate: number;
    activeConnections: number;
  };
}

export interface InternalUser {
  id: string;
  name: string;
  email: string;
  role: 'financeiro' | 'comercial' | 'cs' | 'cs_empresas' | 'cs_cliente_final' | 'consultor_vendas_colaborador';
  department: string;
  phone: string;
  status: 'active' | 'inactive';
  permissions: string[];
  createdAt: string;
  lastLogin?: string;
}

export interface SystemAlert {
  id: string;
  type: 'performance' | 'revenue' | 'security' | 'system';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  resolved: boolean;
  assignedTo?: string;
}

export interface SuperAdminContextType {
  stats: SuperAdminStats | null;
  internalUsers: InternalUser[];
  systemAlerts: SystemAlert[];
  isLoading: boolean;
  hasAccess: boolean;
  refreshStats: () => Promise<void>;
  addInternalUser: (user: Omit<InternalUser, 'id' | 'createdAt'>) => Promise<void>;
  updateInternalUser: (id: string, updates: Partial<InternalUser>) => Promise<void>;
  deleteInternalUser: (id: string) => Promise<void>;
  resolveAlert: (alertId: string) => Promise<void>;
}
