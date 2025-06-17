
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Switch } from '../../../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { userRoles, permissions, getCategoryColor } from './permissionsData';

interface PermissionsMatrixProps {
  selectedRole: string;
  setSelectedRole: (role: string) => void;
  localSettings: any;
  onPermissionToggle: (roleId: string, permissionId: string, enabled: boolean) => void;
}

export const PermissionsMatrix = ({ 
  selectedRole, 
  setSelectedRole, 
  localSettings, 
  onPermissionToggle 
}: PermissionsMatrixProps) => {
  const currentRole = userRoles.find(r => r.id === selectedRole);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Matriz de Permissões</CardTitle>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-48">
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
      </CardHeader>
      <CardContent>
        {currentRole && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <currentRole.icon className="w-6 h-6 text-gray-600" />
              <div>
                <h4 className="font-medium">{currentRole.label}</h4>
                <p className="text-sm text-gray-600">{currentRole.description}</p>
              </div>
              <Badge className={currentRole.color}>{currentRole.label}</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {permissions.map((permission) => (
                <div key={permission.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Badge className={getCategoryColor(permission.category)} variant="outline">
                      {permission.category}
                    </Badge>
                    <span className="text-sm font-medium">{permission.label}</span>
                  </div>
                  <Switch
                    checked={
                      (localSettings.rolePermissions?.[selectedRole]?.[permission.id] ?? 
                      currentRole.permissions.includes(permission.id)) || 
                      currentRole.permissions.includes('full_access')
                    }
                    onCheckedChange={(checked) => onPermissionToggle(selectedRole, permission.id, checked)}
                    disabled={currentRole.permissions.includes('full_access')}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
