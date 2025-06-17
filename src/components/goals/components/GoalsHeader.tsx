
import React from 'react';
import { Button } from '../../ui/button';
import { BarChart3, Plus, Goal } from 'lucide-react';

interface GoalsHeaderProps {
  onNewGoalClick: () => void;
  onReportClick: () => void;
}

export const GoalsHeader = ({ onNewGoalClick, onReportClick }: GoalsHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
            <Goal className="w-6 h-6 text-white" />
          </div>
          <span>Gestão de Metas</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Defina, acompanhe e alcance suas metas de Customer Success
        </p>
      </div>
      <div className="flex space-x-3">
        <Button 
          variant="outline" 
          className="flex items-center space-x-2"
          onClick={onReportClick}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Relatório Geral</span>
        </Button>
        <Button 
          onClick={onNewGoalClick}
          className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-teal-500"
        >
          <Plus className="w-4 h-4" />
          <span>Nova Meta</span>
        </Button>
      </div>
    </div>
  );
};
