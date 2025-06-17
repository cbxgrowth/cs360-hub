
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { useSuperAdmin } from '@/hooks/useSuperAdmin';
import { TeamMemberCard } from './internal-team/TeamMemberCard';
import { AddUserForm } from './internal-team/AddUserForm';
import { TeamFilters } from './internal-team/TeamFilters';
import { EmptyState } from './internal-team/EmptyState';
import type { NewUserForm } from './internal-team/types';

export const InternalTeamManagement = () => {
  const { internalUsers, addInternalUser, deleteInternalUser } = useSuperAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('todos');
  const [showAddForm, setShowAddForm] = useState(false);

  const [newUser, setNewUser] = useState<NewUserForm>({
    name: '',
    email: '',
    phone: '',
    role: 'cs',
    department: 'atendimento',
    status: 'active' as const,
    permissions: []
  });

  const filteredUsers = internalUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'todos' || user.role === filterRole;
    
    return matchesSearch && matchesRole;
  });

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email) return;
    
    await addInternalUser(newUser);
    setNewUser({
      name: '',
      email: '',
      phone: '',
      role: 'cs',
      department: 'atendimento',
      status: 'active' as const,
      permissions: []
    });
    setShowAddForm(false);
  };

  const handleDeleteUser = async (userId: string) => {
    if (confirm('Tem certeza que deseja remover este usuário?')) {
      await deleteInternalUser(userId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestão da Equipe Interna</h2>
          <p className="text-muted-foreground">Administração da equipe CS360°</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Membro
        </Button>
      </div>

      {showAddForm && (
        <AddUserForm
          newUser={newUser}
          setNewUser={setNewUser}
          onSubmit={handleAddUser}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <TeamFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterRole={filterRole}
        setFilterRole={setFilterRole}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <TeamMemberCard
            key={user.id}
            user={user}
            onDelete={handleDeleteUser}
          />
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <EmptyState searchTerm={searchTerm} />
      )}
    </div>
  );
};
