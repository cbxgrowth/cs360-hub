import type { AutomationTrigger } from '@/types/automation';

export class TriggerEvaluator {
  static evaluate(triggers: AutomationTrigger[], context: any): boolean {
    return triggers.every(trigger => this.evaluateSingle(trigger, context));
  }

  static evaluateSingle(trigger: AutomationTrigger, context: any): boolean {
    switch (trigger.type) {
      case 'event':
        return this.evaluateEvent(trigger, context);
      
      case 'condition':
        return this.evaluateCondition(trigger, context);
      
      case 'schedule':
        return this.evaluateSchedule(trigger, context);
      
      case 'webhook':
        return this.evaluateWebhook(trigger, context);
      
      default:
        return false;
    }
  }

  private static evaluateEvent(trigger: AutomationTrigger, context: any): boolean {
    return context.eventType === trigger.event;
  }

  private static evaluateCondition(trigger: AutomationTrigger, context: any): boolean {
    if (!trigger.condition) return false;

    const { field, operator, value } = trigger.condition;
    const fieldValue = this.getNestedValue(context, field);

    switch (operator) {
      case 'equals':
        return fieldValue == value;
      
      case 'not_equals':
        return fieldValue != value;
      
      case 'greater_than':
        return Number(fieldValue) > Number(value);
      
      case 'less_than':
        return Number(fieldValue) < Number(value);
      
      case 'contains':
        if (Array.isArray(fieldValue)) {
          return fieldValue.includes(value);
        }
        return String(fieldValue).toLowerCase().includes(String(value).toLowerCase());
      
      default:
        return false;
    }
  }

  private static evaluateSchedule(trigger: AutomationTrigger, context: any): boolean {
    if (!trigger.schedule) return false;

    const now = new Date();
    const schedule = this.parseSchedule(trigger.schedule);

    return this.matchesSchedule(now, schedule);
  }

  private static evaluateWebhook(trigger: AutomationTrigger, context: any): boolean {
    return context.source === 'webhook' && context.webhookId === trigger.config.webhookId;
  }

  private static getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  private static parseSchedule(schedule: string): any {
    const parts = schedule.split(' ');
    
    return {
      minute: parts[0],
      hour: parts[1],
      dayOfMonth: parts[2],
      month: parts[3],
      dayOfWeek: parts[4]
    };
  }

  private static matchesSchedule(date: Date, schedule: any): boolean {
    const minute = date.getMinutes();
    const hour = date.getHours();
    const dayOfMonth = date.getDate();
    const month = date.getMonth() + 1;
    const dayOfWeek = date.getDay();

    return (
      this.matchesSchedulePart(minute, schedule.minute) &&
      this.matchesSchedulePart(hour, schedule.hour) &&
      this.matchesSchedulePart(dayOfMonth, schedule.dayOfMonth) &&
      this.matchesSchedulePart(month, schedule.month) &&
      this.matchesSchedulePart(dayOfWeek, schedule.dayOfWeek)
    );
  }

  private static matchesSchedulePart(value: number, pattern: string): boolean {
    if (pattern === '*') return true;
    if (pattern.includes(',')) {
      return pattern.split(',').some(p => Number(p) === value);
    }
    if (pattern.includes('-')) {
      const [start, end] = pattern.split('-').map(Number);
      return value >= start && value <= end;
    }
    if (pattern.includes('/')) {
      const [, step] = pattern.split('/').map(Number);
      return value % step === 0;
    }
    return Number(pattern) === value;
  }

  static validateSchedule(schedule: string): { valid: boolean; error?: string } {
    const parts = schedule.split(' ');
    
    if (parts.length !== 5) {
      return { valid: false, error: 'Schedule must have 5 parts (minute hour day month weekday)' };
    }

    const ranges = [
      { min: 0, max: 59, name: 'minute' },
      { min: 0, max: 23, name: 'hour' },
      { min: 1, max: 31, name: 'day' },
      { min: 1, max: 12, name: 'month' },
      { min: 0, max: 6, name: 'weekday' }
    ];

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const range = ranges[i];

      if (part === '*') continue;

      if (part.includes(',')) {
        const values = part.split(',').map(Number);
        if (values.some(v => isNaN(v) || v < range.min || v > range.max)) {
          return { valid: false, error: `Invalid ${range.name} value` };
        }
        continue;
      }

      if (part.includes('-')) {
        const [start, end] = part.split('-').map(Number);
        if (isNaN(start) || isNaN(end) || start < range.min || end > range.max || start > end) {
          return { valid: false, error: `Invalid ${range.name} range` };
        }
        continue;
      }

      if (part.includes('/')) {
        const [base, step] = part.split('/');
        if (base !== '*' || isNaN(Number(step))) {
          return { valid: false, error: `Invalid ${range.name} step` };
        }
        continue;
      }

      const value = Number(part);
      if (isNaN(value) || value < range.min || value > range.max) {
        return { valid: false, error: `Invalid ${range.name} value` };
      }
    }

    return { valid: true };
  }
}
