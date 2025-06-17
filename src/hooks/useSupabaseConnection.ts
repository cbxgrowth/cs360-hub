
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

interface ConnectionStatus {
  isConnected: boolean;
  isReconnecting: boolean;
  lastError: string | null;
}

export const useSupabaseConnection = () => {
  const [status, setStatus] = useState<ConnectionStatus>({
    isConnected: false,
    isReconnecting: false,
    lastError: null
  });

  useEffect(() => {
    let channel: RealtimeChannel;

    const setupConnection = () => {
      // Testar conexão com Supabase
      channel = supabase.channel('connection-test')
        .on('presence', { event: 'sync' }, () => {
          setStatus(prev => ({ ...prev, isConnected: true, lastError: null }));
        })
        .on('presence', { event: 'join' }, () => {
          setStatus(prev => ({ ...prev, isConnected: true }));
        })
        .on('presence', { event: 'leave' }, () => {
          setStatus(prev => ({ ...prev, isConnected: false }));
        })
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            setStatus(prev => ({ ...prev, isConnected: true, isReconnecting: false, lastError: null }));
          } else if (status === 'CHANNEL_ERROR') {
            setStatus(prev => ({ 
              ...prev, 
              isConnected: false, 
              isReconnecting: true,
              lastError: 'Erro de conexão com Supabase' 
            }));
          }
        });
    };

    // Verificar status inicial da sessão
    supabase.auth.getSession().then(({ error }) => {
      if (error) {
        setStatus(prev => ({ ...prev, lastError: error.message }));
      } else {
        setupConnection();
      }
    });

    // Cleanup
    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  const reconnect = async () => {
    setStatus(prev => ({ ...prev, isReconnecting: true }));
    
    try {
      // Tentar reconectar
      const { error } = await supabase.auth.getSession();
      if (error) throw error;
      
      setStatus(prev => ({ ...prev, isConnected: true, isReconnecting: false, lastError: null }));
    } catch (error: any) {
      setStatus(prev => ({ 
        ...prev, 
        isConnected: false, 
        isReconnecting: false,
        lastError: error.message 
      }));
    }
  };

  return {
    ...status,
    reconnect
  };
};
