
import { useMemo } from 'react';
import { useAuth } from './useAuth';
import { 
  getUserType, 
  hasUserAccess, 
  getUserTypeLabel,
  isAdmin as isAdminCheck,
  isSuperAdmin as isSuperAdminCheck,
  isPartner as isPartnerCheck,
  canAccessFeature,
  getAICreditsLimit,
  canUseAI,
  getPartnerPlanType,
  getPartnerStatus,
  getNextPartnerLevel
} from '@/utils/userPermissions';
import type { UserType } from '@/utils/userPermissions';

interface NavigationItem {
  icon: any;
  label: string;
  path: string;
  color: string;
  roles: string[];
}

interface PermissionHookReturn {
  userType: UserType;
  userTypeLabel: string;
  hasAccess: (roles: string[]) => boolean;
  filterNavigationItems: (items: NavigationItem[]) => NavigationItem[];
  canAccessFeature: (feature: string) => boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isPartner: boolean;
  aiCreditsLimit: number;
  canUseAI: boolean;
  // Informações específicas para parceiros
  partnerPlan?: 'starter' | 'professional' | 'growth';
  partnerStatus?: string;
  nextPartnerLevel?: { nextLevel: string; salesNeeded: number } | null;
  salesCount?: number;
  firstSaleConfirmed?: boolean;
}

export const usePermissions = (): PermissionHookReturn => {
  const { profile } = useAuth();

  const userType = useMemo(() => getUserType(profile), [profile]);
  const userTypeLabel = useMemo(() => getUserTypeLabel(profile), [profile]);

  const hasAccess = useMemo(() => 
    (roles: string[]) => hasUserAccess(userType, roles),
    [userType]
  );

  const filterNavigationItems = useMemo(() => 
    (items: NavigationItem[]) => items.filter(item => hasAccess(item.roles)),
    [hasAccess]
  );

  const canAccessFeatureCheck = useMemo(() => 
    (feature: string) => canAccessFeature(profile, feature),
    [profile]
  );

  const isAdmin = useMemo(() => isAdminCheck(profile), [profile]);

  const isSuperAdmin = useMemo(() => isSuperAdminCheck(profile), [profile]);

  const isPartner = useMemo(() => isPartnerCheck(profile), [profile]);

  const aiCreditsLimit = useMemo(() => getAICreditsLimit(profile), [profile]);

  const canUseAIFeatures = useMemo(() => canUseAI(profile), [profile]);

  // Informações específicas para parceiros
  const partnerPlan = useMemo(() => 
    isPartner ? getPartnerPlanType(profile) : undefined,
    [isPartner, profile]
  );

  const partnerStatus = useMemo(() => 
    isPartner ? getPartnerStatus(profile) : undefined,
    [isPartner, profile]
  );

  const nextPartnerLevel = useMemo(() => 
    isPartner ? getNextPartnerLevel(profile) : undefined,
    [isPartner, profile]
  );

  const salesCount = useMemo(() => 
    profile?.partner_sales_count || 0,
    [profile]
  );

  const firstSaleConfirmed = useMemo(() => 
    profile?.first_sale_confirmed || false,
    [profile]
  );

  return {
    userType,
    userTypeLabel,
    hasAccess,
    filterNavigationItems,
    canAccessFeature: canAccessFeatureCheck,
    isAdmin,
    isSuperAdmin,
    isPartner,
    aiCreditsLimit,
    canUseAI: canUseAIFeatures,
    partnerPlan,
    partnerStatus,
    nextPartnerLevel,
    salesCount,
    firstSaleConfirmed
  };
};
