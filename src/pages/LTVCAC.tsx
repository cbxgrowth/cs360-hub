
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { LTVCACManagement } from '@/components/LTVCACManagement';
import { DollarSign } from 'lucide-react';

const LTVCAC = () => {
  return (
    <AppLayout
      title="LTV & CAC Analysis"
      description="Análise avançada de Lifetime Value e Custo de Aquisição"
      icon={<DollarSign className="w-6 h-6 text-white" />}
      gradientColors="bg-gradient-to-r from-purple-600 to-indigo-600"
      badgeText="Tempo Real"
      badgeIcon={<DollarSign className="w-3 h-3 mr-1.5" />}
    >
      <LTVCACManagement />
    </AppLayout>
  );
};

export default LTVCAC;
