
import React from 'react';
import { FunctionalityPanel } from '../common/FunctionalityPanel';
import { FunctionalityGrid } from '../common/FunctionalityGrid';
import { SectionDivider } from '../common/SectionDivider';
import { PartnerPortalHeader } from './PartnerPortalHeader';
import { PartnerNotifications } from './PartnerNotifications';
import { PartnerNavigation } from './PartnerNavigation';
import { Users, DollarSign, Award, Settings } from 'lucide-react';

interface PartnerPortalLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  partnerData: {
    availableCommission: number;
    monthlyGrowth: number;
    partnerLevel: string;
  };
  notifications: Array<{
    id: number;
    type: 'success' | 'info' | 'warning';
    message: string;
  }>;
}

export const PartnerPortalLayout: React.FC<PartnerPortalLayoutProps> = ({
  children,
  activeTab,
  onTabChange,
  partnerData,
  notifications
}) => {
  return (
    <div className="space-y-8">
      {/* Header do Portal */}
      <PartnerPortalHeader 
        availableCommission={partnerData.availableCommission}
        monthlyGrowth={partnerData.monthlyGrowth}
        partnerLevel={partnerData.partnerLevel}
      />

      {/* Notificações */}
      <PartnerNotifications notifications={notifications} />

      <SectionDivider title="Gestão de Parceria" icon={Users} />

      {/* Navegação Padronizada */}
      <FunctionalityPanel
        title="Portal do Parceiro"
        description="Gerencie todos os aspectos da sua parceria"
        icon={Users}
        iconGradient="from-blue-600 to-purple-600"
        variant="glass"
        size="md"
      >
        <PartnerNavigation 
          activeTab={activeTab} 
          onTabChange={onTabChange}
        />
        
        <div className="mt-8">
          {children}
        </div>
      </FunctionalityPanel>
    </div>
  );
};
