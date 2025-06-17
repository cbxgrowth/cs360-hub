
import { useEffect, useRef, useState } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  memoryUsage?: {
    used: number;
    total: number;
    limit: number;
  };
}

export const usePerformanceMonitor = (componentName: string) => {
  const renderStartTime = useRef<number>(Date.now());
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);

  useEffect(() => {
    const renderTime = Date.now() - renderStartTime.current;
    
    let memoryUsage;
    if (process.env.NODE_ENV === 'development' && 'memory' in performance) {
      const memory = (performance as any).memory;
      memoryUsage = {
        used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
        total: Math.round(memory.totalJSHeapSize / 1024 / 1024),
        limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024)
      };
    }

    setMetrics({ renderTime, memoryUsage });

    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} performance:`, {
        renderTime: `${renderTime}ms`,
        memoryUsage
      });
    }
  }, [componentName]);

  return metrics;
};

// Hook for monitoring API call performance
export const useApiPerformanceMonitor = () => {
  const measureApiCall = async <T>(
    apiCall: () => Promise<T>,
    operationName: string
  ): Promise<T> => {
    const startTime = Date.now();
    
    try {
      const result = await apiCall();
      const endTime = Date.now();
      const duration = endTime - startTime;

      if (process.env.NODE_ENV === 'development') {
        console.log(`API Call ${operationName}: ${duration}ms`);
      }

      // In production, send metrics to monitoring service
      // sendMetrics({ operation: operationName, duration, success: true });

      return result;
    } catch (error) {
      const endTime = Date.now();
      const duration = endTime - startTime;

      if (process.env.NODE_ENV === 'development') {
        console.error(`API Call ${operationName} failed: ${duration}ms`, error);
      }

      // sendMetrics({ operation: operationName, duration, success: false, error });
      throw error;
    }
  };

  return { measureApiCall };
};
