import { useState, useEffect, createContext, useContext, ReactNode, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import type { DatabaseProfile } from '@/types/database';
import { createDefaultProfile } from '@/types/database';
import { validateSupabaseProfile, mapSupabaseProfileToDatabase, handleSupabaseError } from '@/utils/supabaseValidation';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: DatabaseProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, userData?: any) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (data: any) => Promise<{ error: any }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  loading: true,
  signUp: async () => ({ error: null }),
  signIn: async () => ({ error: null }),
  signOut: async () => {},
  updateProfile: async () => ({ error: null }),
  refreshProfile: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<DatabaseProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (userId: string, userEmail: string) => {
    try {
      console.log('Fetching profile for user:', userId);
      
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.log('Profile fetch error:', error);
        
        // Se não existe perfil, criar um padrão
        if (error.code === 'PGRST116') {
          console.log('Creating default profile for user:', userId);
          const defaultProfile = createDefaultProfile(userId, userEmail);
          
          // Criar perfil com campos corretos do banco
          const profileToInsert = {
            id: defaultProfile.id!,
            full_name: defaultProfile.full_name || null,
            company_name: defaultProfile.company_name || null,
            plan_type: defaultProfile.plan_type || 'starter',
            ai_credits: defaultProfile.ai_credits || 100,
            ai_credits_used: defaultProfile.ai_credits_used || 0
          };
          
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert(profileToInsert)
            .select()
            .single();
            
          if (createError) {
            console.error('Error creating profile:', handleSupabaseError(createError));
            setProfile(null);
            return;
          }
          
          // Mapear o perfil criado para o tipo DatabaseProfile
          if (newProfile && validateSupabaseProfile(newProfile)) {
            const mappedNewProfile = mapSupabaseProfileToDatabase(newProfile, userEmail);
            setProfile(mappedNewProfile);
            return;
          }
        }
        
        setProfile(null);
        return;
      }

      // Validar e mapear os dados corretamente
      if (profileData && validateSupabaseProfile(profileData)) {
        const mappedProfile = mapSupabaseProfileToDatabase(profileData, userEmail);
        console.log('Profile mapped successfully:', mappedProfile);
        setProfile(mappedProfile);
      } else {
        console.error('Invalid profile data:', profileData);
        setProfile(null);
      }
    } catch (error) {
      console.error('Profile fetch error:', handleSupabaseError(error));
      setProfile(null);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user?.id && user?.email) {
      await fetchProfile(user.id, user.email);
    }
  }, [user?.id, user?.email, fetchProfile]);

  useEffect(() => {
    let isMounted = true;

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;
        
        console.log('Auth state changed:', event, session?.user?.id);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Defer profile fetch to avoid blocking auth state change
          setTimeout(() => {
            if (isMounted) {
              fetchProfile(session.user.id, session.user.email || '');
            }
          }, 0);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (!isMounted) return;
      
      if (error) {
        console.error('Session error:', handleSupabaseError(error));
      }
      
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email || '');
      }
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const signUp = useCallback(async (email: string, password: string, userData?: any) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: userData
        }
      });
      
      return { error: error ? handleSupabaseError(error) : null };
    } catch (error) {
      return { error: handleSupabaseError(error) };
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      return { error: error ? handleSupabaseError(error) : null };
    } catch (error) {
      return { error: handleSupabaseError(error) };
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Sign out error:', handleSupabaseError(error));
    }
  }, []);

  const updateProfile = useCallback(async (data: any) => {
    if (!user) return { error: 'No user logged in' };
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);
      
      if (error) {
        return { error: handleSupabaseError(error) };
      }
      
      if (profile) {
        setProfile({ ...profile, ...data });
      }
      
      return { error: null };
    } catch (error) {
      return { error: handleSupabaseError(error) };
    }
  }, [user, profile]);

  const value = {
    user,
    session,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
