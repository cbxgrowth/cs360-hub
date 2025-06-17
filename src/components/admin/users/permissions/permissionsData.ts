
export interface Permission {
  id: string;
  module: string;
  action: string;
  description: string;
  icon: any;
  category: 'read' | 'write' | 'delete' | 'admin';
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  level: number;
}

export const permissions: Permission[] = [
  // Clientes
  { id: 'clients_view', module: 'Clientes', action: 'Visualizar', description: 'Ver lista e detalhes de clientes', icon: 'Eye', category: 'read' },
  { id: 'clients_create', module: 'Clientes', action: 'Criar', description: 'Criar novos clientes', icon: 'Plus', category: 'write' },
  { id: 'clients_edit', module: 'Clientes', action: 'Editar', description: 'Editar informações de clientes', icon: 'Edit', category: 'write' },
  { id: 'clients_delete', module: 'Clientes', action: 'Excluir', description: 'Remover clientes do sistema', icon: 'Trash2', category: 'delete' },
  { id: 'clients_export', module: 'Clientes', action: 'Exportar', description: 'Exportar dados de clientes', icon: 'Download', category: 'read' },

  // Contratos
  { id: 'contracts_view', module: 'Contratos', action: 'Visualizar', description: 'Ver contratos e detalhes', icon: 'Eye', category: 'read' },
  { id: 'contracts_create', module: 'Contratos', action: 'Criar', description: 'Criar novos contratos', icon: 'Plus', category: 'write' },
  { id: 'contracts_edit', module: 'Contratos', action: 'Editar', description: 'Modificar contratos existentes', icon: 'Edit', category: 'write' },
  { id: 'contracts_delete', module: 'Contratos', action: 'Cancelar', description: 'Cancelar contratos', icon: 'Trash2', category: 'delete' },

  // Relatórios
  { id: 'reports_view', module: 'Relatórios', action: 'Visualizar', description: 'Acessar relatórios e dashboards', icon: 'BarChart3', category: 'read' },
  { id: 'reports_create', module: 'Relatórios', action: 'Criar', description: 'Criar relatórios customizados', icon: 'Plus', category: 'write' },
  { id: 'reports_export', module: 'Relatórios', action: 'Exportar', description: 'Exportar relatórios', icon: 'Download', category: 'read' },

  // Administração
  { id: 'admin_users', module: 'Administração', action: 'Usuários', description: 'Gerenciar usuários e permissões', icon: 'Users', category: 'admin' },
  { id: 'admin_settings', module: 'Administração', action: 'Configurações', description: 'Alterar configurações do sistema', icon: 'Settings', category: 'admin' },
  { id: 'admin_security', module: 'Administração', action: 'Segurança', description: 'Gerenciar configurações de segurança', icon: 'Shield', category: 'admin' },
  { id: 'admin_backup', module: 'Administração', action: 'Backup', description: 'Realizar e restaurar backups', icon: 'Database', category: 'admin' }
];

export const roles: Role[] = [
  {
    id: 'admin',
    name: 'Administrador',
    description: 'Acesso total ao sistema',
    permissions: permissions.map(p => p.id),
    userCount: 2,
    level: 5
  },
  {
    id: 'cs_manager',
    name: 'Gerente CS',
    description: 'Gerenciamento completo de Customer Success',
    permissions: [
      'clients_view', 'clients_create', 'clients_edit', 'clients_export',
      'contracts_view', 'contracts_create', 'contracts_edit',
      'reports_view', 'reports_create', 'reports_export'
    ],
    userCount: 3,
    level: 4
  },
  {
    id: 'cs_specialist',
    name: 'Especialista CS',
    description: 'Operação de Customer Success',
    permissions: [
      'clients_view', 'clients_edit', 'clients_export',
      'contracts_view', 'contracts_edit',
      'reports_view', 'reports_export'
    ],
    userCount: 5,
    level: 3
  },
  {
    id: 'analyst',
    name: 'Analista',
    description: 'Análise e relatórios',
    permissions: [
      'clients_view', 'clients_export',
      'contracts_view',
      'reports_view', 'reports_create', 'reports_export'
    ],
    userCount: 2,
    level: 2
  },
  {
    id: 'viewer',
    name: 'Visualizador',
    description: 'Apenas visualização',
    permissions: [
      'clients_view',
      'contracts_view',
      'reports_view'
    ],
    userCount: 1,
    level: 1
  }
];
