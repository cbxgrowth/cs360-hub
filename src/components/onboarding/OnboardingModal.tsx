
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Clock, Star, Crown, Shield, Users, Building, ArrowRight } from 'lucide-react';
import { useOnboarding } from './OnboardingProvider';
import { usePermissions } from '../../hooks/usePermissions';
import { OnboardingStepsNavigation } from './components/OnboardingStepsNavigation';
import { ONBOARDING_CONSTANTS } from '../../utils/constants/onboarding';
import type { OnboardingProfile } from './types/onboardingTypes';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const getProfileIcon = (profile: OnboardingProfile) => {
  const icons = {
    super_admin: Crown,
    account_admin: Shield,
    enterprise: Building,
    professional: Users,
    starter: Users,
    partner: Building
  };
  const Icon = icons[profile] || Users;
  return <Icon className="w-4 h-4 text-white" />;
};

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

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { userTypeLabel } = usePermissions();
  const {
    currentStep,
    steps,
    totalXP,
    completedSteps,
    requiredStepsCompleted,
    isOnboardingComplete,
    isPlanUnlocked,
    userProfile,
    completeStep,
    goToStep,
    skipToNext
  } = useOnboarding();

  const currentStepData = steps[currentStep];
  const CurrentStepComponent = currentStepData?.component;
  const requiredSteps = steps.filter(step => step.isRequired).length;

  const handleStepComplete = () => {
    completeStep(currentStepData.id);
    
    if (isOnboardingComplete || (currentStep === steps.length - 1)) {
      setTimeout(() => {
        localStorage.setItem(ONBOARDING_CONSTANTS.STORAGE_KEYS.ONBOARDING_DISMISSED, 'true');
        onClose();
        navigate('/app');
      }, ONBOARDING_CONSTANTS.TIMEOUTS.REDIRECT_DELAY);
    }
  };

  const handleSkip = () => {
    skipToNext();
  };

  const handleClose = () => {
    onClose();
  };

  if (!currentStepData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        {/* Compact Header */}
        <DialogHeader className="p-4 pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 bg-gradient-to-r ${getProfileColor(userProfile)} rounded-lg`}>
                {getProfileIcon(userProfile)}
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Onboarding CS360°
                </h2>
                <p className="text-sm text-gray-600">
                  {userTypeLabel} • {completedSteps}/{steps.length} concluídas
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-500" />
                  <span className="text-sm font-semibold text-gray-900">{totalXP} XP</span>
                </div>
              </div>
              
              <Badge className={`bg-gradient-to-r ${getProfileColor(userProfile)} text-white border-0 text-xs`}>
                {userTypeLabel}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        {/* Compact Progress Bar */}
        <div className="px-4 py-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600">
              Progresso Geral
            </span>
            <span className="text-xs font-medium text-gray-900">
              {Math.round((completedSteps / steps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`bg-gradient-to-r ${getProfileColor(userProfile)} h-2 rounded-full transition-all duration-500`}
              style={{ width: `${(completedSteps / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Compact Steps Navigation */}
        <OnboardingStepsNavigation
          steps={steps}
          currentStep={currentStep}
          onStepClick={goToStep}
        />

        {/* Main Content - Compact */}
        <div className="p-4">
          <Card className="border-0 shadow-none">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-bold text-gray-900">
                      {currentStepData.title}
                    </h3>
                    {currentStepData.isRequired && (
                      <Badge variant="outline" className="text-xs">
                        Obrigatório
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{currentStepData.description}</p>
                </div>
                
                <div className="text-right ml-4">
                  <div className="flex items-center space-x-1 mb-1">
                    <Clock className="w-3 h-3 text-gray-500" />
                    <span className="text-xs text-gray-600">
                      ~{currentStepData.estimatedTime} min
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span className="text-xs font-medium text-gray-900">
                      +{currentStepData.xpReward} XP
                    </span>
                  </div>
                </div>
              </div>

              {CurrentStepComponent && (
                <div className="mb-4">
                  <CurrentStepComponent onComplete={handleStepComplete} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Compact Footer */}
        <div className="px-4 py-3 bg-gray-50 flex items-center justify-between border-t">
          <div className="flex items-center space-x-2 text-xs text-gray-600">
            <span>
              Etapa {currentStep + 1} de {steps.length}
            </span>
            {isPlanUnlocked && (
              <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                Desbloqueado
              </Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {!currentStepData.isRequired && (
              <button 
                onClick={handleSkip}
                className="px-3 py-1 text-xs text-gray-600 hover:text-gray-800 transition-colors"
              >
                Pular
              </button>
            )}
            
            <button 
              onClick={handleStepComplete}
              className={`px-4 py-2 bg-gradient-to-r ${getProfileColor(userProfile)} hover:opacity-90 text-white rounded-lg text-sm font-medium flex items-center space-x-1 transition-all`}
            >
              <span>{isOnboardingComplete ? 'Finalizar' : 'Concluir'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
