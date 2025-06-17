
import { supabase } from '@/integrations/supabase/client';
import { BaseService } from './api/baseService';

// Use the database schema type directly instead of the hook type
type DatabaseClient = {
  id: string;
  user_id: string;
  name: string;
  email?: string;
  company?: string;
  phone?: string;
  plan?: string;
  tier?: string;
  status?: string;
  health_score?: number;
  mrr?: number;
  ltv?: number;
  cac?: number;
  contract_start?: string;
  contract_end?: string;
  risk_score?: number;
  engagement_score?: number;
  satisfaction_score?: number;
  churn_probability?: number;
  trust?: number;
  last_interaction?: string;
  segment?: string;
  acquisition_channel?: string;
  billing_status?: string;
  support_tickets?: number;
  last_login?: string;
  feature_adoption?: number;
  created_at?: string;
  updated_at?: string;
  notes?: string;
};

export interface ClientSearchFilters {
  query?: string;
  tier?: string[];
  status?: string[];
  npsCategory?: string[];
  minMrr?: number;
  maxMrr?: number;
}

class ClientsService extends BaseService<'clients'> {
  constructor() {
    super('clients');
  }

  async searchClients(userId: string, filters: ClientSearchFilters) {
    try {
      let query = supabase
        .from('clients')
        .select('*')
        .eq('user_id', userId);

      // Apply search filters
      if (filters.query) {
        query = query.or(`name.ilike.%${filters.query}%,email.ilike.%${filters.query}%,company.ilike.%${filters.query}%`);
      }

      if (filters.tier && filters.tier.length > 0) {
        query = query.in('tier', filters.tier);
      }

      if (filters.status && filters.status.length > 0) {
        query = query.in('status', filters.status);
      }

      if (filters.minMrr !== undefined) {
        query = query.gte('mrr', filters.minMrr);
      }

      if (filters.maxMrr !== undefined) {
        query = query.lte('mrr', filters.maxMrr);
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return { data: data as DatabaseClient[], error: null };
    } catch (error: any) {
      console.error('Error searching clients:', error);
      return { data: null, error: error.message };
    }
  }

  async getClientMetrics(userId: string) {
    try {
      const { data: clients, error } = await this.findAll(userId);
      
      if (error || !clients) {
        return { data: null, error: error || 'No clients found' };
      }

      const metrics = {
        totalClients: clients.length,
        activeClients: clients.filter((c: any) => c.status === 'Ativo').length,
        totalMrr: clients.reduce((sum: number, c: any) => sum + (c.mrr || 0), 0),
        averageHealthScore: clients.length > 0 
          ? Math.round(clients.reduce((sum: number, c: any) => sum + (c.health_score || 0), 0) / clients.length)
          : 0,
        riskClients: clients.filter((c: any) => c.status === 'Risco').length,
        churnRate: clients.length > 0 
          ? (clients.filter((c: any) => c.status === 'Inativo').length / clients.length) * 100
          : 0
      };

      return { data: metrics, error: null };
    } catch (error: any) {
      console.error('Error calculating client metrics:', error);
      return { data: null, error: error.message };
    }
  }

  validateClientData(clientData: Partial<DatabaseClient>) {
    const errors: string[] = [];

    if (!clientData.name?.trim()) {
      errors.push('Nome é obrigatório');
    }

    if (!clientData.email?.trim()) {
      errors.push('Email é obrigatório');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientData.email)) {
      errors.push('Email inválido');
    }

    if (clientData.mrr !== undefined && clientData.mrr < 0) {
      errors.push('MRR não pode ser negativo');
    }

    if (clientData.ltv !== undefined && clientData.ltv < 0) {
      errors.push('LTV não pode ser negativo');
    }

    if (clientData.cac !== undefined && clientData.cac < 0) {
      errors.push('CAC não pode ser negativo');
    }

    if (clientData.health_score !== undefined && (clientData.health_score < 0 || clientData.health_score > 100)) {
      errors.push('Health Score deve estar entre 0 e 100');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export const clientsService = new ClientsService();
