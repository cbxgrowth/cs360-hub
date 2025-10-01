export interface ApiKey {
  id: string;
  user_id: string;
  name: string;
  key: string;
  key_prefix: string;
  scopes: ApiScope[];
  rate_limit: number;
  requests_count: number;
  last_used_at?: string;
  expires_at?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type ApiScope = 
  | 'clients:read'
  | 'clients:write'
  | 'campaigns:read'
  | 'campaigns:write'
  | 'automations:read'
  | 'automations:write'
  | 'analytics:read'
  | 'webhooks:read'
  | 'webhooks:write';

export interface ApiRequest {
  id: string;
  api_key_id: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  status_code: number;
  response_time: number;
  ip_address: string;
  user_agent: string;
  created_at: string;
}

export interface ApiRateLimit {
  limit: number;
  remaining: number;
  reset_at: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    page?: number;
    per_page?: number;
    total?: number;
    rate_limit?: ApiRateLimit;
  };
}
