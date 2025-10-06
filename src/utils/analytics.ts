// Sistema de Analytics e Monitoramento para CS360 Hub
export interface AnalyticsEvent {
  event: string;
  userId?: string;
  sessionId?: string;
  properties?: Record<string, any>;
  timestamp?: Date;
}

export interface PerformanceMetrics {
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  timeToInteractive: number;
}

export interface UserMetrics {
  sessionDuration: number;
  pageViews: number;
  clickCount: number;
  scrollDepth: number;
  bounceRate: boolean;
}

export interface ErrorMetrics {
  errorType: string;
  errorMessage: string;
  errorStack?: string;
  url: string;
  userId?: string;
  browserInfo: string;
  timestamp: Date;
}

class Analytics {
  private sessionId: string;
  private userId?: string;
  private isEnabled: boolean;
  private queue: AnalyticsEvent[] = [];
  private flushInterval: number = 30000; // 30 segundos
  private maxQueueSize: number = 100;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.isEnabled = process.env.NODE_ENV === 'production';
    this.startPerformanceMonitoring();
    this.startErrorTracking();
    this.startUserBehaviorTracking();
    
    if (this.isEnabled) {
      this.startFlushInterval();
    }
  }

  // Configurar usuário
  setUserId(userId: string): void {
    this.userId = userId;
    this.track('user_identified', { userId });
  }

  // Rastrear eventos
  track(event: string, properties?: Record<string, any>): void {
    if (!this.isEnabled) {
      console.log('📊 Analytics (dev):', event, properties);
      return;
    }

    const analyticsEvent: AnalyticsEvent = {
      event,
      userId: this.userId,
      sessionId: this.sessionId,
      properties: {
        ...properties,
        url: window.location.href,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      },
      timestamp: new Date()
    };

    this.addToQueue(analyticsEvent);
  }

  // Rastrear page views
  trackPageView(page: string, properties?: Record<string, any>): void {
    this.track('page_view', {
      page,
      title: document.title,
      ...properties
    });
  }

  // Rastrear erros personalizados
  trackError(error: Error, context?: string, properties?: Record<string, any>): void {
    const errorMetrics: ErrorMetrics = {
      errorType: error.name,
      errorMessage: error.message,
      errorStack: error.stack,
      url: window.location.href,
      userId: this.userId,
      browserInfo: navigator.userAgent,
      timestamp: new Date()
    };

    this.track('error_occurred', {
      ...errorMetrics,
      context,
      ...properties
    });
  }

  // Rastrear métricas de performance
  trackPerformance(metrics: Partial<PerformanceMetrics>): void {
    this.track('performance_metrics', metrics);
  }

  // Rastrear comportamento do usuário
  trackUserInteraction(action: string, element?: string, properties?: Record<string, any>): void {
    this.track('user_interaction', {
      action,
      element,
      ...properties
    });
  }

  // Rastrear conversões
  trackConversion(event: string, value?: number, currency?: string): void {
    this.track('conversion', {
      conversionEvent: event,
      value,
      currency: currency || 'BRL'
    });
  }

  // Monitoramento de performance automático
  private startPerformanceMonitoring(): void {
    // Core Web Vitals
    if ('web-vital' in window) {
      // Implementation would depend on web-vitals library
    }

    // Performance Observer
    if (typeof PerformanceObserver !== 'undefined') {
      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.trackPerformance({
          largestContentfulPaint: lastEntry.startTime
        });
      });

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          this.trackPerformance({
            firstInputDelay: entry.processingStart - entry.startTime
          });
        });
      });

      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.warn('Performance Observer not fully supported');
      }
    }

    // Page Load Time
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        this.trackPerformance({
          pageLoadTime: navigation.loadEventEnd - navigation.fetchStart,
          timeToInteractive: navigation.domInteractive - navigation.fetchStart
        });
      }
    });
  }

  // Rastreamento automático de erros
  private startErrorTracking(): void {
    // JavaScript Errors
    window.addEventListener('error', (event) => {
      this.trackError(new Error(event.message), 'global_error_handler', {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    });

    // Unhandled Promise Rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.trackError(
        new Error(event.reason?.message || 'Unhandled Promise Rejection'),
        'promise_rejection',
        { reason: event.reason }
      );
    });

    // Resource Load Errors
    window.addEventListener('error', (event) => {
      if (event.target !== window) {
        this.track('resource_error', {
          resourceType: (event.target as any).tagName,
          resourceUrl: (event.target as any).src || (event.target as any).href,
          errorMessage: 'Resource failed to load'
        });
      }
    }, true);
  }

  // Rastreamento de comportamento do usuário
  private startUserBehaviorTracking(): void {
    let clickCount = 0;
    let maxScrollDepth = 0;
    let sessionStartTime = Date.now();

    // Clicks
    document.addEventListener('click', (event) => {
      clickCount++;
      const target = event.target as HTMLElement;
      
      this.trackUserInteraction('click', target.tagName, {
        elementId: target.id,
        elementClass: target.className,
        clickCount
      });
    });

    // Scroll Depth
    let ticking = false;
    const updateScrollDepth = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;
        
        // Track milestone scroll depths
        if ([25, 50, 75, 90].includes(scrollPercent)) {
          this.track('scroll_depth', { depth: scrollPercent });
        }
      }
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDepth);
        ticking = true;
      }
    });

    // Session Duration
    window.addEventListener('beforeunload', () => {
      const sessionDuration = Date.now() - sessionStartTime;
      this.track('session_end', {
        sessionDuration: Math.round(sessionDuration / 1000),
        clickCount,
        maxScrollDepth,
        bounceRate: clickCount === 0 && maxScrollDepth < 25
      });
    });

    // Visibility Change (tab switching)
    document.addEventListener('visibilitychange', () => {
      this.track('visibility_change', {
        visible: !document.hidden,
        timestamp: Date.now()
      });
    });
  }

  // Gerenciamento de fila
  private addToQueue(event: AnalyticsEvent): void {
    this.queue.push(event);
    
    if (this.queue.length >= this.maxQueueSize) {
      this.flush();
    }
  }

  // Enviar eventos para o servidor
  private async flush(): void {
    if (this.queue.length === 0) return;

    const events = [...this.queue];
    this.queue = [];

    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ events }),
        keepalive: true
      });
    } catch (error) {
      console.warn('Failed to send analytics:', error);
      // Re-add events to queue on failure
      this.queue.unshift(...events);
    }
  }

  // Iniciar intervalo de flush
  private startFlushInterval(): void {
    setInterval(() => {
      this.flush();
    }, this.flushInterval);
  }

  // Gerar session ID único
  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Limpar dados (LGPD compliance)
  clearUserData(): void {
    this.userId = undefined;
    this.sessionId = this.generateSessionId();
    this.queue = [];
    this.track('user_data_cleared');
  }

  // Ativar/desativar analytics
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
    if (enabled) {
      this.track('analytics_enabled');
    }
  }
}

// Singleton instance
export const analytics = new Analytics();

// Hooks para React
export const useAnalytics = () => {
  return {
    track: analytics.track.bind(analytics),
    trackPageView: analytics.trackPageView.bind(analytics),
    trackError: analytics.trackError.bind(analytics),
    trackPerformance: analytics.trackPerformance.bind(analytics),
    trackUserInteraction: analytics.trackUserInteraction.bind(analytics),
    trackConversion: analytics.trackConversion.bind(analytics),
    setUserId: analytics.setUserId.bind(analytics),
    clearUserData: analytics.clearUserData.bind(analytics)
  };
};

// Auto-inicialização
if (typeof window !== 'undefined') {
  // Track initial page load
  analytics.trackPageView(window.location.pathname);
  
  console.log('📊 CS360 Analytics initialized');
}

