
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Dashboard } from '@/components/Dashboard';
import { BarChart3, Activity } from 'lucide-react';

const App = () => {
  return (
    <AppLayout
      title="Dashboard Principal"
      description="Visão geral completa do seu Customer Success"
      icon={<BarChart3 className="w-6 h-6 text-white" />}
      gradientColors="bg-gradient-to-r from-blue-600 to-indigo-600"
      badgeText="Tempo Real"
      badgeIcon={<Activity className="w-3 h-3 mr-1.5" />}
    >
      <Dashboard />
    </AppLayout>
  );
};

export default App;
