
import React from 'react';

interface NPSSurveyStepsProps {
  currentStep: number;
}

export const NPSSurveySteps = ({ currentStep }: NPSSurveyStepsProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center space-x-4">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= step 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}>
              {step}
            </div>
            {step < 3 && (
              <div className={`h-1 w-16 mx-2 ${
                currentStep > step ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">Configuração</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">Público</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">Email & Agendamento</span>
      </div>
    </div>
  );
};
