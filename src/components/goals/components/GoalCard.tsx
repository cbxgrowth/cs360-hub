
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Progress } from '../../ui/progress';
import { Badge } from '../../ui/badge';
import { Calendar, Edit, BarChart3, CheckCircle } from 'lucide-react';
import { Goal } from '../types/goalsTypes';

interface GoalCardProps {
  goal: Goal;
  onUpdateClick: (goal: Goal) => void;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => React.ReactNode;
  getStatusLabel: (status: string) => string;
}

export const GoalCard = ({ 
  goal, 
  onUpdateClick, 
  getStatusColor, 
  getStatusIcon, 
  getStatusLabel 
}: GoalCardProps) => {
  return (
    <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{goal.title}</CardTitle>
            <Badge variant="outline" className="mb-2">{goal.category}</Badge>
          </div>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
            {getStatusIcon(goal.status)}
            <span className="ml-1">{getStatusLabel(goal.status)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Progresso</span>
            <span className="text-sm font-medium">{goal.progress}%</span>
          </div>
          <Progress value={goal.progress} className="h-2" />
          <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
            <span>Atual: {goal.current} {goal.unit}</span>
            <span>Meta: {goal.target} {goal.unit}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Prazo: {goal.deadline}</span>
          </div>
          <span className="text-gray-500">
            Atualizado: {goal.lastUpdate}
          </span>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700">Marcos:</div>
          {goal.milestones.map((milestone) => (
            <div key={milestone.id} className="flex items-center space-x-2 text-sm">
              <div className={`w-4 h-4 rounded-full ${milestone.completed ? 'bg-green-500' : 'bg-gray-300'}`}>
                {milestone.completed && <CheckCircle className="w-3 h-3 text-white m-0.5" />}
              </div>
              <span className={milestone.completed ? 'line-through text-gray-500' : ''}>
                {milestone.title}
              </span>
            </div>
          ))}
        </div>

        <div className="flex space-x-2">
          <Button size="sm" className="flex-1" onClick={() => onUpdateClick(goal)}>
            <Edit className="w-4 h-4 mr-1" />
            Atualizar
          </Button>
          <Button variant="outline" size="sm">
            <BarChart3 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
