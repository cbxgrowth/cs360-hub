
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Switch } from '../../../ui/switch';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';

interface NotificationGeneralSettingsProps {
  localSettings: any;
  onSettingChange: (key: string, value: any) => void;
}

export const NotificationGeneralSettings = ({ localSettings, onSettingChange }: NotificationGeneralSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Configurações Gerais</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="quietHours">Horário Silencioso</Label>
          <div className="flex items-center space-x-2 mt-1">
            <Input
              type="time"
              value={localSettings.quietHoursStart || '22:00'}
              onChange={(e) => onSettingChange('quietHoursStart', e.target.value)}
              className="w-24"
            />
            <span className="text-sm text-gray-500">até</span>
            <Input
              type="time"
              value={localSettings.quietHoursEnd || '08:00'}
              onChange={(e) => onSettingChange('quietHoursEnd', e.target.value)}
              className="w-24"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Período em que as notificações ficam silenciadas
          </p>
        </div>

        <div>
          <Label htmlFor="frequency">Frequência de Digest</Label>
          <Select
            value={localSettings.digestFrequency || 'daily'}
            onValueChange={(value) => onSettingChange('digestFrequency', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediate">Imediata</SelectItem>
              <SelectItem value="hourly">A cada hora</SelectItem>
              <SelectItem value="daily">Diária</SelectItem>
              <SelectItem value="weekly">Semanal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Notificações de fim de semana</Label>
            <p className="text-sm text-gray-500">Receber notificações aos sábados e domingos</p>
          </div>
          <Switch
            checked={localSettings.weekendNotifications ?? false}
            onCheckedChange={(checked) => onSettingChange('weekendNotifications', checked)}
          />
        </div>
      </CardContent>
    </Card>
  );
};
