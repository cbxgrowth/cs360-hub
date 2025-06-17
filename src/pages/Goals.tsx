
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { GoalsManagement } from '@/components/goals/GoalsManagement';
import { Target } from 'lucide-react';

const Goals = () => {
  return (
    <AppLayout
      title="Gestão de Metas"
      description="Defina, acompanhe e alcance suas metas de Customer Success com precisão e eficiência"
      icon={<Target className="w-6 h-6 text-white" />}
      gradientColors="bg-gradient-to-r from-green-600 to-teal-600"
      badgeText="Tempo Real"
      badgeIcon={<Target className="w-3 h-3 mr-1.5" />}
    >
      <GoalsManagement />
    </AppLayout>
  );
};

export default Goals;
