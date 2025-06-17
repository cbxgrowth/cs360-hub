
import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavigationItem } from './NavigationItem';
import { UserCheck, Shield } from 'lucide-react';
import { usePermissions } from '@/hooks/usePermissions';

interface SidebarAdminProps {
  collapsed: boolean;
  isMobile: boolean;
  onClose: () => void;
}

export const SidebarAdmin: React.FC<SidebarAdminProps> = ({
  collapsed,
  isMobile,
  onClose
}) => {
  const location = useLocation();
  const { isAdmin, isSuperAdmin } = usePermissions();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const adminItems = [];

  if (isSuperAdmin) {
    adminItems.push({ 
      icon: Shield, 
      label: 'Super Admin', 
      path: '/super-admin', 
      color: 'from-red-500 to-pink-500' 
    });
  } else if (isAdmin) {
    adminItems.push({ 
      icon: UserCheck, 
      label: 'Administração', 
      path: '/admin', 
      color: 'from-gray-500 to-slate-500' 
    });
  }

  if (adminItems.length === 0) {
    return null;
  }

  return (
    <div className="pt-8">
      {!collapsed && (
        <div className="px-4 mb-3 text-xs font-semibold tracking-wider text-slate-500 uppercase">
          {isSuperAdmin ? 'Plataforma' : 'Administração'}
        </div>
      )}
      <div className="space-y-2">
        {adminItems.map((item, index) => (
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
