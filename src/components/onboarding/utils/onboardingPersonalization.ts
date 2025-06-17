
import { OnboardingStep, OnboardingProfile } from '../types/onboardingTypes';
import { WelcomeStep } from '../steps/WelcomeStep';
import { CompanySetupStep } from '../steps/CompanySetupStep';
import { UsersSetupStep } from '../steps/UsersSetupStep';
import { PlanSetupStep } from '../steps/PlanSetupStep';
import { SystemSetupStep } from '../steps/SystemSetupStep';

const baseSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Boas-vindas e Introdução',
    description: 'Conheça a plataforma CS360° em 1 minuto',
    isRequired: true,
    isCompleted: false,
    xpReward: 10,
    estimatedTime: 3,
    component: WelcomeStep,
    allowedRoles: ['all']
  },
  {
    id: 'company-setup',
    title: 'Configuração da Empresa',
    description: 'Configure nome, logo, setor e fuso horário',
    isRequired: true,
    isCompleted: false,
    xpReward: 20,
    estimatedTime: 4,
    component: CompanySetupStep,
    allowedRoles: ['super_admin', 'account_admin', 'enterprise']
  },
  {
    id: 'users-setup',
    title: 'Usuários e Permissões',
    description: 'Adicione usuários e defina cargos',
    isRequired: true,
    isCompleted: false,
    xpReward: 25,
    estimatedTime: 5,
    component: UsersSetupStep,
    allowedRoles: ['super_admin', 'account_admin', 'enterprise']
  },
  {
    id: 'plan-setup',
    title: 'Plano e Pagamento',
    description: 'Escolha o plano e configure pagamento',
    isRequired: true,
    isCompleted: false,
    xpReward: 30,
    estimatedTime: 3,
    component: PlanSetupStep,
    allowedRoles: ['super_admin', 'account_admin']
  },
  {
    id: 'system-setup',
    title: 'Configurações do Sistema',
    description: 'Ajuste idioma e integrações principais',
    isRequired: false,
    isCompleted: false,
    xpReward: 15,
    estimatedTime: 4,
    component: SystemSetupStep,
    allowedRoles: ['super_admin', 'account_admin', 'enterprise', 'professional']
  }
];

export const getPersonalizedSteps = (userProfile: OnboardingProfile): OnboardingStep[] => {
  const profileConfig = getProfileConfig(userProfile);
  
  return baseSteps
    .filter(step => 
      step.allowedRoles.includes('all') || 
      step.allowedRoles.includes(userProfile) ||
      step.allowedRoles.some(role => profileConfig.inheritedRoles.includes(role))
    )
    .map(step => ({
      ...step,
      title: personalizeStepTitle(step, userProfile),
      description: personalizeStepDescription(step, userProfile),
      isRequired: determineStepRequirement(step, userProfile)
    }));
};

const getProfileConfig = (profile: OnboardingProfile) => {
  const configs = {
    super_admin: {
      name: 'Super Administrador',
      inheritedRoles: ['super_admin', 'account_admin', 'enterprise', 'professional', 'starter'],
      primaryFocus: 'system_management'
    },
    account_admin: {
      name: 'Administrador da Conta',
      inheritedRoles: ['account_admin', 'enterprise', 'professional', 'starter'],
      primaryFocus: 'account_management'
    },
    enterprise: {
      name: 'Usuário Enterprise',
      inheritedRoles: ['enterprise', 'professional', 'starter'],
      primaryFocus: 'team_management'
    },
    professional: {
      name: 'Usuário Profissional',
      inheritedRoles: ['professional', 'starter'],
      primaryFocus: 'individual_productivity'
    },
    starter: {
      name: 'Usuário Starter',
      inheritedRoles: ['starter'],
      primaryFocus: 'basic_features'
    },
    partner: {
      name: 'Parceiro',
      inheritedRoles: ['partner'],
      primaryFocus: 'partner_portal'
    }
  };
  
  return configs[profile];
};

const personalizeStepTitle = (step: OnboardingStep, profile: OnboardingProfile): string => {
  const personalizations: Record<string, Record<OnboardingProfile, string>> = {
    'company-setup': {
      super_admin: 'Configuração do Sistema',
      account_admin: 'Configuração da Conta',
      enterprise: 'Configuração da Equipe',
      professional: 'Configuração do Perfil',
      starter: 'Configuração Básica',
      partner: 'Configuração do Parceiro'
    },
    'users-setup': {
      super_admin: 'Gerenciamento de Usuários',
      account_admin: 'Configuração da Equipe',
      enterprise: 'Adicionar Membros',
      professional: 'Configuração de Acesso',
      starter: 'Configuração de Acesso',
      partner: 'Equipe do Parceiro'
    },
    'system-setup': {
      super_admin: 'Configurações Avançadas',
      account_admin: 'Integrações e Preferências',
      enterprise: 'Configurações da Empresa',
      professional: 'Preferências Pessoais',
      starter: 'Configurações Básicas',
      partner: 'Portal do Parceiro'
    }
  };
  
  return personalizations[step.id]?.[profile] || step.title;
};

const personalizeStepDescription = (step: OnboardingStep, profile: OnboardingProfile): string => {
  const personalizations: Record<string, Record<OnboardingProfile, string>> = {
    'company-setup': {
      super_admin: 'Configure parâmetros globais do sistema',
      account_admin: 'Configure informações da sua organização',
      enterprise: 'Configure dados da sua equipe e empresa',
      professional: 'Configure seu perfil profissional',
      starter: 'Configure informações básicas',
      partner: 'Configure dados do seu negócio parceiro'
    },
    'users-setup': {
      super_admin: 'Gerencie todos os usuários da plataforma',
      account_admin: 'Adicione e configure sua equipe',
      enterprise: 'Convide membros e defina permissões',
      professional: 'Configure preferências de acesso',
      starter: 'Configure preferências de acesso',
      partner: 'Gerencie sua equipe de parceiros'
    }
  };
  
  return personalizations[step.id]?.[profile] || step.description;
};

const determineStepRequirement = (step: OnboardingStep, profile: OnboardingProfile): boolean => {
  // Etapas obrigatórias por perfil
  const requiredSteps: Record<OnboardingProfile, string[]> = {
    super_admin: ['welcome', 'company-setup', 'users-setup', 'plan-setup'],
    account_admin: ['welcome', 'company-setup', 'users-setup', 'plan-setup'],
    enterprise: ['welcome', 'company-setup', 'users-setup'],
    professional: ['welcome', 'company-setup'],
    starter: ['welcome'],
    partner: ['welcome', 'company-setup']
  };
  
  return requiredSteps[profile]?.includes(step.id) || false;
};
