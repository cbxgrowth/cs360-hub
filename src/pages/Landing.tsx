
import React from 'react';
import { WebsiteLayout } from '../components/layout/WebsiteLayout';
import { HeroSection } from '../components/landing/HeroSection';
import { StatsSection } from '../components/landing/StatsSection';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { BenefitsSection } from '../components/landing/BenefitsSection';
import { ProcessSection } from '../components/landing/ProcessSection';
import { TestimonialsSection } from '../components/landing/TestimonialsSection';
import { ROISection } from '../components/landing/ROISection';
import { ComparisonSection } from '../components/landing/ComparisonSection';
import { IntegrationsSection } from '../components/landing/IntegrationsSection';
import { CTASection } from '../components/landing/CTASection';
import { LeadPopup } from '../components/landing/LeadPopup';
import { useLeadPopup } from '../hooks/useLeadPopup';

const Landing = () => {
  const { isPopupOpen, closePopup } = useLeadPopup(10); // 10 segundos

  return (
    <WebsiteLayout>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <BenefitsSection />
      <ProcessSection />
      <TestimonialsSection />
      <ROISection />
      <ComparisonSection />
      <IntegrationsSection />
      <CTASection />
      <LeadPopup isOpen={isPopupOpen} onClose={closePopup} />
    </WebsiteLayout>
  );
};

export default Landing;
