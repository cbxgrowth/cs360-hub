
import { useState } from 'react';
import { Goal, GoalFormData } from '../types/goalsTypes';

export const useGoalsManagement = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [updateValue, setUpdateValue] = useState('');
  const [updateComment, setUpdateComment] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'text-green-600 bg-green-100';
      case 'at-risk': return 'text-yellow-600 bg-yellow-100';
      case 'behind': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'on-track': return 'No Prazo';
      case 'at-risk': return 'Em Risco';
      case 'behind': return 'Atrasada';
      default: return 'Indefinido';
    }
  };

  const handleUpdateGoal = (goalId: number) => {
    console.log('Atualizando meta:', { goalId, value: updateValue, comment: updateComment });
    // Implementar lógica de atualização aqui
    setUpdateValue('');
    setUpdateComment('');
  };

  const createGoal = (formData: GoalFormData) => {
    const newGoal: Goal = {
      id: Date.now(),
      title: formData.title,
      category: formData.category,
      progress: 0,
      target: formData.target,
      current: 0,
      unit: formData.unit,
      deadline: formData.deadline.toISOString().split('T')[0],
      status: 'on-track',
      lastUpdate: new Date().toISOString().split('T')[0],
      milestones: [],
      updates: []
    };

    setGoals(prev => [...prev, newGoal]);
    return newGoal;
  };

  return {
    goals,
    selectedGoal,
    setSelectedGoal,
    updateValue,
    setUpdateValue,
    updateComment,
    setUpdateComment,
    getStatusColor,
    getStatusLabel,
    handleUpdateGoal,
    createGoal
  };
};
