
import { useState, useCallback } from 'react';
import { useToast } from './use-toast';
import { useAuth } from './useAuth';
import { getAICreditsLimit, canUseAI, isPartner } from '@/utils/userPermissions';

export interface AICreditsState {
  credits: number;
  limit: number;
  isLoading: boolean;
  error: string | null;
}

export const useAICredits = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  
  const creditsLimit = getAICreditsLimit(profile);
  const [credits, setCredits] = useState(profile?.ai_credits || 0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const consumeCredits = useCallback(async (amount: number, action: string) => {
    // Para parceiros, verificar se confirmou primeira venda
    if (isPartner(profile) && !profile?.first_sale_confirmed) {
      toast({
        title: "Acesso Negado",
        description: "Parceiros precisam confirmar a primeira venda para acessar recursos de IA.",
        variant: "destructive",
      });
      return false;
    }

    if (!canUseAI(profile)) {
      toast({
        title: "Créditos Insuficientes",
        description: `Você precisa de ${amount} créditos para usar ${action}. Restam: ${credits}`,
        variant: "destructive",
      });
      return false;
    }

    if (creditsLimit !== -1 && credits < amount) {
      toast({
        title: "Créditos Insuficientes",
        description: `Você precisa de ${amount} créditos para usar ${action}. Restam: ${credits}`,
        variant: "destructive",
      });
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simular consumo de créditos (aqui você faria a chamada real para a API)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (creditsLimit !== -1) {
        setCredits(prev => prev - amount);
      }
      
      const partnerNote = isPartner(profile) ? ' (Conta Parceiro)' : '';
      
      toast({
        title: "IA Processada",
        description: `${action} executada com sucesso${partnerNote}. ${creditsLimit === -1 ? 'Créditos ilimitados' : `${amount} créditos consumidos`}.`,
      });

      return true;
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Erro",
        description: `Falha ao processar ${action}: ${err.message}`,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [credits, creditsLimit, profile, toast]);

  const purchaseCredits = useCallback((amount: number) => {
    const partnerNote = isPartner(profile) ? '\n\nParceiros compram créditos normalmente como outras contas.' : '';
    
    toast({
      title: "Compra de Créditos",
      description: `Para comprar ${amount} créditos adicionais, acesse sua conta e vá para Billing.${partnerNote}`,
    });
  }, [toast, profile]);

  const getCreditsStatus = useCallback(() => {
    if (creditsLimit === -1) {
      return {
        status: 'unlimited',
        message: 'Créditos Ilimitados',
        color: 'text-green-600'
      };
    } else if (credits > creditsLimit * 0.5) {
      return {
        status: 'good',
        message: `${credits}/${creditsLimit} créditos`,
        color: 'text-green-600'
      };
    } else if (credits > creditsLimit * 0.2) {
      return {
        status: 'warning',
        message: `${credits}/${creditsLimit} créditos`,
        color: 'text-yellow-600'
      };
    } else {
      return {
        status: 'low',
        message: `${credits}/${creditsLimit} créditos`,
        color: 'text-red-600'
      };
    }
  }, [credits, creditsLimit]);

  return {
    credits,
    limit: creditsLimit,
    isLoading,
    error,
    consumeCredits,
    purchaseCredits,
    getCreditsStatus,
    canUseAI: canUseAI(profile),
    isUnlimited: creditsLimit === -1,
    isPartner: isPartner(profile),
    needsFirstSale: isPartner(profile) && !profile?.first_sale_confirmed
  };
};
