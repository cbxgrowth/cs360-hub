
import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, Clock, Target } from 'lucide-react';
import { GoalCard } from './components/GoalCard';
import { GoalUpdateModal } from './components/GoalUpdateModal';
import { GoalUpdatesHistory } from './components/GoalUpdatesHistory';
import { useGoalsManagement } from './hooks/useGoalsManagement';

const activeGoals = [
  {
    id: 1,
    title: 'Aumentar NPS para 80+',
    category: 'Customer Success',
    progress: 75,
    target: 80,
    current: 72,
    unit: 'pontos',
    deadline: '30/06/2024',
    status: 'on-track' as const,
    lastUpdate: '2024-01-15',
    milestones: [
      { id: 1, title: 'Atingir 70 pontos', target: 70, completed: true, date: '2024-01-10' },
      { id: 2, title: 'Atingir 75 pontos', target: 75, completed: false, date: '2024-01-25' }
    ],
    updates: [
      { id: 1, date: '2024-01-15', user: 'João Silva', message: 'NPS subiu para 72 pontos após implementação das melhorias no onboarding', value: 72 },
      { id: 2, date: '2024-01-10', user: 'Maria Santos', message: 'Primeira milestone alcançada!', value: 70 }
    ]
  },
  {
    id: 2,
    title: 'Reduzir Churn para 2%',
    category: 'Retenção',
    progress: 60,
    target: 2,
    current: 3.2,
    unit: '%',
    deadline: '31/07/2024',
    status: 'at-risk' as const,
    lastUpdate: '2024-01-14',
    milestones: [
      { id: 3, title: 'Churn abaixo de 4%', target: 4, completed: true, date: '2024-01-05' },
      { id: 4, title: 'Churn abaixo de 3%', target: 3, completed: false, date: '2024-02-15' }
    ],
    updates: [
      { id: 3, date: '2024-01-14', user: 'Carlos Oliveira', message: 'Implementadas ações de retenção proativa', value: 3.2 }
    ]
  }
];

export const GoalsTracking = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    selectedGoal,
    setSelectedGoal,
    updateValue,
    setUpdateValue,
    updateComment,
    setUpdateComment,
    getStatusColor,
    getStatusLabel,
    handleUpdateGoal
  } = useGoalsManagement();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-track': return <CheckCircle className="w-4 h-4" />;
      case 'at-risk': return <AlertTriangle className="w-4 h-4" />;
      case 'behind': return <Clock className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const handleUpdateClick = (goal: any) => {
    setSelectedGoal(goal);
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    if (selectedGoal) {
      handleUpdateGoal(selectedGoal.id);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {activeGoals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onUpdateClick={handleUpdateClick}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
            getStatusLabel={getStatusLabel}
          />
        ))}
      </div>

      <GoalUpdateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        goal={selectedGoal}
        updateValue={updateValue}
        setUpdateValue={setUpdateValue}
        updateComment={updateComment}
        setUpdateComment={setUpdateComment}
        onUpdate={handleUpdate}
      />

      <GoalUpdatesHistory goals={activeGoals} />
    </div>
  );
};
