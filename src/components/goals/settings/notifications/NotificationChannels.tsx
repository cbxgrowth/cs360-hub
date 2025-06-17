
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Switch } from '../../../ui/switch';
import { channels } from './notificationData';

interface NotificationChannelsProps {
  localSettings: any;
  onChannelToggle: (channelId: string, enabled: boolean) => void;
}

export const NotificationChannels = ({ localSettings, onChannelToggle }: NotificationChannelsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Canais de Notificação</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {channels.map((channel) => (
          <div key={channel.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center space-x-3">
              <channel.icon className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium">{channel.label}</h4>
                <p className="text-sm text-gray-600">{channel.description}</p>
              </div>
            </div>
            <Switch
              checked={localSettings.channels?.[channel.id] ?? true}
              onCheckedChange={(checked) => onChannelToggle(channel.id, checked)}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
