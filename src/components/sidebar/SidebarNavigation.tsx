
import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavigationItem } from './NavigationItem';
import { usePermissions } from '@/hooks/usePermissions';
import { 
  Home,
  Users, 
  FileText, 
  Target, 
  TrendingUp, 
  ShoppingCart,
  Award,
  UserCheck,
  DollarSign,
  Zap,
  BarChart3,
  Goal,
  Handshake,
  Gift,
  ExternalLink,
  Settings,
  Shield
} from 'lucide-react';

// Configuração de navegação otimizada
const navigationConfig = {
  main: [
    { icon: Home, label: 'Dashboard', path: '/app', color: 'from-blue-500 to-cyan-500', roles: ['all'] },
    { icon: Goal, label: 'Gestão de Metas', path: '/goals', color: 'from-green-500 to-teal-500', roles: ['all'] },
    { icon: Users, label: 'Gestão de Clientes', path: '/clients', color: 'from-purple-500 to-pink-500', roles: ['all'] },
    { icon: FileText, label: 'Contratos', path: '/contracts', color: 'from-green-500 to-emerald-500', roles: ['all'] },
    { icon: ShoppingCart, label: 'Serviços & Upsell', path: '/services', color: 'from-orange-500 to-red-500', roles: ['all'] },
    { icon: Award, label: 'NPS', path: '/nps', color: 'from-yellow-500 to-orange-500', roles: ['all'] },
    { icon: DollarSign, label: 'LTV & CAC', path: '/ltvcac', color: 'from-indigo-500 to-purple-500', roles: ['all'] },
    { icon: Target, label: 'Estratégias', path: '/strategies', color: 'from-pink-500 to-rose-500', roles: ['all'] },
    { icon: Zap, label: 'Automação & IA', path: '/automation', color: 'from-cyan-500 to-blue-500', roles: ['all'] },
    { icon: BarChart3, label: 'Relatórios', path: '/reports', color: 'from-teal-500 to-green-500', roles: ['all'] },
  ],
  
  partnerManagement: [
    { icon: Handshake, label: 'Gestão de Parceiros', path: '/partners', color: 'from-blue-500 to-indigo-500', roles: ['super_admin'] },
    { icon: Gift, label: 'Campanhas & Benefícios', path: '/campaigns', color: 'from-pink-500 to-purple-500', roles: ['super_admin'] },
  ],
  
  partnerPortal: [
    { icon: ExternalLink, label: 'Portal do Parceiro', path: '/partner-portal', color: 'from-green-500 to-teal-500', roles: ['partner'] },
  ],
  
  admin: [
    { icon: UserCheck, label: 'Administração', path: '/admin', color: 'from-gray-500 to-slate-500', roles: ['account_admin', 'enterprise'] },
    { icon: Shield, label: 'Super Admin', path: '/super-admin', color: 'from-red-500 to-pink-500', roles: ['super_admin'] },
  ]
};

interface SidebarNavigationProps {
  collapsed: boolean;
  isMobile: boolean;
  onClose: () => void;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  collapsed,
  isMobile,
  onClose
}) => {
  const location = useLocation();
  const { filterNavigationItems, userTypeLabel } = usePermissions();

  const isActive = (path: string) => location.pathname === path;

  // Filtrar itens de navegação baseado nas permissões
  const filteredSections = {
    main: filterNavigationItems(navigationConfig.main),
    partnerManagement: filterNavigationItems(navigationConfig.partnerManagement),
    partnerPortal: filterNavigationItems(navigationConfig.partnerPortal),
    admin: filterNavigationItems(navigationConfig.admin)
  };

  const renderNavigationSection = (items: typeof navigationConfig.main, title?: string) => (
    <div className="space-y-2">
      {!collapsed && title && (
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-4">
          {title}
        </div>
      )}
      {items.map((item, index) => (
        <NavigationItem
          key={`${item.path}-${index}`}
          icon={item.icon}
          label={item.label}
          path={item.path}
          color={item.color}
          isActive={isActive(item.path)}
          collapsed={collapsed}
          isMobile={isMobile}
          onClose={onClose}
        />
      ))}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Navegação Principal */}
      {renderNavigationSection(filteredSections.main)}

      {/* Gestão de Parceiros */}
      {filteredSections.partnerManagement.length > 0 && (
        renderNavigationSection(
          filteredSections.partnerManagement, 
          collapsed ? undefined : 'Gestão de Parceiros'
        )
      )}

      {/* Portal do Parceiro */}
      {filteredSections.partnerPortal.length > 0 && (
        renderNavigationSection(
          filteredSections.partnerPortal,
          collapsed ? undefined : 'Portal do Parceiro'
        )
      )}

      {/* Administração */}
      {filteredSections.admin.length > 0 && (
        renderNavigationSection(
          filteredSections.admin,
          collapsed ? undefined : 'Administração'
        )
      )}

      {/* Indicador do tipo de usuário */}
      {!collapsed && (
        <div className="px-4 py-2 bg-slate-800/50 rounded-lg mx-2">
          <div className="text-xs text-slate-400 mb-1">Tipo de Acesso</div>
          <div className="text-sm font-medium text-slate-200">{userTypeLabel}</div>
        </div>
      )}
    </div>
  );
};
