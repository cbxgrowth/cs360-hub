
import { z } from 'zod';

// Schemas de validação
export const clientSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  company: z.string().optional(),
  mrr: z.number().min(0, 'MRR não pode ser negativo').optional(),
  ltv: z.number().min(0, 'LTV não pode ser negativo').optional(),
  cac: z.number().min(0, 'CAC não pode ser negativo').optional(),
  health_score: z.number().min(0).max(100, 'Health Score deve estar entre 0 e 100').optional(),
});

export const contractSchema = z.object({
  contract_number: z.string().min(1, 'Número do contrato é obrigatório'),
  client_id: z.string().uuid('ID do cliente inválido'),
  value: z.number().min(0, 'Valor não pode ser negativo'),
  start_date: z.string().min(1, 'Data de início é obrigatória'),
  end_date: z.string().min(1, 'Data de fim é obrigatória'),
  status: z.enum(['active', 'inactive', 'pending', 'cancelled']).optional(),
  renewal_status: z.enum(['pending', 'confirmed', 'rejected']).optional(),
});

export const goalSchema = z.object({
  title: z.string().min(2, 'Título deve ter pelo menos 2 caracteres'),
  description: z.string().optional(),
  category: z.string().min(1, 'Categoria é obrigatória'),
  target: z.number().min(0, 'Meta deve ser maior que 0'),
  unit: z.string().min(1, 'Unidade é obrigatória'),
  deadline: z.string().min(1, 'Prazo é obrigatório'),
  priority: z.enum(['low', 'medium', 'high']).optional(),
});

// Funções de validação
export const validateClient = (data: any) => {
  try {
    return { success: true, data: clientSchema.parse(data), errors: [] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        data: null, 
        errors: error.errors.map(e => `${e.path.join('.')}: ${e.message}`)
      };
    }
    return { success: false, data: null, errors: ['Erro de validação desconhecido'] };
  }
};

export const validateContract = (data: any) => {
  try {
    return { success: true, data: contractSchema.parse(data), errors: [] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        data: null, 
        errors: error.errors.map(e => `${e.path.join('.')}: ${e.message}`)
      };
    }
    return { success: false, data: null, errors: ['Erro de validação desconhecido'] };
  }
};

export const validateGoal = (data: any) => {
  try {
    return { success: true, data: goalSchema.parse(data), errors: [] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        data: null, 
        errors: error.errors.map(e => `${e.path.join('.')}: ${e.message}`)
      };
    }
    return { success: false, data: null, errors: ['Erro de validação desconhecido'] };
  }
};
