
import { logger } from './logger';

export interface SupabaseProfile {
  id: string;
  full_name?: string | null;
  company_name?: string | null;
  plan_type?: string | null;
  user_type?: string | null;
  ai_credits?: number | null;
  ai_credits_used?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export const validateSupabaseProfile = (profile: any): profile is SupabaseProfile => {
  if (!profile || typeof profile !== 'object') {
    logger.warn('Invalid profile object', { profile });
    return false;
  }
  
  if (!profile.id || typeof profile.id !== 'string') {
    logger.warn('Profile missing valid id', { profile });
    return false;
  }
  
  return true;
};

export const mapSupabaseProfileToDatabase = (profile: SupabaseProfile, email: string) => {
  return {
    id: profile.id,
    user_id: profile.id,
    email: email,
    full_name: profile.full_name || undefined,
    company_name: profile.company_name || undefined,
    plan_type: (profile.plan_type as any) || 'starter',
    user_type: (profile.user_type as any) || 'starter',
    ai_credits: profile.ai_credits || 100,
    ai_credits_used: profile.ai_credits_used || 0,
    created_at: profile.created_at,
    updated_at: profile.updated_at
  };
};

export const handleSupabaseError = (error: any): Error => {
  if (error instanceof Error) {
    return error;
  }
  
  if (error && typeof error === 'object') {
    const message = error.message || error.error_description || 'Unknown Supabase error';
    logger.error('Supabase error', error);
    return new Error(message);
  }
  
  logger.error('Unknown error type', error);
  return new Error('An unexpected error occurred');
};
