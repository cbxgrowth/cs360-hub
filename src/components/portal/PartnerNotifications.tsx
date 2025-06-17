import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Bell } from 'lucide-react';
interface Notification {
  id: number;
  type: 'success' | 'info' | 'warning';
  message: string;
}
interface PartnerNotificationsProps {
  notifications: Notification[];
}
export const PartnerNotifications: React.FC<PartnerNotificationsProps> = ({
  notifications
}) => {
  if (notifications.length === 0) return null;
  const getNotificationColor = (type: string) => {
    const colors = {
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      info: 'bg-blue-500'
    };
    return colors[type as keyof typeof colors] || 'bg-blue-500';
  };
  return <Card className="border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg">
          <Bell className="w-5 h-5 mr-2 text-blue-600" />
          Notificações Importantes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {notifications.slice(0, 3).map(notification => <div key={notification.id} className="flex items-center p-3 rounded-lg bg-transparent">
              <div className={`w-2 h-2 rounded-full mr-3 ${getNotificationColor(notification.type)}`}></div>
              <span className="text-sm text-slate-400">{notification.message}</span>
            </div>)}
        </div>
      </CardContent>
    </Card>;
};