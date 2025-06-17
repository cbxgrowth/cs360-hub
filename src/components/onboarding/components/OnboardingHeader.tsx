
import React from 'react';
import { DialogTitle } from '../../ui/dialog';
import { Badge } from '../../ui/badge';
import { Star, Trophy, Crown, Shield, Users, Building } from 'lucide-react';
import type { OnboardingProfile } from '../types/onboardingTypes';

interface OnboardingHeaderProps {
  userProfile: OnboardingProfile;
  userTypeLabel: string;
  totalXP: number;
  isPlanUnlocked: boolean;
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
  return <Icon className="w-5 h-5 text-white" />;
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

export const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({
  userProfile,
  userTypeLabel,
  totalXP,
  isPlanUnlocked
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className={`p-2 bg-gradient-to-r ${getProfileColor(userProfile)} rounded-lg`}>
          {getProfileIcon(userProfile)}
        </div>
        <div>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Onboarding Personalizado
          </DialogTitle>
          <p className="text-gray-600 mt-1">
            Configuração personalizada para {userTypeLabel}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="font-semibold text-gray-900">{totalXP} XP</span>
          </div>
          <p className="text-xs text-gray-500">Pontos conquistados</p>
        </div>
        
        <Badge className={`bg-gradient-to-r ${getProfileColor(userProfile)} text-white border-0`}>
          {userTypeLabel}
        </Badge>
        
        {isPlanUnlocked && (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <Trophy className="w-3 h-3 mr-1" />
            Configuração Desbloqueada
          </Badge>
        )}
      </div>
    </div>
  );
};
