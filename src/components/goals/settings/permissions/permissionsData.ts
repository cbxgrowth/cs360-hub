
import { Eye, User, Users, Crown } from 'lucide-react';

export const userRoles = [
  {
    id: 'viewer',
    label: 'Visualizador',
    description: 'Pode apenas visualizar metas atribuídas',
    icon: Eye,
    color: 'bg-gray-100 text-gray-800',
    permissions: ['view_own_goals', 'view_team_goals']
  },
  {
    id: 'contributor',
    label: 'Colaborador',
    description: 'Pode atualizar progresso das suas metas',
    icon: User,
    color: 'bg-blue-100 text-blue-800',
    permissions: ['view_own_goals', 'view_team_goals', 'update_own_goals', 'comment_goals']
  },
  {
    id: 'manager',
    label: 'Gerente',
    description: 'Pode criar e gerenciar metas da equipe',
    icon: Users,
    color: 'bg-green-100 text-green-800',
    permissions: ['view_all_goals', 'create_goals', 'update_all_goals', 'assign_goals', 'delete_goals']
  },
  {
    id: 'admin',
    label: 'Administrador',
    description: 'Acesso total ao sistema de metas',
    icon: Crown,
    color: 'bg-purple-100 text-purple-800',
    permissions: ['full_access', 'manage_permissions', 'system_settings', 'view_reports']
  }
];

export const permissions = [
  { id: 'view_own_goals', label: 'Ver próprias metas', category: 'view' },
  { id: 'view_team_goals', label: 'Ver metas da equipe', category: 'view' },
  { id: 'view_all_goals', label: 'Ver todas as metas', category: 'view' },
  { id: 'create_goals', label: 'Criar metas', category: 'create' },
  { id: 'update_own_goals', label: 'Atualizar próprias metas', category: 'update' },
  { id: 'update_all_goals', label: 'Atualizar todas as metas', category: 'update' },
  { id: 'assign_goals', label: 'Atribuir metas', category: 'manage' },
  { id: 'delete_goals', label: 'Excluir metas', category: 'delete' },
  { id: 'comment_goals', label: 'Comentar em metas', category: 'interact' },
  { id: 'manage_permissions', label: 'Gerenciar permissões', category: 'admin' },
  { id: 'system_settings', label: 'Configurações do sistema', category: 'admin' },
  { id: 'view_reports', label: 'Ver relatórios', category: 'reports' },
  { id: 'export_data', label: 'Exportar dados', category: 'reports' }
];

export const getCategoryColor = (category: string) => {
  switch (category) {
    case 'view': return 'bg-blue-100 text-blue-800';
    case 'create': return 'bg-green-100 text-green-800';
    case 'update': return 'bg-yellow-100 text-yellow-800';
    case 'delete': return 'bg-red-100 text-red-800';
    case 'manage': return 'bg-purple-100 text-purple-800';
    case 'admin': return 'bg-gray-100 text-gray-800';
    case 'reports': return 'bg-indigo-100 text-indigo-800';
    case 'interact': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
