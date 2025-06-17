
import React, { useState } from 'react';
import { ModelSelector } from './ltv-modeling/ModelSelector';
import { ParametersConfiguration } from './ltv-modeling/ParametersConfiguration';
import { ScenarioAnalysis } from './ltv-modeling/ScenarioAnalysis';
import { AdvancedFeatures } from './ltv-modeling/AdvancedFeatures';

interface LTVModelingTabProps {
  onModelChange: (modelId: string) => void;
}

const ltvModels = [
  {
    id: 'traditional',
    name: 'Modelo Tradicional',
    description: 'Baseado em ARPU e churn histórico',
    accuracy: 75,
    complexity: 'Baixa',
    formula: 'ARPU / Churn Rate',
    active: true
  },
  {
    id: 'cohort',
    name: 'Análise de Coorte',
    description: 'Segmentação por período de aquisição',
    accuracy: 85,
    complexity: 'Média',
    formula: 'Média ponderada por coorte',
    active: false
  },
  {
    id: 'predictive',
    name: 'IA Preditivo',
    description: 'Machine Learning com 50+ variáveis',
    accuracy: 92,
    complexity: 'Alta',
    formula: 'Ensemble ML Models',
    active: false
  }
];

export const LTVModelingTab: React.FC<LTVModelingTabProps> = ({ onModelChange }) => {
  const [selectedModel, setSelectedModel] = useState('traditional');
  const [parameters, setParameters] = useState({
    arpu: 850,
    churnRate: 3.2,
    discountRate: 10,
    growthRate: 2.5,
    includeUpsell: true,
    includeExpansion: true,
    timeHorizon: 24
  });

  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId);
    onModelChange(modelId);
  };

  const calculateLTV = () => {
    const { arpu, churnRate, discountRate, growthRate } = parameters;
    const monthlyChurn = churnRate / 100 / 12;
    const monthlyDiscount = discountRate / 100 / 12;
    const monthlyGrowth = growthRate / 100 / 12;
    
    return arpu * (1 + monthlyGrowth) / (monthlyChurn + monthlyDiscount);
  };

  return (
    <div className="space-y-6">
      <ModelSelector
        models={ltvModels}
        selectedModel={selectedModel}
        onModelSelect={handleModelSelect}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ParametersConfiguration
          parameters={parameters}
          onParametersChange={setParameters}
          calculatedLTV={calculateLTV()}
        />

        <ScenarioAnalysis />
      </div>

      <AdvancedFeatures />
    </div>
  );
};
