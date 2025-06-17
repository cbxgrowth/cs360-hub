
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Switch } from '../../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Badge } from '../../ui/badge';
import { Settings, Save, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../../hooks/use-toast';

interface GeneralSettingsProps {
  settings: any;
  onSettingsChange: (settings: any) => void;
}

export const GeneralSettings = ({ settings, onSettingsChange }: GeneralSettingsProps) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [isDirty, setIsDirty] = useState(false);
  const { toast } = useToast();

  const handleSettingChange = (key: string, value: any) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    setIsDirty(true);
  };

  const handleSave = () => {
    onSettingsChange(localSettings);
    setIsDirty(false);
    toast({
      title: "Configurações salvas",
      description: "As configurações gerais foram atualizadas com sucesso.",
    });
  };

  const handleReset = () => {
    setLocalSettings(settings);
    setIsDirty(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Settings className="w-5 h-5 text-blue-600" />
          <h3 className="text-xl font-semibold">Configurações Gerais</h3>
          {isDirty && <Badge variant="outline" className="text-orange-600">Não salvo</Badge>}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleReset} disabled={!isDirty}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Resetar
          </Button>
          <Button onClick={handleSave} disabled={!isDirty}>
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Configurações de Prazo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="defaultDeadline">Prazo padrão (dias)</Label>
              <Input
                id="defaultDeadline"
                value={localSettings.defaultDeadline}
                onChange={(e) => handleSettingChange('defaultDeadline', e.target.value)}
                type="number"
                min="1"
                max="365"
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">
                Prazo padrão aplicado a novas metas (1-365 dias)
              </p>
            </div>

            <div>
              <Label htmlFor="reminderDays">Lembrete antes do prazo (dias)</Label>
              <Select
                value={localSettings.reminderDays}
                onValueChange={(value) => handleSettingChange('reminderDays', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 dia</SelectItem>
                  <SelectItem value="3">3 dias</SelectItem>
                  <SelectItem value="7">7 dias</SelectItem>
                  <SelectItem value="14">14 dias</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="workingDays">Considerar apenas dias úteis</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Switch
                  checked={localSettings.workingDaysOnly}
                  onCheckedChange={(checked) => handleSettingChange('workingDaysOnly', checked)}
                />
                <span className="text-sm">Excluir fins de semana dos cálculos</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Configurações de Atribuição</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Atribuição automática</Label>
                <p className="text-sm text-gray-500">Atribuir automaticamente metas baseadas no departamento</p>
              </div>
              <Switch
                checked={localSettings.autoAssign}
                onCheckedChange={(checked) => handleSettingChange('autoAssign', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Requer aprovação</Label>
                <p className="text-sm text-gray-500">Metas precisam ser aprovadas antes de se tornarem ativas</p>
              </div>
              <Switch
                checked={localSettings.requireApproval}
                onCheckedChange={(checked) => handleSettingChange('requireApproval', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-atribuição</Label>
                <p className="text-sm text-gray-500">Permitir que usuários criem metas para si mesmos</p>
              </div>
              <Switch
                checked={localSettings.allowSelfAssign}
                onCheckedChange={(checked) => handleSettingChange('allowSelfAssign', checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Configurações de Progresso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="updateFrequency">Frequência de atualização</Label>
              <Select
                value={localSettings.updateFrequency}
                onValueChange={(value) => handleSettingChange('updateFrequency', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Diária</SelectItem>
                  <SelectItem value="weekly">Semanal</SelectItem>
                  <SelectItem value="monthly">Mensal</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Atualizações automáticas</Label>
                <p className="text-sm text-gray-500">Atualizar progresso automaticamente baseado em dados</p>
              </div>
              <Switch
                checked={localSettings.autoUpdate}
                onCheckedChange={(checked) => handleSettingChange('autoUpdate', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Validação de progresso</Label>
                <p className="text-sm text-gray-500">Validar atualizações de progresso antes de aplicar</p>
              </div>
              <Switch
                checked={localSettings.validateProgress}
                onCheckedChange={(checked) => handleSettingChange('validateProgress', checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Configurações de Sistema</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="maxGoalsPerUser">Máximo de metas por usuário</Label>
              <Input
                id="maxGoalsPerUser"
                value={localSettings.maxGoalsPerUser}
                onChange={(e) => handleSettingChange('maxGoalsPerUser', e.target.value)}
                type="number"
                min="1"
                max="100"
                className="mt-1"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Metas colaborativas</Label>
                <p className="text-sm text-gray-500">Permitir metas compartilhadas entre usuários</p>
              </div>
              <Switch
                checked={localSettings.allowCollaborative}
                onCheckedChange={(checked) => handleSettingChange('allowCollaborative', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Histórico de alterações</Label>
                <p className="text-sm text-gray-500">Manter log de todas as alterações nas metas</p>
              </div>
              <Switch
                checked={localSettings.keepHistory}
                onCheckedChange={(checked) => handleSettingChange('keepHistory', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {isDirty && (
        <div className="flex items-center space-x-2 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-orange-600" />
          <span className="text-orange-800">Você tem alterações não salvas. Lembre-se de salvar antes de sair.</span>
        </div>
      )}
    </div>
  );
};
