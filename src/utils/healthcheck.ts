// Sistema de Health Check avançado para CS360 Hub
export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  uptime: number;
  version: string;
  environment: string;
  checks: {
    [key: string]: {
      status: 'pass' | 'fail' | 'warn';
      responseTime: number;
      details?: any;
      error?: string;
    };
  };
  metrics: {
    memory: {
      used: number;
      total: number;
      percentage: number;
    };
    performance: {
      averageResponseTime: number;
      requestsPerSecond: number;
      errorRate: number;
    };
    business: {
      activeUsers: number;
      activeSessions: number;
      totalRequests: number;
    };
  };
}

class HealthChecker {
  private startTime: number;
  private checks: Map<string, Function> = new Map();
  private metrics: any = {};

  constructor() {
    this.startTime = Date.now();
    this.registerDefaultChecks();
  }

  // Registrar checks customizados
  registerCheck(name: string, checkFunction: Function): void {
    this.checks.set(name, checkFunction);
  }

  // Executar todos os health checks
  async performHealthCheck(): Promise<HealthStatus> {
    const checkResults: any = {};
    let overallStatus: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';

    // Executar todos os checks
    for (const [name, checkFn] of this.checks.entries()) {
      const startTime = performance.now();
      
      try {
        const result = await Promise.race([
          checkFn(),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), 5000)
          )
        ]);

        const responseTime = performance.now() - startTime;
        
        checkResults[name] = {
          status: result.status || 'pass',
          responseTime: Math.round(responseTime),
          details: result.details,
        };

        // Atualizar status geral
        if (result.status === 'fail') {
          overallStatus = 'unhealthy';
        } else if (result.status === 'warn' && overallStatus === 'healthy') {
          overallStatus = 'degraded';
        }

      } catch (error: any) {
        checkResults[name] = {
          status: 'fail',
          responseTime: Math.round(performance.now() - startTime),
          error: error.message,
        };
        overallStatus = 'unhealthy';
      }
    }

    return {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      uptime: Math.floor((Date.now() - this.startTime) / 1000),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      checks: checkResults,
      metrics: await this.collectMetrics(),
    };
  }

  // Registrar checks padrão
  private registerDefaultChecks(): void {
    // Database connectivity
    this.registerCheck('database', async () => {
      try {
        // Simular check de banco - substituir pela sua implementação
        const startTime = performance.now();
        // const result = await supabase.from('health_check').select('1').limit(1);
        const responseTime = performance.now() - startTime;

        return {
          status: responseTime < 100 ? 'pass' : 'warn',
          details: {
            responseTime: Math.round(responseTime),
            connection: 'active'
          }
        };
      } catch (error) {
        return {
          status: 'fail',
          details: { error: 'Database connection failed' }
        };
      }
    });

    // Memory usage
    this.registerCheck('memory', async () => {
      const memInfo = this.getMemoryInfo();
      const usage = (memInfo.used / memInfo.total) * 100;

      return {
        status: usage < 85 ? 'pass' : usage < 95 ? 'warn' : 'fail',
        details: {
          usage: `${usage.toFixed(1)}%`,
          used: this.formatBytes(memInfo.used),
          total: this.formatBytes(memInfo.total)
        }
      };
    });

    // External APIs
    this.registerCheck('external_apis', async () => {
      // Check de APIs externas críticas
      const checks = [
        // { name: 'auth_service', url: 'https://auth.service.com/health' },
        // { name: 'payment_service', url: 'https://payments.service.com/health' }
      ];

      const results = await Promise.all(
        checks.map(async (api) => {
          try {
            const response = await fetch(api.url, { 
              method: 'GET',
              timeout: 3000 
            });
            return { 
              [api.name]: response.ok ? 'pass' : 'fail' 
            };
          } catch {
            return { [api.name]: 'fail' };
          }
        })
      );

      const allPassed = results.every(r => 
        Object.values(r)[0] === 'pass'
      );

      return {
        status: allPassed ? 'pass' : 'warn',
        details: Object.assign({}, ...results)
      };
    });

    // Cache/Redis (se aplicável)
    this.registerCheck('cache', async () => {
      try {
        // Implementar check de Redis/Cache
        return {
          status: 'pass',
          details: { connection: 'active', hit_rate: '85%' }
        };
      } catch {
        return {
          status: 'fail',
          details: { error: 'Cache connection failed' }
        };
      }
    });

    // File system
    this.registerCheck('filesystem', async () => {
      try {
        // Check de espaço em disco (implementar conforme necessário)
        const diskUsage = 45; // Placeholder - implementar lógica real

        return {
          status: diskUsage < 80 ? 'pass' : diskUsage < 90 ? 'warn' : 'fail',
          details: {
            disk_usage: `${diskUsage}%`,
            available_space: '15.2GB'
          }
        };
      } catch {
        return {
          status: 'fail',
          details: { error: 'Filesystem check failed' }
        };
      }
    });
  }

  // Coletar métricas do sistema
  private async collectMetrics(): Promise<any> {
    const memInfo = this.getMemoryInfo();
    
    return {
      memory: {
        used: memInfo.used,
        total: memInfo.total,
        percentage: Math.round((memInfo.used / memInfo.total) * 100)
      },
      performance: {
        averageResponseTime: this.getAverageResponseTime(),
        requestsPerSecond: this.getRequestsPerSecond(),
        errorRate: this.getErrorRate()
      },
      business: {
        activeUsers: this.getActiveUsers(),
        activeSessions: this.getActiveSessions(),
        totalRequests: this.getTotalRequests()
      }
    };
  }

  // Helpers para métricas
  private getMemoryInfo() {
    if (typeof window !== 'undefined' && 'memory' in performance) {
      const memory = (performance as any).memory;
      return {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize
      };
    }
    
    // Fallback para Node.js
    if (typeof process !== 'undefined') {
      const usage = process.memoryUsage();
      return {
        used: usage.heapUsed,
        total: usage.heapTotal
      };
    }

    return { used: 0, total: 0 };
  }

  private getAverageResponseTime(): number {
    // Implementar baseado nas métricas coletadas
    return this.metrics.averageResponseTime || 0;
  }

  private getRequestsPerSecond(): number {
    return this.metrics.requestsPerSecond || 0;
  }

  private getErrorRate(): number {
    return this.metrics.errorRate || 0;
  }

  private getActiveUsers(): number {
    return this.metrics.activeUsers || 0;
  }

  private getActiveSessions(): number {
    return this.metrics.activeSessions || 0;
  }

  private getTotalRequests(): number {
    return this.metrics.totalRequests || 0;
  }

  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Método para atualizar métricas externamente
  updateMetrics(newMetrics: any): void {
    this.metrics = { ...this.metrics, ...newMetrics };
  }

  // Health check simples
  async simpleHealthCheck(): Promise<{ status: string; timestamp: string }> {
    const health = await this.performHealthCheck();
    return {
      status: health.status,
      timestamp: health.timestamp
    };
  }
}

// Singleton instance
export const healthChecker = new HealthChecker();

// Hook para React
export const useHealthCheck = () => {
  return {
    performHealthCheck: healthChecker.performHealthCheck.bind(healthChecker),
    simpleHealthCheck: healthChecker.simpleHealthCheck.bind(healthChecker),
    registerCheck: healthChecker.registerCheck.bind(healthChecker),
    updateMetrics: healthChecker.updateMetrics.bind(healthChecker)
  };
};

// Auto-inicialização de métricas
if (typeof window !== 'undefined') {
  console.log('🏥 CS360 Health Checker initialized');
}

