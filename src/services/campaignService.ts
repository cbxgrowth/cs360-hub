import { supabase } from '@/integrations/supabase/client';
import type { Campaign, CampaignRecipient, CampaignAnalytics, EmailTemplate } from '@/types/campaign';

class CampaignService {
  async createCampaign(campaign: Omit<Campaign, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: Campaign | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .insert({
          ...campaign,
          sent_count: 0,
          delivered_count: 0,
          opened_count: 0,
          clicked_count: 0,
          converted_count: 0,
          bounced_count: 0,
          unsubscribed_count: 0
        })
        .select()
        .single();

      if (error) throw error;
      return { data: data as Campaign, error: null };
    } catch (error: any) {
      console.error('Error creating campaign:', error);
      return { data: null, error: error.message };
    }
  }

  async getCampaigns(userId: string): Promise<{ data: Campaign[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data as Campaign[], error: null };
    } catch (error: any) {
      console.error('Error fetching campaigns:', error);
      return { data: null, error: error.message };
    }
  }

  async getCampaign(id: string): Promise<{ data: Campaign | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return { data: data as Campaign, error: null };
    } catch (error: any) {
      console.error('Error fetching campaign:', error);
      return { data: null, error: error.message };
    }
  }

  async updateCampaign(id: string, updates: Partial<Campaign>): Promise<{ data: Campaign | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { data: data as Campaign, error: null };
    } catch (error: any) {
      console.error('Error updating campaign:', error);
      return { data: null, error: error.message };
    }
  }

  async deleteCampaign(id: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase
        .from('campaigns')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      console.error('Error deleting campaign:', error);
      return { error: error.message };
    }
  }

  async sendCampaign(campaignId: string): Promise<{ success: boolean; error: string | null }> {
    try {
      const { data: campaign, error: campaignError } = await this.getCampaign(campaignId);
      
      if (campaignError || !campaign) {
        throw new Error('Campaign not found');
      }

      if (campaign.status !== 'draft' && campaign.status !== 'scheduled') {
        throw new Error('Campaign cannot be sent in current status');
      }

      await this.updateCampaign(campaignId, {
        status: 'running',
        started_at: new Date().toISOString()
      });

      // Simular envio bem-sucedido
      await new Promise(resolve => setTimeout(resolve, 1000));

      await this.updateCampaign(campaignId, {
        status: 'completed',
        sent_count: campaign.recipients_count,
        delivered_count: campaign.recipients_count,
        completed_at: new Date().toISOString()
      });

      return { success: true, error: null };
    } catch (error: any) {
      console.error('Error sending campaign:', error);
      
      await this.updateCampaign(campaignId, {
        status: 'failed'
      });

      return { success: false, error: error.message };
    }
  }

  async scheduleCampaign(campaignId: string, scheduledAt: string): Promise<{ error: string | null }> {
    try {
      await this.updateCampaign(campaignId, {
        status: 'scheduled',
        scheduled_at: scheduledAt
      });

      return { error: null };
    } catch (error: any) {
      console.error('Error scheduling campaign:', error);
      return { error: error.message };
    }
  }

  async pauseCampaign(campaignId: string): Promise<{ error: string | null }> {
    return this.updateCampaign(campaignId, { status: 'paused' }).then(result => ({ error: result.error }));
  }

  async resumeCampaign(campaignId: string): Promise<{ error: string | null }> {
    return this.updateCampaign(campaignId, { status: 'running' }).then(result => ({ error: result.error }));
  }

  async getCampaignAnalytics(campaignId: string): Promise<{ data: CampaignAnalytics | null; error: string | null }> {
    try {
      const { data: campaign, error: campaignError } = await this.getCampaign(campaignId);
      
      if (campaignError || !campaign) {
        throw new Error('Campaign not found');
      }

      const analytics: CampaignAnalytics = {
        campaign_id: campaignId,
        total_sent: campaign.sent_count,
        total_delivered: campaign.delivered_count,
        total_opened: campaign.opened_count,
        total_clicked: campaign.clicked_count,
        total_bounced: campaign.bounced_count,
        total_unsubscribed: campaign.unsubscribed_count,
        total_conversions: campaign.converted_count,
        open_rate: campaign.sent_count > 0 ? (campaign.opened_count / campaign.sent_count) * 100 : 0,
        click_rate: campaign.opened_count > 0 ? (campaign.clicked_count / campaign.opened_count) * 100 : 0,
        conversion_rate: campaign.sent_count > 0 ? (campaign.converted_count / campaign.sent_count) * 100 : 0,
        bounce_rate: campaign.sent_count > 0 ? (campaign.bounced_count / campaign.sent_count) * 100 : 0,
        unsubscribe_rate: campaign.sent_count > 0 ? (campaign.unsubscribed_count / campaign.sent_count) * 100 : 0
      };

      return { data: analytics, error: null };
    } catch (error: any) {
      console.error('Error fetching campaign analytics:', error);
      return { data: null, error: error.message };
    }
  }

  async createTemplate(template: Omit<EmailTemplate, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: EmailTemplate | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .insert(template)
        .select()
        .single();

      if (error) throw error;
      return { data: data as EmailTemplate, error: null };
    } catch (error: any) {
      console.error('Error creating template:', error);
      return { data: null, error: error.message };
    }
  }

  async getTemplates(userId: string): Promise<{ data: EmailTemplate[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data as EmailTemplate[], error: null };
    } catch (error: any) {
      console.error('Error fetching templates:', error);
      return { data: null, error: error.message };
    }
  }

  async updateTemplate(id: string, updates: Partial<EmailTemplate>): Promise<{ data: EmailTemplate | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { data: data as EmailTemplate, error: null };
    } catch (error: any) {
      console.error('Error updating template:', error);
      return { data: null, error: error.message };
    }
  }

  async deleteTemplate(id: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase
        .from('email_templates')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      console.error('Error deleting template:', error);
      return { error: error.message };
    }
  }

  async duplicateCampaign(id: string): Promise<{ data: Campaign | null; error: string | null }> {
    try {
      const { data: original, error: fetchError } = await this.getCampaign(id);
      
      if (fetchError || !original) {
        throw new Error('Campaign not found');
      }

      const duplicate = {
        ...original,
        name: `${original.name} (Cópia)`,
        status: 'draft' as const,
        sent_count: 0,
        delivered_count: 0,
        opened_count: 0,
        clicked_count: 0,
        converted_count: 0,
        bounced_count: 0,
        unsubscribed_count: 0
      };

      delete (duplicate as any).id;
      delete (duplicate as any).created_at;
      delete (duplicate as any).updated_at;
      delete (duplicate as any).template;

      return this.createCampaign(duplicate);
    } catch (error: any) {
      console.error('Error duplicating campaign:', error);
      return { data: null, error: error.message };
    }
  }
}

export const campaignService = new CampaignService();
