
import React from 'react';
import { User, Shield, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProfileNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const ProfileNavigation = ({ activeSection, onSectionChange }: ProfileNavigationProps) => {
  const sections = [
    { id: 'personal', label: 'Informações pessoais', icon: User },
    { id: 'security', label: 'Segurança', icon: Shield },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'preferences', label: 'Preferências', icon: Settings },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Configurações
      </h2>
      
      <nav className="space-y-2">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          
          return (
            <Button
              key={section.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start ${
                isActive 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => onSectionChange(section.id)}
            >
              <Icon className="w-4 h-4 mr-3" />
              {section.label}
            </Button>
          );
        })}
      </nav>
    </div>
  );
};
