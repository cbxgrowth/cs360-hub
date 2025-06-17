
// Performance monitoring utilities
export const monitoring = {
  // Track page load metrics
  trackPageLoad: () => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          const metrics = {
            pageLoadTime: perfData.loadEventEnd - perfData.fetchStart,
            domContentLoaded: perfData.domContentLoadedEventEnd - perfData.fetchStart,
            firstContentfulPaint: 0,
            timeToInteractive: perfData.loadEventEnd - perfData.fetchStart
          };

          // Get paint timing if available
          const paintEntries = performance.getEntriesByType('paint');
          const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
          if (fcpEntry) {
            metrics.firstContentfulPaint = fcpEntry.startTime;
          }

          console.log('Page Performance Metrics:', metrics);
          
          // In production, send to analytics service
          // sendToAnalytics('performance', metrics);
        }, 0);
      });
    }
  },

  // Monitor memory usage
  trackMemoryUsage: () => {
    if (typeof window !== 'undefined' && 'performance' in window && (performance as any).memory) {
      const memory = (performance as any).memory;
      const memoryInfo = {
        usedJSHeapSize: Math.round(memory.usedJSHeapSize / 1024 / 1024),
        totalJSHeapSize: Math.round(memory.totalJSHeapSize / 1024 / 1024),
        jsHeapSizeLimit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024)
      };
      
      console.log('Memory Usage (MB):', memoryInfo);
      return memoryInfo;
    }
    return null;
  },

  // Track user interactions
  trackUserInteraction: (eventType: string, elementId?: string) => {
    const interactionData = {
      eventType,
      elementId,
      timestamp: Date.now(),
      url: window.location.pathname
    };
    
    console.log('User Interaction:', interactionData);
    
    // In production, send to analytics
    // sendToAnalytics('interaction', interactionData);
  },

  // Error boundary monitoring
  trackError: (error: Error, errorInfo?: any) => {
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo?.componentStack,
      timestamp: Date.now(),
      url: window.location.pathname,
      userAgent: navigator.userAgent
    };

    console.error('Application Error:', errorData);
    
    // In production, send to error tracking service
    // sendToErrorTracking(errorData);
  },

  // Initialize all monitoring
  init: () => {
    monitoring.trackPageLoad();
    
    // Track memory usage every 30 seconds in development
    if (process.env.NODE_ENV === 'development') {
      setInterval(() => {
        monitoring.trackMemoryUsage();
      }, 30000);
    }
  }
};

// Auto-initialize monitoring
if (typeof window !== 'undefined') {
  monitoring.init();
}
