
import { useEffect, useState } from 'react';
import { logger } from '@/utils/logger';

interface PerformanceMetrics {
  pageLoadTime: number;
  renderTime: number;
  apiCallTime: number;
  memoryUsage: number;
  cacheHitRate: number;
}

export const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});

  useEffect(() => {
    const measurePageLoad = () => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        const pageLoadTime = navigation.loadEventEnd - navigation.fetchStart;
        const renderTime = navigation.domContentLoadedEventEnd - navigation.fetchStart;
        
        let memoryUsage = 0;
        if ('memory' in performance) {
          const memory = (performance as any).memory;
          memoryUsage = memory.usedJSHeapSize / 1024 / 1024; // MB
        }

        const newMetrics = {
          pageLoadTime,
          renderTime,
          memoryUsage
        };

        setMetrics(prev => ({ ...prev, ...newMetrics }));
        
        logger.info('Métricas de performance coletadas', newMetrics);
      }
    };

    if (document.readyState === 'complete') {
      measurePageLoad();
    } else {
      window.addEventListener('load', measurePageLoad);
      return () => window.removeEventListener('load', measurePageLoad);
    }
  }, []);

  const measureApiCall = async <T>(
    apiCall: () => Promise<T>,
    operationName: string
  ): Promise<T> => {
    const startTime = performance.now();
    
    try {
      const result = await apiCall();
      const endTime = performance.now();
      const duration = endTime - startTime;

      setMetrics(prev => ({
        ...prev,
        apiCallTime: duration
      }));

      logger.debug(`API call ${operationName} completed in ${duration.toFixed(2)}ms`);
      
      return result;
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      logger.error(`API call ${operationName} failed after ${duration.toFixed(2)}ms`, error);
      throw error;
    }
  };

  const updateCacheMetrics = (hits: number, total: number) => {
    const hitRate = total > 0 ? (hits / total) * 100 : 0;
    setMetrics(prev => ({
      ...prev,
      cacheHitRate: hitRate
    }));
  };

  return {
    metrics,
    measureApiCall,
    updateCacheMetrics
  };
};
