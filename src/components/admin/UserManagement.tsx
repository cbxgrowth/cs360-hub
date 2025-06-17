
import React, { useState } from 'react';
import { UserForm } from './users/UserForm';
import { ActivityMonitor } from './users/ActivityMonitor';
import { UserStats } from './users/UserStats';
import { UserFilters } from './users/UserFilters';
import { UserManagementHeader } from './users/UserManagementHeader';
import { UserTableEnhanced } from './users/UserTableEnhanced';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'suspended';
  lastAccess: string;
  permissions: string[];
  department: string;
  accessLevel: number;
  avatar?: string;
  phone?: string;
  createdAt: string;
  loginCount: number;
  twoFactorEnabled: boolean;
}

export const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@empresa.com',
      role: 'admin',
      status: 'active',
      lastAccess: '2024-01-15 14:30',
      permissions: ['all'],
      department: 'Administrativo',
      accessLevel: 5,
      phone: '+55 11 99999-9999',
      createdAt: '2023-06-15',
      loginCount: 247,
      twoFactorEnabled: true
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria@empresa.com',
      role: 'cs_manager',
      status: 'active',
      lastAccess: '2024-01-15 09:15',
      permissions: ['clients', 'contracts', 'reports', 'strategies'],
      department: 'Customer Success',
      accessLevel: 4,
      phone: '+55 11 88888-8888',
      createdAt: '2023-08-22',
      loginCount: 156,
      twoFactorEnabled: false
    },
    {
      id: '3',
      name: 'Carlos Oliveira',
      email: 'carlos@empresa.com',
      role: 'sales_specialist',
      status: 'active',
      lastAccess: '2024-01-15 11:20',
      permissions: ['clients', 'services', 'ltv_cac'],
      department: 'Vendas',
      accessLevel: 3,
      phone: '+55 11 77777-7777',
      createdAt: '2023-09-10',
      loginCount: 89,
      twoFactorEnabled: true
    },
    {
      id: '4',
      name: 'Ana Costa',
      email: 'ana@empresa.com',
      role: 'financial_analyst',
      status: 'suspended',
      lastAccess: '2024-01-10 16:45',
      permissions: ['reports', 'ltv_cac', 'contracts'],
      department: 'Financeiro',
      accessLevel: 3,
      phone: '+55 11 66666-6666',
      createdAt: '2023-11-05',
      loginCount: 34,
      twoFactorEnabled: false
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleCreateUser = (userData: Omit<User, 'id' | 'createdAt' | 'loginCount' | 'twoFactorEnabled'>) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      loginCount: 0,
      twoFactorEnabled: false
    };
    setUsers([...users, newUser]);
    setIsDialogOpen(false);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId));
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'suspended' : 'active' }
        : user
    ));
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setRoleFilter('all');
    setStatusFilter('all');
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const userStats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    suspended: users.filter(u => u.status === 'suspended').length,
    withTwoFactor: users.filter(u => u.twoFactorEnabled).length
  };

  return (
    <div className="space-y-6">
      <UserManagementHeader onCreateUser={() => setIsDialogOpen(true)} />
      
      <UserStats userStats={userStats} />
      
      <UserFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onClearFilters={handleClearFilters}
      />

      <UserTableEnhanced 
        users={filteredUsers}
        onDeleteUser={handleDeleteUser}
        onToggleUserStatus={handleToggleUserStatus}
      />

      <ActivityMonitor />

      <UserForm 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleCreateUser}
      />
    </div>
  );
};
