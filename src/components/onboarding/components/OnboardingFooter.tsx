
import React from 'react';
import { Button } from '../../ui/button';
import { Target, ArrowRight } from 'lucide-react';
import type { OnboardingProfile } from '../types/onboardingTypes';

interface OnboardingFooterProps {
  userProfile: OnboardingProfile;
  userTypeLabel: string;
  currentStep: number;
  totalSteps: number;
  isOnboardingComplete: boolean;
  currentStepIsRequired: boolean;
  onSkip: () => void;
  onComplete: () => void;
}

const getProfileColor = (profile: OnboardingProfile) => {
  const colors = {
    super_admin: 'from-purple-600 to-pink-600',
    account_admin: 'from-blue-600 to-purple-600',
    enterprise: 'from-green-600 to-blue-600',
    professional: 'from-blue-600 to-cyan-600',
    starter: 'from-gray-600 to-blue-600',
    partner: 'from-orange-600 to-red-600'
  };
  return colors[profile] || 'from-blue-600 to-purple-600';
};

export const OnboardingFooter: React.FC<OnboardingFooterProps> = ({
  userProfile,
  userTypeLabel,
  currentStep,
  totalSteps,
  isOnboardingComplete,
  currentStepIsRequired,
  onSkip,
  onComplete
}) => {
  return (
    <div className="px-6 py-4 bg-gray-50 flex items-center justify-between">
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Target className="w-4 h-4" />
        <span>
          {isOnboardingComplete 
            ? "Onboarding concluído! Redirecionando..." 
            : `Etapa ${currentStep + 1} de ${totalSteps} - ${userTypeLabel}`
          }
        </span>
      </div>
      
      <div className="flex items-center space-x-3">
        {!currentStepIsRequired && (
          <Button variant="outline" onClick={onSkip}>
            Pular Etapa
          </Button>
        )}
        
        <Button 
          onClick={onComplete}
          className={`bg-gradient-to-r ${getProfileColor(userProfile)} hover:opacity-90`}
        >
          {isOnboardingComplete ? (
            <>
              Finalizar
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          ) : (
            <>
              Concluir Etapa
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
