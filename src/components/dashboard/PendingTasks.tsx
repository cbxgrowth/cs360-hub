
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { 
  CheckSquare, 
  Calendar, 
  Users, 
  Phone,
  Mail,
  FileText,
  Target,
  AlertTriangle,
  Clock,
  Plus,
  ArrowRight
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  type: 'followup' | 'contract' | 'meeting' | 'goal' | 'alert';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  clientName?: string;
  completed: boolean;
  actionUrl?: string;
}

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Follow-up com DataCorp',
    description: 'Cliente apresentou queda no Health Score - contatar urgente',
    type: 'alert',
    priority: 'high',
    dueDate: 'Hoje',
    clientName: 'DataCorp',
    completed: false
  },
  {
    id: '2',
    title: 'Renovação SmartApp',
    description: 'Contrato vence em 15 dias - iniciar processo de renovação',
    type: 'contract',
    priority: 'high',
    dueDate: 'Amanhã',
    clientName: 'SmartApp',
    completed: false
  },
  {
    id: '3',
    title: 'Reunião QBR - TechStart',
    description: 'Quarterly Business Review agendada para esta semana',
    type: 'meeting',
    priority: 'medium',
    dueDate: '2 dias',
    clientName: 'TechStart Inc.',
    completed: false
  },
  {
    id: '4',
    title: 'Atualizar meta MRR',
    description: 'Revisar e ajustar meta mensal baseada no crescimento atual',
    type: 'goal',
    priority: 'medium',
    dueDate: '3 dias',
    completed: false
  },
  {
    id: '5',
    title: 'Pesquisa NPS - CloudTech',
    description: 'Enviar pesquisa de satisfação para cliente promotor',
    type: 'followup',
    priority: 'low',
    dueDate: '1 semana',
    clientName: 'CloudTech',
    completed: false
  },
  {
    id: '6',
    title: 'Onboarding InnovaSoft',
    description: 'Agendar sessão de treinamento para novo cliente',
    type: 'meeting',
    priority: 'medium',
    dueDate: '2 dias',
    clientName: 'InnovaSoft',
    completed: true
  }
];

const getTaskIcon = (type: string) => {
  switch (type) {
    case 'followup':
      return <Phone className="w-4 h-4" />;
    case 'contract':
      return <FileText className="w-4 h-4" />;
    case 'meeting':
      return <Calendar className="w-4 h-4" />;
    case 'goal':
      return <Target className="w-4 h-4" />;
    case 'alert':
      return <AlertTriangle className="w-4 h-4" />;
    default:
      return <CheckSquare className="w-4 h-4" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'low':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
  }
};

const getDueDateColor = (dueDate: string) => {
  if (dueDate === 'Hoje' || dueDate === 'Atrasado') {
    return 'text-red-600 dark:text-red-400';
  } else if (dueDate === 'Amanhã') {
    return 'text-orange-600 dark:text-orange-400';
  }
  return 'text-gray-600 dark:text-gray-400';
};

export const PendingTasks = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [showCompleted, setShowCompleted] = useState(false);

  const handleTaskToggle = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleTaskAction = (task: Task) => {
    console.log('Executar tarefa:', task);
    // Implementar navegação ou ação específica baseada no tipo de tarefa
  };

  const filteredTasks = showCompleted 
    ? tasks 
    : tasks.filter(task => !task.completed);

  const pendingCount = tasks.filter(task => !task.completed).length;
  const highPriorityCount = tasks.filter(task => !task.completed && task.priority === 'high').length;

  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CheckSquare className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <div>
              <CardTitle className="text-lg text-gray-900 dark:text-white">
                Tarefas Pendentes
              </CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
                  {pendingCount} pendentes
                </Badge>
                {highPriorityCount > 0 && (
                  <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                    {highPriorityCount} urgentes
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCompleted(!showCompleted)}
              className="text-gray-600 dark:text-gray-400"
            >
              {showCompleted ? 'Ocultar' : 'Ver'} concluídas
            </Button>
            <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {filteredTasks.map((task, index) => (
            <div
              key={task.id}
              className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                index !== filteredTasks.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''
              } ${task.completed ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex items-center pt-0.5">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => handleTaskToggle(task.id)}
                    className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`p-1.5 rounded ${
                        task.type === 'alert' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                        task.type === 'contract' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                        task.type === 'meeting' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' :
                        task.type === 'goal' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                        'bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400'
                      }`}>
                        {getTaskIcon(task.type)}
                      </div>
                      <p className={`text-sm font-medium ${
                        task.completed 
                          ? 'text-gray-500 dark:text-gray-400 line-through' 
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {task.title}
                      </p>
                      <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                        {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Média' : 'Baixa'}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className={`flex items-center space-x-1 text-xs ${getDueDateColor(task.dueDate)}`}>
                        <Clock className="w-3 h-3" />
                        <span>{task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className={`text-sm mt-1 ${
                    task.completed 
                      ? 'text-gray-400 dark:text-gray-500' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {task.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      {task.clientName && (
                        <Badge variant="outline" className="text-xs">
                          <Users className="w-3 h-3 mr-1" />
                          {task.clientName}
                        </Badge>
                      )}
                    </div>
                    
                    {!task.completed && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleTaskAction(task)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                      >
                        Executar
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredTasks.length === 0 && (
          <div className="p-8 text-center">
            <CheckSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {showCompleted ? 'Nenhuma tarefa concluída' : 'Nenhuma tarefa pendente'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {showCompleted 
                ? 'Quando você concluir tarefas, elas aparecerão aqui.' 
                : 'Parabéns! Você está em dia com suas tarefas.'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
