
import type { Client } from '@/hooks/useClients';

export interface DisplayClient {
  id: number;
  name: string;
  email: string;
  contact?: string;
  phone?: string;
  tier: 'A' | 'B' | 'C';
  status: 'Ativo' | 'Risco' | 'Inativo';
  ltv: number;
  ltvProjected: number;
  cac?: number;
  riskScore: number;
  npsScore: number | null;
  npsCategory?: 'Promotor' | 'Passivo' | 'Detrator';
  lastInteraction?: string;
  notes?: string;
}

export const convertToDisplayClient = (client: Client): DisplayClient => {
  // Generate a consistent numeric ID from the UUID for display purposes
  const numericId = parseInt(client.id.slice(0, 8), 16);
  
  return {
    id: numericId,
    name: client.name,
    email: client.email,
    contact: client.company,
    phone: client.phone,
    tier: client.tier || 'B',
    status: client.status || 'Ativo',
    ltv: client.mrr || 0,
    ltvProjected: client.ltv || 0,
    cac: client.cac,
    riskScore: client.risk_score || 0,
    npsScore: client.nps_score,
    npsCategory: client.nps_category,
    lastInteraction: client.last_interaction ? new Date(client.last_interaction).toLocaleDateString('pt-BR') : undefined,
    notes: client.notes
  };
};
