
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { DashboardMetrics } from './dashboard/DashboardMetrics';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  Target, 
  TrendingUp, 
  ShoppingCart,
  Award,
  BarChart3,
  Zap 
} from 'lucide-react';

export const WelcomePage = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Gestão de Clientes',
      description: 'Visualize e gerencie seus clientes',
      icon: <Users className="w-6 h-6" />,
      path: '/clients',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Contratos',
      description: 'Monitore contratos e renovações',
      icon: <FileText className="w-6 h-6" />,
      path: '/contracts',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Gestão de Metas',
      description: 'Acompanhe o progresso das metas',
      icon: <Target className="w-6 h-6" />,
      path: '/goals',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Relatórios',
      description: 'Análises e insights detalhados',
      icon: <BarChart3 className="w-6 h-6" />,
      path: '/reports',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Serviços & Upsell',
      description: 'Gerencie serviços e oportunidades',
      icon: <ShoppingCart className="w-6 h-6" />,
      path: '/services',
      color: 'from-teal-500 to-green-500'
    },
    {
      title: 'Automação & IA',
      description: 'Configure automações inteligentes',
      icon: <Zap className="w-6 h-6" />,
      path: '/automation',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
        <div className="flex flex-col mb-4">
          <h1 className="text-3xl font-bold mb-2">
            CS360°
          </h1>
          <p className="text-sm text-blue-100 mb-4">Customer Success Platform</p>
        </div>
        <h2 className="text-2xl font-bold mb-2">
          Bem-vindo, {profile?.full_name || 'Usuário'}!
        </h2>
        <p className="text-blue-100 text-lg">
          {profile?.company_name && `${profile.company_name} • `}
          Plano {profile?.plan_type || 'starter'} • 
          Sua plataforma completa de Customer Success
        </p>
      </div>

      {/* Metrics Dashboard */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Visão Geral</h2>
        <DashboardMetrics visibleMetrics={['clients', 'contracts', 'mrr', 'goals']} />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Acesso Rápido</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all cursor-pointer">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center text-white mb-4`}>
                  {action.icon}
                </div>
                <CardTitle className="text-lg">{action.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{action.description}</p>
                <Button 
                  onClick={() => navigate(action.path)}
                  className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600"
                >
                  Acessar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* AI Credits Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            Créditos de IA Disponíveis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {(profile?.ai_credits || 0) - (profile?.ai_credits_used || 0)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                de {profile?.ai_credits || 0} créditos disponíveis
              </p>
            </div>
            <Button variant="outline" onClick={() => navigate('/pricing')}>
              Upgrade de Plano
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
