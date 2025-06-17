import React, { useState } from 'react';
import { WebsiteLayout } from '../components/layout/WebsiteLayout';
import { ROICalculatorModal } from '../components/ROICalculatorModal';
import { PricingHeader } from '../components/pricing/PricingHeader';
import { PricingPlans } from '../components/pricing/PricingPlans';
import { PricingAddOns } from '../components/pricing/PricingAddOns';
import { PricingROI } from '../components/pricing/PricingROI';
import { PricingFAQ } from '../components/pricing/PricingFAQ';
import { PricingCTA } from '../components/pricing/PricingCTA';
const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [isROIModalOpen, setIsROIModalOpen] = useState(false);
  return <WebsiteLayout>
      <div className="pt-16 px-0 py-0">
        <PricingHeader isAnnual={isAnnual} setIsAnnual={setIsAnnual} />
        <PricingPlans isAnnual={isAnnual} />
        <PricingAddOns />
        <PricingROI onOpenROIModal={() => setIsROIModalOpen(true)} />
        <PricingFAQ />
        <PricingCTA />
        
        {/* ROI Calculator Modal */}
        <ROICalculatorModal isOpen={isROIModalOpen} onClose={() => setIsROIModalOpen(false)} />
      </div>
    </WebsiteLayout>;
};
export default Pricing;