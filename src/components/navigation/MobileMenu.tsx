
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Star, Globe, ChevronDown } from 'lucide-react';
import { navigationItems } from '../../data/navigationData';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
        {navigationItems.map((item) => (
          <div key={item.label}>
            {item.dropdown ? (
              <>
                <button
                  onClick={() => toggleDropdown(item.label)}
                  className="flex items-center justify-between w-full px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium"
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                    openDropdown === item.label ? 'rotate-180' : ''
                  }`} />
                </button>
                {openDropdown === item.label && (
                  <div className="ml-8 mt-2 space-y-1">
                    {item.dropdown.items.map((dropdownItem, index) => (
                      <Link
                        key={index}
                        to={dropdownItem.href}
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        onClick={onClose}
                      >
                        <dropdownItem.icon className="w-4 h-4" />
                        <span>{dropdownItem.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.href}
                className="flex items-center space-x-3 px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium"
                onClick={onClose}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            )}
          </div>
        ))}
        
        <div className="pt-4 border-t border-slate-200 mt-4 space-y-3">
          <Link to="/login">
            <Button variant="outline" className="w-full justify-start border-slate-300 hover:bg-slate-50">
              <Globe className="w-4 h-4 mr-2" />
              Entrar
            </Button>
          </Link>
          <Link to="/register">
            <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Star className="w-4 h-4 mr-2" />
              Teste Grátis
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
