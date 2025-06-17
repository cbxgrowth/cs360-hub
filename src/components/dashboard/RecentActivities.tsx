
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Activity, 
  Users, 
  FileText, 
  Star, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  ArrowRight
} from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'client' | 'contract' | 'nps' | 'alert' | 'goal';
  title: string;
  description: string;
  time: string;
  status: 'success' | 'warning' | 'error' | 'info';
  actionRequired: boolean;
  clientName?: string;
  value?: string;
}

const activities: ActivityItem[] = [
  {
    id: '1',
    type: 'client',
    title: 'Novo cliente adicionado',
    description: 'TechStart Inc. foi cadastrado como cliente Tier A',
    time: '2 min atrás',
    status: 'success',
    actionRequired: false,
    clientName: 'TechStart Inc.',
    value: 'R$ 15k MRR'
  },
  {
    id: '2',
    type: 'alert',
    title: 'Cliente em risco',
    description: 'DataCorp apresenta sinais de churn - Health Score baixo',
    time: '15 min atrás',
    status: 'error',
    actionRequired: true,
    clientName: 'DataCorp'
  },
  {
    id: '3',
    type: 'contract',
    title: 'Contrato renovado',
    description: 'InnovaSoft renovou contrato por mais 12 meses',
    time: '1 hora atrás',
    status: 'success',
    actionRequired: false,
    clientName: 'InnovaSoft',
    value: 'R$ 24k'
  },
  {
    id: '4',
    type: 'nps',
    title: 'Nova avaliação NPS',
    description: 'CloudTech avaliou com nota 9 (Promotor)',
    time: '2 horas atrás',
    status: 'success',
    actionRequired: false,
    clientName: 'CloudTech'
  },
  {
    id: '5',
    type: 'goal',
    title: 'Meta alcançada',
    description: 'Meta de MRR mensal atingiu 95% do objetivo',
    time: '3 horas atrás',
    status: 'success',
    actionRequired: false,
    value: '95%'
  },
  {
    id: '6',
    type: 'alert',
    title: 'Contrato vencendo',
    description: 'SmartApp tem contrato vencendo em 15 dias',
    time: '4 horas atrás',
    status: 'warning',
    actionRequired: true,
    clientName: 'SmartApp'
  }
];

const getActivityIcon = (type: string, status: string) => {
  switch (type) {
    case 'client':
      return <Users className="w-4 h-4" />;
    case 'contract':
      return <FileText className="w-4 h-4" />;
    case 'nps':
      return <Star className="w-4 h-4" />;
    case 'alert':
      return status === 'error' ? <AlertTriangle className="w-4 h-4" /> : <Clock className="w-4 h-4" />;
    case 'goal':
      return <CheckCircle className="w-4 h-4" />;
    default:
      return <Activity className="w-4 h-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'success':
      return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
    case 'warning':
      return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
    case 'error':
      return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
    case 'info':
      return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
    default:
      return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
  }
};

export const RecentActivities = () => {
  const handleViewActivity = (activity: ActivityItem) => {
    console.log('Ver atividade:', activity);
    // Implementar navegação para página específica
  };

  const handleTakeAction = (activity: ActivityItem) => {
    console.log('Tomar ação:', activity);
    // Implementar ação específica baseada no tipo de atividade
  };

  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-lg text-gray-900 dark:text-white">
              Atividades Recentes
            </CardTitle>
          </div>
          <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
            Ver todas
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                index !== activities.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${getStatusColor(activity.status)}`}>
                  {getActivityIcon(activity.type, activity.status)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {activity.time}
                    </p>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {activity.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      {activity.clientName && (
                        <Badge variant="outline" className="text-xs">
                          {activity.clientName}
                        </Badge>
                      )}
                      {activity.value && (
                        <Badge className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                          {activity.value}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewActivity(activity)}
                        className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                      {activity.actionRequired && (
                        <Button
                          size="sm"
                          onClick={() => handleTakeAction(activity)}
                          className="text-xs bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:hover:bg-orange-900/50"
                        >
                          Ação
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
