
import React, { useState } from 'react';
import { ModelStatusCard } from './predictive/ModelStatusCard';
import { PredictionsChart } from './predictive/PredictionsChart';
import { ModelPerformanceChart } from './predictive/ModelPerformanceChart';
import { RiskAnalysisCard } from './predictive/RiskAnalysisCard';
import { AIRecommendationsCard } from './predictive/AIRecommendationsCard';

export const PredictiveTab: React.FC = () => {
  const [isTraining, setIsTraining] = useState(false);

  const handleRetrainModel = () => {
    setIsTraining(true);
    setTimeout(() => setIsTraining(false), 3000);
  };

  return (
    <div className="space-y-6">
      <ModelStatusCard 
        isTraining={isTraining}
        onRetrainModel={handleRetrainModel}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PredictionsChart />
        <ModelPerformanceChart />
      </div>

      <RiskAnalysisCard />

      <AIRecommendationsCard />
    </div>
  );
};
