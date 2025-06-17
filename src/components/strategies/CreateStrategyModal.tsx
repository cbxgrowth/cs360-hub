
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { X, Plus, Target, TrendingUp, Zap, Users, Calendar, User } from 'lucide-react';

interface CreateStrategyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateStrategy: (strategyData: any) => void;
  recommendationData?: any;
}

export const CreateStrategyModal: React.FC<CreateStrategyModalProps> = ({ 
  isOpen, 
  onClose, 
  onCreateStrategy,
  recommendationData 
}) => {
  const [formData, setFormData] = useState({
    name: recommendationData?.title || '',
    description: recommendationData?.description || '',
    type: recommendationData?.category || 'retention',
    priority: recommendationData?.priority || 'medium',
    assignedTo: [] as string[],
    dueDate: '',
    kpis: recommendationData?.kpis || [],
    tasks: [] as any[]
  });

  const [newAssignee, setNewAssignee] = useState('');
  const [newKpi, setNewKpi] = useState('');
  const [newTask, setNewTask] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateStrategy({
      ...formData,
      aiGenerated: !!recommendationData,
      sourceRecommendation: recommendationData?.id
    });
    onClose();
  };

  const addAssignee = () => {
    if (newAssignee.trim()) {
      setFormData(prev => ({
        ...prev,
        assignedTo: [...prev.assignedTo, newAssignee.trim()]
      }));
      setNewAssignee('');
    }
  };

  const removeAssignee = (index: number) => {
    setFormData(prev => ({
      ...prev,
      assignedTo: prev.assignedTo.filter((_, i) => i !== index)
    }));
  };

  const addKpi = () => {
    if (newKpi.trim()) {
      setFormData(prev => ({
        ...prev,
        kpis: [...prev.kpis, newKpi.trim()]
      }));
      setNewKpi('');
    }
  };

  const removeKpi = (index: number) => {
    setFormData(prev => ({
      ...prev,
      kpis: prev.kpis.filter((_, i) => i !== index)
    }));
  };

  const addTask = () => {
    if (newTask.trim()) {
      setFormData(prev => ({
        ...prev,
        tasks: [...prev.tasks, {
          id: `task_${Date.now()}`,
          title: newTask.trim(),
          status: 'pending',
          assignedTo: '',
          dueDate: '',
          priority: 'medium'
        }]
      }));
      setNewTask('');
    }
  };

  const removeTask = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tasks: prev.tasks.filter((_, i) => i !== index)
    }));
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      retention: Target,
      growth: TrendingUp,
      efficiency: Zap,
      satisfaction: Users
    };
    return icons[type as keyof typeof icons] || Target;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                {React.createElement(getTypeIcon(formData.type), { className: "w-5 h-5 text-blue-600" })}
              </div>
              <div>
                <CardTitle>
                  {recommendationData ? 'Criar Estratégia da Recomendação IA' : 'Nova Estratégia'}
                </CardTitle>
                {recommendationData && (
                  <p className="text-sm text-gray-600">
                    Baseada em análise inteligente de dados
                  </p>
                )}
              </div>
            </div>
            <Button onClick={onClose} variant="ghost" size="sm">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Estratégia</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Redução de Churn Q2"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Data Limite</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descreva os objetivos e metodologia da estratégia..."
                rows={3}
                required
              />
            </div>

            {/* Type and Priority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tipo de Estratégia</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retention">
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4" />
                        <span>Retenção</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="growth">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4" />
                        <span>Crescimento</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="efficiency">
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4" />
                        <span>Eficiência</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="satisfaction">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>Satisfação</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Prioridade</Label>
                <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="low">Baixa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Team Assignment */}
            <div className="space-y-3">
              <Label>Equipe Responsável</Label>
              <div className="flex space-x-2">
                <Input
                  value={newAssignee}
                  onChange={(e) => setNewAssignee(e.target.value)}
                  placeholder="Nome do responsável"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAssignee())}
                />
                <Button type="button" onClick={addAssignee} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {formData.assignedTo.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.assignedTo.map((assignee, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{assignee}</span>
                      <button
                        type="button"
                        onClick={() => removeAssignee(index)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* KPIs */}
            <div className="space-y-3">
              <Label>KPIs e Métricas</Label>
              <div className="flex space-x-2">
                <Input
                  value={newKpi}
                  onChange={(e) => setNewKpi(e.target.value)}
                  placeholder="Ex: Taxa de Churn, NPS Score..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKpi())}
                />
                <Button type="button" onClick={addKpi} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {formData.kpis.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.kpis.map((kpi, index) => (
                    <Badge key={index} variant="outline" className="flex items-center space-x-1">
                      <span>{kpi}</span>
                      <button
                        type="button"
                        onClick={() => removeKpi(index)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Tasks */}
            <div className="space-y-3">
              <Label>Tarefas Iniciais</Label>
              <div className="flex space-x-2">
                <Input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Descreva uma tarefa..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTask())}
                />
                <Button type="button" onClick={addTask} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {formData.tasks.length > 0 && (
                <div className="space-y-2">
                  {formData.tasks.map((task, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">{task.title}</span>
                      <Button
                        type="button"
                        onClick={() => removeTask(index)}
                        variant="ghost"
                        size="sm"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">
                Criar Estratégia
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
