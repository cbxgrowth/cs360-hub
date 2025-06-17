
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Edit, Trash2, Eye, Shield, Lock, CheckCircle } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastAccess: string;
  permissions: string[];
  department: string;
  accessLevel: number;
}

const roles = [
  { value: 'admin', label: 'Administrador da Conta', color: 'red' },
  { value: 'cs_manager', label: 'Gestor de CS', color: 'blue' },
  { value: 'sales_specialist', label: 'Especialista de Vendas', color: 'green' },
  { value: 'cs_user', label: 'Usuário CS', color: 'gray' },
  { value: 'financial_analyst', label: 'Analista Financeiro', color: 'purple' }
];

const allPermissions = [
  { id: 'clients', name: 'Gestão de Clientes' },
  { id: 'contracts', name: 'Contratos' },
  { id: 'services', name: 'Serviços & Upsell' },
  { id: 'nps', name: 'NPS' },
  { id: 'ltv_cac', name: 'LTV & CAC' },
  { id: 'strategies', name: 'Estratégias' },
  { id: 'automation', name: 'Automação & IA' },
  { id: 'reports', name: 'Relatórios' },
  { id: 'user_management', name: 'Gestão de Usuários' },
  { id: 'billing', name: 'Faturamento' }
];

interface UserTableProps {
  users: User[];
  onDeleteUser: (userId: string) => void;
}

export const UserTable: React.FC<UserTableProps> = ({ users, onDeleteUser }) => {
  const getRoleBadgeColor = (role: string) => {
    const roleData = roles.find(r => r.value === role);
    return roleData?.color || 'gray';
  };

  const getRoleLabel = (role: string) => {
    const roleData = roles.find(r => r.value === role);
    return roleData?.label || role;
  };

  const getAccessLevelIcon = (level: number) => {
    if (level >= 5) return <Shield className="w-4 h-4 text-red-500" />;
    if (level >= 4) return <Lock className="w-4 h-4 text-blue-500" />;
    if (level >= 3) return <CheckCircle className="w-4 h-4 text-green-500" />;
    return <Eye className="w-4 h-4 text-gray-500" />;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Usuário</TableHead>
          <TableHead>Perfil & Acesso</TableHead>
          <TableHead>Departamento</TableHead>
          <TableHead>Permissões</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Último Acesso</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map(user => (
          <TableRow key={user.id}>
            <TableCell>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                {getAccessLevelIcon(user.accessLevel)}
                <Badge variant="secondary" className={`bg-${getRoleBadgeColor(user.role)}-100 text-${getRoleBadgeColor(user.role)}-800`}>
                  {getRoleLabel(user.role)}
                </Badge>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="outline">{user.department}</Badge>
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {user.permissions.includes('all') ? (
                  <Badge className="bg-red-100 text-red-800 text-xs">
                    Acesso Total
                  </Badge>
                ) : (
                  user.permissions.slice(0, 2).map(permission => (
                    <Badge key={permission} variant="outline" className="text-xs">
                      {allPermissions.find(p => p.id === permission)?.name || permission}
                    </Badge>
                  ))
                )}
                {user.permissions.length > 2 && !user.permissions.includes('all') && (
                  <Badge variant="outline" className="text-xs">
                    +{user.permissions.length - 2}
                  </Badge>
                )}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                  {user.status === 'active' ? 'Ativo' : 'Inativo'}
                </Badge>
                {user.status === 'active' && (
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                )}
              </div>
            </TableCell>
            <TableCell className="text-sm text-gray-500">
              {user.lastAccess}
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" title="Editar usuário">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" title="Ver detalhes">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onDeleteUser(user.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Remover usuário"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
