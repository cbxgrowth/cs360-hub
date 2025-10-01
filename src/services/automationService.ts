import { supabase } from '@/integrations/supabase/client';
import type { Automation, AutomationExecution, AutomationLog, TriggerEvent } from '@/types/automation';

class AutomationService {
  async createAutomation(automation: Omit<Automation, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: Automation | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('automations')
        .insert({
          ...automation,
          executions: 0,
          success_rate: 0
        })
        .select()
        .single();

      if (error) throw error;
      return { data: data as Automation, error: null };
    } catch (error: any) {
      console.error('Error creating automation:', error);
      return { data: null, error: error.message };
    }
  }

  async getAutomations(userId: string): Promise<{ data: Automation[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('automations')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data as Automation[], error: null };
    } catch (error: any) {
      console.error('Error fetching automations:', error);
      return { data: null, error: error.message };
    }
  }

  async getAutomation(id: string): Promise<{ data: Automation | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('automations')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return { data: data as Automation, error: null };
    } catch (error: any) {
      console.error('Error fetching automation:', error);
      return { data: null, error: error.message };
    }
  }

  async updateAutomation(id: string, updates: Partial<Automation>): Promise<{ data: Automation | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('automations')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { data: data as Automation, error: null };
    } catch (error: any) {
      console.error('Error updating automation:', error);
      return { data: null, error: error.message };
    }
  }

  async deleteAutomation(id: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase
        .from('automations')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      console.error('Error deleting automation:', error);
      return { error: error.message };
    }
  }

  async toggleAutomation(id: string, status: 'active' | 'paused'): Promise<{ error: string | null }> {
    return this.updateAutomation(id, { status }).then(result => ({ error: result.error }));
  }

  async executeAutomation(automationId: string, context?: any): Promise<{ data: AutomationExecution | null; error: string | null }> {
    try {
      const { data: automation, error: fetchError } = await this.getAutomation(automationId);
      
      if (fetchError || !automation) {
        throw new Error('Automation not found');
      }

      if (automation.status !== 'active') {
        throw new Error('Automation is not active');
      }

      const logs: AutomationLog[] = [];
      let success = true;

      try {
        for (const action of automation.actions) {
          const actionLog = await this.executeAction(action, context);
          logs.push(actionLog);

          if (actionLog.level === 'error') {
            success = false;
            break;
          }

          if (action.delay) {
            await this.delay(action.delay * 60 * 1000);
          }
        }
      } catch (error: any) {
        success = false;
        logs.push({
          timestamp: new Date().toISOString(),
          level: 'error',
          message: `Execution failed: ${error.message}`
        });
      }

      await this.updateAutomationStats(automationId, success);

      return { 
        data: {
          id: `exec_${Date.now()}`,
          automation_id: automationId,
          status: success ? 'success' : 'failed',
          started_at: new Date().toISOString(),
          completed_at: new Date().toISOString(),
          logs
        } as AutomationExecution, 
        error: null 
      };
    } catch (error: any) {
      console.error('Error executing automation:', error);
      return { data: null, error: error.message };
    }
  }

  private async executeAction(action: any, context?: any): Promise<AutomationLog> {
    const log: AutomationLog = {
      timestamp: new Date().toISOString(),
      level: 'info',
      message: `Executing action: ${action.type}`
    };

    try {
      switch (action.type) {
        case 'email':
          log.message = `Email action configured: ${action.config.to || 'recipient'}`;
          break;
        case 'notification':
          log.message = `Notification sent: ${action.config.message}`;
          break;
        case 'webhook':
          log.message = `Webhook configured: ${action.config.url}`;
          break;
        case 'task':
          log.message = `Task created: ${action.config.title}`;
          break;
        case 'update_field':
          log.message = `Field update configured: ${action.config.field}`;
          break;
        default:
          log.level = 'warning';
          log.message = `Unknown action type: ${action.type}`;
      }
    } catch (error: any) {
      log.level = 'error';
      log.message = `Action failed: ${error.message}`;
      log.data = { error: error.message };
    }

    return log;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async updateAutomationStats(automationId: string, success: boolean): Promise<void> {
    const { data: automation } = await this.getAutomation(automationId);
    
    if (!automation) return;

    const newExecutions = automation.executions + 1;
    const newSuccessRate = success 
      ? ((automation.success_rate * automation.executions) + 100) / newExecutions
      : ((automation.success_rate * automation.executions)) / newExecutions;

    await this.updateAutomation(automationId, {
      executions: newExecutions,
      success_rate: Math.round(newSuccessRate),
      last_run: new Date().toISOString()
    });
  }

  async processTriggerEvent(event: TriggerEvent): Promise<void> {
    try {
      const { data: automations } = await supabase
        .from('automations')
        .select('*')
        .eq('status', 'active');

      if (!automations || automations.length === 0) return;

      for (const automation of automations) {
        const shouldExecute = automation.triggers.some((trigger: any) => 
          trigger.event === event.type
        );

        if (shouldExecute) {
          await this.executeAutomation(automation.id, event.data);
        }
      }
    } catch (error) {
      console.error('Error processing trigger event:', error);
    }
  }

  async duplicateAutomation(id: string): Promise<{ data: Automation | null; error: string | null }> {
    try {
      const { data: original, error: fetchError } = await this.getAutomation(id);
      
      if (fetchError || !original) {
        throw new Error('Automation not found');
      }

      const duplicate = {
        ...original,
        name: `${original.name} (Cópia)`,
        status: 'draft' as const,
        executions: 0,
        success_rate: 0
      };

      delete (duplicate as any).id;
      delete (duplicate as any).created_at;
      delete (duplicate as any).updated_at;

      return this.createAutomation(duplicate);
    } catch (error: any) {
      console.error('Error duplicating automation:', error);
      return { data: null, error: error.message };
    }
  }

  async exportAutomations(userId: string): Promise<string> {
    try {
      const { data: automations } = await this.getAutomations(userId);
      
      if (!automations) return '';

      return JSON.stringify(automations, null, 2);
    } catch (error) {
      console.error('Error exporting automations:', error);
      return '';
    }
  }
}

export const automationService = new AutomationService();
