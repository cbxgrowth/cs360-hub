
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Switch } from '../../../ui/switch';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';

interface SecuritySettingsProps {
  localSettings: any;
  onSettingChange: (key: string, value: any) => void;
}

export const SecuritySettings = ({ localSettings, onSettingChange }: SecuritySettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Restrições de Segurança</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="sessionTimeout">Timeout de sessão (minutos)</Label>
          <Input
            id="sessionTimeout"
            type="number"
            value={localSettings.sessionTimeout || 60}
            onChange={(e) => onSettingChange('sessionTimeout', parseInt(e.target.value))}
            min="15"
            max="480"
            className="mt-1"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Autenticação dois fatores</Label>
            <p className="text-sm text-gray-500">Exigir 2FA para funções administrativas</p>
          </div>
          <Switch
            checked={localSettings.require2FA ?? false}
            onCheckedChange={(checked) => onSettingChange('require2FA', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Bloqueio por tentativas</Label>
            <p className="text-sm text-gray-500">Bloquear conta após tentativas falhadas</p>
          </div>
          <Switch
            checked={localSettings.accountLockout ?? true}
            onCheckedChange={(checked) => onSettingChange('accountLockout', checked)}
          />
        </div>
      </CardContent>
    </Card>
  );
};
