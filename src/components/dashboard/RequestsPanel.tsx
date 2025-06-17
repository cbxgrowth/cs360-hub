
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { FileText, Clock, User, CheckCircle, AlertCircle, Plus } from 'lucide-react';

export const RequestsPanel = () => {
  const requests = [
    {
      id: 1,
      type: 'feature',
      title: 'Integração com Slack',
      description: 'Cliente solicita integração com Slack para notificações automáticas',
      client: 'TechCorp LTDA',
      priority: 'high',
      status: 'pending',
      createdAt: '2 horas atrás',
      assignedTo: 'João Silva'
    },
    {
      id: 2,
      type: 'support',
      title: 'Problema com relatórios',
      description: 'Relatórios não estão sendo gerados corretamente',
      client: 'StartupXYZ',
      priority: 'urgent',
      status: 'in_progress',
      createdAt: '4 horas atrás',
      assignedTo: 'Maria Santos'
    },
    {
      id: 3,
      type: 'billing',
      title: 'Alteração de plano',
      description: 'Cliente deseja fazer upgrade para plano Enterprise',
      client: 'BigCorp S.A.',
      priority: 'medium',
      status: 'completed',
      createdAt: '1 dia atrás',
      assignedTo: 'Ana Costa'
    },
    {
      id: 4,
      type: 'consultation',
      title: 'Consultoria estratégica',
      description: 'Sessão de consultoria para otimização de processos',
      client: 'InnovaTech',
      priority: 'low',
      status: 'pending',
      createdAt: '2 dias atrás',
      assignedTo: 'Carlos Lima'
    }
  ];

  const getTypeIcon = (type: string) => {
    const icons = {
      feature: FileText,
      support: AlertCircle,
      billing: CheckCircle,
      consultation: User
    };
    return icons[type as keyof typeof icons] || FileText;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 dark:text-green-400';
      case 'in_progress': return 'text-blue-600 dark:text-blue-400';
      case 'pending': return 'text-yellow-600 dark:text-yellow-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluído';
      case 'in_progress': return 'Em Andamento';
      case 'pending': return 'Pendente';
      default: return status;
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>Solicitações</span>
          </CardTitle>
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
            {requests.filter(r => r.status !== 'completed').length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        {requests.slice(0, 3).map((request) => {
          const TypeIcon = getTypeIcon(request.type);
          return (
            <div key={request.id} className="border rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="flex items-start space-x-3">
                <div className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <TypeIcon className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium text-sm text-gray-900 dark:text-white line-clamp-1">{request.title}</h4>
                    <Badge className={`${getPriorityColor(request.priority)} text-xs px-1.5 py-0.5 flex-shrink-0`}>
                      {request.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">{request.description}</p>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-gray-500 dark:text-gray-500 truncate max-w-24">{request.client}</span>
                    <div className="flex items-center space-x-1">
                      <span className={getStatusColor(request.status)}>{getStatusText(request.status)}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-gray-400 dark:text-gray-500 pt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{request.createdAt}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="pt-3 border-t">
          <Button variant="ghost" className="w-full text-sm h-8">
            Ver todas ({requests.length})
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
