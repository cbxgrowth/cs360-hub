
// Remove the duplicate SuperAdminStats, InternalUser, and SystemAlert interfaces
// as they are now defined in useSuperAdmin/types.ts

export interface AuthUser {
  id: string;
  email: string;
  role: string;
  permissions: string[];
  lastLogin?: string;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: AuthUser;
}

export interface AuthError {
  message: string;
  status?: number;
}
