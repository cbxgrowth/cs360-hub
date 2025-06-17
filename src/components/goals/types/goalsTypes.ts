
export interface Goal {
  id: number;
  title: string;
  category: string;
  progress: number;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  status: 'on-track' | 'at-risk' | 'behind';
  lastUpdate: string;
  milestones: Milestone[];
  updates: GoalUpdate[];
}

export interface Milestone {
  id: number;
  title: string;
  target: number;
  completed: boolean;
  date: string;
}

export interface GoalUpdate {
  id: number;
  date: string;
  user: string;
  message: string;
  value: number;
}

export interface GoalFormData {
  title: string;
  description: string;
  category: string;
  target: number;
  unit: string;
  deadline: Date;
  assignees: string[];
  priority: 'low' | 'medium' | 'high';
}
