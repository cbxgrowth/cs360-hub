
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Switch } from '../../../ui/switch';
import { Label } from '../../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { userRoles } from './permissionsData';

interface GeneralAccessSettingsProps {
  localSettings: any;
  onSettingChange: (key: string, value: any) => void;
}

export const GeneralAccessSettings = ({ localSettings, onSettingChange }: GeneralAccessSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Configurações Gerais de Acesso</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="defaultRole">Função padrão para novos usuários</Label>
          <Select
            value={localSettings.defaultRole || 'contributor'}
            onValueChange={(value) => onSettingChange('defaultRole', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {userRoles.map((role) => (
                <SelectItem key={role.id} value={role.id}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Aprovação automática</Label>
            <p className="text-sm text-gray-500">Aprovar automaticamente novos usuários</p>
          </div>
          <Switch
            checked={localSettings.autoApproval ?? true}
            onCheckedChange={(checked) => onSettingChange('autoApproval', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Herança de permissões</Label>
            <p className="text-sm text-gray-500">Permitir herança de permissões entre equipes</p>
          </div>
          <Switch
            checked={localSettings.inheritPermissions ?? false}
            onCheckedChange={(checked) => onSettingChange('inheritPermissions', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Auditoria de acesso</Label>
            <p className="text-sm text-gray-500">Registrar todas as ações dos usuários</p>
          </div>
          <Switch
            checked={localSettings.accessAudit ?? true}
            onCheckedChange={(checked) => onSettingChange('accessAudit', checked)}
          />
        </div>
      </CardContent>
    </Card>
  );
};
