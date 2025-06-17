
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { AutomationManagement } from '../components/AutomationManagement';
import { Zap } from 'lucide-react';

const Automation = () => {
  return (
    <AppLayout
      title="Automação & IA"
      description="Configure automações inteligentes e fluxos de trabalho"
      icon={<Zap className="w-6 h-6 text-white" />}
      gradientColors="bg-gradient-to-r from-indigo-600 to-purple-600"
      badgeText="IA Ativa"
      badgeIcon={<Zap className="w-3 h-3 mr-1.5" />}
    >
      <AutomationManagement />
    </AppLayout>
  );
};

export default Automation;
