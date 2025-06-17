
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { MessageSquare, TrendingUp } from 'lucide-react';
import { Goal } from '../types/goalsTypes';

interface GoalUpdatesHistoryProps {
  goals: Goal[];
}

export const GoalUpdatesHistory = ({ goals }: GoalUpdatesHistoryProps) => {
  const allUpdates = goals.flatMap(goal => 
    goal.updates.map(update => ({ ...update, goalTitle: goal.title, goalUnit: goal.unit }))
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-blue-500" />
          <span>Atualizações Recentes</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {allUpdates.map(update => (
            <div key={update.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium">{update.goalTitle}</h4>
                  <span className="text-sm text-gray-500">{update.date}</span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{update.message}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>Valor: {update.value} {update.goalUnit}</span>
                  <span>Por: {update.user}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
