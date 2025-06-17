
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { StrategiesManagement } from '../components/StrategiesManagement';
import { Target } from 'lucide-react';

const Strategies = () => {
  return (
    <AppLayout
      title="Gestão de Estratégias"
      description="Configure e acompanhe estratégias com gestão de equipe integrada"
      icon={<Target className="w-6 h-6 text-white" />}
      gradientColors="bg-gradient-to-r from-green-600 to-teal-600"
      badgeText="Colaborativo"
      badgeIcon={<Target className="w-3 h-3 mr-1.5" />}
    >
      <StrategiesManagement />
    </AppLayout>
  );
};

export default Strategies;
