
export interface Client {
  id: string;
  name: string;
  email: string;
  plan: import('./partners').PlanType;
  status: 'active' | 'inactive' | 'churned';
  mrr: number;
  partnerId?: string;
  referralLink?: string;
  referrals: ClientReferral[];
  aiCreditsUsed: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientReferral {
  id: string;
  referrerId: string;
  referredId: string;
  campaignId: string;
  status: 'pending' | 'converted' | 'expired';
  rewardGranted: boolean;
  convertedAt?: Date;
  createdAt: Date;
}

export interface ClientReward {
  id: string;
  clientId: string;
  campaignId: string;
  type: 'tokens' | 'features' | 'integrations' | 'vip-access';
  value: number;
  description: string;
  grantedAt: Date;
  expiresAt?: Date;
}
