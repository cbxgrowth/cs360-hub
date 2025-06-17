
export interface ContractClient {
  id: string;
  name: string;
  email: string;
  company: string;
  tier: string;
}

export interface Contract {
  id: string;
  user_id: string;
  client_id: string;
  contract_number: string;
  status: string;
  value: number;
  start_date: string;
  end_date: string;
  renewal_status: string;
  services: string[] | null;
  created_at?: string;
  updated_at?: string;
  clients?: ContractClient;
}

export interface TransformedService {
  id: number;
  name: string;
  category: string;
}
