
import type { RoleConfig } from './types';

export const roles: RoleConfig[] = [
  { value: 'financeiro', label: 'Financeiro', color: 'bg-green-100 text-green-800' },
  { value: 'comercial', label: 'Comercial', color: 'bg-blue-100 text-blue-800' },
  { value: 'cs', label: 'Customer Success', color: 'bg-purple-100 text-purple-800' },
  { value: 'cs_empresas', label: 'CS Empresas', color: 'bg-indigo-100 text-indigo-800' },
  { value: 'cs_cliente_final', label: 'CS Cliente Final', color: 'bg-pink-100 text-pink-800' },
  { value: 'consultor_vendas_colaborador', label: 'Consultor Vendas', color: 'bg-yellow-100 text-yellow-800' }
];

export const departments = [
  'desenvolvimento',
  'produto',
  'vendas',
  'atendimento',
  'marketing',
  'financeiro',
  'rh'
];
