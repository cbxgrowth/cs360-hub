
import { useState, useEffect, ReactNode } from 'react';
import { useAuth } from '../useAuth';
import { isSuperAdmin, isAdmin } from '@/utils/userPermissions';
import { SuperAdminContext } from './context';
import { mockStats, mockInternalUsers, mockAlerts } from './mockData';
import type { SuperAdminStats, InternalUser, SystemAlert } from './types';

interface SuperAdminProviderProps {
  children: ReactNode;
}

export const SuperAdminProvider = ({ children }: SuperAdminProviderProps) => {
  const { profile } = useAuth();
  const [stats, setStats] = useState<SuperAdminStats | null>(null);
  const [internalUsers, setInternalUsers] = useState<InternalUser[]>([]);
  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const hasAccess = isSuperAdmin(profile) || isAdmin(profile);

  useEffect(() => {
    if (hasAccess) {
      // Simular carregamento de dados
      const loadData = async () => {
        setIsLoading(true);
        // Simular delay da API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setStats(mockStats);
        setInternalUsers(mockInternalUsers);
        setSystemAlerts(mockAlerts);
        setIsLoading(false);
      };

      loadData();

      // Atualizar stats em tempo real
      const interval = setInterval(() => {
        if (Math.random() < 0.3) {
          setStats(prev => prev ? {
            ...prev,
            totalUsers: prev.totalUsers + Math.floor(Math.random() * 10),
            systemHealth: {
              ...prev.systemHealth,
              responseTime: 200 + Math.floor(Math.random() * 100),
              activeConnections: prev.systemHealth.activeConnections + Math.floor(Math.random() * 20) - 10
            }
          } : null);
        }
      }, 15000);

      return () => clearInterval(interval);
    } else {
      setIsLoading(false);
    }
  }, [hasAccess]);

  const refreshStats = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setStats(mockStats);
    setIsLoading(false);
  };

  const addInternalUser = async (userData: Omit<InternalUser, 'id' | 'createdAt'>) => {
    const newUser: InternalUser = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setInternalUsers(prev => [...prev, newUser]);
  };

  const updateInternalUser = async (id: string, updates: Partial<InternalUser>) => {
    setInternalUsers(prev => prev.map(user => 
      user.id === id ? { ...user, ...updates } : user
    ));
  };

  const deleteInternalUser = async (id: string) => {
    setInternalUsers(prev => prev.filter(user => user.id !== id));
  };

  const resolveAlert = async (alertId: string) => {
    setSystemAlerts(prev => prev.map(alert =>
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
  };

  const value = {
    stats,
    internalUsers,
    systemAlerts,
    isLoading,
    hasAccess,
    refreshStats,
    addInternalUser,
    updateInternalUser,
    deleteInternalUser,
    resolveAlert
  };

  return (
    <SuperAdminContext.Provider value={value}>
      {children}
    </SuperAdminContext.Provider>
  );
};
