
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, LucideIcon } from 'lucide-react';

interface DropdownItem {
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
}

interface DropdownConfig {
  title: string;
  items: DropdownItem[];
}

interface NavigationDropdownProps {
  item: {
    label: string;
    href: string;
    icon: React.ComponentType<any>;
    dropdown?: DropdownConfig;
  };
  isActive: boolean;
  onToggle: () => void;
  onClose: () => void;
  isCompact?: boolean;
}

export const NavigationDropdown: React.FC<NavigationDropdownProps> = ({
  item,
  isActive,
  onToggle,
  onClose,
  isCompact = false
}) => {
  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle();
  };

  if (!item.dropdown) {
    return (
      <Link
        to={item.href}
        className={`flex items-center space-x-2 px-4 py-3 text-slate-700 hover:text-blue-600 transition-all duration-200 font-medium rounded-xl hover:bg-blue-50/80 ${
          isCompact ? 'px-3' : 'px-4'
        }`}
        title={isCompact ? item.label : undefined}
      >
        <item.icon className="w-4 h-4" />
        {!isCompact && <span>{item.label}</span>}
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        className={`flex items-center space-x-2 px-4 py-3 text-slate-700 hover:text-blue-600 transition-all duration-200 font-medium rounded-xl hover:bg-blue-50/80 group ${
          isCompact ? 'px-3' : 'px-4'
        } ${isActive ? 'bg-blue-50 text-blue-600' : ''}`}
        onClick={handleToggle}
        title={isCompact ? item.label : undefined}
      >
        <item.icon className="w-4 h-4" />
        {!isCompact && (
          <>
            <span>{item.label}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`} />
          </>
        )}
      </button>
      
      {isActive && (
        <div className="absolute top-full left-0 mt-1 w-[600px] bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden z-[9999] animate-in fade-in-0 zoom-in-95 duration-200">
          {/* Header do Dropdown */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-4 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-1">{item.dropdown.title}</h3>
            <p className="text-sm text-slate-600">Explore nossas funcionalidades</p>
          </div>
          
          {/* Items do Dropdown em Grid Horizontal */}
          <div className="p-4">
            <div className="grid grid-cols-2 gap-3">
              {item.dropdown.items.map((dropdownItem, index) => (
                <Link
                  key={index}
                  to={dropdownItem.href}
                  className="group/item flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-50 transition-all duration-200 border border-transparent hover:border-slate-200/50 hover:shadow-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:scale-105 transition-transform duration-200 shadow-sm">
                    <dropdownItem.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-900 group-hover/item:text-blue-600 transition-colors duration-200 text-sm mb-1">
                      {dropdownItem.label}
                    </div>
                    <div className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {dropdownItem.description}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Footer do Dropdown */}
          <div className="bg-slate-50 px-6 py-3 border-t border-slate-100">
            <Link
              to="/features"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              Ver todas as funcionalidades →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
