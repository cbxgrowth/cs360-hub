export interface SocialMediaAccount {
  id: string;
  user_id: string;
  platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'youtube';
  account_name: string;
  account_id: string;
  access_token: string;
  refresh_token?: string;
  expires_at?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SocialMediaPost {
  id: string;
  user_id: string;
  account_id: string;
  platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'youtube';
  content: string;
  media_urls?: string[];
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  scheduled_at?: string;
  published_at?: string;
  post_id?: string;
  engagement?: PostEngagement;
  created_at: string;
  updated_at: string;
}

export interface PostEngagement {
  likes: number;
  comments: number;
  shares: number;
  views: number;
  clicks: number;
  reach: number;
  impressions: number;
  engagement_rate: number;
  last_updated: string;
}

export interface SocialMediaAnalytics {
  account_id: string;
  platform: string;
  period: 'day' | 'week' | 'month' | 'year';
  total_posts: number;
  total_likes: number;
  total_comments: number;
  total_shares: number;
  total_views: number;
  total_reach: number;
  total_impressions: number;
  average_engagement_rate: number;
  follower_growth: number;
  best_posting_time: string;
  top_performing_posts: SocialMediaPost[];
}
