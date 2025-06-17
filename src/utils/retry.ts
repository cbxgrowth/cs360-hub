
import { logger } from './logger';

interface RetryOptions {
  maxAttempts?: number;
  delay?: number;
  backoff?: 'linear' | 'exponential';
  retryCondition?: (error: any) => boolean;
}

export const withRetry = async <T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> => {
  const {
    maxAttempts = 3,
    delay = 1000,
    backoff = 'exponential',
    retryCondition = () => true
  } = options;

  let lastError: any;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      logger.debug(`Tentativa ${attempt} de ${maxAttempts}`);
      const result = await operation();
      
      if (attempt > 1) {
        logger.info(`Operação bem-sucedida na tentativa ${attempt}`);
      }
      
      return result;
    } catch (error) {
      lastError = error;
      
      if (attempt === maxAttempts || !retryCondition(error)) {
        logger.error(`Falha definitiva após ${attempt} tentativas`, { error });
        break;
      }

      const waitTime = backoff === 'exponential' 
        ? delay * Math.pow(2, attempt - 1)
        : delay * attempt;

      logger.warn(`Tentativa ${attempt} falhou, tentando novamente em ${waitTime}ms`, { error });
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }

  throw lastError;
};

// Condições de retry específicas
export const retryConditions = {
  networkError: (error: any) => {
    return error.message?.includes('fetch') || 
           error.message?.includes('network') ||
           error.code === 'NETWORK_ERROR';
  },
  
  serverError: (error: any) => {
    return error.status >= 500 && error.status < 600;
  },
  
  temporaryError: (error: any) => {
    return retryConditions.networkError(error) || 
           retryConditions.serverError(error) ||
           error.code === 'TIMEOUT';
  }
};
