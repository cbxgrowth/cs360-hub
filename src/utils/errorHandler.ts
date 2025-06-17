
export interface AppError {
  message: string;
  code?: string;
  details?: any;
  timestamp: Date;
}

export class CustomError extends Error {
  code?: string;
  details?: any;
  timestamp: Date;

  constructor(message: string, code?: string, details?: any) {
    super(message);
    this.name = 'CustomError';
    this.code = code;
    this.details = details;
    this.timestamp = new Date();
  }
}

export const errorHandler = {
  // Handle API errors
  handleApiError: (error: any): AppError => {
    const appError: AppError = {
      message: 'Erro interno do servidor',
      timestamp: new Date()
    };

    if (error?.message) {
      appError.message = error.message;
    }

    if (error?.code) {
      appError.code = error.code;
    }

    if (error?.details) {
      appError.details = error.details;
    }

    // Handle specific Supabase errors
    if (error?.message?.includes('duplicate key')) {
      appError.message = 'Este registro já existe';
      appError.code = 'DUPLICATE_ENTRY';
    }

    if (error?.message?.includes('foreign key')) {
      appError.message = 'Referência inválida';
      appError.code = 'INVALID_REFERENCE';
    }

    if (error?.message?.includes('not authenticated') || error?.status === 401) {
      appError.message = 'Acesso não autorizado';
      appError.code = 'UNAUTHORIZED';
    }

    if (error?.message?.includes('permission denied') || error?.status === 403) {
      appError.message = 'Permissão negada';
      appError.code = 'FORBIDDEN';
    }

    return appError;
  },

  // Handle validation errors
  handleValidationError: (errors: string[]): AppError => {
    return {
      message: errors.join(', '),
      code: 'VALIDATION_ERROR',
      details: errors,
      timestamp: new Date()
    };
  },

  // Log errors (in production, this would send to monitoring service)
  logError: (error: AppError | Error, context?: string) => {
    const logData = {
      message: error.message,
      context,
      timestamp: new Date().toISOString(),
      ...(error instanceof CustomError && {
        code: error.code,
        details: error.details
      })
    };

    if (process.env.NODE_ENV === 'development') {
      console.error('Error logged:', logData);
    }

    // In production, send to monitoring service
    // Example: sendToMonitoringService(logData);
  },

  // Create user-friendly error messages
  getUserFriendlyMessage: (error: any): string => {
    const appError = errorHandler.handleApiError(error);
    
    const friendlyMessages: Record<string, string> = {
      'DUPLICATE_ENTRY': 'Este item já existe no sistema',
      'INVALID_REFERENCE': 'Referência inválida - verifique os dados',
      'UNAUTHORIZED': 'Você precisa fazer login para continuar',
      'FORBIDDEN': 'Você não tem permissão para esta ação',
      'VALIDATION_ERROR': 'Dados inválidos - verifique as informações'
    };

    return friendlyMessages[appError.code || ''] || appError.message;
  }
};
