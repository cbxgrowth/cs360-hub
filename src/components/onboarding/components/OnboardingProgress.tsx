
import React from 'react';
import { Progress } from '../../ui/progress';

interface OnboardingProgressProps {
  completedSteps: number;
  totalSteps: number;
  requiredStepsCompleted: number;
  requiredSteps: number;
}

export const OnboardingProgress: React.FC<OnboardingProgressProps> = ({
  completedSteps,
  totalSteps,
  requiredStepsCompleted,
  requiredSteps
}) => {
  const progressPercentage = (completedSteps / totalSteps) * 100;

  return (
    <div className="px-6 py-4 bg-gray-50">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          Progresso do Onboarding
        </span>
        <span className="text-sm text-gray-600">
          {completedSteps}/{totalSteps} etapas
        </span>
      </div>
      <Progress value={progressPercentage} className="h-2" />
      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
        <span>Etapas obrigatórias: {requiredStepsCompleted}/{requiredSteps}</span>
        <span>{Math.round(progressPercentage)}% concluído</span>
      </div>
    </div>
  );
};
