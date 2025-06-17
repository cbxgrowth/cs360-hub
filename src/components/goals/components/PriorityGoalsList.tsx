
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Progress } from '../../ui/progress';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { 
  Users, 
  Calendar, 
  Award,
  Eye,
  Edit
} from 'lucide-react';
import { topGoals } from '../data/goalsData';
import { getStatusColor, getPriorityColor } from '../utils/goalHelpers';
import { GoalsStatusIcon } from './GoalsStatusIcon';
import { useToast } from '../../../hooks/use-toast';

export const PriorityGoalsList: React.FC = () => {
  const { toast } = useToast();

  const handleViewDetails = (goalTitle: string) => {
    toast({
      title: 'Visualizar Detalhes',
      description: `Exibindo detalhes para a meta: ${goalTitle}`,
    });
  };

  const handleEditGoal = (goalTitle: string) => {
    toast({
      title: 'Editar Meta',
      description: `Iniciando edição para a meta: ${goalTitle}`,
    });
  };

  return (
    <Card className="lg:col-span-2 shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-orange-500" />
            <span>Metas Prioritárias</span>
          </div>
          <Button variant="outline" size="sm">Ver Todas</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topGoals.map((goal) => (
            <div key={goal.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(goal.priority)}`}></div>
                    <h4 className="font-semibold text-lg">{goal.title}</h4>
                    <GoalsStatusIcon status={goal.status} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-600">Progresso</p>
                      <div className="flex items-center space-x-2">
                        <Progress value={goal.progress} className="flex-1" />
                        <span className="text-sm font-medium">{goal.progress}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Meta vs Atual</p>
                      <p className="text-sm font-medium">{goal.current} / {goal.target}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{goal.team}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{goal.deadline}</span>
                    </div>
                    <Badge className={getStatusColor(goal.status)}>
                      {goal.status === 'on-track' ? 'No Prazo' :
                       goal.status === 'at-risk' ? 'Em Risco' :
                       goal.status === 'behind' ? 'Atrasada' : 'Concluída'}
                    </Badge>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleViewDetails(goal.title)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEditGoal(goal.title)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
