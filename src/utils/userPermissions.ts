
export interface UserProfile {
  user_type?: string;
  plan_type?: string;
  id?: string;
  user_id?: string;
  email?: string;
  ai_credits?: number;
  // Campos específicos para parceiros
  partner_sales_count?: number;
  partner_level?: 'starter' | 'member' | 'gold' | 'platinum' | 'elite';
  first_sale_confirmed?: boolean;
}

export type UserType = 'starter' | 'professional' | 'growth' | 'enterprise' | 'account_admin' | 'super_admin' | 'partner';

export const isSuperAdmin = (profile: UserProfile | null): boolean => {
  return getUserType(profile) === 'super_admin';
};

export const isAdmin = (profile: UserProfile | null): boolean => {
  const userType = getUserType(profile);
  return ['account_admin', 'super_admin'].includes(userType);
};

export const isPremiumUser = (profile: UserProfile | null): boolean => {
  return ['professional', 'growth', 'enterprise'].includes(profile?.plan_type || '');
};

export const isPartner = (profile: UserProfile | null): boolean => {
  return profile?.user_type === 'partner' || getUserType(profile) === 'partner';
};

// Função para determinar o plano do parceiro baseado nas vendas
export const getPartnerPlanType = (profile: UserProfile | null): 'starter' | 'professional' | 'growth' => {
  if (!isPartner(profile)) return 'starter';
  
  const salesCount = profile?.partner_sales_count || 0;
  const firstSaleConfirmed = profile?.first_sale_confirmed || false;
  
  // Se não confirmou primeira venda, não tem acesso gratuito
  if (!firstSaleConfirmed) return 'starter';
  
  // Baseado nas vendas, avança para planos superiores
  if (salesCount >= 20) return 'growth';
  if (salesCount >= 10) return 'professional';
  
  return 'starter'; // Plano gratuito após primeira venda confirmada
};

export const hasFeatureAccess = (profile: UserProfile | null, feature: string): boolean => {
  const planFeatures = {
    starter: ['basic_dashboard', 'clients', 'reports', 'basic_ai'],
    professional: ['basic_dashboard', 'clients', 'reports', 'advanced_analytics', 'ai_insights', 'automations', 'api_basic'],
    growth: ['basic_dashboard', 'clients', 'reports', 'advanced_analytics', 'ai_insights', 'automations', 'api_complete', 'csm_dedicated'],
    enterprise: ['basic_dashboard', 'clients', 'reports', 'advanced_analytics', 'ai_insights', 'automations', 'api_enterprise', 'csm_dedicated', 'custom_integrations', 'unlimited_ai'],
    partner: ['partner_portal', 'partner_dashboard'],
    account_admin: ['all_features'],
    super_admin: ['all_features', 'system_admin']
  };

  // Para parceiros, usar o plano baseado nas vendas
  let userPlan: keyof typeof planFeatures;
  
  if (isPartner(profile)) {
    const partnerPlan = getPartnerPlanType(profile);
    userPlan = partnerPlan;
  } else {
    userPlan = (profile?.plan_type || 'starter') as keyof typeof planFeatures;
  }
  
  const features = planFeatures[userPlan] || planFeatures.starter;
  
  return features.includes('all_features') || features.includes(feature);
};

// AI Credits per plan per month - incluindo lógica para parceiros
export const getAICreditsLimit = (profile: UserProfile | null): number => {
  const planCredits = {
    starter: 10,
    professional: 30,
    growth: 50,
    enterprise: -1, // Unlimited
    super_admin: -1,
    account_admin: -1
  };

  // Para parceiros, usar o plano baseado nas vendas
  if (isPartner(profile)) {
    const partnerPlan = getPartnerPlanType(profile);
    return planCredits[partnerPlan];
  }

  const userPlan = (profile?.plan_type || 'starter') as keyof typeof planCredits;
  return planCredits[userPlan] || planCredits.starter;
};

// Check if user can use AI features
export const canUseAI = (profile: UserProfile | null): boolean => {
  if (!profile) return false;
  
  // Para parceiros, verificar se confirmou primeira venda
  if (isPartner(profile) && !profile.first_sale_confirmed) {
    return false; // Parceiros sem primeira venda confirmada não têm acesso à IA
  }
  
  const creditsLimit = getAICreditsLimit(profile);
  const currentCredits = profile.ai_credits || 0;
  
  // Unlimited credits
  if (creditsLimit === -1) return true;
  
  // Has remaining credits
  return currentCredits > 0;
};

// Função para obter o tipo de usuário
export const getUserType = (profile: UserProfile | null): UserType => {
  if (!profile) return 'starter';
  
  // Adicionado para fins de desenvolvimento
  if (profile.email === 'cbxgrowth@gmail.com') {
    return 'super_admin';
  }
  
  // Priorizar user_type se existir
  if (profile.user_type) {
    switch (profile.user_type) {
      case 'super_admin': return 'super_admin';
      case 'account_admin': return 'account_admin';
      case 'partner': return 'partner';
      default: break;
    }
  }
  
  // Fallback para plan_type
  switch (profile.plan_type) {
    case 'super_admin': return 'super_admin';
    case 'account_admin': return 'account_admin';
    case 'enterprise': return 'enterprise';
    case 'professional': return 'professional';
    case 'growth': return 'growth';
    case 'starter': return 'starter';
    case 'partner': return 'partner';
    default: return 'starter';
  }
};

// Função para verificar se o usuário tem acesso baseado em roles
export const hasUserAccess = (userType: UserType, requiredRoles: string[]): boolean => {
  // Super admin tem acesso a tudo
  if (userType === 'super_admin') return true;
  
  // Se 'all' está nas roles requeridas, todos têm acesso
  if (requiredRoles.includes('all')) return true;
  
  // Verificar se o tipo de usuário está nas roles requeridas
  if (requiredRoles.includes(userType)) return true;
  
  // Hierarquia de acesso
  const hierarchy: Record<UserType, UserType[]> = {
    'super_admin': ['super_admin', 'account_admin', 'enterprise', 'growth', 'professional', 'starter', 'partner'],
    'account_admin': ['account_admin', 'enterprise', 'growth', 'professional', 'starter'],
    'enterprise': ['enterprise', 'growth', 'professional', 'starter'],
    'growth': ['growth', 'professional', 'starter'],
    'professional': ['professional', 'starter'],
    'starter': ['starter'],
    'partner': ['partner', 'starter'] // Parceiros têm acesso básico
  };
  
  const allowedTypes = hierarchy[userType] || [];
  return requiredRoles.some(role => allowedTypes.includes(role as UserType));
};

// Função para obter o label do tipo de usuário
export const getUserTypeLabel = (profile: UserProfile | null): string => {
  const userType = getUserType(profile);
  
  // Para parceiros, mostrar o plano atual baseado nas vendas
  if (isPartner(profile)) {
    const partnerPlan = getPartnerPlanType(profile);
    const salesCount = profile?.partner_sales_count || 0;
    const firstSaleConfirmed = profile?.first_sale_confirmed || false;
    
    if (!firstSaleConfirmed) {
      return 'Parceiro - Aguardando Primeira Venda';
    }
    
    const planLabels = {
      'starter': 'Parceiro - Starter',
      'professional': 'Parceiro - Professional',
      'growth': 'Parceiro - Growth'
    };
    
    return `${planLabels[partnerPlan]} (${salesCount} vendas)`;
  }
  
  const labels: Record<UserType, string> = {
    'super_admin': 'Super Administrador',
    'account_admin': 'Administrador da Conta',
    'enterprise': 'Enterprise',
    'growth': 'Growth',
    'professional': 'Professional',
    'starter': 'Starter',
    'partner': 'Parceiro'
  };
  
  return labels[userType] || 'Usuário';
};

// Função para verificar se pode acessar uma feature específica
export const canAccessFeature = (profile: UserProfile | null, feature: string): boolean => {
  const userType = getUserType(profile);
  
  // Mapeamento de features para roles necessárias
  const featurePermissions: Record<string, UserType[]> = {
    'super_admin_panel': ['super_admin'],
    'advanced_reports': ['professional', 'growth', 'enterprise', 'account_admin', 'super_admin'],
    'partner_management': ['super_admin'],
    'user_management': ['account_admin', 'super_admin'],
    'billing_management': ['account_admin', 'super_admin'],
    'partner_portal': ['partner'],
    'basic_features': ['starter', 'professional', 'growth', 'enterprise', 'account_admin', 'super_admin', 'partner'],
    'ai_features': ['starter', 'professional', 'growth', 'enterprise', 'account_admin', 'super_admin', 'partner'],
    'ai_advanced': ['professional', 'growth', 'enterprise', 'account_admin', 'super_admin'],
    'automations': ['professional', 'growth', 'enterprise', 'account_admin', 'super_admin'],
    'csm_dedicated': ['growth', 'enterprise', 'account_admin', 'super_admin'],
    'api_access': ['professional', 'growth', 'enterprise', 'account_admin', 'super_admin']
  };
  
  const requiredRoles = featurePermissions[feature];
  if (!requiredRoles) return true; // Se não está mapeado, permite acesso
  
  // Para parceiros, verificar acesso baseado no plano atual
  if (isPartner(profile)) {
    const partnerPlan = getPartnerPlanType(profile);
    return requiredRoles.includes(partnerPlan as UserType) || requiredRoles.includes('partner');
  }
  
  return hasUserAccess(userType, requiredRoles);
};

// Função para validar perfil
export const validateProfile = (profile: any): profile is UserProfile => {
  if (!profile || typeof profile !== 'object') return false;
  
  // Deve ter pelo menos um ID
  if (!profile.id && !profile.user_id) return false;
  
  // Se tem user_type, deve ser válido
  if (profile.user_type) {
    const validUserTypes = ['super_admin', 'account_admin', 'enterprise', 'growth', 'professional', 'starter', 'partner'];
    if (!validUserTypes.includes(profile.user_type)) return false;
  }
  
  // Se tem plan_type, deve ser válido
  if (profile.plan_type) {
    const validPlanTypes = ['super_admin', 'account_admin', 'enterprise', 'growth', 'professional', 'starter', 'partner'];
    if (!validPlanTypes.includes(profile.plan_type)) return false;
  }
  
  return true;
};

// Funções específicas para parceiros
export const getPartnerStatus = (profile: UserProfile | null): string => {
  if (!isPartner(profile)) return 'N/A';
  
  const firstSaleConfirmed = profile?.first_sale_confirmed || false;
  const salesCount = profile?.partner_sales_count || 0;
  
  if (!firstSaleConfirmed) return 'Aguardando Primeira Venda';
  
  const partnerPlan = getPartnerPlanType(profile);
  return `Ativo - ${partnerPlan.charAt(0).toUpperCase() + partnerPlan.slice(1)} (${salesCount} vendas)`;
};

export const getNextPartnerLevel = (profile: UserProfile | null): { nextLevel: string; salesNeeded: number } | null => {
  if (!isPartner(profile)) return null;
  
  const salesCount = profile?.partner_sales_count || 0;
  
  if (salesCount < 10) {
    return { nextLevel: 'Professional', salesNeeded: 10 - salesCount };
  } else if (salesCount < 20) {
    return { nextLevel: 'Growth', salesNeeded: 20 - salesCount };
  }
  
  return null; // Já no nível máximo
};
