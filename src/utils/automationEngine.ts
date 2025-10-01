import type { Automation, TriggerEvent, AutomationTrigger } from '@/types/automation';
import { automationService } from '@/services/automationService';

class AutomationEngine {
  private eventQueue: TriggerEvent[] = [];
  private isProcessing: boolean = false;

  addEvent(event: TriggerEvent): void {
    this.eventQueue.push(event);
    
    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  private async processQueue(): Promise<void> {
    if (this.eventQueue.length === 0) {
      this.isProcessing = false;
      return;
    }

    this.isProcessing = true;
    const event = this.eventQueue.shift()!;

    try {
      await automationService.processTriggerEvent(event);
    } catch (error) {
      console.error('Error processing event:', error);
    }

    setTimeout(() => this.processQueue(), 100);
  }

  trigger(type: string, data: Record<string, any>, source: string = 'system'): void {
    const event: TriggerEvent = {
      type,
      data,
      timestamp: new Date().toISOString(),
      source
    };

    this.addEvent(event);
  }

  events = {
    clientCreated: (clientData: any) => this.trigger('client.created', clientData),
    clientUpdated: (clientData: any) => this.trigger('client.updated', clientData),
    clientDeleted: (clientId: string) => this.trigger('client.deleted', { id: clientId }),
    npsScoreReceived: (npsData: any) => this.trigger('nps.score_received', npsData),
    npsScoreDropped: (npsData: any) => this.trigger('nps.score_dropped', npsData),
    churnRiskDetected: (clientData: any) => this.trigger('churn.risk_detected', clientData),
    churnOccurred: (clientData: any) => this.trigger('churn.occurred', clientData),
    contractExpiring: (contractData: any) => this.trigger('contract.expiring', contractData),
    contractRenewed: (contractData: any) => this.trigger('contract.renewed', contractData),
    ticketCreated: (ticketData: any) => this.trigger('support.ticket_created', ticketData),
    ticketResolved: (ticketData: any) => this.trigger('support.ticket_resolved', ticketData),
    upsellOpportunity: (opportunityData: any) => this.trigger('sales.upsell_opportunity', opportunityData),
    onboardingStarted: (clientData: any) => this.trigger('onboarding.started', clientData),
    onboardingCompleted: (clientData: any) => this.trigger('onboarding.completed', clientData),
    paymentReceived: (paymentData: any) => this.trigger('payment.received', paymentData),
    paymentFailed: (paymentData: any) => this.trigger('payment.failed', paymentData),
    engagementIncreased: (clientData: any) => this.trigger('engagement.increased', clientData),
    engagementDecreased: (clientData: any) => this.trigger('engagement.decreased', clientData)
  };

  evaluateTrigger(trigger: AutomationTrigger, event: TriggerEvent): boolean {
    switch (trigger.type) {
      case 'event':
        return trigger.event === event.type;
      
      case 'condition':
        return this.evaluateCondition(trigger.condition!, event.data);
      
      case 'schedule':
        return false;
      
      case 'webhook':
        return event.source === 'webhook';
      
      default:
        return false;
    }
  }

  private evaluateCondition(condition: any, data: Record<string, any>): boolean {
    const fieldValue = data[condition.field];
    const targetValue = condition.value;

    switch (condition.operator) {
      case 'equals':
        return fieldValue === targetValue;
      
      case 'not_equals':
        return fieldValue !== targetValue;
      
      case 'greater_than':
        return Number(fieldValue) > Number(targetValue);
      
      case 'less_than':
        return Number(fieldValue) < Number(targetValue);
      
      case 'contains':
        return String(fieldValue).includes(String(targetValue));
      
      default:
        return false;
    }
  }

  startScheduler(intervalMinutes: number = 5): void {
    setInterval(async () => {
      try {
        console.log('Running automation scheduler...');
      } catch (error) {
        console.error('Error in automation scheduler:', error);
      }
    }, intervalMinutes * 60 * 1000);
  }
}

export const automationEngine = new AutomationEngine();
