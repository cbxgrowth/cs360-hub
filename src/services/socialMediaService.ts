import { supabase } from '@/integrations/supabase/client';
import type { SocialMediaAccount, SocialMediaPost, SocialMediaAnalytics, PostEngagement } from '@/types/socialMedia';

class SocialMediaService {
  async connectAccount(userId: string, platform: string, authData: any): Promise<{ data: SocialMediaAccount | null; error: string | null }> {
    try {
      const account: Omit<SocialMediaAccount, 'id' | 'created_at' | 'updated_at'> = {
        user_id: userId,
        platform: platform as any,
        account_name: authData.account_name,
        account_id: authData.account_id,
        access_token: authData.access_token,
        refresh_token: authData.refresh_token,
        expires_at: authData.expires_at,
        is_active: true
      };

      const { data, error } = await supabase
        .from('social_media_accounts')
        .insert(account)
        .select()
        .single();

      if (error) throw error;
      return { data: data as SocialMediaAccount, error: null };
    } catch (error: any) {
      console.error('Error connecting social media account:', error);
      return { data: null, error: error.message };
    }
  }

  async getAccounts(userId: string): Promise<{ data: SocialMediaAccount[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('social_media_accounts')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data as SocialMediaAccount[], error: null };
    } catch (error: any) {
      console.error('Error fetching social media accounts:', error);
      return { data: null, error: error.message };
    }
  }

  async createPost(post: Omit<SocialMediaPost, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: SocialMediaPost | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('social_media_posts')
        .insert(post)
        .select()
        .single();

      if (error) throw error;
      return { data: data as SocialMediaPost, error: null };
    } catch (error: any) {
      console.error('Error creating post:', error);
      return { data: null, error: error.message };
    }
  }

  async schedulePost(postId: string, scheduledAt: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase
        .from('social_media_posts')
        .update({
          status: 'scheduled',
          scheduled_at: scheduledAt
        })
        .eq('id', postId);

      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      console.error('Error scheduling post:', error);
      return { error: error.message };
    }
  }

  async publishPost(postId: string): Promise<{ success: boolean; error: string | null }> {
    try {
      const { data: post, error: fetchError } = await supabase
        .from('social_media_posts')
        .select('*')
        .eq('id', postId)
        .single();

      if (fetchError || !post) throw new Error('Post not found');

      // Simular publicação
      console.log('Publishing post:', post);
      await new Promise(resolve => setTimeout(resolve, 1000));

      await supabase
        .from('social_media_posts')
        .update({
          status: 'published',
          published_at: new Date().toISOString(),
          post_id: `post_${Date.now()}`
        })
        .eq('id', postId);

      return { success: true, error: null };
    } catch (error: any) {
      console.error('Error publishing post:', error);
      
      await supabase
        .from('social_media_posts')
        .update({ status: 'failed' })
        .eq('id', postId);

      return { success: false, error: error.message };
    }
  }

  async fetchPostEngagement(postId: string): Promise<{ data: PostEngagement | null; error: string | null }> {
    try {
      // Simular busca de engajamento
      const engagement: PostEngagement = {
        likes: Math.floor(Math.random() * 1000),
        comments: Math.floor(Math.random() * 100),
        shares: Math.floor(Math.random() * 50),
        views: Math.floor(Math.random() * 5000),
        clicks: Math.floor(Math.random() * 200),
        reach: Math.floor(Math.random() * 3000),
        impressions: Math.floor(Math.random() * 4000),
        engagement_rate: Math.random() * 10,
        last_updated: new Date().toISOString()
      };

      await supabase
        .from('social_media_posts')
        .update({ engagement })
        .eq('id', postId);

      return { data: engagement, error: null };
    } catch (error: any) {
      console.error('Error fetching post engagement:', error);
      return { data: null, error: error.message };
    }
  }

  async getAnalytics(accountId: string, period: 'day' | 'week' | 'month' | 'year'): Promise<{ data: SocialMediaAnalytics | null; error: string | null }> {
    try {
      const { data: account } = await supabase
        .from('social_media_accounts')
        .select('*')
        .eq('id', accountId)
        .single();

      if (!account) throw new Error('Account not found');

      const now = new Date();
      const startDate = new Date();
      
      switch (period) {
        case 'day':
          startDate.setDate(now.getDate() - 1);
          break;
        case 'week':
          startDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          startDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          startDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      const { data: posts } = await supabase
        .from('social_media_posts')
        .select('*')
        .eq('account_id', accountId)
        .eq('status', 'published')
        .gte('published_at', startDate.toISOString());

      const analytics: SocialMediaAnalytics = {
        account_id: accountId,
        platform: account.platform,
        period,
        total_posts: posts?.length || 0,
        total_likes: posts?.reduce((sum, p) => sum + (p.engagement?.likes || 0), 0) || 0,
        total_comments: posts?.reduce((sum, p) => sum + (p.engagement?.comments || 0), 0) || 0,
        total_shares: posts?.reduce((sum, p) => sum + (p.engagement?.shares || 0), 0) || 0,
        total_views: posts?.reduce((sum, p) => sum + (p.engagement?.views || 0), 0) || 0,
        total_reach: posts?.reduce((sum, p) => sum + (p.engagement?.reach || 0), 0) || 0,
        total_impressions: posts?.reduce((sum, p) => sum + (p.engagement?.impressions || 0), 0) || 0,
        average_engagement_rate: posts?.reduce((sum, p) => sum + (p.engagement?.engagement_rate || 0), 0) / (posts?.length || 1) || 0,
        follower_growth: 0,
        best_posting_time: '09:00',
        top_performing_posts: (posts || []).slice(0, 5) as SocialMediaPost[]
      };

      return { data: analytics, error: null };
    } catch (error: any) {
      console.error('Error fetching analytics:', error);
      return { data: null, error: error.message };
    }
  }
}

export const socialMediaService = new SocialMediaService();
