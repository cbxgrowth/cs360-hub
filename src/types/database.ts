export interface DatabaseProfile {
  id: string;
  user_id: string;
  email?: string;
  full_name?: string;
  company_name?: string;
  plan_type?: 'starter' | 'professional' | 'growth' | 'enterprise' | 'partner' | 'account_admin' | 'super_admin';
  user_type?: 'starter' | 'professional' | 'growth' | 'enterprise' | 'partner' | 'account_admin' | 'super_admin';
  ai_credits?: number;
  ai_credits_used?: number;
  // Partner-specific fields
  partner_sales_count?: number;
  partner_level?: 'starter' | 'member' | 'gold' | 'platinum' | 'elite';
  first_sale_confirmed?: boolean;
  created_at?: string;
  updated_at?: string;
}

// Add validation helper
export const validateUserType = (userType: string | undefined): userType is DatabaseProfile['user_type'] => {
  const validTypes = ['starter', 'professional', 'growth', 'enterprise', 'partner', 'account_admin', 'super_admin'];
  return userType ? validTypes.includes(userType) : false;
};

// Add default profile helper
export const createDefaultProfile = (userId: string, email: string): Partial<DatabaseProfile> => ({
  id: userId,
  user_id: userId,
  email,
  user_type: 'starter',
  plan_type: 'starter',
  ai_credits: 100,
  ai_credits_used: 0
});

export interface DatabaseClient {
  id: string;
  user_id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  status?: string;
  health_score?: number;
  last_interaction?: string;
  mrr?: number;
  plan?: string;
  contract_start?: string;
  contract_end?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DatabaseContract {
  id: string;
  user_id: string;
  client_id: string;
  contract_number: string;
  status: string;
  value: number;
  start_date: string;
  end_date: string;
  renewal_status: string;
  services?: any;
  created_at?: string;
  updated_at?: string;
  clients?: {
    id: string;
    name: string;
    email: string;
    company: string;
  };
}

export interface DatabaseGoal {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  category: string;
  target: number;
  current?: number;
  unit: string;
  deadline: string;
  status: string;
  priority: string;
  created_at?: string;
  updated_at?: string;
}

export interface DatabaseService {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}
