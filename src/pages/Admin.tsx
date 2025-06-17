
import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { AdminOverview } from '../components/admin/AdminOverview';
import { AccountSettings } from '../components/admin/AccountSettings';
import { BillingManagement } from '../components/admin/BillingManagement';
import { IntegrationsAPI } from '../components/admin/IntegrationsAPI';
import { ReferralProgram } from '../components/admin/ReferralProgram';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { ScrollArea } from '../components/ui/scroll-area';
import { 
  Settings, 
  CreditCard, 
  Zap, 
  Activity,
  BarChart3,
  UserCheck,
  Share2
} from 'lucide-react';

const Admin = () => {
  const availableTabs = [
    { value: 'overview', label: 'Visão Geral', icon: BarChart3 },
    { value: 'account', label: 'Conta', icon: Settings },
    { value: 'billing', label: 'Faturamento', icon: CreditCard },
    { value: 'integrations', label: 'Integrações', icon: Zap },
    { value: 'referrals', label: 'Indicações', icon: Share2 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex transition-colors">
      <Sidebar />
      <main className="flex-1 transition-all duration-300 peer-data-[state=collapsed]:ml-20 ml-72 overflow-hidden">
        <Header />
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <UserCheck className="w-8 h-8 text-blue-600" />
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Administração
                  </h1>
                  <Badge variant="outline" className="text-blue-600 font-semibold">
                    Admin Empresa
                  </Badge>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Painel de administração da empresa - Configurações, faturamento e programa de indicações
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Sistema Operacional</span>
                </Badge>
                <Badge variant="outline" className="flex items-center space-x-2">
                  <Activity className="w-3 h-3" />
                  <span>12 usuários online</span>
                </Badge>
              </div>
            </div>
            
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className={`grid w-full grid-cols-${availableTabs.length} h-12`}>
                {availableTabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value} className="flex items-center space-x-2 text-xs">
                    <tab.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="overview">
                <AdminOverview />
              </TabsContent>

              <TabsContent value="account">
                <AccountSettings />
              </TabsContent>

              <TabsContent value="billing">
                <BillingManagement />
              </TabsContent>

              <TabsContent value="integrations">
                <IntegrationsAPI />
              </TabsContent>

              <TabsContent value="referrals">
                <ReferralProgram />
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default Admin;
