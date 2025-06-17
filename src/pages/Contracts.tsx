
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ContractsManagement } from '../components/ContractsManagement';
import { FileText } from 'lucide-react';

const Contracts = () => {
  return (
    <AppLayout
      title="Gestão de Contratos"
      description="Monitore e gerencie todos os contratos e renovações com análise avançada"
      icon={<FileText className="w-6 h-6 text-white" />}
      gradientColors="bg-gradient-to-r from-emerald-600 to-green-600"
      badgeText="Tempo Real"
      badgeIcon={<FileText className="w-3 h-3 mr-1.5" />}
    >
      <ContractsManagement />
    </AppLayout>
  );
};

export default Contracts;
