
import React from 'react';
import { QuickInsights } from '../QuickInsights';
import { Brain } from 'lucide-react';

export const DashboardQuickInsights = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-8 border border-blue-200/50 dark:border-blue-700/50">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Insights Inteligentes</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Análises automáticas baseadas em IA</p>
        </div>
      </div>
      <QuickInsights />
    </div>
  );
};
