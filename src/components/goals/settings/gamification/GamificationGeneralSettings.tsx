
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Switch } from '../../../ui/switch';
import { Label } from '../../../ui/label';
import { Slider } from '../../../ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';

interface GamificationGeneralSettingsProps {
  localSettings: any;
  onSettingChange: (key: string, value: any) => void;
}

export const GamificationGeneralSettings = ({ localSettings, onSettingChange }: GamificationGeneralSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Configurações Gerais</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="difficultyLevel">Nível de Dificuldade</Label>
          <Select
            value={localSettings.difficultyLevel || 'medium'}
            onValueChange={(value) => onSettingChange('difficultyLevel', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Fácil - Mais pontos, menos desafios</SelectItem>
              <SelectItem value="medium">Médio - Balanceado</SelectItem>
              <SelectItem value="hard">Difícil - Menos pontos, mais desafios</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="pointsMultiplier">Multiplicador de Pontos</Label>
          <div className="mt-2">
            <Slider
              value={[localSettings.pointsMultiplier || 1]}
              onValueChange={(value) => onSettingChange('pointsMultiplier', value[0])}
              max={3}
              min={0.5}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>0.5x</span>
              <span className="font-medium">{localSettings.pointsMultiplier || 1}x</span>
              <span>3x</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Ranking Público</Label>
            <p className="text-sm text-gray-500">Mostrar posição no ranking geral</p>
          </div>
          <Switch
            checked={localSettings.publicRanking ?? false}
            onCheckedChange={(checked) => onSettingChange('publicRanking', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Competição entre Equipes</Label>
            <p className="text-sm text-gray-500">Ativar competições entre diferentes equipes</p>
          </div>
          <Switch
            checked={localSettings.teamCompetition ?? false}
            onCheckedChange={(checked) => onSettingChange('teamCompetition', checked)}
          />
        </div>
      </CardContent>
    </Card>
  );
};
