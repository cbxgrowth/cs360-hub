
import { createContext } from 'react';
import type { SuperAdminContextType } from './types';

export const SuperAdminContext = createContext<SuperAdminContextType>({
  stats: null,
  internalUsers: [],
  systemAlerts: [],
  isLoading: true,
  hasAccess: false,
  refreshStats: async () => {},
  addInternalUser: async () => {},
  updateInternalUser: async () => {},
  deleteInternalUser: async () => {},
  resolveAlert: async () => {},
});
