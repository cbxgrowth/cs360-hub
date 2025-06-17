
import React, { useState } from 'react';
import { Tabs, TabsContent } from '../ui/tabs';
import { PartnerPortalHeader } from './PartnerPortalHeader';
import { PartnerNotifications } from './PartnerNotifications';
import { PartnerNavigation } from './PartnerNavigation';
import { PartnerDashboard } from './PartnerDashboard';
import { PartnerReferrals } from './PartnerReferrals';
import { PartnerCommissions } from './PartnerCommissions';
import { PartnerCertifications } from './PartnerCertifications';
import { PartnerSupport } from './PartnerSupport';
import { PartnerMarketing } from './PartnerMarketing';
import { PartnerClients } from './PartnerClients';
import { PartnerReports } from './PartnerReports';

export const PartnerPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Mock data - em produção viria de APIs
  const partnerData = {
    availableCommission: 12480,
    monthlyGrowth: 23,
    partnerLevel: 'Parceiro Gold'
  };

  const notifications = [
    { id: 1, type: 'success' as const, message: 'Novo cliente convertido: TechCorp Ltda' },
    { id: 2, type: 'info' as const, message: 'Webinar de treinamento em 2 dias' },
    { id: 3, type: 'warning' as const, message: 'Documentos pendentes para pagamento' }
  ];

  return (
    <div className="space-y-6">
      <PartnerPortalHeader 
        availableCommission={partnerData.availableCommission}
        monthlyGrowth={partnerData.monthlyGrowth}
        partnerLevel={partnerData.partnerLevel}
      />

      <PartnerNotifications notifications={notifications} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <PartnerNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        <TabsContent value="dashboard" className="space-y-6">
          <PartnerDashboard />
        </TabsContent>

        <TabsContent value="referrals" className="space-y-6">
          <PartnerReferrals />
        </TabsContent>

        <TabsContent value="commissions" className="space-y-6">
          <PartnerCommissions />
        </TabsContent>

        <TabsContent value="clients" className="space-y-6">
          <PartnerClients />
        </TabsContent>

        <TabsContent value="marketing" className="space-y-6">
          <PartnerMarketing />
        </TabsContent>

        <TabsContent value="certifications" className="space-y-6">
          <PartnerCertifications />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <PartnerReports />
        </TabsContent>

        <TabsContent value="support" className="space-y-6">
          <PartnerSupport />
        </TabsContent>
      </Tabs>
    </div>
  );
};
