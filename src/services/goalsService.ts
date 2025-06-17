
import { BaseService } from './api/baseService';

export interface GoalMetrics {
  totalGoals: number;
  activeGoals: number;
  completedGoals: number;
  onTrackGoals: number;
  atRiskGoals: number;
  behindGoals: number;
  completionRate: number;
}

class GoalsService extends BaseService<'goals'> {
  constructor() {
    super('goals');
  }

  async getGoalMetrics(userId: string): Promise<{ data: GoalMetrics | null; error: string | null }> {
    try {
      const { data: goals, error } = await this.findAll(userId);
      
      if (error || !goals) {
        return { data: null, error: error || 'No goals found' };
      }

      const metrics: GoalMetrics = {
        totalGoals: goals.length,
        activeGoals: goals.filter((g: any) => g.status === 'active').length,
        completedGoals: goals.filter((g: any) => g.status === 'completed').length,
        onTrackGoals: goals.filter((g: any) => this.calculateGoalStatus(g) === 'on-track').length,
        atRiskGoals: goals.filter((g: any) => this.calculateGoalStatus(g) === 'at-risk').length,
        behindGoals: goals.filter((g: any) => this.calculateGoalStatus(g) === 'behind').length,
        completionRate: goals.length > 0 
          ? (goals.filter((g: any) => g.status === 'completed').length / goals.length) * 100
          : 0
      };

      return { data: metrics, error: null };
    } catch (error: any) {
      console.error('Error calculating goal metrics:', error);
      return { data: null, error: error.message };
    }
  }

  private calculateGoalStatus(goal: any): 'on-track' | 'at-risk' | 'behind' {
    const now = new Date();
    const deadline = new Date(goal.deadline);
    const progress = (goal.current_value || 0) / goal.target;
    const timeProgress = (now.getTime() - new Date(goal.created_at).getTime()) / 
                        (deadline.getTime() - new Date(goal.created_at).getTime());

    if (progress >= timeProgress) return 'on-track';
    if (progress >= timeProgress * 0.8) return 'at-risk';
    return 'behind';
  }

  async updateGoalProgress(goalId: string, newValue: number, comment?: string) {
    try {
      const { data: goal, error: fetchError } = await this.findById(goalId);
      
      if (fetchError || !goal) {
        return { data: null, error: fetchError || 'Goal not found' };
      }

      const progress = (newValue / (goal as any).target) * 100;
      const status = progress >= 100 ? 'completed' : 'active';

      const { data, error } = await this.update(goalId, {
        current_value: newValue,
        status
      });

      return { data, error };
    } catch (error: any) {
      console.error('Error updating goal progress:', error);
      return { data: null, error: error.message };
    }
  }
}

export const goalsService = new GoalsService();
