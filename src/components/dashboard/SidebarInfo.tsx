
import React from 'react';
import { AIRecommendationsPanel } from './AIRecommendationsPanel';
import { RequestsPanel } from './RequestsPanel';
import { QuestionsPanel } from './QuestionsPanel';

export const SidebarInfo = () => {
  return (
    <div className="space-y-6">
      {/* Recomendações de IA */}
      <AIRecommendationsPanel />
      
      {/* Solicitações */}
      <RequestsPanel />
      
      {/* Dúvidas e Perguntas */}
      <QuestionsPanel />
    </div>
  );
};
