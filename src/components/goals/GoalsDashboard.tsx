
import React from 'react';
import { GoalsProgressAreaChart } from './charts/GoalsProgressAreaChart';
import { GoalsProgressBarChart } from './charts/GoalsProgressBarChart';
import { GoalsCategoryPieChart } from './charts/GoalsCategoryPieChart';
import { PriorityGoalsList } from './components/PriorityGoalsList';

export const GoalsDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="w-full">
        <GoalsProgressAreaChart />
      </div>
      
      <div className="w-full">
        <GoalsProgressBarChart />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <div className="w-full">
          <GoalsCategoryPieChart />
        </div>
        <div className="w-full">
          <PriorityGoalsList />
        </div>
      </div>
    </div>
  );
};
