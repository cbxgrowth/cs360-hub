
import { useContext } from 'react';
import { SuperAdminContext } from './context';

export const useSuperAdmin = () => {
  const context = useContext(SuperAdminContext);
  if (!context) {
    throw new Error('useSuperAdmin must be used within a SuperAdminProvider');
  }
  return context;
};

export { SuperAdminProvider } from './SuperAdminProvider';
export type { 
  SuperAdminStats, 
  InternalUser, 
  SystemAlert, 
  SuperAdminContextType 
} from './types';
