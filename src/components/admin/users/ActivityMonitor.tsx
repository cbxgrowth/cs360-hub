
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { AlertTriangle } from 'lucide-react';

export const ActivityMonitor: React.FC = () => {
  const activities = [
    { user: 'Maria Santos', action: 'Acessou relatórios financeiros', time: '2 min atrás', status: 'normal' },
    { user: 'Carlos Oliveira', action: 'Tentou acessar área restrita', time: '5 min atrás', status: 'warning' },
    { user: 'Ana Costa', action: 'Exportou dados de contratos', time: '15 min atrás', status: 'normal' },
    { user: 'João Silva', action: 'Criou novo usuário', time: '1h atrás', status: 'admin' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          <span>Monitoramento de Atividades</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  activity.status === 'warning' ? 'bg-yellow-500' : 
                  activity.status === 'admin' ? 'bg-blue-500' : 'bg-green-500'
                }`}></div>
                <div>
                  <p className="text-sm font-medium">{activity.user}</p>
                  <p className="text-xs text-gray-600">{activity.action}</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
