
import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Card, CardContent } from '../../ui/card';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Badge } from '../../ui/badge';
import { Users, Plus, Trash2, Mail, Shield } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UsersSetupStepProps {
  onComplete: () => void;
}

export const UsersSetupStep: React.FC<UsersSetupStepProps> = ({ onComplete }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });

  const roles = [
    { value: 'admin', label: 'Administrador', description: 'Acesso total à plataforma' },
    { value: 'cs_manager', label: 'Gestor CS', description: 'Gerencia equipe e estratégias' },
    { value: 'cs_user', label: 'Usuário CS', description: 'Atendimento e acompanhamento' },
    { value: 'sales', label: 'Vendas', description: 'Acesso a métricas e pipeline' }
  ];

  const addUser = () => {
    if (newUser.name && newUser.email && newUser.role) {
      setUsers(prev => [...prev, { ...newUser, id: Date.now().toString() }]);
      setNewUser({ name: '', email: '', role: '' });
    }
  };

  const removeUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const getRoleInfo = (roleValue: string) => {
    return roles.find(role => role.value === roleValue);
  };

  const handleComplete = () => {
    localStorage.setItem('cs360-users-setup', JSON.stringify(users));
    onComplete();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Users className="w-12 h-12 mx-auto text-blue-600 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Configure Usuários e Permissões
        </h2>
        <p className="text-gray-600">
          Adicione pelo menos 1 usuário à sua equipe para continuar
        </p>
      </div>

      {/* Add New User */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Adicionar Novo Usuário
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="userName">Nome Completo</Label>
              <Input
                id="userName"
                placeholder="Ex: João Silva"
                value={newUser.name}
                onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="userEmail">Email</Label>
              <Input
                id="userEmail"
                type="email"
                placeholder="joao@empresa.com"
                value={newUser.email}
                onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="userRole">Cargo/Função</Label>
              <Select onValueChange={(value) => setNewUser(prev => ({ ...prev, role: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o cargo" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map(role => (
                    <SelectItem key={role.value} value={role.value}>
                      <div>
                        <div className="font-medium">{role.label}</div>
                        <div className="text-xs text-gray-500">{role.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={addUser}
            disabled={!newUser.name || !newUser.email || !newUser.role}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Usuário
          </Button>
        </CardContent>
      </Card>

      {/* Users List */}
      {users.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Usuários Adicionados ({users.length})
            </h3>
            
            <div className="space-y-3">
              {users.map(user => {
                const roleInfo = getRoleInfo(user.role);
                return (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-600 flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="flex items-center">
                        <Shield className="w-3 h-3 mr-1" />
                        {roleInfo?.label}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeUser(user.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end">
        <Button 
          onClick={handleComplete}
          disabled={users.length === 0}
          className="bg-gradient-to-r from-blue-600 to-purple-600"
        >
          Continuar com {users.length} usuário{users.length !== 1 ? 's' : ''}
        </Button>
      </div>
    </div>
  );
};
