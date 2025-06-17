import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { 
  BarChart3,
  TrendingUp,
  Calculator,
  Target,
  Brain
} from 'lucide-react';
import { OverviewTab } from '../tabs/OverviewTab';
import { CACAnalysisTab } from '../tabs/CACAnalysisTab';
import { LTVModelingTab } from '../tabs/LTVModelingTab';
import { PredictiveTab } from '../tabs/PredictiveTab';

interface LTVCACTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  currentLTV: number;
  currentCAC: number;
  ltvCacRatio: number;
  ltvChange: number;
  cacChange: number;
  onConfigureParameters: () => void;
  onOptimizeCAC: (channel: string) => void;
  onModelChange: (modelId: string) => void;
  onRecommendationAction: (description: string, credits: number) => void;
}

export const LTVCACTabs: React.FC<LTVCACTabsProps> = ({
  activeTab,
  onTabChange,
  currentLTV,
  currentCAC,
  ltvCacRatio,
  ltvChange,
  cacChange,
  onConfigureParameters,
  onOptimizeCAC,
  onModelChange,
  onRecommendationAction
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview" className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4" />
          Visão Geral
        </TabsTrigger>
        <TabsTrigger value="cac-analysis" className="flex items-center gap-2">
          <Target className="w-4 h-4" />
          Análise CAC
        </TabsTrigger>
        <TabsTrigger value="ltv-modeling" className="flex items-center gap-2">
          <Calculator className="w-4 h-4" />
          Modelagem LTV
        </TabsTrigger>
        <TabsTrigger value="predictive" className="flex items-center gap-2">
          <Brain className="w-4 h-4" />
          Preditivo IA
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <OverviewTab
          currentLTV={currentLTV}
          currentCAC={currentCAC}
          ltvCacRatio={ltvCacRatio}
          ltvChange={ltvChange}
          cacChange={cacChange}
          onConfigureParameters={onConfigureParameters}
        />
      </TabsContent>

      <TabsContent value="cac-analysis" className="space-y-6">
        <CACAnalysisTab 
          onOptimizeCAC={onOptimizeCAC} 
          onRecommendationAction={onRecommendationAction} 
        />
      </TabsContent>

      <TabsContent value="ltv-modeling" className="space-y-6">
        <LTVModelingTab onModelChange={onModelChange} />
      </TabsContent>

      <TabsContent value="predictive" className="space-y-6">
        <PredictiveTab />
      </TabsContent>
    </Tabs>
  );
};
