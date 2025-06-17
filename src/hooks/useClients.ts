
import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clientsService, ClientSearchFilters } from '@/services/clientsService';
import { useAuth } from './useAuth';
import { useToast } from '@/hooks/use-toast';
import type { DatabaseClient } from '@/types/database';
import { ONBOARDING_CONSTANTS } from '@/utils/constants/onboarding';

export interface Client {
  id: string;
  user_id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  company?: string;
  phone?: string;
  tier?: 'A' | 'B' | 'C';
  status?: 'Ativo' | 'Risco' | 'Inativo';
  mrr?: number;
  ltv?: number;
  cac?: number;
  risk_score?: number;
  health_score?: number;
  nps_score?: number;
  nps_category?: 'Promotor' | 'Passivo' | 'Detrator';
  last_interaction?: string;
  acquisition_channel?: string;
  acquisition_date?: string;
  responsible_cs?: string;
  industry?: string;
  company_size?: string;
  notes?: string;
  nps?: number;
  contractEnd?: string;
  services?: string[];
  trust?: number;
}

export const useClients = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchFilters, setSearchFilters] = useState<ClientSearchFilters>({});

  // Fetch all clients
  const {
    data: clients = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['clients', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      try {
        const { data, error } = await clientsService.findAll(user.id);
        if (error) throw new Error(error);
        return data || [];
      } catch (err) {
        console.error('Error fetching clients:', err);
        return [];
      }
    },
    enabled: !!user?.id,
    staleTime: ONBOARDING_CONSTANTS.CACHE_TTL.CLIENTS_LIST,
    gcTime: ONBOARDING_CONSTANTS.CACHE_TTL.CLIENT_METRICS
  });

  // Search clients
  const {
    data: searchResults = [],
    isLoading: isSearching
  } = useQuery({
    queryKey: ['clients-search', user?.id, searchFilters],
    queryFn: async () => {
      if (!user?.id) return [];
      
      try {
        const { data, error } = await clientsService.searchClients(user.id, searchFilters);
        if (error) throw new Error(error);
        return data || [];
      } catch (err) {
        console.error('Error searching clients:', err);
        return [];
      }
    },
    enabled: !!user?.id && Object.keys(searchFilters).length > 0,
    staleTime: ONBOARDING_CONSTANTS.CACHE_TTL.CLIENTS_SEARCH
  });

  // Client metrics
  const {
    data: metrics,
    isLoading: isLoadingMetrics
  } = useQuery({
    queryKey: ['client-metrics', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      try {
        const { data, error } = await clientsService.getClientMetrics(user.id);
        if (error) throw new Error(error);
        return data;
      } catch (err) {
        console.error('Error fetching client metrics:', err);
        return null;
      }
    },
    enabled: !!user?.id,
    staleTime: ONBOARDING_CONSTANTS.CACHE_TTL.CLIENT_METRICS
  });

  // Create client mutation
  const createClientMutation = useMutation({
    mutationFn: async (clientData: Omit<Client, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const validation = clientsService.validateClientData(clientData);
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }

      try {
        const { data, error } = await clientsService.create({
          ...clientData,
          user_id: user.id
        } as any);
        
        if (error) throw new Error(error);
        return data;
      } catch (err) {
        console.error('Error creating client:', err);
        throw err;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['client-metrics'] });
      toast({
        title: "Sucesso",
        description: "Cliente criado com sucesso",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Update client mutation
  const updateClientMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Client> }) => {
      const validation = clientsService.validateClientData(updates);
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }

      try {
        const { data, error } = await clientsService.update(id, updates);
        if (error) throw new Error(error);
        return data;
      } catch (err) {
        console.error('Error updating client:', err);
        throw err;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['client-metrics'] });
      toast({
        title: "Sucesso",
        description: "Cliente atualizado com sucesso",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Delete client mutation
  const deleteClientMutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        const { error } = await clientsService.delete(id);
        if (error) throw new Error(error);
      } catch (err) {
        console.error('Error deleting client:', err);
        throw err;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['client-metrics'] });
      toast({
        title: "Sucesso",
        description: "Cliente removido com sucesso",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Bulk update mutation
  const bulkUpdateMutation = useMutation({
    mutationFn: async ({ ids, updates }: { ids: string[]; updates: Partial<Client> }) => {
      try {
        const { data, error } = await clientsService.bulkUpdate(ids, updates);
        if (error) throw new Error(error);
        return data;
      } catch (err) {
        console.error('Error bulk updating clients:', err);
        throw err;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['client-metrics'] });
      toast({
        title: "Sucesso",
        description: "Clientes atualizados com sucesso",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const searchClients = useCallback((filters: ClientSearchFilters) => {
    setSearchFilters(filters);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchFilters({});
  }, []);

  return {
    // Data
    clients: Object.keys(searchFilters).length > 0 ? searchResults : clients,
    metrics,
    
    // Loading states
    loading: isLoading || isSearching,
    isLoading: isLoading || isSearching,
    isLoadingMetrics,
    
    // Error state
    error,
    
    // Actions
    createClient: createClientMutation.mutate,
    updateClient: updateClientMutation.mutate,
    deleteClient: deleteClientMutation.mutate,
    bulkUpdate: bulkUpdateMutation.mutate,
    searchClients,
    clearSearch,
    refetch,
    
    // Legacy methods for backward compatibility
    bulkUpdateClients: bulkUpdateMutation.mutate,
    
    // Mutation states
    isCreating: createClientMutation.isPending,
    isUpdating: updateClientMutation.isPending,
    isDeleting: deleteClientMutation.isPending,
    isBulkUpdating: bulkUpdateMutation.isPending
  };
};
