
import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavigationItem } from './NavigationItem';
import { Handshake, Gift, ExternalLink } from 'lucide-react';

const partnerItems = [
  { icon: Handshake, label: 'Gestão de Parceiros', path: '/partners', color: 'from-blue-500 to-indigo-500' },
  { icon: Gift, label: 'Campanhas & Benefícios', path: '/campaigns', color: 'from-pink-500 to-purple-500' },
  { icon: ExternalLink, label: 'Portal do Parceiro', path: '/partner-portal', color: 'from-green-500 to-teal-500' },
];

interface SidebarPartnersProps {
  collapsed: boolean;
  isMobile: boolean;
  onClose: () => void;
}

export const SidebarPartners: React.FC<SidebarPartnersProps> = ({
  collapsed,
  isMobile,
  onClose
}) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  if (collapsed) return null;

  return (
    <div className="pt-8">
      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-4">
        Programa de Parceiros
      </div>
      <div className="space-y-2">
        {partnerItems.map((item, index) => (
          <NavigationItem
            key={index}
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
    </div>
  );
};
