import { supabase } from '@/integrations/supabase/client';
import type { ApiKey, ApiScope } from '@/types/api';

class ApiService {
  async generateApiKey(userId: string, name: string, scopes: ApiScope[], expiresInDays?: number): Promise<{ data: ApiKey | null; key?: string; error: string | null }> {
    try {
      // Gerar chave aleatória
      const key = `cs360_${this.generateRandomString(32)}`;
      const keyPrefix = key.substring(0, 12);
      
      // Hash da chave para armazenar
      const hashedKey = await this.hashString(key);

      const expiresAt = expiresInDays 
        ? new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000).toISOString()
        : undefined;

      const apiKey: Omit<ApiKey, 'id' | 'created_at' | 'updated_at'> = {
        user_id: userId,
        name,
        key: hashedKey,
        key_prefix: keyPrefix,
        scopes,
        rate_limit: 1000,
        requests_count: 0,
        expires_at: expiresAt,
        is_active: true
      };

      const { data, error } = await supabase
        .from('api_keys')
        .insert(apiKey)
        .select()
        .single();

      if (error) throw error;

      return { data: data as ApiKey, key, error: null };
    } catch (error: any) {
      console.error('Error generating API key:', error);
      return { data: null, error: error.message };
    }
  }

  async getApiKeys(userId: string): Promise<{ data: ApiKey[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data as ApiKey[], error: null };
    } catch (error: any) {
      console.error('Error fetching API keys:', error);
      return { data: null, error: error.message };
    }
  }

  async revokeApiKey(keyId: string): Promise<{ error: string | null }> {
    try {
      await supabase
        .from('api_keys')
        .update({ is_active: false })
        .eq('id', keyId);

      return { error: null };
    } catch (error: any) {
      console.error('Error revoking API key:', error);
      return { error: error.message };
    }
  }

  async validateApiKey(key: string): Promise<{ valid: boolean; apiKey?: ApiKey; error?: string }> {
    try {
      const hashedKey = await this.hashString(key);

      const { data: apiKey, error } = await supabase
        .from('api_keys')
        .select('*')
        .eq('key', hashedKey)
        .eq('is_active', true)
        .single();

      if (error || !apiKey) {
        return { valid: false, error: 'Invalid API key' };
      }

      if (apiKey.expires_at && new Date(apiKey.expires_at) < new Date()) {
        return { valid: false, error: 'API key expired' };
      }

      await supabase
        .from('api_keys')
        .update({
          last_used_at: new Date().toISOString(),
          requests_count: apiKey.requests_count + 1
        })
        .eq('id', apiKey.id);

      return { valid: true, apiKey: apiKey as ApiKey };
    } catch (error: any) {
      return { valid: false, error: error.message };
    }
  }

  async getUsageStats(apiKeyId: string, days: number = 7): Promise<{ data: any | null; error: string | null }> {
    try {
      const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

      const { data: requests, error } = await supabase
        .from('api_requests')
        .select('*')
        .eq('api_key_id', apiKeyId)
        .gte('created_at', startDate);

      if (error) throw error;

      const stats = {
        total_requests: requests?.length || 0,
        successful_requests: requests?.filter(r => r.status_code < 400).length || 0,
        failed_requests: requests?.filter(r => r.status_code >= 400).length || 0,
        average_response_time: requests?.reduce((sum, r) => sum + r.response_time, 0) / (requests?.length || 1),
        requests_by_endpoint: this.groupByEndpoint(requests || []),
        requests_by_day: this.groupByDay(requests || [])
      };

      return { data: stats, error: null };
    } catch (error: any) {
      console.error('Error fetching usage stats:', error);
      return { data: null, error: error.message };
    }
  }

  private groupByEndpoint(requests: any[]): Record<string, number> {
    return requests.reduce((acc, req) => {
      acc[req.endpoint] = (acc[req.endpoint] || 0) + 1;
      return acc;
    }, {});
  }

  private groupByDay(requests: any[]): Record<string, number> {
    return requests.reduce((acc, req) => {
      const day = new Date(req.created_at).toISOString().split('T')[0];
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {});
  }

  private generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  private async hashString(str: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
}

export const apiService = new ApiService();
