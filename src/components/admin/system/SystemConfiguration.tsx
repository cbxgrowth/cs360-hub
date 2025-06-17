
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Switch } from '../../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { 
  Server, 
  Database, 
  Shield, 
  Mail, 
  Webhook, 
  Clock, 
  Globe,
  AlertTriangle,
  CheckCircle,
  Settings,
  Zap,
  Lock,
  Eye,
  EyeOff,
  Users
} from 'lucide-react';

export const SystemConfiguration = () => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [settings, setSettings] = useState({
    systemName: 'CS360° - Customer Success Platform',
    maxUsers: 25,
    sessionTimeout: 24,
    backupFrequency: 'daily',
    maintenanceMode: false,
    autoUpdates: true,
    emailNotifications: true,
    smsNotifications: false,
    webhookUrl: 'https://api.empresa.com/webhooks',
    apiKey: 'cs360_api_key_example_12345',
    maxApiCalls: 10000,
    dataRetention: 365,
    encryptionLevel: 'aes256'
  });

  const systemMetrics = [
    { label: 'CPU Usage', value: '45%', status: 'good', icon: Server },
    { label: 'Memory Usage', value: '67%', status: 'good', icon: Database },
    { label: 'Disk Space', value: '23%', status: 'excellent', icon: Database },
    { label: 'Active Sessions', value: '12', status: 'good', icon: Users }
  ];

  const securitySettings = [
    { 
      key: 'passwordPolicy', 
      label: 'Política de Senhas Forte', 
      description: 'Exigir senhas com 8+ caracteres, maiúsculas, números',
      enabled: true 
    },
    { 
      key: 'twoFactor', 
      label: 'Autenticação de Dois Fatores', 
      description: 'Obrigatória para administradores',
      enabled: false 
    },
    { 
      key: 'sessionSecurity', 
      label: 'Sessões Seguras', 
      description: 'HTTPS obrigatório e cookies seguros',
      enabled: true 
    },
    { 
      key: 'auditLog', 
      label: 'Log de Auditoria Detalhado', 
      description: 'Registrar todas as ações dos usuários',
      enabled: true 
    },
    { 
      key: 'ipWhitelist', 
      label: 'Lista Branca de IPs', 
      description: 'Restringir acesso por endereços IP',
      enabled: false 
    }
  ];

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Server className="w-5 h-5" />
            <span>Status do Sistema</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <metric.icon className={`w-6 h-6 mr-2 ${getStatusColor(metric.status)}`} />
                  <span className="text-2xl font-bold">{metric.value}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</p>
                <Badge variant={metric.status === 'excellent' ? 'default' : 'secondary'} className="mt-1">
                  {metric.status === 'excellent' ? 'Excelente' : 
                   metric.status === 'good' ? 'Bom' : 
                   metric.status === 'warning' ? 'Atenção' : 'Crítico'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="integrations">Integrações</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
          <TabsTrigger value="maintenance">Manutenção</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nome do Sistema</label>
                  <Input 
                    value={settings.systemName}
                    onChange={(e) => handleSettingChange('systemName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Máximo de Usuários</label>
                  <Input 
                    type="number"
                    value={settings.maxUsers}
                    onChange={(e) => handleSettingChange('maxUsers', parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Timeout de Sessão (horas)</label>
                  <Select 
                    value={settings.sessionTimeout.toString()}
                    onValueChange={(value) => handleSettingChange('sessionTimeout', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hora</SelectItem>
                      <SelectItem value="8">8 horas</SelectItem>
                      <SelectItem value="24">24 horas</SelectItem>
                      <SelectItem value="168">7 dias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Retenção de Dados (dias)</label>
                  <Input 
                    type="number"
                    value={settings.dataRetention}
                    onChange={(e) => handleSettingChange('dataRetention', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Configurações do Sistema</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Modo de Manutenção</p>
                      <p className="text-sm text-gray-500">Bloquear acesso de usuários durante manutenção</p>
                    </div>
                    <Switch 
                      checked={settings.maintenanceMode}
                      onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Atualizações Automáticas</p>
                      <p className="text-sm text-gray-500">Instalar atualizações de segurança automaticamente</p>
                    </div>
                    <Switch 
                      checked={settings.autoUpdates}
                      onCheckedChange={(checked) => handleSettingChange('autoUpdates', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Configurações de Segurança</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {securitySettings.map((setting, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{setting.label}</p>
                    <p className="text-sm text-gray-500">{setting.description}</p>
                  </div>
                  <Switch checked={setting.enabled} />
                </div>
              ))}
              
              <div className="space-y-4 mt-6">
                <h4 className="font-semibold">Nível de Criptografia</h4>
                <Select value={settings.encryptionLevel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aes128">AES-128 (Padrão)</SelectItem>
                    <SelectItem value="aes256">AES-256 (Recomendado)</SelectItem>
                    <SelectItem value="aes256-gcm">AES-256-GCM (Máxima)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Integrações e APIs</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">URL do Webhook</label>
                  <Input 
                    value={settings.webhookUrl}
                    onChange={(e) => handleSettingChange('webhookUrl', e.target.value)}
                    placeholder="https://api.empresa.com/webhooks"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Chave da API</label>
                  <div className="flex space-x-2">
                    <Input 
                      type={showApiKey ? 'text' : 'password'}
                      value={settings.apiKey}
                      onChange={(e) => handleSettingChange('apiKey', e.target.value)}
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Limite de Chamadas API (por hora)</label>
                  <Input 
                    type="number"
                    value={settings.maxApiCalls}
                    onChange={(e) => handleSettingChange('maxApiCalls', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Notificações</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <div>
                        <p className="font-medium">Notificações por Email</p>
                        <p className="text-sm text-gray-500">Alertas e atualizações por email</p>
                      </div>
                    </div>
                    <Switch 
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Webhook className="w-4 h-4" />
                      <div>
                        <p className="font-medium">Notificações SMS</p>
                        <p className="text-sm text-gray-500">Alertas críticos via SMS</p>
                      </div>
                    </div>
                    <Switch 
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backup Settings */}
        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5" />
                <span>Configurações de Backup</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Frequência de Backup</label>
                  <Select 
                    value={settings.backupFrequency}
                    onValueChange={(value) => handleSettingChange('backupFrequency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">A cada hora</SelectItem>
                      <SelectItem value="daily">Diário</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Status dos Backups</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">Último backup completo</span>
                    </div>
                    <span className="text-sm text-gray-600">Hoje às 03:00</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">Próximo backup</span>
                    </div>
                    <span className="text-sm text-gray-600">Amanhã às 03:00</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button>Fazer Backup Agora</Button>
                <Button variant="outline">Restaurar Backup</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Maintenance */}
        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Manutenção do Sistema</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Button variant="outline" className="p-6 h-auto flex-col">
                  <Database className="w-8 h-8 mb-2" />
                  <span className="font-medium">Otimizar Banco de Dados</span>
                  <span className="text-sm text-gray-500">Limpar dados desnecessários</span>
                </Button>
                
                <Button variant="outline" className="p-6 h-auto flex-col">
                  <Globe className="w-8 h-8 mb-2" />
                  <span className="font-medium">Limpar Cache</span>
                  <span className="text-sm text-gray-500">Remover arquivos temporários</span>
                </Button>
                
                <Button variant="outline" className="p-6 h-auto flex-col">
                  <Shield className="w-8 h-8 mb-2" />
                  <span className="font-medium">Verificar Segurança</span>
                  <span className="text-sm text-gray-500">Scan completo do sistema</span>
                </Button>
                
                <Button variant="outline" className="p-6 h-auto flex-col">
                  <AlertTriangle className="w-8 h-8 mb-2" />
                  <span className="font-medium">Diagnosticar Problemas</span>
                  <span className="text-sm text-gray-500">Verificar logs de erro</span>
                </Button>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="font-medium">Modo de Manutenção</p>
                      <p className="text-sm text-gray-600">Ativar para bloquear usuários durante manutenção</p>
                    </div>
                  </div>
                  <Switch 
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg">Salvar Todas as Configurações</Button>
      </div>
    </div>
  );
};
