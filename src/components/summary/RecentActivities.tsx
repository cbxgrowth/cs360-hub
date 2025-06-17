
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Clock } from 'lucide-react';

export const RecentActivities = () => {
  const activities = [
    { action: 'Ligação para TechCorp finalizada', time: '30 min atrás', type: 'call' },
    { action: 'Health score atualizado - StartupXYZ', time: '1h atrás', type: 'update' },
    { action: 'Email de follow-up enviado', time: '2h atrás', type: 'email' },
    { action: 'Reunião de onboarding concluída', time: '3h atrás', type: 'meeting' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="w-5 h-5 mr-2 text-gray-600" />
          Atividades Recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
