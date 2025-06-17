
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { BarChart3, Users, DollarSign, Award, MessageCircle, Megaphone, UserCheck, FileBarChart } from 'lucide-react';

interface PartnerNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const PartnerNavigation: React.FC<PartnerNavigationProps> = ({
  activeTab,
  onTabChange
}) => {
  const navigationItems = [
    {
      value: 'dashboard',
      icon: BarChart3,
      label: 'Dashboard'
    },
    {
      value: 'referrals',
      icon: Users,
      label: 'Indicações'
    },
    {
      value: 'commissions',
      icon: DollarSign,
      label: 'Comissões'
    },
    {
      value: 'clients',
      icon: UserCheck,
      label: 'Clientes'
    },
    {
      value: 'marketing',
      icon: Megaphone,
      label: 'Marketing'
    },
    {
      value: 'certifications',
      icon: Award,
      label: 'Certificações'
    },
    {
      value: 'reports',
      icon: FileBarChart,
      label: 'Relatórios'
    },
    {
      value: 'support',
      icon: MessageCircle,
      label: 'Suporte'
    }
  ];

  return (
    <div className="rounded-2xl p-2 shadow-sm border bg-transparent">
      <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-1">
        {navigationItems.map(item => (
          <TabsTrigger 
            key={item.value} 
            value={item.value} 
            className="flex items-center space-x-2 px-3 py-2" 
            onClick={() => onTabChange(item.value)}
          >
            <item.icon className="w-4 h-4 text-white" />
            <span className="hidden sm:block text-white">{item.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
};
