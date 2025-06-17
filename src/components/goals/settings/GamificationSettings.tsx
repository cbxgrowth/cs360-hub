
import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Award, Save } from 'lucide-react';
import { useToast } from '../../../hooks/use-toast';
import { GamificationGeneralSettings } from './gamification/GamificationGeneralSettings';
import { GamificationLevelsSettings } from './gamification/GamificationLevelsSettings';
import { GamificationFeaturesList } from './gamification/GamificationFeaturesList';
import { GamificationPointsConfig } from './gamification/GamificationPointsConfig';

interface GamificationSettingsProps {
  settings: any;
  onSettingsChange: (settings: any) => void;
}

export const GamificationSettings = ({ settings, onSettingsChange }: GamificationSettingsProps) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [isDirty, setIsDirty] = useState(false);
  const { toast } = useToast();

  const handleFeatureToggle = (featureId: string, enabled: boolean) => {
    const newSettings = {
      ...localSettings,
      gamification: {
        ...localSettings.gamification,
        [featureId]: enabled
      }
    };
    setLocalSettings(newSettings);
    setIsDirty(true);
  };

  const handlePointsChange = (pointId: string, value: number) => {
    const newSettings = {
      ...localSettings,
      points: {
        ...localSettings.points,
        [pointId]: value
      }
    };
    setLocalSettings(newSettings);
    setIsDirty(true);
  };

  const handleSettingChange = (key: string, value: any) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    setIsDirty(true);
  };

  const handleSave = () => {
    onSettingsChange(localSettings);
    setIsDirty(false);
    toast({
      title: "Gamificação configurada",
      description: "As configurações de gamificação foram salvas com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Award className="w-5 h-5 text-purple-600" />
          <h3 className="text-xl font-semibold">Configurações de Gamificação</h3>
          {isDirty && <Badge variant="outline" className="text-orange-600">Não salvo</Badge>}
        </div>
        <Button onClick={handleSave} disabled={!isDirty}>
          <Save className="w-4 h-4 mr-2" />
          Salvar
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GamificationGeneralSettings 
          localSettings={localSettings} 
          onSettingChange={handleSettingChange} 
        />
        <GamificationLevelsSettings 
          localSettings={localSettings} 
          onSettingChange={handleSettingChange} 
        />
      </div>

      <GamificationFeaturesList 
        localSettings={localSettings} 
        onFeatureToggle={handleFeatureToggle} 
      />

      <GamificationPointsConfig 
        localSettings={localSettings} 
        onPointsChange={handlePointsChange} 
      />
    </div>
  );
};
