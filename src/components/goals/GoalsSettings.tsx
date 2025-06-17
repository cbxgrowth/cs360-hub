import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { 
  Settings, 
  Bell, 
  Users, 
  Award, 
  Target,
  Mail,
  Clock,
  Shield,
  Palette,
  Save,
  RefreshCw,
  Check
} from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

const notificationSettings = [
  { id: 'goal_created', label: 'Nova meta criada', description: 'Quando uma nova meta é atribuída a você', enabled: true },
  { id: 'milestone_reached', label: 'Marco atingido', description: 'Quando você ou sua equipe atinge um marco', enabled: true },
  { id: 'deadline_approaching', label: 'Prazo se aproximando', description: '7 dias antes do prazo da meta', enabled: true },
  { id: 'goal_completed', label: 'Meta concluída', description: 'Quando uma meta é marcada como concluída', enabled: false },
  { id: 'team_updates', label: 'Atualizações da equipe', description: 'Updates de metas colaborativas', enabled: true }
];

const gamificationSettings = [
  { id: 'points_system', label: 'Sistema de pontos', description: 'Ganhe pontos ao completar metas', enabled: true },
  { id: 'achievements', label: 'Conquistas', description: 'Desbloqueie badges e troféus', enabled: true },
  { id: 'leaderboard', label: 'Ranking público', description: 'Apareça no ranking da equipe', enabled: false },
  { id: 'celebrations', label: 'Celebrações', description: 'Animações ao completar metas', enabled: true }
];

const accessLevels = [
  { value: 'viewer', label: 'Visualizador', description: 'Pode apenas ver metas atribuídas' },
  { value: 'contributor', label: 'Colaborador', description: 'Pode atualizar progresso das suas metas' },
  { value: 'manager', label: 'Gerente', description: 'Pode criar e gerenciar metas da equipe' },
  { value: 'admin', label: 'Administrador', description: 'Acesso total ao sistema de metas' }
];

const themeOptions = [
  { 
    id: 'blue-purple', 
    name: 'Azul & Roxo', 
    gradient: 'bg-gradient-to-r from-blue-500 to-purple-500',
    selected: true 
  },
  { 
    id: 'green-teal', 
    name: 'Verde & Teal', 
    gradient: 'bg-gradient-to-r from-green-500 to-teal-500',
    selected: false 
  },
  { 
    id: 'orange-red', 
    name: 'Laranja & Vermelho', 
    gradient: 'bg-gradient-to-r from-orange-500 to-red-500',
    selected: false 
  },
  { 
    id: 'neutral', 
    name: 'Neutro', 
    gradient: 'bg-gradient-to-r from-gray-400 to-gray-600',
    selected: false 
  }
];

const initialSettingsData = {
  notifications: notificationSettings,
  gamification: gamificationSettings,
  defaultDeadline: '30',
  autoAssign: true,
  requireApproval: false,
  allowSelfAssign: true,
  pointsPerGoal: '100',
  theme: 'default'
};

export const GoalsSettings = () => {
  const [settings, setSettings] = useState(initialSettingsData);

  const [selectedTheme, setSelectedTheme] = useState('blue-purple');
  const [activeTab, setActiveTab] = useState('general');
  const { toast } = useToast();

  const updateNotificationSetting = (id: string, enabled: boolean) => {
    setSettings({
      ...settings,
      notifications: settings.notifications.map(n => 
        n.id === id ? { ...n, enabled } : n
      )
    });
  };

  const updateGamificationSetting = (id: string, enabled: boolean) => {
    setSettings({
      ...settings,
      gamification: settings.gamification.map(g => 
        g.id === id ? { ...g, enabled } : g
      )
    });
  };

  const handleSaveSettings = () => {
    console.log('Salvando configurações:', settings);
    toast({
      title: "Configurações Salvas",
      description: "Suas configurações de metas foram salvas com sucesso.",
    });
  };

  const handleResetSettings = () => {
    console.log('Resetando configurações para padrão');
    setSettings(initialSettingsData);
    toast({
      title: "Configurações Resetadas",
      description: "As configurações foram revertidas para o padrão.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Configurações de Metas</h2>
          <p className="text-gray-600">Personalize o comportamento do sistema de metas</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleResetSettings}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Resetar
          </Button>
          <Button onClick={handleSaveSettings}>
            <Save className="w-4 h-4 mr-2" />
            Salvar Configurações
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">
            <Settings className="w-4 h-4 mr-2" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="permissions">
            <Shield className="w-4 h-4 mr-2" />
            Permissões
          </TabsTrigger>
          <TabsTrigger value="gamification">
            <Award className="w-4 h-4 mr-2" />
            Gamificação
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="w-4 h-4 mr-2" />
            Aparência
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Configurações Gerais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="defaultDeadline">Prazo padrão (dias)</Label>
                  <Input
                    id="defaultDeadline"
                    value={settings.defaultDeadline}
                    onChange={(e) => setSettings({...settings, defaultDeadline: e.target.value})}
                    type="number"
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">Prazo padrão para novas metas</p>
                </div>

                <div>
                  <Label htmlFor="pointsPerGoal">Pontos por meta concluída</Label>
                  <Input
                    id="pointsPerGoal"
                    value={settings.pointsPerGoal}
                    onChange={(e) => setSettings({...settings, pointsPerGoal: e.target.value})}
                    type="number"
                    className="mt-1"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Atribuição automática</Label>
                      <p className="text-sm text-gray-500">Atribuir automaticamente metas baseadas no departamento</p>
                    </div>
                    <Switch 
                      checked={settings.autoAssign}
                      onCheckedChange={(checked) => setSettings({...settings, autoAssign: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Requer aprovação</Label>
                      <p className="text-sm text-gray-500">Metas precisam ser aprovadas antes de se tornarem ativas</p>
                    </div>
                    <Switch 
                      checked={settings.requireApproval}
                      onCheckedChange={(checked) => setSettings({...settings, requireApproval: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-atribuição</Label>
                      <p className="text-sm text-gray-500">Permitir que usuários criem metas para si mesmos</p>
                    </div>
                    <Switch 
                      checked={settings.allowSelfAssign}
                      onCheckedChange={(checked) => setSettings({...settings, allowSelfAssign: checked})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Integrações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-8 h-8 text-blue-500" />
                      <div>
                        <h4 className="font-medium">Email</h4>
                        <p className="text-sm text-gray-600">Notificações por email</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-8 h-8 text-purple-500" />
                      <div>
                        <h4 className="font-medium">Calendário</h4>
                        <p className="text-sm text-gray-600">Sincronizar prazos</p>
                      </div>
                    </div>
                    <Badge variant="outline">Inativo</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {settings.notifications.map((notification) => (
                  <div key={notification.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{notification.label}</h4>
                      <p className="text-sm text-gray-600">{notification.description}</p>
                    </div>
                    <Switch 
                      checked={notification.enabled}
                      onCheckedChange={(checked) => updateNotificationSetting(notification.id, checked)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Níveis de Acesso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {accessLevels.map((level) => (
                  <div key={level.value} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{level.label}</h4>
                      <Badge variant="outline">5 usuários</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{level.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gamification">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Configurações de Gamificação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {settings.gamification.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{setting.label}</h4>
                      <p className="text-sm text-gray-600">{setting.description}</p>
                    </div>
                    <Switch 
                      checked={setting.enabled}
                      onCheckedChange={(checked) => updateGamificationSetting(setting.id, checked)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Personalização Visual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label>Tema das Metas</Label>
                  <Select value={settings.theme} onValueChange={(value) => setSettings({...settings, theme: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione um tema" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Padrão</SelectItem>
                      <SelectItem value="dark">Escuro</SelectItem>
                      <SelectItem value="colorful">Colorido</SelectItem>
                      <SelectItem value="minimal">Minimalista</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-medium">Esquema de Cores</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {themeOptions.map((theme) => (
                      <div 
                        key={theme.id}
                        className={`p-4 border-2 rounded-lg text-center cursor-pointer transition-all hover:shadow-md ${
                          selectedTheme === theme.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedTheme(theme.id)}
                      >
                        <div className={`w-full h-20 ${theme.gradient} rounded mb-3 relative`}>
                          {selectedTheme === theme.id && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Check className="w-6 h-6 text-white" />
                            </div>
                          )}
                        </div>
                        <p className="text-sm font-medium">{theme.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Prévia do Tema Selecionado</h4>
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 ${themeOptions.find(t => t.id === selectedTheme)?.gradient} rounded-lg`}></div>
                    <div>
                      <p className="font-medium">Tema: {themeOptions.find(t => t.id === selectedTheme)?.name}</p>
                      <p className="text-sm text-gray-600">Este tema será aplicado a todas as suas metas</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
