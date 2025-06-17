
import React from 'react';
import { Button } from '../../ui/button';
import { CheckCircle } from 'lucide-react';
import type { OnboardingStep } from '../types/onboardingTypes';

interface OnboardingStepsNavigationProps {
  steps: OnboardingStep[];
  currentStep: number;
  onStepClick: (stepIndex: number) => void;
}

export const OnboardingStepsNavigation: React.FC<OnboardingStepsNavigationProps> = ({
  steps,
  currentStep,
  onStepClick
}) => {
  return (
    <div className="px-4 py-2 border-b bg-gray-50/50">
      <div className="flex items-center space-x-2 overflow-x-auto">
        {steps.map((step, index) => (
          <Button
            key={step.id}
            variant={index === currentStep ? "default" : step.isCompleted ? "secondary" : "outline"}
            size="sm"
            onClick={() => onStepClick(index)}
            className="flex-shrink-0 h-8 px-2 text-xs"
          >
            {step.isCompleted ? (
              <CheckCircle className="w-3 h-3 mr-1" />
            ) : (
              <span className="w-3 h-3 mr-1 flex items-center justify-center text-xs font-bold">
                {index + 1}
              </span>
            )}
            <span className="hidden sm:inline truncate max-w-20">{step.title}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
