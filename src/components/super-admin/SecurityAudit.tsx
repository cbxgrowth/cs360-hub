
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Shield, 
  Eye, 
  Lock, 
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Globe,
  Key,
  FileText,
  Activity,
  Zap
} from 'lucide-react';

export const SecurityAudit = () => {
  const securityMetrics = [
    { title: 'Score de Segurança', value: '94%', status: 'good', icon: Shield },
    { title: 'Tentativas de Login', value: '12,347', status: 'normal', icon: User },
    { title: 'Logins Falharam', value: '127', status: 'warning', icon: AlertTriangle },
    { title: 'IPs Bloqueados', value: '23', status: 'normal', icon: Globe }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'login_success',
      user: 'admin@cs360.com',
      action: 'Login realizado com sucesso',
      ip: '192.168.1.100',
      location: 'São Paulo, BR',
      timestamp: '2024-01-15 14:30:25',
      risk: 'low'
    },
    {
      id: 2,
      type: 'login_failed',
      user: 'unknown@hacker.com',
      action: 'Tentativa de login falhada',
      ip: '45.123.234.156',
      location: 'Unknown, RU',
      timestamp: '2024-01-15 14:25:12',
      risk: 'high'
    },
    {
      id: 3,
      type: 'permission_change',
      user: 'manager@company.com',
      action: 'Permissões alteradas para usuário',
      ip: '10.0.0.45',
      location: 'Rio de Janeiro, BR',
      timestamp: '2024-01-15 13:45:33',
      risk: 'medium'
    },
    {
      id: 4,
      type: 'data_export',
      user: 'analyst@company.com',
      action: 'Exportação de dados de clientes',
      ip: '172.16.0.23',
      location: 'Belo Horizonte, BR',
      timestamp: '2024-01-15 12:15:44',
      risk: 'medium'
    }
  ];

  const vulnerabilities = [
    {
      id: 1,
      title: 'Senhas fracas detectadas',
      description: '23 usuários usando senhas consideradas fracas',
      severity: 'medium',
      status: 'open',
      affectedUsers: 23
    },
    {
      id: 2,
      title: 'Certificados SSL próximos do vencimento',
      description: '2 certificados vencem nos próximos 30 dias',
      severity: 'high',
      status: 'open',
      affectedUsers: 0
    },
    {
      id: 3,
      title: '2FA não habilitado',
      description: '156 usuários sem autenticação de dois fatores',
      severity: 'low',
      status: 'monitoring',
      affectedUsers: 156
    }
  ];

  const securityPolicies = [
    {
      name: 'Política de Senhas',
      status: 'active',
      lastUpdated: '2024-01-10',
      compliance: 89
    },
    {
      name: 'Controle de Acesso',
      status: 'active',
      lastUpdated: '2024-01-08',
      compliance: 95
    },
    {
      name: 'Auditoria de Logs',
      status: 'active',
      lastUpdated: '2024-01-12',
      compliance: 92
    },
    {
      name: 'Backup de Segurança',
      status: 'active',
      lastUpdated: '2024-01-14',
      compliance: 98
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      case 'critical': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login_success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'login_failed': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'permission_change': return <Key className="w-4 h-4 text-yellow-500" />;
      case 'data_export': return <FileText className="w-4 h-4 text-blue-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Auditoria de Segurança</h2>
          <p className="text-muted-foreground">Monitoramento e análise de segurança da plataforma</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Gerar Relatório
          </Button>
          <Button>
            <Zap className="w-4 h-4 mr-2" />
            Scan Completo
          </Button>
        </div>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {securityMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
                <metric.icon className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="activities" className="space-y-6">
        <TabsList>
          <TabsTrigger value="activities">Atividades Recentes</TabsTrigger>
          <TabsTrigger value="vulnerabilities">Vulnerabilidades</TabsTrigger>
          <TabsTrigger value="policies">Políticas</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="activities">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5" />
                <span>Log de Atividades</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0 mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">{activity.action}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge className={getRiskColor(activity.risk).replace('text-', 'bg-').replace('-600', '-100')}>
                            {activity.risk === 'low' ? 'Baixo' : activity.risk === 'medium' ? 'Médio' : 'Alto'}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                        </div>
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        <span className="font-medium">{activity.user}</span> • 
                        <span className="ml-1">{activity.ip}</span> • 
                        <span className="ml-1">{activity.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vulnerabilities">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <span>Vulnerabilidades Identificadas</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vulnerabilities.map((vuln) => (
                  <div key={vuln.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{vuln.title}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge className={getSeverityColor(vuln.severity)}>
                          {vuln.severity === 'low' ? 'Baixa' : vuln.severity === 'medium' ? 'Média' : 'Alta'}
                        </Badge>
                        <Badge variant={vuln.status === 'open' ? 'destructive' : 'outline'}>
                          {vuln.status === 'open' ? 'Aberto' : 'Monitorando'}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{vuln.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">
                        {vuln.affectedUsers > 0 && `${vuln.affectedUsers} usuários afetados`}
                      </span>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">Ver Detalhes</Button>
                        <Button size="sm">Resolver</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="w-5 h-5" />
                <span>Políticas de Segurança</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {securityPolicies.map((policy, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{policy.name}</h4>
                      <Badge className={policy.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {policy.status === 'active' ? 'Ativa' : 'Inativa'}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Última atualização:</span>
                        <span>{new Date(policy.lastUpdated).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Compliance:</span>
                        <span className="font-medium">{policy.compliance}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${policy.compliance}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <Shield className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Relatório de Compliance</h3>
                <p className="text-muted-foreground">Análise detalhada de conformidade com padrões de segurança</p>
                <Button className="mt-4">
                  Gerar Relatório Completo
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
