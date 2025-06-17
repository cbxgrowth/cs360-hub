
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { NPSManagement } from '../components/NPSManagement';
import { Star } from 'lucide-react';

const NPS = () => {
  return (
    <AppLayout
      title="Net Promoter Score (NPS)"
      description="Meça e acompanhe a lealdade dos clientes com análises integradas ao Customer Success"
      icon={<Star className="w-6 h-6 text-white" />}
      gradientColors="bg-gradient-to-r from-amber-600 to-orange-600"
      badgeText="Tempo Real"
      badgeIcon={<Star className="w-3 h-3 mr-1.5" />}
    >
      <NPSManagement />
    </AppLayout>
  );
};

export default NPS;
