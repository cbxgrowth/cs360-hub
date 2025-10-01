export interface AutomationTrigger {
  id: string;
  type: 'event' | 'schedule' | 'condition' | 'webhook';
  event?: string;
  schedule?: string;
  condition?: {
    field: string;
    operator: 'equals' | 'greater_than' | 'less_than' | 'contains' | 'not_equals';
    value: any;
  };
  config: Record<string, any>;
}

export interface AutomationAction {
  id: string;
  type: 'email' | 'notification' | 'webhook' | 'task' | 'update_field' | 'create_task' | 'send_sms';
  config: Record<string, any>;
  delay?: number; // delay in minutes
}

export interface Automation {
  id: string;
  user_id: string;
  name: string;
  description: string;
  type: 'trigger' | 'scheduled' | 'ai-driven';
  status: 'active' | 'paused' | 'draft';
  category: 'customer' | 'sales' | 'support' | 'marketing';
  triggers: AutomationTrigger[];
  actions: AutomationAction[];
  conditions?: any[];
  last_run?: string;
  next_run?: string;
  executions: number;
  success_rate: number;
  created_at: string;
  updated_at: string;
}

export interface AutomationExecution {
  id: string;
  automation_id: string;
  status: 'success' | 'failed' | 'running';
  started_at: string;
  completed_at?: string;
  error?: string;
  logs: AutomationLog[];
}

export interface AutomationLog {
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  data?: any;
}

export interface TriggerEvent {
  type: string;
  data: Record<string, any>;
  timestamp: string;
  source: string;
}
