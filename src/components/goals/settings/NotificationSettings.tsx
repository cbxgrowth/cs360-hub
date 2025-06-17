
import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Bell, Save, TestTube } from 'lucide-react';
import { useToast } from '../../../hooks/use-toast';
import { NotificationChannels } from './notifications/NotificationChannels';
import { NotificationGeneralSettings } from './notifications/NotificationGeneralSettings';
import { NotificationTypesList } from './notifications/NotificationTypesList';

interface NotificationSettingsProps {
  settings: any;
  onSettingsChange: (settings: any) => void;
}

export const NotificationSettings = ({ settings, onSettingsChange }: NotificationSettingsProps) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [isDirty, setIsDirty] = useState(false);
  const { toast } = useToast();

  const handleNotificationToggle = (notificationId: string, enabled: boolean) => {
    const newSettings = {
      ...localSettings,
      notifications: {
        ...localSettings.notifications,
        [notificationId]: enabled
      }
    };
    setLocalSettings(newSettings);
    setIsDirty(true);
  };

  const handleChannelToggle = (channelId: string, enabled: boolean) => {
    const newSettings = {
      ...localSettings,
      channels: {
        ...localSettings.channels,
        [channelId]: enabled
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
      title: "Notificações configuradas",
      description: "Suas preferências de notificação foram salvas.",
    });
  };

  const handleTestNotification = () => {
    toast({
      title: "Notificação de teste",
      description: "Esta é uma notificação de teste do sistema de metas.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-blue-600" />
          <h3 className="text-xl font-semibold">Configurações de Notificação</h3>
          {isDirty && <Badge variant="outline" className="text-orange-600">Não salvo</Badge>}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleTestNotification}>
            <TestTube className="w-4 h-4 mr-2" />
            Testar
          </Button>
          <Button onClick={handleSave} disabled={!isDirty}>
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NotificationChannels 
          localSettings={localSettings} 
          onChannelToggle={handleChannelToggle} 
        />
        <NotificationGeneralSettings 
          localSettings={localSettings} 
          onSettingChange={handleSettingChange} 
        />
      </div>

      <NotificationTypesList 
        localSettings={localSettings} 
        onNotificationToggle={handleNotificationToggle} 
      />
    </div>
  );
};
