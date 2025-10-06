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
  
  // FIX: Usar refs para evitar vazamento de memória
  const isMountedRef = useRef(true);
  const profileFetchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const authSubscriptionRef = useRef<any>(null);

  const fetchProfile = useCallback(async (userId: string, userEmail: string) => {
    // FIX: Verificar se componente ainda está montado
    if (!isMountedRef.current) return;
    try {
      console.log('Fetching profile for user:', userId);
      
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (!isMountedRef.current) return;

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
            
          if (!isMountedRef.current) return;

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
      if (isMountedRef.current) {
        console.error('Profile fetch error:', handleSupabaseError(error));
        setProfile(null);
      }
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user?.id && user?.email) {
      await fetchProfile(user.id, user.email);
    }
  }, [user?.id, user?.email, fetchProfile]);

  useEffect(() => {
    isMountedRef.current = true;

    // FIX: Configurar listener de autenticação com cleanup adequado
    const setupAuth = async () => {
      // Configurar listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (!isMountedRef.current) return;
          
          console.log('Auth state changed:', event, session?.user?.id);
          
          setSession(session);
          setUser(session?.user ?? null);
          
          // FIX: Limpar timeout anterior
          if (profileFetchTimeoutRef.current) {
            clearTimeout(profileFetchTimeoutRef.current);
          }
          
          if (session?.user) {
            // FIX: Usar timeout para evitar bloqueio
            profileFetchTimeoutRef.current = setTimeout(() => {
              if (isMountedRef.current) {
                fetchProfile(session.user.id, session.user.email || '');
              }
            }, 0);
          } else {
            setProfile(null);
          }
          
          setLoading(false);
        }
      );

      authSubscriptionRef.current = subscription;

      // FIX: Verificar sessão existente com tratamento de erro
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (!isMountedRef.current) return;
        
        if (error) {
          console.error('Session error:', handleSupabaseError(error));
        }
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchProfile(session.user.id, session.user.email || '');
        }
        
        setLoading(false);
      } catch (error) {
        if (isMountedRef.current) {
          console.error('Session fetch error:', error);
          setLoading(false);
        }
      }
    };

    setupAuth();

    // FIX: Cleanup completo para evitar vazamento de memória
    return () => {
      isMountedRef.current = false;
      
      if (profileFetchTimeoutRef.current) {
        clearTimeout(profileFetchTimeoutRef.current);
      }
      
      if (authSubscriptionRef.current) {
        authSubscriptionRef.current.unsubscribe();
      }
    };
  }, [fetchProfile]);

  const signUp = useCallback(async (email: string, password: string, userData?: any) => {
    try {
      const redirectUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/` 
        : 'https://localhost:3000/';
      
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
      // FIX: Adicionar retry logic para falhas ocasionais
      let attempts = 0;
      const maxAttempts = 3;
      let lastError: any = null;

      while (attempts < maxAttempts) {
        try {
          const { error } = await supabase.auth.signInWithPassword({
            email,
            password
          });
          
          if (!error) {
            return { error: null };
          }
          
          lastError = error;
          attempts++;
          
          if (attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
          }
        } catch (err) {
          lastError = err;
          attempts++;
        }
      }
      
      return { error: lastError ? handleSupabaseError(lastError) : null };
    } catch (error) {
      return { error: handleSupabaseError(error) };
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      // FIX: Limpar estado local antes de fazer logout
      setUser(null);
      setSession(null);
      setProfile(null);
      
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
