
import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { PermissionsHeader } from './permissions/PermissionsHeader';
import { RoleSelector } from './permissions/RoleSelector';
import { PermissionsGrid } from './permissions/PermissionsGrid';
import { permissions, roles } from './permissions/permissionsData';

export const PermissionsMatrix = () => {
  const [selectedRole, setSelectedRole] = useState<string>('cs_manager');

  const currentRole = roles.find(r => r.id === selectedRole);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'read': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'write': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'delete': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'admin': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <PermissionsHeader />

      <RoleSelector 
        roles={roles}
        selectedRole={selectedRole}
        onRoleSelect={setSelectedRole}
      />

      <PermissionsGrid 
        currentRole={currentRole}
        permissions={permissions}
        getCategoryColor={getCategoryColor}
      />

      <div className="flex justify-end space-x-3">
        <Button variant="outline">Cancelar</Button>
        <Button>Salvar Permissões</Button>
      </div>
    </div>
  );
};
