
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: Date;
  context?: string;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private log(level: LogLevel, message: string, data?: any, context?: string) {
    const entry: LogEntry = {
      level,
      message,
      data,
      timestamp: new Date(),
      context
    };

    if (this.isDevelopment || level === 'error') {
      const logMethod = console[level] || console.log;
      if (data) {
        logMethod(`[${level.toUpperCase()}] ${context ? `[${context}] ` : ''}${message}`, data);
      } else {
        logMethod(`[${level.toUpperCase()}] ${context ? `[${context}] ` : ''}${message}`);
      }
    }

    // Em produção, enviar para serviço de monitoramento
    if (!this.isDevelopment && level === 'error') {
      this.sendToMonitoringService(entry);
    }
  }

  debug(message: string, data?: any, context?: string) {
    this.log('debug', message, data, context);
  }

  info(message: string, data?: any, context?: string) {
    this.log('info', message, data, context);
  }

  warn(message: string, data?: any, context?: string) {
    this.log('warn', message, data, context);
  }

  error(message: string, data?: any, context?: string) {
    this.log('error', message, data, context);
  }

  private sendToMonitoringService(entry: LogEntry) {
    // Implementar integração com serviço de monitoramento
    // Exemplo: Sentry, LogRocket, etc.
  }
}

export const logger = new Logger();
