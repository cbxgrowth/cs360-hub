
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Permission, Role } from './permissionsData';
import { PermissionItem } from './PermissionItem';

interface PermissionsGridProps {
  currentRole: Role | undefined;
  permissions: Permission[];
  getCategoryColor: (category: string) => string;
}

export const PermissionsGrid: React.FC<PermissionsGridProps> = ({
  currentRole,
  permissions,
  getCategoryColor
}) => {
  const modules = Array.from(new Set(permissions.map(p => p.module)));

  const hasPermission = (permissionId: string) => {
    return currentRole?.permissions.includes(permissionId) || false;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Permissões do Perfil: {currentRole?.name}</span>
          <Badge className={getCategoryColor('admin')}>
            {currentRole?.permissions.length} permissões ativas
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {modules.map(module => (
            <div key={module} className="space-y-3">
              <h4 className="font-semibold text-lg border-b pb-2">{module}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {permissions
                  .filter(p => p.module === module)
                  .map(permission => (
                    <PermissionItem
                      key={permission.id}
                      permission={permission}
                      hasPermission={hasPermission(permission.id)}
                      isDisabled={currentRole?.id === 'admin'}
                      getCategoryColor={getCategoryColor}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
