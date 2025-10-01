export interface EmailTemplate {
  id: string;
  user_id: string;
  name: string;
  subject: string;
  html_content: string;
  text_content?: string;
  variables: string[];
  preview_text?: string;
  thumbnail?: string;
  category?: string;
  created_at: string;
  updated_at: string;
}

export interface Campaign {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  type: 'email' | 'sms' | 'push' | 'multi-channel';
  status: 'draft' | 'scheduled' | 'running' | 'completed' | 'paused' | 'failed';
  template_id?: string;
  template?: EmailTemplate;
  segment?: string;
  recipients_count: number;
  sent_count: number;
  delivered_count: number;
  opened_count: number;
  clicked_count: number;
  converted_count: number;
  bounced_count: number;
  unsubscribed_count: number;
  scheduled_at?: string;
  started_at?: string;
  completed_at?: string;
  settings?: CampaignSettings;
  created_at: string;
  updated_at: string;
}

export interface CampaignSettings {
  send_time?: string;
  timezone?: string;
  ab_test?: boolean;
  ab_test_percentage?: number;
  track_opens?: boolean;
  track_clicks?: boolean;
  unsubscribe_link?: boolean;
}

export interface CampaignRecipient {
  id: string;
  campaign_id: string;
  email: string;
  name?: string;
  status: 'pending' | 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'failed' | 'unsubscribed';
  sent_at?: string;
  delivered_at?: string;
  opened_at?: string;
  clicked_at?: string;
  bounced_at?: string;
  variables?: Record<string, any>;
  error?: string;
}

export interface CampaignAnalytics {
  campaign_id: string;
  total_sent: number;
  total_delivered: number;
  total_opened: number;
  total_clicked: number;
  total_bounced: number;
  total_unsubscribed: number;
  total_conversions: number;
  open_rate: number;
  click_rate: number;
  conversion_rate: number;
  bounce_rate: number;
  unsubscribe_rate: number;
  revenue_generated?: number;
  roi?: number;
}

export interface EmailProvider {
  name: 'sendgrid' | 'mailgun' | 'aws-ses' | 'smtp';
  api_key?: string;
  api_secret?: string;
  domain?: string;
  from_email: string;
  from_name: string;
}
