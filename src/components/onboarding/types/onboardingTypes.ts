
import { ComponentType } from 'react';

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  isRequired: boolean;
  isCompleted: boolean;
  xpReward: number;
  estimatedTime: number;
  component: ComponentType<any>;
  allowedRoles: string[];
}

export interface UserProfile {
  userType: string;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isPartner: boolean;
}

export type OnboardingProfile = 
  | 'super_admin'
  | 'account_admin'
  | 'enterprise'
  | 'professional'
  | 'starter'
  | 'partner';
