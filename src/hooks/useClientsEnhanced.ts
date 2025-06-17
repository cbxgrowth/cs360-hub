
import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clientsService, ClientSearchFilters } from '@/services/clientsService';
import { useAuth } from './useAuth';
import { useNotifications } from './useNotifications';
import { validateClient } from '@/utils/validation';
import { logger } from '@/utils/logger';
import type { Client } from './useClients';

export const useClientsEnhanced = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotifications();
  const queryClient = useQueryClient();
  const [searchFilters, setSearchFilters] = useState<ClientSearchFilters>({});

  // Fetch all clients with enhanced error handling
  const {
    data: clients = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['clients', user?.id],
    queryFn: async () => {
      if (!user?.id) {
        logger.warn('Tentativa de buscar clientes sem usuário autenticado');
        return [];
      }
      
      try {
        logger.debug('Buscando clientes', { userId: user.id });
        const { data, error } = await clientsService.findAll(user.id);
        
        if (error) {
          logger.error('Erro ao buscar clientes', { error, userId: user.id });
          throw new Error(error);
        }
        
        logger.info(`${data?.length || 0} clientes carregados com sucesso`);
        return data || [];
      } catch (err) {
        logger.error('Erro na query de clientes', { error: err, userId: user.id });
        throw err;
      }
    },
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    retry: (failureCount, error) => {
      if (failureCount < 3) {
        logger.warn(`Tentativa ${failureCount + 1} de buscar clientes`, { error });
        return true;
      }
      return false;
    }
  });

  // Create client mutation with validation
  const createClientMutation = useMutation({
    mutationFn: async (clientData: Omit<Client, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
      if (!user?.id) throw new Error('Usuário não autenticado');
      
      // Validar dados antes de enviar
      const validation = validateClient(clientData);
      if (!validation.success) {
        const errorMessage = validation.errors.join(', ');
        logger.warn('Dados do cliente inválidos', { errors: validation.errors });
        throw new Error(errorMessage);
      }

      logger.info('Criando novo cliente', { clientName: clientData.name });
      const { data, error } = await clientsService.create({
        ...validation.data,
        user_id: user.id
      } as any);
      
      if (error) {
        logger.error('Erro ao criar cliente', { error, clientData });
        throw new Error(error);
      }
      
      logger.info('Cliente criado com sucesso', { clientId: data?.id });
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['client-metrics'] });
      showSuccess({
        title: "Cliente criado com sucesso",
        description: `${data?.name} foi adicionado à sua base de clientes.`
      });
    },
    onError: (error: Error) => {
      logger.error('Falha ao criar cliente', error);
      showError({
        title: "Erro ao criar cliente",
        description: error.message || "Ocorreu um erro inesperado. Tente novamente."
      });
    }
  });

  // Update client mutation with validation
  const updateClientMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Client> }) => {
      const validation = validateClient(updates);
      if (!validation.success) {
        const errorMessage = validation.errors.join(', ');
        logger.warn('Dados de atualização inválidos', { errors: validation.errors, clientId: id });
        throw new Error(errorMessage);
      }

      logger.info('Atualizando cliente', { clientId: id });
      const { data, error } = await clientsService.update(id, validation.data);
      
      if (error) {
        logger.error('Erro ao atualizar cliente', { error, clientId: id });
        throw new Error(error);
      }
      
      logger.info('Cliente atualizado com sucesso', { clientId: id });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['client-metrics'] });
      showSuccess({
        title: "Cliente atualizado",
        description: "As informações do cliente foram atualizadas com sucesso."
      });
    },
    onError: (error: Error) => {
      logger.error('Falha ao atualizar cliente', error);
      showError({
        title: "Erro ao atualizar cliente",
        description: error.message || "Não foi possível atualizar o cliente. Tente novamente."
      });
    }
  });

  // Delete client mutation with confirmation
  const deleteClientMutation = useMutation({
    mutationFn: async (id: string) => {
      logger.info('Removendo cliente', { clientId: id });
      const { error } = await clientsService.delete(id);
      
      if (error) {
        logger.error('Erro ao remover cliente', { error, clientId: id });
        throw new Error(error);
      }
      
      logger.info('Cliente removido com sucesso', { clientId: id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['client-metrics'] });
      showSuccess({
        title: "Cliente removido",
        description: "O cliente foi removido da sua base de dados."
      });
    },
    onError: (error: Error) => {
      logger.error('Falha ao remover cliente', error);
      showError({
        title: "Erro ao remover cliente",
        description: error.message || "Não foi possível remover o cliente. Tente novamente."
      });
    }
  });

  const searchClients = useCallback((filters: ClientSearchFilters) => {
    logger.debug('Aplicando filtros de busca', filters);
    setSearchFilters(filters);
  }, []);

  const clearSearch = useCallback(() => {
    logger.debug('Limpando filtros de busca');
    setSearchFilters({});
  }, []);

  return {
    // Data
    clients,
    isLoading,
    error,
    
    // Actions
    createClient: createClientMutation.mutate,
    updateClient: updateClientMutation.mutate,
    deleteClient: deleteClientMutation.mutate,
    searchClients,
    clearSearch,
    refetch,
    
    // States
    isCreating: createClientMutation.isPending,
    isUpdating: updateClientMutation.isPending,
    isDeleting: deleteClientMutation.isPending,
  };
};
