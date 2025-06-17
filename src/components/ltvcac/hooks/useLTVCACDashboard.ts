
import { useState } from 'react';
import { useAICredits } from '@/hooks/useAICredits';
import type { LTVCACInsight } from '@/hooks/useLTVCAC';
import { useToast } from '@/hooks/use-toast';

export const useLTVCACDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showFilters, setShowFilters] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const { consumeCredits } = useAICredits();
  const { toast } = useToast();

  const handleOptimizeCAC = async (channel: string) => {
    const success = await consumeCredits(10, `Otimizar CAC para o canal ${channel}`);
    if (success) {
      console.log('Otimizando CAC para canal:', channel);
      toast({
        title: 'Otimização IA iniciada',
        description: `Sugestões para ${channel} foram geradas. A implementação é manual.`,
      });
    }
  };

  const handleModelChange = (modelId: string) => {
    console.log('Alterando modelo LTV:', modelId);
  };

  const handleInsightAction = async (insight: LTVCACInsight) => {
    const success = await consumeCredits(5, `Analisar ação: ${insight.action}`);
    if (success) {
      console.log('Executando ação do insight:', insight);
      toast({
          title: 'Ação sugerida enviada para análise',
          description: `A ação "${insight.action}" está sendo processada.`,
      });
    }
  };
  
  const handleRecommendationAction = async (description: string, credits: number) => {
    await consumeCredits(credits, description);
  };

  const handleRefreshData = () => {
    console.log('Atualizando dados LTV/CAC...');
  };

  const handleImportData = () => {
    console.log('Importando dados...');
  };

  return {
    activeTab,
    setActiveTab,
    showFilters,
    setShowFilters,
    showConfigModal,
    setShowConfigModal,
    handleOptimizeCAC,
    handleModelChange,
    handleInsightAction,
    handleRefreshData,
    handleImportData,
    handleRecommendationAction,
  };
};
