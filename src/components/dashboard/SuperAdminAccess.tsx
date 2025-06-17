
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Settings, 
  Database, 
  Users, 
  Activity,
  AlertTriangle,
  Zap,
  Crown
} from 'lucide-react';

export const SuperAdminAccess = () => {
  const navigate = useNavigate();

  const superAdminActions = [
    {
      title: 'Painel Super Admin',
      description: 'Acesso completo ao painel de super administrador',
      icon: Shield,
      action: () => navigate('/super-admin'),
      color: 'from-red-500 to-pink-500',
      priority: 'high'
    },
    {
      title: 'Gestão de Usuários',
      description: 'Gerenciar usuários internos e externos',
      icon: Users,
      action: () => navigate('/admin/users'),
      color: 'from-blue-500 to-cyan-500',
      priority: 'medium'
    },
    {
      title: 'Monitoramento Sistema',
      description: 'Monitorar saúde e performance do sistema',
      icon: Activity,
      action: () => navigate('/super-admin?tab=monitoring'),
      color: 'from-green-500 to-emerald-500',
      priority: 'medium'
    },
    {
      title: 'Configurações Avançadas',
      description: 'Configurações de sistema e segurança',
      icon: Settings,
      action: () => navigate('/super-admin?tab=system'),
      color: 'from-purple-500 to-indigo-500',
      priority: 'low'
    }
  ];

  return (
    <Card className="border-red-200 bg-gradient-to-r from-red-50 to-pink-50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl">Super Administrador</span>
            <div className="flex items-center space-x-2 mt-1">
              <Badge className="bg-red-100 text-red-800">
                <Shield className="w-3 h-3 mr-1" />
                Desenvolvimento
              </Badge>
              <Badge className="bg-orange-100 text-orange-800">
                <Zap className="w-3 h-3 mr-1" />
                Acesso Total
              </Badge>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {superAdminActions.map((action, index) => (
            <Button
              key={index}
              onClick={action.action}
              variant="outline"
              className="h-24 flex flex-col items-center justify-center space-y-2 p-4 hover:shadow-lg transition-all"
            >
              <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color}`}>
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-center">
                <div className="font-medium text-sm">{action.title}</div>
                <div className="text-xs text-muted-foreground">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-800">
              Modo Desenvolvimento Ativo
            </span>
          </div>
          <p className="text-xs text-orange-700 mt-1">
            Você tem acesso completo de Super Admin para desenvolvimento. 
            Este acesso será restrito em produção.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
