
import React from 'react';

// Performance utilities
export const performanceUtils = {
  // Debounce function
  debounce: <T extends (...args: any[]) => any>(func: T, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(null, args), wait);
    };
  },

  // Throttle function
  throttle: <T extends (...args: any[]) => any>(func: T, limit: number) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func.apply(null, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Memoization
  memoize: <T extends (...args: any[]) => any>(func: T, keyGenerator?: (...args: Parameters<T>) => string) => {
    const cache = new Map();
    return (...args: Parameters<T>): ReturnType<T> => {
      const key = keyGenerator ? keyGenerator(...args) : JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = func(...args);
      cache.set(key, result);
      return result;
    };
  },

  // Performance timing
  time: {
    start: (label: string) => {
      console.time(label);
    },
    end: (label: string) => {
      console.timeEnd(label);
    }
  },

  // Measure function execution time
  measureExecution: <T extends (...args: any[]) => any>(func: T, label?: string) => {
    return (...args: Parameters<T>): ReturnType<T> => {
      const start = Date.now();
      const result = func(...args);
      const end = Date.now();
      console.log(`${label || func.name} executed in ${end - start}ms`);
      return result;
    };
  },

  // Bundle size analyzer (client-side only)
  analyzeBundleSize: () => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const entries = performance.getEntriesByType('navigation');
      if (entries.length > 0) {
        const navigation = entries[0] as PerformanceNavigationTiming;
        console.log('Bundle analysis:', {
          totalSize: navigation.transferSize,
          loadTime: navigation.loadEventEnd - navigation.fetchStart
        });
      }
    }
  },

  // React component performance wrapper
  withPerformanceMonitoring: <P extends object>(Component: React.ComponentType<P>) => {
    return React.forwardRef<any, P>((props, ref) => {
      React.useEffect(() => {
        const start = Date.now();
        return () => {
          const end = Date.now();
          console.log(`${Component.displayName || Component.name} render time: ${end - start}ms`);
        };
      });

      return React.createElement(Component, { ...props, ref } as P & { ref?: any });
    });
  }
};
