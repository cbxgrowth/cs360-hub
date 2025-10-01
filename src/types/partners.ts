
export type PartnerType = 'indicacao' | 'revenda' | 'implementadora' | 'white-label';

export type PartnerLevel = 'starter' | 'member' | 'gold' | 'platinum' | 'elite';

export type PlanType = 'starter' | 'professional' | 'growth' | 'enterprise';

export type CertificationType = 'vendas' | 'implantacao' | 'sucesso' | 'suporte' | 'marca';

export type ServicePackageType = 'implantacao' | 'treinamento' | 'cs-terceirizado' | 'consultoria';

export interface Partner {
  id: string;
  name: string;
  email: string;
  type: PartnerType;
  level: PartnerLevel;
  status: 'pending' | 'approved' | 'suspended';
  activeClients: number;
  mrr: number;
  nps: number;
  certifications: CertificationType[];
  referralLink: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Commission {
  id: string;
  partnerId: string;
  type: 'indicacao' | 'revenda' | 'implementacao';
  amount: number;
  plan: PlanType;
  status: 'pending' | 'paid' | 'cancelled';
  referenceMonth: string;
  createdAt: Date;
}

export interface ReferralCampaign {
  id: string;
  name: string;
  description: string;
  type: 'partner' | 'client';
  rewards: {
    type: 'cashback' | 'tokens' | 'features' | 'integrations';
    value: number;
    description: string;
  }[];
  validFrom: Date;
  validTo: Date;
  isActive: boolean;
}

export interface ServicePackage {
  id: string;
  name: string;
  type: ServicePackageType;
  priceMin: number;
  priceMax: number;
  description: string;
  requirements: PartnerLevel[];
  isActive: boolean;
}

export interface AICredit {
  id: string;
  provider: 'openai' | 'claude' | 'gemini' | 'mistral';
  packageName: string;
  credits: number;
  price: number;
  isActive: boolean;
}

// Partner Links System Types
export interface PartnerLink {
  id: string;
  partner_id: string;
  code: string;
  url: string;
  short_url?: string;
  name: string;
  type: 'general' | 'plan' | 'trial' | 'custom';
  target_plan?: string;
  custom_params?: string;
  clicks: number;
  conversions: number;
  revenue: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PartnerLinkClick {
  id: string;
  link_id: string;
  link_code: string;
  ip_address?: string;
  user_agent?: string;
  referrer?: string;
  country?: string;
  city?: string;
  device_type?: 'desktop' | 'mobile' | 'tablet';
  clicked_at: string;
}

export interface PartnerConversion {
  id: string;
  link_id: string;
  link_code: string;
  user_id: string;
  plan: string;
  amount: number;
  converted_at: string;
}

export interface PartnerLinkStats {
  total_links: number;
  total_clicks: number;
  total_conversions: number;
  total_revenue: number;
  conversion_rate: number;
  average_revenue_per_conversion: number;
  top_performing_link?: PartnerLink;
}

export interface CreatePartnerLinkInput {
  name: string;
  type: 'general' | 'plan' | 'trial' | 'custom';
  target_plan?: string;
  custom_params?: string;
}
