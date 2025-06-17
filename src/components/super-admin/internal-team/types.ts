
export interface NewUserForm {
  name: string;
  email: string;
  phone: string;
  role: 'financeiro' | 'comercial' | 'cs' | 'cs_empresas' | 'cs_cliente_final' | 'consultor_vendas_colaborador';
  department: string;
  status: 'active' | 'inactive';
  permissions: string[];
}

export interface RoleConfig {
  value: 'financeiro' | 'comercial' | 'cs' | 'cs_empresas' | 'cs_cliente_final' | 'consultor_vendas_colaborador';
  label: string;
  color: string;
}
