
import { useCallback } from 'react';
import { useToast } from './use-toast';
import { errorHandler, AppError } from '@/utils/errorHandler';

export const useErrorHandler = () => {
  const { toast } = useToast();

  const handleError = useCallback((error: any, context?: string) => {
    const appError = errorHandler.handleApiError(error);
    const friendlyMessage = errorHandler.getUserFriendlyMessage(error);
    
    // Log the error
    errorHandler.logError(appError, context);
    
    // Show user-friendly message
    toast({
      title: "Erro",
      description: friendlyMessage,
      variant: "destructive",
    });

    return appError;
  }, [toast]);

  const handleValidationError = useCallback((errors: string[]) => {
    const appError = errorHandler.handleValidationError(errors);
    
    toast({
      title: "Dados inválidos",
      description: appError.message,
      variant: "destructive",
    });

    return appError;
  }, [toast]);

  const handleSuccess = useCallback((message: string) => {
    toast({
      title: "Sucesso",
      description: message,
    });
  }, [toast]);

  return {
    handleError,
    handleValidationError,
    handleSuccess
  };
};
