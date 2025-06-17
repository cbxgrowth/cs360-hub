
import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Switch } from '../../ui/switch';
import { Settings, Globe, Mail, MessageSquare, Brain, Zap } from 'lucide-react';

interface SystemSetupStepProps {
  onComplete: () => void;
}

export const SystemSetupStep: React.FC<SystemSetupStepProps> = ({ onComplete }) => {
  const [settings, setSettings] = useState({
    language: '',
    emailIntegration: false,
    whatsappIntegration: false,
    aiFeatures: false,
    notifications: true
  });

  const languages = [
    { value: 'pt-BR', label: 'Português (Brasil)' },
    { value: 'en-US', label: 'English (US)' },
    { value: 'es-ES', label: 'Español' }
  ];

  const integrations = [
    {
      id: 'emailIntegration',
      icon: Mail,
      title: 'Integração de Email',
      description: 'Conecte com Gmail, Outlook ou SMTP customizado',
      enabled: settings.emailIntegration
    },
    {
      id: 'whatsappIntegration',
      icon: MessageSquare,
      title: 'WhatsApp Business',
      description: 'Envie mensagens automáticas via WhatsApp',
      enabled: settings.whatsappIntegration
    },
    {
      id: 'aiFeatures',
      icon: Brain,
      title: 'Recursos de IA',
      description: 'Análise preditiva e insights automáticos',
      enabled: settings.aiFeatures
    }
  ];

  const handleToggle = (settingId: string) => {
    setSettings(prev => ({
      ...prev,
      [settingId]: !prev[settingId as keyof typeof prev]
    }));
  };

  const handleComplete = () => {
    localStorage.setItem('cs360-system-setup', JSON.stringify(settings));
    onComplete();
  };

  const isValid = settings.language;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Settings className="w-12 h-12 mx-auto text-blue-600 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Configurações do Sistema
        </h2>
        <p className="text-gray-600">
          Ajuste as configurações básicas da plataforma
        </p>
      </div>

      {/* Language Setting */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Idioma do Sistema</h3>
          </div>
          
          <div className="space-y-3">
            <Label>Selecione o idioma principal *</Label>
            <Select onValueChange={(value) => setSettings(prev => ({ ...prev, language: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Escolha o idioma" />
              </SelectTrigger>
              <SelectContent>
                {languages.map(lang => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Integrations */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Zap className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Integrações Principais</h3>
          </div>
          
          <div className="space-y-4">
            {integrations.map(integration => (
              <div key={integration.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <integration.icon className="w-6 h-6 text-gray-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">{integration.title}</h4>
                    <p className="text-sm text-gray-600">{integration.description}</p>
                  </div>
                </div>
                <Switch
                  checked={integration.enabled}
                  onCheckedChange={() => handleToggle(integration.id)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Notificações</h3>
              <p className="text-sm text-gray-600">Receba alertas importantes</p>
            </div>
            <Switch
              checked={settings.notifications}
              onCheckedChange={() => handleToggle('notifications')}
            />
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 <strong>Dica:</strong> Você pode alterar essas configurações a qualquer momento nas configurações da conta.
        </p>
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={handleComplete}
          disabled={!isValid}
          className="bg-gradient-to-r from-blue-600 to-purple-600"
        >
          Finalizar Configuração Básica
        </Button>
      </div>
    </div>
  );
};
