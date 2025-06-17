
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface UpsellOpportunity {
  id: string;
  service: string;
  clientId: string;
  clientName: string;
  potential: number;
  converted: number;
  rate: number;
  status: 'active' | 'paused' | 'completed';
  priority: 'high' | 'medium' | 'low';
  estimatedRevenue: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpsellCampaign {
  id: string;
  name: string;
  serviceId: string;
  targetAudience: string[];
  status: 'draft' | 'active' | 'paused' | 'completed';
  startDate: Date;
  endDate: Date;
  budget: number;
  spent: number;
  conversions: number;
  roi: number;
}

export const useUpsellOpportunities = () => {
  const [opportunities, setOpportunities] = useState<UpsellOpportunity[]>([]);
  const [campaigns, setCampaigns] = useState<UpsellCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  // Mock data para demonstração
  const mockOpportunities: UpsellOpportunity[] = [
    {
      id: '1',
      service: 'Analytics Pro',
      clientId: 'client-1',
      clientName: 'TechCorp Ltda',
      potential: 89,
      converted: 67,
      rate: 75.3,
      status: 'active',
      priority: 'high',
      estimatedRevenue: 15000,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: '2',
      service: 'Premium Upgrade',
      clientId: 'client-2',
      clientName: 'InnovaSoft',
      potential: 156,
      converted: 23,
      rate: 14.7,
      status: 'active',
      priority: 'medium',
      estimatedRevenue: 28000,
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-18')
    },
    {
      id: '3',
      service: 'Support Plus',
      clientId: 'client-3',
      clientName: 'DataSolutions',
      potential: 245,
      converted: 56,
      rate: 22.9,
      status: 'active',
      priority: 'high',
      estimatedRevenue: 42000,
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-25')
    },
    {
      id: '4',
      service: 'Custom Training',
      clientId: 'client-4',
      clientName: 'FinanceHub',
      potential: 89,
      converted: 12,
      rate: 13.5,
      status: 'paused',
      priority: 'low',
      estimatedRevenue: 8500,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-15')
    }
  ];

  const mockCampaigns: UpsellCampaign[] = [
    {
      id: '1',
      name: 'Analytics Pro Q1 2024',
      serviceId: '1',
      targetAudience: ['enterprise', 'growing'],
      status: 'active',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-03-31'),
      budget: 50000,
      spent: 23500,
      conversions: 15,
      roi: 180
    },
    {
      id: '2',
      name: 'Premium Upgrade Campaign',
      serviceId: '2',
      targetAudience: ['starter', 'professional'],
      status: 'active',
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-04-30'),
      budget: 35000,
      spent: 18200,
      conversions: 8,
      roi: 145
    }
  ];

  const fetchOpportunities = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      // Em produção, buscar do Supabase
      // const { data, error } = await supabase
      //   .from('upsell_opportunities')
      //   .select('*')
      //   .eq('user_id', user.id);
      
      // Por enquanto, usar dados mock
      setTimeout(() => {
        setOpportunities(mockOpportunities);
        setCampaigns(mockCampaigns);
        setLoading(false);
      }, 500);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const createCampaign = async (opportunityId: string, campaignData: Partial<UpsellCampaign>) => {
    try {
      const opportunity = opportunities.find(o => o.id === opportunityId);
      if (!opportunity) throw new Error('Oportunidade não encontrada');

      const newCampaign: UpsellCampaign = {
        id: Date.now().toString(),
        name: `Campanha ${opportunity.service}`,
        serviceId: opportunityId,
        targetAudience: ['all'],
        status: 'draft',
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
        budget: 10000,
        spent: 0,
        conversions: 0,
        roi: 0,
        ...campaignData
      };

      setCampaigns(prev => [...prev, newCampaign]);

      toast({
        title: "Campanha Criada",
        description: `Campanha para ${opportunity.service} foi criada com sucesso`,
      });

      return { data: newCampaign, error: null };
    } catch (err: any) {
      toast({
        title: "Erro",
        description: err.message,
        variant: "destructive",
      });
      return { data: null, error: err.message };
    }
  };

  const updateOpportunityStatus = async (id: string, status: UpsellOpportunity['status']) => {
    try {
      setOpportunities(prev => 
        prev.map(opp => 
          opp.id === id 
            ? { ...opp, status, updatedAt: new Date() }
            : opp
        )
      );

      toast({
        title: "Status Atualizado",
        description: "Status da oportunidade foi atualizado com sucesso",
      });

      return { error: null };
    } catch (err: any) {
      toast({
        title: "Erro",
        description: err.message,
        variant: "destructive",
      });
      return { error: err.message };
    }
  };

  const updateCampaignStatus = async (id: string, status: UpsellCampaign['status']) => {
    try {
      setCampaigns(prev => 
        prev.map(campaign => 
          campaign.id === id 
            ? { ...campaign, status }
            : campaign
        )
      );

      toast({
        title: "Campanha Atualizada",
        description: "Status da campanha foi atualizado com sucesso",
      });

      return { error: null };
    } catch (err: any) {
      toast({
        title: "Erro",
        description: err.message,
        variant: "destructive",
      });
      return { error: err.message };
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, [user]);

  return {
    opportunities,
    campaigns,
    loading,
    error,
    createCampaign,
    updateOpportunityStatus,
    updateCampaignStatus,
    refetch: fetchOpportunities
  };
};
