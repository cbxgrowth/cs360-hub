
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Switch } from '../../../ui/switch';
import { Badge } from '../../../ui/badge';
import { notificationTypes, getCategoryColor } from './notificationData';

interface NotificationTypesListProps {
  localSettings: any;
  onNotificationToggle: (notificationId: string, enabled: boolean) => void;
}

export const NotificationTypesList = ({ localSettings, onNotificationToggle }: NotificationTypesListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Tipos de Notificação</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {notificationTypes.map((notification) => (
            <div key={notification.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <notification.icon className="w-5 h-5 text-gray-600" />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium">{notification.label}</h4>
                    <Badge className={getCategoryColor(notification.category)} variant="outline">
                      {notification.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{notification.description}</p>
                </div>
              </div>
              <Switch
                checked={localSettings.notifications?.[notification.id] ?? notification.defaultEnabled}
                onCheckedChange={(checked) => onNotificationToggle(notification.id, checked)}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
