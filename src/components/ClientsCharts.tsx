
import React from 'react';
import { ClientsWebChart } from './clients/charts/ClientsWebChart';
import { ClientsDistributionWeb } from './clients/charts/ClientsDistributionWeb';
import { EnhancedClientsCharts } from './clients/charts/EnhancedClientsCharts';
import { ClientFilter } from '../pages/Clients';

interface ClientsChartsProps {
  filters: ClientFilter;
}

export const ClientsCharts: React.FC<ClientsChartsProps> = ({ filters }) => {
  return (
    <div className="space-y-8">
      {/* Análises Multidimensionais */}
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="h-1 flex-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Análises Multidimensionais
          </h3>
          <div className="h-1 flex-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <ClientsWebChart />
          <ClientsDistributionWeb />
        </div>
      </div>

      {/* Performance Avançada */}
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="h-1 flex-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Performance Avançada
          </h3>
          <div className="h-1 flex-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>
        </div>
        
        <EnhancedClientsCharts />
      </div>
    </div>
  );
};
