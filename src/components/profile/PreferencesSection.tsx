
import React, { useState } from 'react';
import { Save, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export const PreferencesSection = () => {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState({
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    theme: 'system',
    dateFormat: 'DD/MM/YYYY',
    currency: 'BRL',
    autoSave: true,
    compactView: false,
    showTips: true
  });

  const handlePreferenceChange = (key: string, value: string | boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    toast({
      title: "Preferências salvas",
      description: "Suas configurações foram atualizadas com sucesso.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Exportação iniciada",
      description: "Seus dados serão baixados em breve.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Ação não permitida",
      description: "Para excluir sua conta, entre em contato com o administrador.",
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6">
      {/* Configurações de exibição */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações de exibição</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="language">Idioma</Label>
              <Select 
                value={preferences.language} 
                onValueChange={(value) => handlePreferenceChange('language', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="es-ES">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="timezone">Fuso horário</Label>
              <Select 
                value={preferences.timezone} 
                onValueChange={(value) => handlePreferenceChange('timezone', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/Sao_Paulo">São Paulo (GMT-3)</SelectItem>
                  <SelectItem value="America/New_York">New York (GMT-5)</SelectItem>
                  <SelectItem value="Europe/London">London (GMT+0)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="theme">Tema</Label>
              <Select 
                value={preferences.theme} 
                onValueChange={(value) => handlePreferenceChange('theme', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Claro</SelectItem>
                  <SelectItem value="dark">Escuro</SelectItem>
                  <SelectItem value="system">Sistema</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="dateFormat">Formato de data</Label>
              <Select 
                value={preferences.dateFormat} 
                onValueChange={(value) => handlePreferenceChange('dateFormat', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DD/MM/YYYY">DD/MM/AAAA</SelectItem>
                  <SelectItem value="MM/DD/YYYY">MM/DD/AAAA</SelectItem>
                  <SelectItem value="YYYY-MM-DD">AAAA-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="currency">Moeda</Label>
            <Select 
              value={preferences.currency} 
              onValueChange={(value) => handlePreferenceChange('currency', value)}
            >
              <SelectTrigger className="w-full md:w-1/2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BRL">Real (R$)</SelectItem>
                <SelectItem value="USD">Dólar ($)</SelectItem>
                <SelectItem value="EUR">Euro (€)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Comportamento do app */}
      <Card>
        <CardHeader>
          <CardTitle>Comportamento do aplicativo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="autoSave" className="text-base font-medium">
                Salvamento automático
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Salvar automaticamente as alterações enquanto você trabalha
              </p>
            </div>
            <Switch
              id="autoSave"
              checked={preferences.autoSave}
              onCheckedChange={(value) => handlePreferenceChange('autoSave', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="compactView" className="text-base font-medium">
                Visualização compacta
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Mostrar mais informações em menos espaço
              </p>
            </div>
            <Switch
              id="compactView"
              checked={preferences.compactView}
              onCheckedChange={(value) => handlePreferenceChange('compactView', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="showTips" className="text-base font-medium">
                Mostrar dicas
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Exibir dicas e sugestões para melhor uso do sistema
              </p>
            </div>
            <Switch
              id="showTips"
              checked={preferences.showTips}
              onCheckedChange={(value) => handlePreferenceChange('showTips', value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Gerenciamento de dados */}
      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de dados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button 
              variant="outline" 
              onClick={handleExportData}
              className="w-full justify-start"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar meus dados
            </Button>
            
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">
                Zona de perigo
              </h4>
              <p className="text-sm text-red-600 dark:text-red-400 mb-3">
                Esta ação não pode ser desfeita. Isso excluirá permanentemente sua conta e removerá seus dados dos nossos servidores.
              </p>
              <Button 
                variant="destructive" 
                onClick={handleDeleteAccount}
                className="w-full justify-start"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Excluir conta
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botão de salvar */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Salvar preferências
        </Button>
      </div>
    </div>
  );
};
