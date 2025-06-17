
import { describe, it, expect, vi } from 'vitest';
import { errorHandler, CustomError } from '@/utils/errorHandler';

describe('errorHandler', () => {
  describe('handleApiError', () => {
    it('should handle generic errors', () => {
      const error = new Error('Generic error');
      const result = errorHandler.handleApiError(error);
      
      expect(result.message).toBe('Generic error');
      expect(result.timestamp).toBeInstanceOf(Date);
    });

    it('should handle duplicate key errors', () => {
      const error = { message: 'duplicate key violation' };
      const result = errorHandler.handleApiError(error);
      
      expect(result.message).toBe('Este registro já existe');
      expect(result.code).toBe('DUPLICATE_ENTRY');
    });

    it('should handle unauthorized errors', () => {
      const error = { status: 401 };
      const result = errorHandler.handleApiError(error);
      
      expect(result.message).toBe('Acesso não autorizado');
      expect(result.code).toBe('UNAUTHORIZED');
    });

    it('should handle forbidden errors', () => {
      const error = { status: 403 };
      const result = errorHandler.handleApiError(error);
      
      expect(result.message).toBe('Permissão negada');
      expect(result.code).toBe('FORBIDDEN');
    });
  });

  describe('handleValidationError', () => {
    it('should create validation error', () => {
      const errors = ['Field is required', 'Invalid email'];
      const result = errorHandler.handleValidationError(errors);
      
      expect(result.message).toBe('Field is required, Invalid email');
      expect(result.code).toBe('VALIDATION_ERROR');
      expect(result.details).toEqual(errors);
    });
  });

  describe('getUserFriendlyMessage', () => {
    it('should return user-friendly messages for known error codes', () => {
      const duplicateError = { message: 'duplicate key violation' };
      const result = errorHandler.getUserFriendlyMessage(duplicateError);
      
      expect(result).toBe('Este item já existe no sistema');
    });

    it('should return original message for unknown errors', () => {
      const unknownError = { message: 'Unknown error' };
      const result = errorHandler.getUserFriendlyMessage(unknownError);
      
      expect(result).toBe('Unknown error');
    });
  });

  describe('CustomError', () => {
    it('should create custom error with all properties', () => {
      const error = new CustomError('Test message', 'TEST_CODE', { detail: 'test' });
      
      expect(error.message).toBe('Test message');
      expect(error.code).toBe('TEST_CODE');
      expect(error.details).toEqual({ detail: 'test' });
      expect(error.timestamp).toBeInstanceOf(Date);
      expect(error.name).toBe('CustomError');
    });
  });
});
