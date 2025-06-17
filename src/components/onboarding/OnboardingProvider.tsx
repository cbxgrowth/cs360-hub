
import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePermissions } from '../../hooks/usePermissions';
import { getPersonalizedSteps } from './utils/onboardingPersonalization';
import { ONBOARDING_CONSTANTS } from '../../utils/constants/onboarding';
import type { OnboardingStep, OnboardingProfile } from './types/onboardingTypes';

interface OnboardingContextType {
  currentStep: number;
  steps: OnboardingStep[];
  totalXP: number;
  completedSteps: number;
  requiredStepsCompleted: number;
  isOnboardingComplete: boolean;
  isPlanUnlocked: boolean;
  completedStepIds: string[];
  userProfile: OnboardingProfile;
  completeStep: (stepId: string) => void;
  goToStep: (stepIndex: number) => void;
  skipToNext: () => void;
  resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
};

interface OnboardingProviderProps {
  children: React.ReactNode;
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({ children }) => {
  const { userType } = usePermissions();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedStepIds, setCompletedStepIds] = useState<string[]>([]);
  const [totalXP, setTotalXP] = useState(0);

  const userProfile: OnboardingProfile = userType as OnboardingProfile;
  const personalizedSteps = getPersonalizedSteps(userProfile);
  const storageKey = `${ONBOARDING_CONSTANTS.STORAGE_KEYS.PROGRESS_PREFIX}${userProfile}`;
  
  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(storageKey);
    if (savedProgress) {
      try {
        const { completedStepIds: saved, totalXP: savedXP, currentStep: savedStep } = JSON.parse(savedProgress);
        setCompletedStepIds(saved || []);
        setTotalXP(savedXP || 0);
        setCurrentStep(savedStep || 0);
      } catch (error) {
        console.error('Error loading onboarding progress:', error);
      }
    }
  }, [storageKey]);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({
      completedStepIds,
      totalXP,
      currentStep
    }));
  }, [completedStepIds, totalXP, currentStep, storageKey]);

  const updatedSteps = personalizedSteps.map(step => ({
    ...step,
    isCompleted: completedStepIds.includes(step.id)
  }));

  const completedSteps = completedStepIds.length;
  const requiredSteps = updatedSteps.filter(step => step.isRequired);
  const requiredStepsCompleted = requiredSteps.filter(step => step.isCompleted).length;
  const isOnboardingComplete = completedSteps === personalizedSteps.length;
  const isPlanUnlocked = requiredStepsCompleted === requiredSteps.length;

  const completeStep = (stepId: string) => {
    if (!completedStepIds.includes(stepId)) {
      const step = personalizedSteps.find(s => s.id === stepId);
      if (step) {
        setCompletedStepIds(prev => [...prev, stepId]);
        setTotalXP(prev => prev + step.xpReward);
        
        const nextIncompleteStep = updatedSteps.findIndex((s, index) => 
          index > currentStep && !s.isCompleted
        );
        
        if (nextIncompleteStep !== -1) {
          setCurrentStep(nextIncompleteStep);
        } else {
          setCurrentStep(personalizedSteps.length - 1);
        }
      }
    }
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(Math.max(0, Math.min(stepIndex, personalizedSteps.length - 1)));
  };

  const skipToNext = () => {
    const nextStep = Math.min(currentStep + 1, personalizedSteps.length - 1);
    setCurrentStep(nextStep);
  };

  const resetOnboarding = () => {
    setCompletedStepIds([]);
    setTotalXP(0);
    setCurrentStep(0);
    localStorage.removeItem(storageKey);
    localStorage.removeItem(ONBOARDING_CONSTANTS.STORAGE_KEYS.ONBOARDING_DISMISSED);
  };

  return (
    <OnboardingContext.Provider value={{
      currentStep,
      steps: updatedSteps,
      totalXP,
      completedSteps,
      requiredStepsCompleted,
      isOnboardingComplete,
      isPlanUnlocked,
      completedStepIds,
      userProfile,
      completeStep,
      goToStep,
      skipToNext,
      resetOnboarding
    }}>
      {children}
    </OnboardingContext.Provider>
  );
};
