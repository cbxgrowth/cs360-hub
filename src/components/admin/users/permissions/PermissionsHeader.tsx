
import React from 'react';
import { Button } from '../../../ui/button';
import { Plus } from 'lucide-react';

export const PermissionsHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-xl font-bold">Matriz de Permissões</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Configure permissões detalhadas por perfil de usuário
        </p>
      </div>
      <Button>
        <Plus className="w-4 h-4 mr-2" />
        Novo Perfil
      </Button>
    </div>
  );
};
