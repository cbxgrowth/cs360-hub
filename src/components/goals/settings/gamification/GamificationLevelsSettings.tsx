
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Switch } from '../../../ui/switch';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';

interface GamificationLevelsSettingsProps {
  localSettings: any;
  onSettingChange: (key: string, value: any) => void;
}

export const GamificationLevelsSettings = ({ localSettings, onSettingChange }: GamificationLevelsSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Sistema de Níveis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="maxLevel">Nível Máximo</Label>
          <Input
            id="maxLevel"
            type="number"
            value={localSettings.maxLevel || 50}
            onChange={(e) => onSettingChange('maxLevel', parseInt(e.target.value))}
            min="10"
            max="100"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="xpPerLevel">XP necessário por nível</Label>
          <Select
            value={localSettings.xpPerLevel || 'progressive'}
            onValueChange={(value) => onSettingChange('xpPerLevel', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fixed">Fixo - Mesma quantidade sempre</SelectItem>
              <SelectItem value="linear">Linear - Aumenta constantemente</SelectItem>
              <SelectItem value="progressive">Progressivo - Aumenta exponencialmente</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Bônus de Nível</Label>
            <p className="text-sm text-gray-500">Bônus especiais ao subir de nível</p>
          </div>
          <Switch
            checked={localSettings.levelBonuses ?? true}
            onCheckedChange={(checked) => onSettingChange('levelBonuses', checked)}
          />
        </div>
      </CardContent>
    </Card>
  );
};
