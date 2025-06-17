
import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export const NotificationsSection = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState({
    email: {
      newClients: true,
      contractUpdates: true,
      npsAlerts: false,
      weeklyReports: true,
      systemUpdates: false
    },
    push: {
      urgentAlerts: true,
      clientMessages: true,
      teamMentions: false,
      goalProgress: true
    },
    inApp: {
      allNotifications: true,
      soundEnabled: false,
      desktopNotifications: true
    }
  });

  const handleNotificationChange = (category: string, setting: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleSave = () => {
    toast({
      title: "Configurações salvas",
      description: "Suas preferências de notificação foram atualizadas.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Notificações por email */}
      <Card>
        <CardHeader>
          <CardTitle>Notificações por e-mail</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="newClients" className="text-base font-medium">
                Novos clientes
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Receba notificações quando novos clientes forem adicionados
              </p>
            </div>
            <Switch
              id="newClients"
              checked={notifications.email.newClients}
              onCheckedChange={(value) => handleNotificationChange('email', 'newClients', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="contractUpdates" className="text-base font-medium">
                Atualizações de contratos
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Notificações sobre mudanças em contratos
              </p>
            </div>
            <Switch
              id="contractUpdates"
              checked={notifications.email.contractUpdates}
              onCheckedChange={(value) => handleNotificationChange('email', 'contractUpdates', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="npsAlerts" className="text-base font-medium">
                Alertas de NPS
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Receba alertas quando o NPS de clientes mudar
              </p>
            </div>
            <Switch
              id="npsAlerts"
              checked={notifications.email.npsAlerts}
              onCheckedChange={(value) => handleNotificationChange('email', 'npsAlerts', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="weeklyReports" className="text-base font-medium">
                Relatórios semanais
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Resumo semanal de atividades e métricas
              </p>
            </div>
            <Switch
              id="weeklyReports"
              checked={notifications.email.weeklyReports}
              onCheckedChange={(value) => handleNotificationChange('email', 'weeklyReports', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="systemUpdates" className="text-base font-medium">
                Atualizações do sistema
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Notificações sobre novas funcionalidades e manutenções
              </p>
            </div>
            <Switch
              id="systemUpdates"
              checked={notifications.email.systemUpdates}
              onCheckedChange={(value) => handleNotificationChange('email', 'systemUpdates', value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notificações push */}
      <Card>
        <CardHeader>
          <CardTitle>Notificações push</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="urgentAlerts" className="text-base font-medium">
                Alertas urgentes
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Notificações importantes que requerem ação imediata
              </p>
            </div>
            <Switch
              id="urgentAlerts"
              checked={notifications.push.urgentAlerts}
              onCheckedChange={(value) => handleNotificationChange('push', 'urgentAlerts', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="clientMessages" className="text-base font-medium">
                Mensagens de clientes
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Novas mensagens recebidas de clientes
              </p>
            </div>
            <Switch
              id="clientMessages"
              checked={notifications.push.clientMessages}
              onCheckedChange={(value) => handleNotificationChange('push', 'clientMessages', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="teamMentions" className="text-base font-medium">
                Menções da equipe
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Quando você for mencionado em conversas da equipe
              </p>
            </div>
            <Switch
              id="teamMentions"
              checked={notifications.push.teamMentions}
              onCheckedChange={(value) => handleNotificationChange('push', 'teamMentions', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="goalProgress" className="text-base font-medium">
                Progresso de metas
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Atualizações sobre o progresso das suas metas
              </p>
            </div>
            <Switch
              id="goalProgress"
              checked={notifications.push.goalProgress}
              onCheckedChange={(value) => handleNotificationChange('push', 'goalProgress', value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Configurações gerais */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações gerais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="allNotifications" className="text-base font-medium">
                Todas as notificações
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ativar/desativar todas as notificações no app
              </p>
            </div>
            <Switch
              id="allNotifications"
              checked={notifications.inApp.allNotifications}
              onCheckedChange={(value) => handleNotificationChange('inApp', 'allNotifications', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="soundEnabled" className="text-base font-medium">
                Sons de notificação
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Reproduzir sons quando receber notificações
              </p>
            </div>
            <Switch
              id="soundEnabled"
              checked={notifications.inApp.soundEnabled}
              onCheckedChange={(value) => handleNotificationChange('inApp', 'soundEnabled', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="desktopNotifications" className="text-base font-medium">
                Notificações na área de trabalho
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Mostrar notificações na área de trabalho do computador
              </p>
            </div>
            <Switch
              id="desktopNotifications"
              checked={notifications.inApp.desktopNotifications}
              onCheckedChange={(value) => handleNotificationChange('inApp', 'desktopNotifications', value)}
            />
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
