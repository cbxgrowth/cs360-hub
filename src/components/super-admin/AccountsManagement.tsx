import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { AccountForm } from './forms/AccountForm';
import { 
  Building2, 
  Users, 
  Search, 
  Filter, 
  Plus,
  Eye,
  Edit,
  Trash2,
  Download,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Calendar
} from 'lucide-react';

export const AccountsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState('todos');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [showAccountForm, setShowAccountForm] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const accounts = [
    {
      id: '1',
      companyName: 'TechFlow Solutions',
      contactName: 'Ana Silva',
      email: 'ana@techflow.com',
      plan: 'Enterprise',
      status: 'Ativo',
      mrr: 4997,
      users: 45,
      lastLogin: '2024-01-15',
      createdAt: '2023-08-12',
      healthScore: 95,
      churnRisk: 'Baixo'
    },
    {
      id: '2',
      companyName: 'DataInova Corp',
      contactName: 'Carlos Santos',
      email: 'carlos@datainova.com',
      plan: 'Growth',
      status: 'Ativo',
      mrr: 1248,
      users: 12,
      lastLogin: '2024-01-14',
      createdAt: '2023-11-03',
      healthScore: 87,
      churnRisk: 'Baixo'
    },
    {
      id: '3',
      companyName: 'CloudSoft',
      contactName: 'Marina Costa',
      email: 'marina@cloudsoft.com',
      plan: 'Professional',
      status: 'Pagamento Pendente',
      mrr: 897,
      users: 8,
      lastLogin: '2024-01-10',
      createdAt: '2023-09-18',
      healthScore: 62,
      churnRisk: 'Alto'
    },
    {
      id: '4',
      companyName: 'StartupX',
      contactName: 'Pedro Lima',
      email: 'pedro@startupx.com',
      plan: 'Starter',
      status: 'Trial',
      mrr: 0,
      users: 3,
      lastLogin: '2024-01-15',
      createdAt: '2024-01-01',
      healthScore: 78,
      churnRisk: 'Médio'
    }
  ];

  const accountStats = [
    { title: 'Total de Contas', value: '1,247', change: '+12.5%', icon: Building2 },
    { title: 'Contas Ativas', value: '1,156', change: '+8.2%', icon: CheckCircle },
    { title: 'Em Trial', value: '67', change: '+23.1%', icon: Clock },
    { title: 'Churn Este Mês', value: '24', change: '-15.3%', icon: AlertTriangle }
  ];

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Enterprise': return 'bg-purple-100 text-purple-800';
      case 'Growth': return 'bg-blue-100 text-blue-800';
      case 'Professional': return 'bg-green-100 text-green-800';
      case 'Starter': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo': return 'bg-green-100 text-green-800';
      case 'Trial': return 'bg-blue-100 text-blue-800';
      case 'Pagamento Pendente': return 'bg-yellow-100 text-yellow-800';
      case 'Suspenso': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getChurnRiskColor = (risk: string) => {
    switch (risk) {
      case 'Baixo': return 'text-green-600';
      case 'Médio': return 'text-yellow-600';
      case 'Alto': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = filterPlan === 'todos' || account.plan === filterPlan;
    const matchesStatus = filterStatus === 'todos' || account.status === filterStatus;
    
    return matchesSearch && matchesPlan && matchesStatus;
  });

  const handleCreateAccount = (accountData: any) => {
    console.log('Nova conta criada:', accountData);
    // Aqui você implementaria a lógica para criar a conta
    setShowAccountForm(false);
    setSelectedAccount(null);
  };

  const handleEditAccount = (account: any) => {
    setSelectedAccount(account);
    setShowAccountForm(true);
  };

  const handleViewAccount = (account: any) => {
    console.log('Visualizar conta:', account);
    // Aqui você implementaria a lógica para visualizar a conta
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestão de Contas</h2>
          <p className="text-muted-foreground">Administração completa de todas as contas da plataforma</p>
        </div>
        <Button onClick={() => {
          setSelectedAccount(null);
          setShowAccountForm(true);
        }}>
          <Plus className="w-4 h-4 mr-2" />
          Nova Conta
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {accountStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.change}
                  </p>
                </div>
                <stat.icon className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Contas Ativas</TabsTrigger>
          <TabsTrigger value="trial">Em Trial</TabsTrigger>
          <TabsTrigger value="suspended">Suspensas</TabsTrigger>
          <TabsTrigger value="all">Todas</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="w-5 h-5" />
                <span>Filtros e Busca</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar contas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterPlan} onValueChange={setFilterPlan}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por plano" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os Planos</SelectItem>
                    <SelectItem value="Enterprise">Enterprise</SelectItem>
                    <SelectItem value="Growth">Growth</SelectItem>
                    <SelectItem value="Professional">Professional</SelectItem>
                    <SelectItem value="Starter">Starter</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os Status</SelectItem>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Trial">Trial</SelectItem>
                    <SelectItem value="Pagamento Pendente">Pagamento Pendente</SelectItem>
                    <SelectItem value="Suspenso">Suspenso</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Accounts Table */}
          <Card>
            <CardHeader>
              <CardTitle>Contas ({filteredAccounts.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Empresa</th>
                      <th className="text-left p-4">Contato</th>
                      <th className="text-left p-4">Plano</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">MRR</th>
                      <th className="text-left p-4">Usuários</th>
                      <th className="text-left p-4">Health Score</th>
                      <th className="text-left p-4">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAccounts.map((account) => (
                      <tr key={account.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div>
                            <div className="font-medium">{account.companyName}</div>
                            <div className="text-sm text-muted-foreground">{account.email}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            <div className="font-medium">{account.contactName}</div>
                            <div className="text-sm text-muted-foreground">
                              Último login: {new Date(account.lastLogin).toLocaleDateString()}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={getPlanColor(account.plan)}>
                            {account.plan}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge className={getStatusColor(account.status)}>
                            {account.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="font-medium">
                            {account.mrr > 0 ? `R$ ${account.mrr.toLocaleString()}` : 'Trial'}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span>{account.users}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <div className="text-sm font-medium">{account.healthScore}%</div>
                            <div className={`text-xs ${getChurnRiskColor(account.churnRisk)}`}>
                              {account.churnRisk}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleViewAccount(account)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEditAccount(account)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trial">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Contas em Trial</h3>
                <p className="text-muted-foreground">Lista de contas em período de teste</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suspended">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Contas Suspensas</h3>
                <p className="text-muted-foreground">Lista de contas suspensas ou com problemas</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <Building2 className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Todas as Contas</h3>
                <p className="text-muted-foreground">Visão completa de todas as contas da plataforma</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AccountForm
        isOpen={showAccountForm}
        onClose={() => {
          setShowAccountForm(false);
          setSelectedAccount(null);
        }}
        onSubmit={handleCreateAccount}
        account={selectedAccount}
      />
    </div>
  );
};
