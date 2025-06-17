
import React, { useState } from 'react';
import { FileBarChart, Brain } from 'lucide-react';
import { Button } from './ui/button';
import { ThemeToggle } from './ui/theme-toggle';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from './header/SearchBar';
import { NotificationsPopover } from './header/NotificationsPopover';
import { HelpDropdown } from './header/HelpDropdown';
import { UserMenu } from './header/UserMenu';
import { AIRecommendationsPopover } from './header/AIRecommendationsPopover';

export const Header = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAIRecommendationsOpen, setIsAIRecommendationsOpen] = useState(false);
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      title: 'Novo cliente crítico',
      message: 'Cliente TechCorp está com NPS baixo',
      time: '5 min atrás',
      type: 'alert' as const
    },
    {
      id: 2,
      title: 'Meta alcançada',
      message: 'Você atingiu 95% da meta de CS',
      time: '1 hora atrás',
      type: 'success' as const
    },
    {
      id: 3,
      title: 'Reunião em breve',
      message: 'Review mensal em 30 minutos',
      time: '2 horas atrás',
      type: 'info' as const
    }
  ];

  const aiRecommendations = [
    {
      id: 1,
      title: 'Oportunidade de Upsell',
      message: 'TechCorp LTDA tem 85% de chance de upgrade para Premium',
      time: 'Agora',
      priority: 'high' as const,
      action: 'Ver Estratégia'
    },
    {
      id: 2,
      title: 'Cliente em Risco',
      message: 'BigCorp S.A. com NPS baixo (25) - ação recomendada',
      time: '10 min atrás',
      priority: 'critical' as const,
      action: 'Criar Ação'
    },
    {
      id: 3,
      title: 'Automação Sugerida',
      message: 'Implementar follow-up automático para segmento Starter',
      time: '30 min atrás',
      priority: 'medium' as const,
      action: 'Configurar'
    },
    {
      id: 4,
      title: 'Insight de Churn',
      message: 'Padrão identificado: clientes sem uso há 7 dias têm 60% mais chance de churn',
      time: '1 hora atrás',
      priority: 'medium' as const,
      action: 'Ver Análise'
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchValue);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleResumoClick = () => {
    navigate('/resumo');
  };

  const userInitials = profile?.full_name 
    ? profile.full_name.split(' ').map(name => name.charAt(0)).join('').toUpperCase()
    : 'U';

  const userEmail = profile?.id ? `user-${profile.id.slice(0, 8)}@empresa.com` : 'usuario@empresa.com';

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 transition-all duration-200 shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Search Section */}
        <SearchBar 
          value={searchValue}
          onChange={setSearchValue}
          onSubmit={handleSearch}
        />

        {/* Actions Section */}
        <div className="flex items-center space-x-2 lg:space-x-3">
          {/* Resumo Button */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleResumoClick}
            className="h-10 px-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 transition-all duration-300 font-medium"
          >
            <FileBarChart className="w-4 h-4 mr-2" />
            Resumo Executivo
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Help & Support */}
          <HelpDropdown />

          {/* Notifications */}
          <NotificationsPopover 
            isOpen={isNotificationsOpen}
            onOpenChange={setIsNotificationsOpen}
            notifications={notifications}
          />

          {/* AI Recommendations */}
          <AIRecommendationsPopover 
            isOpen={isAIRecommendationsOpen}
            onOpenChange={setIsAIRecommendationsOpen}
            recommendations={aiRecommendations}
          />

          {/* User Menu */}
          <UserMenu 
            profile={profile}
            userInitials={userInitials}
            userEmail={userEmail}
            onNavigate={navigate}
            onSignOut={handleSignOut}
          />
        </div>
      </div>
    </header>
  );
};
