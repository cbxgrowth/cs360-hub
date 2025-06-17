
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../../ui/form';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Textarea } from '../../ui/textarea';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { useForm } from 'react-hook-form';
import { Shield, Lock, CheckCircle, Eye } from 'lucide-react';

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
  { value: 'admin', label: 'Administrador da Conta', color: 'red', accessLevel: 5, permissions: ['all'] },
  { value: 'cs_manager', label: 'Gestor de CS', color: 'blue', accessLevel: 4, permissions: ['clients', 'contracts', 'reports', 'strategies'] },
  { value: 'sales_specialist', label: 'Especialista de Vendas', color: 'green', accessLevel: 3, permissions: ['clients', 'services', 'ltv_cac'] },
  { value: 'cs_user', label: 'Usuário CS', color: 'gray', accessLevel: 2, permissions: ['clients', 'nps'] },
  { value: 'financial_analyst', label: 'Analista Financeiro', color: 'purple', accessLevel: 3, permissions: ['reports', 'ltv_cac', 'contracts'] }
];

const departments = [
  'Customer Success',
  'Vendas',
  'Financeiro',
  'Marketing',
  'Tecnologia',
  'Administrativo'
];

const allPermissions = [
  { id: 'clients', name: 'Gestão de Clientes', department: 'cs' },
  { id: 'contracts', name: 'Contratos', department: 'financial' },
  { id: 'services', name: 'Serviços & Upsell', department: 'sales' },
  { id: 'nps', name: 'NPS', department: 'cs' },
  { id: 'ltv_cac', name: 'LTV & CAC', department: 'financial' },
  { id: 'strategies', name: 'Estratégias', department: 'cs' },
  { id: 'automation', name: 'Automação & IA', department: 'tech' },
  { id: 'reports', name: 'Relatórios', department: 'admin' },
  { id: 'user_management', name: 'Gestão de Usuários', department: 'admin' },
  { id: 'billing', name: 'Faturamento', department: 'financial' }
];

interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: User) => void;
  editingUser?: User | null;
}

export const UserForm: React.FC<UserFormProps> = ({ isOpen, onClose, onSubmit, editingUser }) => {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      role: 'cs_user',
      department: 'Customer Success',
      permissions: []
    }
  });

  const getAccessLevelIcon = (level: number) => {
    if (level >= 5) return <Shield className="w-4 h-4 text-red-500" />;
    if (level >= 4) return <Lock className="w-4 h-4 text-blue-500" />;
    if (level >= 3) return <CheckCircle className="w-4 h-4 text-green-500" />;
    return <Eye className="w-4 h-4 text-gray-500" />;
  };

  const handleRoleChange = (roleValue: string) => {
    const role = roles.find(r => r.value === roleValue);
    if (role) {
      setSelectedPermissions(role.permissions);
      form.setValue('role', roleValue);
    }
  };

  const handleCreateUser = (data: any) => {
    const selectedRole = roles.find(r => r.value === data.role);
    const newUser: User = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      role: data.role || 'cs_user',
      status: 'active',
      lastAccess: 'Nunca',
      permissions: selectedPermissions,
      department: data.department,
      accessLevel: selectedRole?.accessLevel || 2
    };
    onSubmit(newUser);
    setSelectedPermissions([]);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Usuário</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreateUser)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o nome" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="usuario@empresa.com" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Perfil de Acesso</FormLabel>
                    <Select onValueChange={handleRoleChange} value={field.value || 'cs_user'}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um perfil" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roles.map(role => (
                          <SelectItem key={role.value} value={role.value}>
                            <div className="flex items-center space-x-2">
                              {getAccessLevelIcon(role.accessLevel)}
                              <span>{role.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Departamento</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || 'Customer Success'}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o departamento" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departments.map(dept => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-3">
              <FormLabel>Permissões do Sistema</FormLabel>
              <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto border rounded-lg p-4">
                {allPermissions.map(permission => (
                  <div key={permission.id} className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      id={permission.id} 
                      className="rounded"
                      checked={selectedPermissions.includes(permission.id) || selectedPermissions.includes('all')}
                      onChange={(e) => {
                        if (e.target.checked && !selectedPermissions.includes(permission.id)) {
                          setSelectedPermissions([...selectedPermissions, permission.id]);
                        } else {
                          setSelectedPermissions(selectedPermissions.filter(p => p !== permission.id));
                        }
                      }}
                      disabled={selectedPermissions.includes('all')}
                    />
                    <label htmlFor={permission.id} className="text-sm flex items-center space-x-2">
                      <span>{permission.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {permission.department}
                      </Badge>
                    </label>
                  </div>
                ))}
              </div>
              {selectedPermissions.includes('all') && (
                <div className="flex items-center space-x-2 text-sm text-blue-600 bg-blue-50 p-2 rounded">
                  <Shield className="w-4 h-4" />
                  <span>Administrador tem acesso total ao sistema</span>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">Criar Usuário</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
