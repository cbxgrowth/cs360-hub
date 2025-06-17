
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { HelpCircle, MessageCircle, User, Clock, Search } from 'lucide-react';

export const QuestionsPanel = () => {
  const questions = [
    {
      id: 1,
      title: 'Como configurar automações?',
      description: 'Preciso entender como configurar automações para envio de emails',
      category: 'automation',
      client: 'TechCorp LTDA',
      status: 'open',
      priority: 'medium',
      createdAt: '1 hora atrás',
      responses: 2
    },
    {
      id: 2,
      title: 'Integração com API externa',
      description: 'Como integrar nossa API interna com o sistema CS360?',
      category: 'integration',
      client: 'StartupXYZ',
      status: 'answered',
      priority: 'high',
      createdAt: '3 horas atrás',
      responses: 5
    },
    {
      id: 3,
      title: 'Relatórios personalizados',
      description: 'É possível criar relatórios personalizados com métricas específicas?',
      category: 'reports',
      client: 'BigCorp S.A.',
      status: 'open',
      priority: 'low',
      createdAt: '5 horas atrás',
      responses: 1
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      automation: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      integration: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      reports: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      nps: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'answered': return 'text-green-600 dark:text-green-400';
      case 'in_progress': return 'text-blue-600 dark:text-blue-400';
      case 'open': return 'text-yellow-600 dark:text-yellow-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'answered': return 'Respondida';
      case 'in_progress': return 'Em Progresso';
      case 'open': return 'Aberta';
      default: return status;
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <HelpCircle className="w-5 h-5 text-orange-600" />
            <span>Dúvidas e Perguntas</span>
          </CardTitle>
          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400">
            {questions.filter(q => q.status === 'open').length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        {questions.map((question) => (
          <div key={question.id} className="border rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="flex items-start space-x-3">
              <div className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center flex-shrink-0">
                <HelpCircle className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <h4 className="font-medium text-sm text-gray-900 dark:text-white line-clamp-1">{question.title}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">{question.description}</p>
                <div className="flex items-center justify-between gap-2 pt-1">
                  <div className="flex items-center space-x-1">
                    <Badge className={`${getCategoryColor(question.category)} text-xs px-1.5 py-0.5`}>
                      {question.category}
                    </Badge>
                    <span className={`${getStatusColor(question.status)} text-xs`}>
                      {getStatusText(question.status)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-400 dark:text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>{question.responses}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-gray-500 dark:text-gray-500 truncate max-w-24">{question.client}</span>
                  <div className="flex items-center text-gray-400 dark:text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{question.createdAt}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="pt-3 border-t">
          <Button variant="ghost" className="w-full text-sm h-8">
            Ver todas ({questions.length})
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
