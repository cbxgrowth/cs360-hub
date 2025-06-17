
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Settings, 
  Database, 
  Mail, 
  Globe,
  Shield,
  Bell,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Cloud,
  Key
} from 'lucide-react';

export const SystemSettings = () => {
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    allowRegistrations: true,
    emailVerificationRequired: true,
    twoFactorRequired: false,
    maxUsers: 10000,
    sessionTimeout: 30,
    backupFrequency: 'daily',
    logLevel: 'info'
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUsername: 'noreply@cs360.com',
    smtpPassword: '••••••••••',
    fromEmail: 'noreply@cs360.com',
    fromName: 'CS360° Platform'
  });

  const systemInfo = [
    { label: 'Versão da Aplicação', value: 'v2.1.4', status: 'current' },
    { label: 'Versão do Banco', value: 'PostgreSQL 15.2', status: 'current' },
    { label: 'Node.js', value: 'v18.17.0', status: 'current' },
    { label: 'Última Atualização', value: '15 Jan 2024, 14:30', status: 'recent' },
    { label: 'Próxima Manutenção', value: '20 Jan 2024, 02:00', status: 'scheduled' }
  ];

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleEmailSettingChange = (key: string, value: string) => {
    setEmailSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    console.log('Salvando configurações:', settings);
    // Implementar lógica de salvamento
  };

  const handleTestEmail = () => {
    console.log('Testando configuração de email');
    // Implementar teste de email
  };

  const handleBackupNow = () => {
    console.log('Iniciando backup manual');
    // Implementar backup manual
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Configurações do Sistema</h2>
          <p className="text-muted-foreground">Administração avançada da plataforma</p>
        </div>
        <Button onClick={handleSaveSettings}>
          <Save className="w-4 h-4 mr-2" />
          Salvar Todas
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="database">Banco de Dados</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          {/* System Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Informações do Sistema</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {systemInfo.map((info, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <span className="font-medium">{info.label}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{info.value}</span>
                      {info.status === 'current' && <CheckCircle className="w-4 h-4 text-green-500" />}
                      {info.status === 'scheduled' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Modo de Manutenção</Label>
                  <p className="text-sm text-muted-foreground">Ativar modo de manutenção do sistema</p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(value) => handleSettingChange('maintenanceMode', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Permitir Registros</Label>
                  <p className="text-sm text-muted-foreground">Permitir novos usuários se registrarem</p>
                </div>
                <Switch
                  checked={settings.allowRegistrations}
                  onCheckedChange={(value) => handleSettingChange('allowRegistrations', value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Máximo de Usuários</Label>
                  <Input
                    type="number"
                    value={settings.maxUsers}
                    onChange={(e) => handleSettingChange('maxUsers', parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Timeout de Sessão (minutos)</Label>
                  <Input
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Configurações de Segurança</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Verificação de Email Obrigatória</Label>
                  <p className="text-sm text-muted-foreground">Exigir verificação de email para novos usuários</p>
                </div>
                <Switch
                  checked={settings.emailVerificationRequired}
                  onCheckedChange={(value) => handleSettingChange('emailVerificationRequired', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Autenticação de Dois Fatores</Label>
                  <p className="text-sm text-muted-foreground">Exigir 2FA para todos os usuários</p>
                </div>
                <Switch
                  checked={settings.twoFactorRequired}
                  onCheckedChange={(value) => handleSettingChange('twoFactorRequired', value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Nível de Log</Label>
                <Select value={settings.logLevel} onValueChange={(value) => handleSettingChange('logLevel', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="warn">Warning</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="debug">Debug</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>Configurações de Email</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Servidor SMTP</Label>
                  <Input
                    value={emailSettings.smtpHost}
                    onChange={(e) => handleEmailSettingChange('smtpHost', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Porta SMTP</Label>
                  <Input
                    value={emailSettings.smtpPort}
                    onChange={(e) => handleEmailSettingChange('smtpPort', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Usuário SMTP</Label>
                  <Input
                    value={emailSettings.smtpUsername}
                    onChange={(e) => handleEmailSettingChange('smtpUsername', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Senha SMTP</Label>
                  <Input
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={(e) => handleEmailSettingChange('smtpPassword', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email Remetente</Label>
                  <Input
                    value={emailSettings.fromEmail}
                    onChange={(e) => handleEmailSettingChange('fromEmail', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Nome Remetente</Label>
                  <Input
                    value={emailSettings.fromName}
                    onChange={(e) => handleEmailSettingChange('fromName', e.target.value)}
                  />
                </div>
              </div>

              <div className="flex space-x-2">
                <Button onClick={handleTestEmail} variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Testar Email
                </Button>
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Config
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5" />
                <span>Configurações do Banco de Dados</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Frequência de Backup</Label>
                <Select value={settings.backupFrequency} onValueChange={(value) => handleSettingChange('backupFrequency', value)}>
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

              <div className="flex space-x-2">
                <Button onClick={handleBackupNow} variant="outline">
                  <Cloud className="w-4 h-4 mr-2" />
                  Backup Agora
                </Button>
                <Button variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Otimizar DB
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Configurações de Monitoramento</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Monitoramento Avançado</h3>
                <p className="text-muted-foreground">Configure alertas e métricas de monitoramento</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
