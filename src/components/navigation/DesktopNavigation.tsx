
import React from 'react';
import { NavigationDropdown } from './NavigationDropdown';
import { navigationItems } from '../../data/navigationData';

interface DesktopNavigationProps {
  activeDropdown: string | null;
  onDropdownToggle: (label: string) => void;
  onDropdownClose: () => void;
  isCompact?: boolean;
}

export const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  activeDropdown,
  onDropdownToggle,
  onDropdownClose,
  isCompact = false
}) => {
  return (
    <nav className="hidden lg:flex items-center space-x-2">
      {navigationItems.map((item) => (
        <div key={item.label} className="relative">
          <NavigationDropdown
            item={item}
            isActive={activeDropdown === item.label}
            onToggle={() => onDropdownToggle(item.label)}
            onClose={onDropdownClose}
            isCompact={isCompact}
          />
        </div>
      ))}
    </nav>
  );
};
