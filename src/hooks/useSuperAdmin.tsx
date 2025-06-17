// Re-export everything from the new modular structure
export { useSuperAdmin, SuperAdminProvider } from './useSuperAdmin/index';
export type { 
  SuperAdminStats, 
  InternalUser, 
  SystemAlert, 
  SuperAdminContextType 
} from './useSuperAdmin/types';

// Keep backward compatibility
export { SuperAdminProvider as default } from './useSuperAdmin/index';
