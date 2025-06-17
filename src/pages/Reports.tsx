
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ReportsManagement } from '../components/ReportsManagement';
import { BarChart3 } from 'lucide-react';

const Reports = () => {
  return (
    <AppLayout
      title="Relatórios e Dashboards"
      description="Dashboards personalizados, relatórios automáticos e analytics avançados com IA"
      icon={<BarChart3 className="w-6 h-6 text-white" />}
      gradientColors="bg-gradient-to-r from-violet-600 to-purple-600"
      badgeText="Tempo Real"
      badgeIcon={<BarChart3 className="w-3 h-3 mr-1.5" />}
    >
      <ReportsManagement />
    </AppLayout>
  );
};

export default Reports;
