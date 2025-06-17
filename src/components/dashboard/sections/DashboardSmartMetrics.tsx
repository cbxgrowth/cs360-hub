
import React from 'react';
import { SmartMetricsCard } from '../advanced/SmartMetricsCard';
import { smartMetricsData } from '../data/smartMetricsData';
import { Sparkles } from 'lucide-react';

export const DashboardSmartMetrics = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Métricas Inteligentes</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">KPIs com insights de IA e predições</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {smartMetricsData.map((metric, index) => (
          <SmartMetricsCard
            key={index}
            {...metric}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          />
        ))}
      </div>
    </div>
  );
};
