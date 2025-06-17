
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Role } from './permissionsData';

interface RoleSelectorProps {
  roles: Role[];
  selectedRole: string;
  onRoleSelect: (roleId: string) => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  roles,
  selectedRole,
  onRoleSelect
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfis de Usuário</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {roles.map(role => (
            <div
              key={role.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedRole === role.id 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
              }`}
              onClick={() => onRoleSelect(role.id)}
            >
              <div className="text-center">
                <h4 className="font-semibold text-sm">{role.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{role.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <Badge variant="outline" className="text-xs">
                    Nível {role.level}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {role.userCount} usuários
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
