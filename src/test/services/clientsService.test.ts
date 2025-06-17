
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { clientsService } from '@/services/clientsService';

// Mock Supabase
const mockSupabase = {
  from: vi.fn(() => ({
    select: vi.fn(() => ({
      eq: vi.fn(() => ({
        order: vi.fn(() => Promise.resolve({ data: [], error: null }))
      }))
    })),
    insert: vi.fn(() => ({
      select: vi.fn(() => ({
        single: vi.fn(() => Promise.resolve({ data: {}, error: null }))
      }))
    })),
    update: vi.fn(() => ({
      eq: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({ data: {}, error: null }))
        }))
      }))
    })),
    delete: vi.fn(() => ({
      eq: vi.fn(() => Promise.resolve({ error: null }))
    }))
  }))
};

vi.mock('@/integrations/supabase/client', () => ({
  supabase: mockSupabase
}));

describe('ClientsService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('validateClientData', () => {
    it('should validate required fields', () => {
      const result = clientsService.validateClientData({});
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Nome é obrigatório');
      expect(result.errors).toContain('Email é obrigatório');
    });

    it('should validate email format', () => {
      const result = clientsService.validateClientData({
        name: 'Test Client',
        email: 'invalid-email'
      });
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Email inválido');
    });

    it('should validate numeric fields', () => {
      const result = clientsService.validateClientData({
        name: 'Test Client',
        email: 'test@example.com',
        mrr: -100,
        ltv: -500,
        cac: -50,
        health_score: 150
      });
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('MRR não pode ser negativo');
      expect(result.errors).toContain('LTV não pode ser negativo');
      expect(result.errors).toContain('CAC não pode ser negativo');
      expect(result.errors).toContain('Health Score deve estar entre 0 e 100');
    });

    it('should pass validation with valid data', () => {
      const result = clientsService.validateClientData({
        name: 'Test Client',
        email: 'test@example.com',
        mrr: 1000,
        ltv: 5000,
        cac: 200,
        health_score: 85
      });
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('getClientMetrics', () => {
    it('should calculate metrics correctly', async () => {
      const mockClients = [
        { status: 'Ativo', mrr: 1000, health_score: 80 },
        { status: 'Ativo', mrr: 1500, health_score: 90 },
        { status: 'Risco', mrr: 500, health_score: 40 },
        { status: 'Inativo', mrr: 0, health_score: 20 }
      ];

      mockSupabase.from.mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            order: vi.fn(() => Promise.resolve({ data: mockClients, error: null }))
          }))
        })),
        insert: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn(() => Promise.resolve({ data: {}, error: null }))
          }))
        })),
        update: vi.fn(() => ({
          eq: vi.fn(() => ({
            select: vi.fn(() => ({
              single: vi.fn(() => Promise.resolve({ data: {}, error: null }))
            }))
          }))
        })),
        delete: vi.fn(() => ({
          eq: vi.fn(() => Promise.resolve({ error: null }))
        }))
      });

      const result = await clientsService.getClientMetrics('user-id');
      
      expect(result.data).toEqual({
        totalClients: 4,
        activeClients: 2,
        totalMrr: 3000,
        averageHealthScore: 58, // (80+90+40+20)/4 = 57.5, rounded to 58
        riskClients: 1,
        churnRate: 25 // 1 inactive out of 4 total = 25%
      });
    });
  });
});
