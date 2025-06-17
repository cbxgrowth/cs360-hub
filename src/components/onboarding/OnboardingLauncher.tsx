
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { OnboardingModal } from './OnboardingModal';
import { OnboardingProvider } from './OnboardingProvider';
import { usePermissions } from '../../hooks/usePermissions';
import { ONBOARDING_CONSTANTS } from '../../utils/constants/onboarding';
import { 
  Rocket, 
  X
} from 'lucide-react';

export const OnboardingLauncher: React.FC = () => {
  const navigate = useNavigate();
  const { userType, userTypeLabel } = usePermissions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showReminder, setShowReminder] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(ONBOARDING_CONSTANTS.STORAGE_KEYS.ONBOARDING_DISMISSED);
    const progress = localStorage.getItem(
      `${ONBOARDING_CONSTANTS.STORAGE_KEYS.PROGRESS_PREFIX}${userType}`
    );
    
    setIsDismissed(dismissed === 'true');
    
    if (!dismissed && !progress) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
      }, ONBOARDING_CONSTANTS.TIMEOUTS.AUTO_OPEN_MODAL);
      return () => clearTimeout(timer);
    } else if (progress && !dismissed) {
      try {
        const progressData = JSON.parse(progress);
        const completedSteps = progressData.completedStepIds?.length || 0;
        
        if (completedSteps === 0) {
          setShowReminder(true);
        } else {
          const expectedSteps = ONBOARDING_CONSTANTS.EXPECTED_STEPS[userType as keyof typeof ONBOARDING_CONSTANTS.EXPECTED_STEPS] || 1;
          const hasIncompleteSteps = completedSteps < expectedSteps;
          
          if (hasIncompleteSteps) {
            setShowReminder(true);
          } else {
            localStorage.setItem(ONBOARDING_CONSTANTS.STORAGE_KEYS.ONBOARDING_DISMISSED, 'true');
            navigate('/app');
          }
        }
      } catch (error) {
        console.error('Error parsing onboarding progress:', error);
        setShowReminder(true);
      }
    }
  }, [navigate, userType]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setShowReminder(false);
    localStorage.setItem(ONBOARDING_CONSTANTS.STORAGE_KEYS.ONBOARDING_DISMISSED, 'true');
  };

  const handleStartOnboarding = () => {
    setIsModalOpen(true);
    setShowReminder(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    
    const progress = localStorage.getItem(
      `${ONBOARDING_CONSTANTS.STORAGE_KEYS.PROGRESS_PREFIX}${userType}`
    );
    
    if (progress) {
      try {
        const progressData = JSON.parse(progress);
        const completedSteps = progressData.completedStepIds?.length || 0;
        const expectedSteps = ONBOARDING_CONSTANTS.EXPECTED_STEPS[userType as keyof typeof ONBOARDING_CONSTANTS.EXPECTED_STEPS] || 1;
        
        if (completedSteps >= expectedSteps) {
          localStorage.setItem(ONBOARDING_CONSTANTS.STORAGE_KEYS.ONBOARDING_DISMISSED, 'true');
          navigate('/app');
        }
      } catch (error) {
        console.error('Error checking onboarding completion:', error);
      }
    }
  };

  if (isDismissed && !showReminder) return null;

  return (
    <OnboardingProvider>
      {showReminder && (
        <Card className="fixed bottom-6 right-6 w-72 z-50 shadow-lg border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="p-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Rocket className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-gray-900">Onboarding CS360°</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="h-5 w-5 p-0 text-gray-500 hover:text-gray-700"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
            
            <div className="mb-2">
              <Badge variant="outline" className="mb-2 text-xs">
                {userTypeLabel}
              </Badge>
              <p className="text-xs text-gray-600">
                Complete seu onboarding personalizado para começar a usar o CS360°.
              </p>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                onClick={handleStartOnboarding}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xs h-7"
              >
                Iniciar
              </Button>
              <Button 
                variant="outline" 
                onClick={handleDismiss}
                className="text-xs h-7 px-2"
              >
                Depois
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <OnboardingModal 
        isOpen={isModalOpen} 
        onClose={handleModalClose} 
      />
    </OnboardingProvider>
  );
};
