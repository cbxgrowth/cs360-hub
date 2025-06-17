
import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Shield, Save } from 'lucide-react';
import { useToast } from '../../../hooks/use-toast';
import { GeneralAccessSettings } from './permissions/GeneralAccessSettings';
import { SecuritySettings } from './permissions/SecuritySettings';
import { PermissionsMatrix } from './permissions/PermissionsMatrix';
import { UsersByRole } from './permissions/UsersByRole';

interface PermissionSettingsProps {
  settings: any;
  onSettingsChange: (settings: any) => void;
}

export const PermissionSettings = ({ settings, onSettingsChange }: PermissionSettingsProps) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [isDirty, setIsDirty] = useState(false);
  const [selectedRole, setSelectedRole] = useState('contributor');
  const { toast } = useToast();

  const handlePermissionToggle = (roleId: string, permissionId: string, enabled: boolean) => {
    const newSettings = {
      ...localSettings,
      rolePermissions: {
        ...localSettings.rolePermissions,
        [roleId]: {
          ...localSettings.rolePermissions?.[roleId],
          [permissionId]: enabled
        }
      }
    };
    setLocalSettings(newSettings);
    setIsDirty(true);
  };

  const handleSettingChange = (key: string, value: any) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    setIsDirty(true);
  };

  const handleSave = () => {
    onSettingsChange(localSettings);
    setIsDirty(false);
    toast({
      title: "Permissões configuradas",
      description: "As configurações de permissão foram salvas com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-purple-600" />
          <h3 className="text-xl font-semibold">Configurações de Permissão</h3>
          {isDirty && <Badge variant="outline" className="text-orange-600">Não salvo</Badge>}
        </div>
        <Button onClick={handleSave} disabled={!isDirty}>
          <Save className="w-4 h-4 mr-2" />
          Salvar
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GeneralAccessSettings 
          localSettings={localSettings} 
          onSettingChange={handleSettingChange} 
        />
        <SecuritySettings 
          localSettings={localSettings} 
          onSettingChange={handleSettingChange} 
        />
      </div>

      <PermissionsMatrix
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        localSettings={localSettings}
        onPermissionToggle={handlePermissionToggle}
      />

      <UsersByRole />
    </div>
  );
};
