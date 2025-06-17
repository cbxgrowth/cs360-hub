
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { 
  Users, 
  Shield, 
  CreditCard, 
  Activity, 
  Settings, 
  Database,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Clock,
  Zap,
  Lock
} from 'lucide-react';

export const AdminOverview = () => {
  const systemHealth = [
    { metric: 'Uptime', value: '99.9%', status: 'excellent', icon: Activity },
    { metric: 'Segurança', value: 'Alta', status: 'good', icon: Shield },
    { metric: 'Performance', value: '95%', status: 'good', icon: TrendingUp },
    { metric: 'Backup', value: 'Ativo', status: 'excellent', icon: Database }
  ];

  const quickStats = [
    { label: 'Usuários Ativos', value: '12', change: '+2', icon: Users, color: 'blue' },
    { label: 'Sessões Hoje', value: '47', change: '+8', icon: Activity, color: 'green' },
    { label: 'Alertas Pendentes', value: '3', change: '-1', icon: AlertTriangle, color: 'orange' },
    { label: 'Créditos IA Restantes', value: '1,247', change: '-45', icon: Zap, color: 'purple' }
  ];

  const recentActivities = [
    { action: 'Novo usuário criado', user: 'Ana Costa', time: '5 min atrás', type: 'user' },
    { action: 'Backup automático concluído', user: 'Sistema', time: '1h atrás', type: 'system' },
    { action: 'Configuração de segurança alterada', user: 'João Silva', time: '2h atrás', type: 'security' },
    { action: 'Relatório de auditoria gerado', user: 'Maria Santos', time: '3h atrás', type: 'audit' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Visão Geral da Administração</h2>
          <p className="text-gray-600 dark:text-gray-300">Status geral do sistema e atividades recentes</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Sistema Operacional</span>
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className={`text-xs font-medium mt-1 ${
                    stat.change.startsWith('+') ? 'text-green-600' : 
                    stat.change.startsWith('-') && stat.color === 'orange' ? 'text-orange-600' :
                    stat.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {stat.change} vs ontem
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${
                  stat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                  stat.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                  stat.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30' :
                  'bg-purple-100 dark:bg-purple-900/30'
                }`}>
                  <stat.icon className={`w-6 h-6 ${
                    stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'green' ? 'text-green-600' :
                    stat.color === 'orange' ? 'text-orange-600' :
                    'text-purple-600'
                  }`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* System Health */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Saúde do Sistema</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {systemHealth.map((item, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <item.icon className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">{item.metric}</span>
                    </div>
                    <Badge variant={item.status === 'excellent' ? 'default' : 'secondary'}>
                      {item.value}
                    </Badge>
                  </div>
                  <Progress 
                    value={item.status === 'excellent' ? 100 : 85} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Ações Rápidas</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Users className="w-4 h-4 mr-2" />
              Gerenciar Usuários
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Shield className="w-4 h-4 mr-2" />
              Auditoria de Segurança
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <CreditCard className="w-4 h-4 mr-2" />
              Configurar Faturamento
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Database className="w-4 h-4 mr-2" />
              Backup Manual
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Lock className="w-4 h-4 mr-2" />
              Configurar 2FA
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>Atividades Recentes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${
                  activity.type === 'user' ? 'bg-blue-500' :
                  activity.type === 'system' ? 'bg-green-500' :
                  activity.type === 'security' ? 'bg-orange-500' :
                  'bg-purple-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">por {activity.user}</p>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
