
import React from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { SuperAdminDashboard } from '../components/super-admin/SuperAdminDashboard';
import { AccountsManagement } from '../components/super-admin/AccountsManagement';
import { PartnersManagement } from '../components/super-admin/PartnersManagement';
import { RevenueManagement } from '../components/super-admin/RevenueManagement';
import { SystemSettings } from '../components/super-admin/SystemSettings';
import { MonitoringDashboard } from '../components/super-admin/MonitoringDashboard';
import { SecurityAudit } from '../components/super-admin/SecurityAudit';
import { InternalTeamManagement } from '../components/super-admin/InternalTeamManagement';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { SuperAdminProvider, useSuperAdmin } from '@/hooks/useSuperAdmin';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
import { 
  Shield, 
  Building2, 
  Handshake, 
  DollarSign, 
  Settings, 
  Users,
  TrendingUp,
  AlertTriangle,
  Activity,
  Eye,
  Database,
  UserCheck,
  Brain,
  Lock
} from 'lucide-react';

const SuperAdminContent = () => {
  const { hasAccess, isLoading, stats, systemAlerts } = useSuperAdmin();

  if (isLoading) {
    return (
      <AppLayout
        title="Super Administrador"
        description="Carregando painel de controle..."
        icon={<Shield className="w-8 h-8 text-white" />}
        gradientColors="bg-gradient-to-r from-red-600 to-pink-600"
        badgeText="Carregando"
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Shield className="w-16 h-16 animate-pulse text-red-500 mx-auto mb-4" />
            <p className="text-lg font-semibold">Verificando permissões...</p>
            <p className="text-muted-foreground">Carregando dados do sistema</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!hasAccess) {
    return (
      <AppLayout
        title="Acesso Negado"
        description="Você não tem permissão para acessar esta área"
        icon={<Lock className="w-8 h-8 text-white" />}
        gradientColors="bg-gradient-to-r from-gray-600 to-slate-600"
        badgeText="Restrito"
      >
        <Alert className="max-w-2xl mx-auto">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Esta área é restrita ao Super Administrador do sistema CS360°. 
            Se você acredita que deveria ter acesso, entre em contato com o suporte.
          </AlertDescription>
        </Alert>
      </AppLayout>
    );
  }

  const criticalAlerts = systemAlerts?.filter(alert => alert.severity === 'critical' && !alert.resolved).length || 0;

  return (
    <AppLayout
      title="Super Administrador"
      description="Painel de controle exclusivo da equipe CS360° - Gestão completa do SaaS"
      icon={<Shield className="w-8 h-8 text-white" />}
      gradientColors="bg-gradient-to-r from-red-600 to-pink-600"
      badgeText="Acesso Máximo"
      badgeIcon={<Lock className="w-3 h-3 mr-1" />}
    >
      <div className="space-y-6">
        {/* Alerts críticos */}
        {criticalAlerts > 0 && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>{criticalAlerts} alerta(s) crítico(s)</strong> requer(em) atenção imediata.
              <Button variant="link" className="p-0 ml-2 text-red-600 underline">
                Ver detalhes
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Status do Sistema */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-600 rounded-lg">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800">Sistema</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-bold text-green-700">Online</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Uptime</p>
                  <p className="text-sm font-bold">{stats?.systemHealth.uptime || 99.98}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-600 rounded-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Usuários Ativos</p>
                  <p className="text-sm font-bold">{stats?.totalUsers.toLocaleString() || '8,943'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-600 rounded-lg">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">MRR</p>
                  <p className="text-sm font-bold">R$ {(stats?.totalRevenue || 624350).toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="accounts" className="flex items-center space-x-2">
              <Building2 className="w-4 h-4" />
              <span className="hidden sm:inline">Contas</span>
            </TabsTrigger>
            <TabsTrigger value="partners" className="flex items-center space-x-2">
              <Handshake className="w-4 h-4" />
              <span className="hidden sm:inline">Parceiros</span>
            </TabsTrigger>
            <TabsTrigger value="revenue" className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">Receita</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center space-x-2">
              <UserCheck className="w-4 h-4" />
              <span className="hidden sm:inline">Equipe</span>
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">Monitor</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Segurança</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Sistema</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <SuperAdminDashboard />
          </TabsContent>

          <TabsContent value="accounts">
            <AccountsManagement />
          </TabsContent>

          <TabsContent value="partners">
            <PartnersManagement />
          </TabsContent>

          <TabsContent value="revenue">
            <RevenueManagement />
          </TabsContent>

          <TabsContent value="team">
            <InternalTeamManagement />
          </TabsContent>

          <TabsContent value="monitoring">
            <MonitoringDashboard />
          </TabsContent>

          <TabsContent value="security">
            <SecurityAudit />
          </TabsContent>

          <TabsContent value="system">
            <SystemSettings />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

const SuperAdmin = () => {
  return (
    <ProtectedRoute>
      <SuperAdminProvider>
        <SuperAdminContent />
      </SuperAdminProvider>
    </ProtectedRoute>
  );
};

export default SuperAdmin;
