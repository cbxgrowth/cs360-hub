
import React from 'react';
import { Button } from '../../ui/button';
import { UserPlus, Upload, Download } from 'lucide-react';

interface UserManagementHeaderProps {
  onCreateUser: () => void;
}

export const UserManagementHeader: React.FC<UserManagementHeaderProps> = ({ onCreateUser }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Gestão de Usuários</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Gerencie usuários, permissões e controle de acesso
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <Button variant="outline" className="flex items-center space-x-2">
          <Upload className="w-4 h-4" />
          <span>Importar</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Exportar</span>
        </Button>
        <Button onClick={onCreateUser} className="flex items-center space-x-2">
          <UserPlus className="w-4 h-4" />
          <span>Novo Usuário</span>
        </Button>
      </div>
    </div>
  );
};
