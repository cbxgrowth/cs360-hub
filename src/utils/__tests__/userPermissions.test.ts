
import { describe, it, expect } from 'vitest';
import { 
  hasUserAccess, 
  getUserType, 
  isSuperAdmin, 
  isAdmin, 
  canAccessFeature,
  validateProfile 
} from '../userPermissions';
import type { DatabaseProfile } from '@/types/database';

describe('userPermissions', () => {
  const mockProfile = (userType: string): DatabaseProfile => ({
    id: '123',
    user_id: '123',
    email: 'test@example.com',
    user_type: userType as any,
    plan_type: userType as any
  });

  describe('hasUserAccess', () => {
    it('should allow super_admin access to everything', () => {
      expect(hasUserAccess('super_admin', ['starter'])).toBe(true);
      expect(hasUserAccess('super_admin', ['enterprise'])).toBe(true);
    });

    it('should respect user hierarchy', () => {
      expect(hasUserAccess('enterprise', ['starter'])).toBe(true);
      expect(hasUserAccess('starter', ['enterprise'])).toBe(false);
    });

    it('should handle specific role matches', () => {
      expect(hasUserAccess('partner', ['partner'])).toBe(true);
      expect(hasUserAccess('starter', ['starter'])).toBe(true);
    });

    it('should allow all when specified', () => {
      expect(hasUserAccess('starter', ['all'])).toBe(true);
    });
  });

  describe('getUserType', () => {
    it('should return user_type when available', () => {
      const profile = mockProfile('enterprise');
      expect(getUserType(profile)).toBe('enterprise');
    });

    it('should fallback to starter for null profile', () => {
      expect(getUserType(null)).toBe('starter');
    });

    it('should fallback to starter for undefined user_type', () => {
      const profile = { ...mockProfile('enterprise') };
      delete profile.user_type;
      delete profile.plan_type;
      expect(getUserType(profile)).toBe('starter');
    });
  });

  describe('isSuperAdmin', () => {
    it('should return true for super_admin', () => {
      expect(isSuperAdmin(mockProfile('super_admin'))).toBe(true);
    });

    it('should return false for other types', () => {
      expect(isSuperAdmin(mockProfile('enterprise'))).toBe(false);
      expect(isSuperAdmin(null)).toBe(false);
    });
  });

  describe('isAdmin', () => {
    it('should return true for admin types', () => {
      expect(isAdmin(mockProfile('super_admin'))).toBe(true);
      expect(isAdmin(mockProfile('account_admin'))).toBe(true);
      expect(isAdmin(mockProfile('enterprise'))).toBe(true);
    });

    it('should return false for non-admin types', () => {
      expect(isAdmin(mockProfile('starter'))).toBe(false);
      expect(isAdmin(mockProfile('partner'))).toBe(false);
    });
  });

  describe('canAccessFeature', () => {
    it('should control super admin panel access', () => {
      expect(canAccessFeature(mockProfile('super_admin'), 'super_admin_panel')).toBe(true);
      expect(canAccessFeature(mockProfile('enterprise'), 'super_admin_panel')).toBe(false);
    });

    it('should control advanced reports access', () => {
      expect(canAccessFeature(mockProfile('professional'), 'advanced_reports')).toBe(true);
      expect(canAccessFeature(mockProfile('starter'), 'advanced_reports')).toBe(false);
    });

    it('should allow unrestricted features', () => {
      expect(canAccessFeature(mockProfile('starter'), 'unrestricted_feature')).toBe(true);
    });
  });

  describe('validateProfile', () => {
    it('should validate correct profile', () => {
      expect(validateProfile(mockProfile('enterprise'))).toBe(true);
    });

    it('should reject null profile', () => {
      expect(validateProfile(null)).toBe(false);
    });

    it('should reject profile without required fields', () => {
      expect(validateProfile({ id: '123' })).toBe(false);
    });

    it('should reject profile with invalid user_type', () => {
      const invalidProfile = mockProfile('enterprise');
      invalidProfile.user_type = 'invalid_type' as any;
      expect(validateProfile(invalidProfile)).toBe(false);
    });
  });
});
