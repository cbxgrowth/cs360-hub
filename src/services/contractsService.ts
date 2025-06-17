
import { BaseService } from './api/baseService';

export interface ContractMetrics {
  totalContracts: number;
  activeContracts: number;
  totalValue: number;
  averageValue: number;
  expiringContracts: number;
  renewalRate: number;
}

class ContractsService extends BaseService<'contracts'> {
  constructor() {
    super('contracts');
  }

  async getContractMetrics(userId: string): Promise<{ data: ContractMetrics | null; error: string | null }> {
    try {
      const { data: contracts, error } = await this.findAll(userId);
      
      if (error || !contracts) {
        return { data: null, error: error || 'No contracts found' };
      }

      const now = new Date();
      const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());

      const metrics: ContractMetrics = {
        totalContracts: contracts.length,
        activeContracts: contracts.filter((c: any) => c.status === 'active').length,
        totalValue: contracts.reduce((sum: number, c: any) => sum + (c.value || 0), 0),
        averageValue: contracts.length > 0 
          ? contracts.reduce((sum: number, c: any) => sum + (c.value || 0), 0) / contracts.length
          : 0,
        expiringContracts: contracts.filter((c: any) => {
          const endDate = new Date(c.end_date);
          return endDate <= nextMonth && endDate >= now;
        }).length,
        renewalRate: contracts.length > 0 
          ? (contracts.filter((c: any) => c.renewal_status === 'renewed').length / contracts.length) * 100
          : 0
      };

      return { data: metrics, error: null };
    } catch (error: any) {
      console.error('Error calculating contract metrics:', error);
      return { data: null, error: error.message };
    }
  }

  async getExpiringContracts(userId: string, daysAhead: number = 30) {
    try {
      const { data: contracts, error } = await this.findAll(userId);
      
      if (error || !contracts) {
        return { data: null, error: error || 'No contracts found' };
      }

      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() + daysAhead);

      const expiringContracts = contracts.filter((contract: any) => {
        const endDate = new Date(contract.end_date);
        return endDate <= cutoffDate && endDate >= new Date();
      });

      return { data: expiringContracts, error: null };
    } catch (error: any) {
      console.error('Error fetching expiring contracts:', error);
      return { data: null, error: error.message };
    }
  }
}

export const contractsService = new ContractsService();
