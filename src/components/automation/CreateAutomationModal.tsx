
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select';
import { 
  Zap, 
  Clock, 
  Brain, 
  X, 
  Plus,
  Target,
  Users,
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface CreateAutomationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateAutomation: (automation: any) => void;
}

interface AutomationFormData {
  name: string;
  description: string;
  type: 'trigger' | 'scheduled' | 'ai-driven';
  category: 'customer' | 'sales' | 'support' | 'marketing';
  triggers: string[];
  actions: string[];
  priority: 'low' | 'medium' | 'high';
  schedule?: {
    frequency: string;
    time?: string;
    days?: string[];
  };
}

const triggerOptions = [
  { id: 'nps_drop', label: 'Queda no NPS', category: 'customer' },
  { id: 'usage_decline', label: 'Declínio no Uso', category: 'customer' },
  { id: 'support_frequency', label: 'Alta Frequência de Suporte', category: 'support' },
  { id: 'usage_spike', label: 'Pico de Uso', category: 'sales' },
  { id: 'feature_requests', label: 'Solicitações de Features', category: 'sales' },
  { id: 'growth_indicators', label: 'Indicadores de Crescimento', category: 'sales' },
  { id: 'new_client', label: 'Novo Cliente', category: 'customer' },
  { id: 'contract_renewal', label: 'Renovação de Contrato', category: 'sales' },
  { id: 'payment_delay', label: 'Atraso de Pagamento', category: 'support' },
  { id: 'login_frequency', label: 'Frequência de Login', category: 'customer' },
  { id: 'feature_adoption', label: 'Adoção de Features', category: 'customer' },
  { id: 'support_rating', label: 'Avaliação de Suporte', category: 'support' }
];

const actionOptions = [
  { id: 'send_alert', label: 'Enviar Alerta', icon: MessageSquare },
  { id: 'create_task', label: 'Criar Tarefa', icon: Target },
  { id: 'schedule_call', label: 'Agendar Ligação', icon: Phone },
  { id: 'notify_sales', label: 'Notificar Vendas', icon: Users },
  { id: 'prepare_proposal', label: 'Preparar Proposta', icon: Target },
  { id: 'schedule_demo', label: 'Agendar Demo', icon: Calendar },
  { id: 'send_welcome', label: 'Enviar Boas-vindas', icon: Mail },
  { id: 'assign_csm', label: 'Atribuir CSM', icon: Users },
  { id: 'create_timeline', label: 'Criar Timeline', icon: Calendar },
  { id: 'update_score', label: 'Atualizar Score', icon: Target },
  { id: 'send_survey', label: 'Enviar Pesquisa', icon: MessageSquare },
  { id: 'escalate_support', label: 'Escalar Suporte', icon: AlertTriangle }
];

export const CreateAutomationModal: React.FC<CreateAutomationModalProps> = ({
  isOpen,
  onClose,
  onCreateAutomation
}) => {
  const [formData, setFormData] = useState<AutomationFormData>({
    name: '',
    description: '',
    type: 'trigger',
    category: 'customer',
    triggers: [],
    actions: [],
    priority: 'medium'
  });

  const [newTrigger, setNewTrigger] = useState('');
  const [newAction, setNewAction] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.triggers.length > 0 && formData.actions.length > 0) {
      onCreateAutomation({
        ...formData,
        status: 'draft',
        executions: 0,
        successRate: 0,
        lastRun: new Date().toISOString().split('T')[0]
      });
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      type: 'trigger',
      category: 'customer',
      triggers: [],
      actions: [],
      priority: 'medium'
    });
    setNewTrigger('');
    setNewAction('');
  };

  const addTrigger = () => {
    if (newTrigger && !formData.triggers.includes(newTrigger)) {
      setFormData(prev => ({
        ...prev,
        triggers: [...prev.triggers, newTrigger]
      }));
      setNewTrigger('');
    }
  };

  const removeTrigger = (trigger: string) => {
    setFormData(prev => ({
      ...prev,
      triggers: prev.triggers.filter(t => t !== trigger)
    }));
  };

  const addAction = () => {
    if (newAction && !formData.actions.includes(newAction)) {
      setFormData(prev => ({
        ...prev,
        actions: [...prev.actions, newAction]
      }));
      setNewAction('');
    }
  };

  const removeAction = (action: string) => {
    setFormData(prev => ({
      ...prev,
      actions: prev.actions.filter(a => a !== action)
    }));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'trigger': return <Zap className="w-4 h-4" />;
      case 'scheduled': return <Clock className="w-4 h-4" />;
      case 'ai-driven': return <Brain className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const getTriggerLabel = (triggerId: string) => {
    return triggerOptions.find(t => t.id === triggerId)?.label || triggerId;
  };

  const getActionLabel = (actionId: string) => {
    return actionOptions.find(a => a.id === actionId)?.label || actionId;
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-blue-600" />
            <span>Criar Nova Automação</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Automação *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: Alerta de Churn Risk"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Prioridade</Label>
              <Select 
                value={formData.priority} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value as any }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descreva o que esta automação faz..."
              rows={3}
            />
          </div>

          {/* Type and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tipo de Automação</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as any }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trigger">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4" />
                      <span>Por Evento (Trigger)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="scheduled">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>Agendada</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="ai-driven">
                    <div className="flex items-center space-x-2">
                      <Brain className="w-4 h-4" />
                      <span>Orientada por IA</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as any }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">Cliente</SelectItem>
                  <SelectItem value="sales">Vendas</SelectItem>
                  <SelectItem value="support">Suporte</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Triggers */}
          <div className="space-y-3">
            <Label>Gatilhos (Triggers) *</Label>
            <div className="flex space-x-2">
              <Select value={newTrigger} onValueChange={setNewTrigger}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Selecione um gatilho" />
                </SelectTrigger>
                <SelectContent>
                  {triggerOptions
                    .filter(trigger => trigger.category === formData.category)
                    .map(trigger => (
                      <SelectItem key={trigger.id} value={trigger.id}>
                        {trigger.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button type="button" onClick={addTrigger} disabled={!newTrigger}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {formData.triggers.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.triggers.map((trigger) => (
                  <Badge key={trigger} variant="secondary" className="flex items-center space-x-1">
                    <span>{getTriggerLabel(trigger)}</span>
                    <button
                      type="button"
                      onClick={() => removeTrigger(trigger)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Label>Ações *</Label>
            <div className="flex space-x-2">
              <Select value={newAction} onValueChange={setNewAction}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Selecione uma ação" />
                </SelectTrigger>
                <SelectContent>
                  {actionOptions.map(action => (
                    <SelectItem key={action.id} value={action.id}>
                      <div className="flex items-center space-x-2">
                        <action.icon className="w-4 h-4" />
                        <span>{action.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" onClick={addAction} disabled={!newAction}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {formData.actions.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.actions.map((action) => (
                  <Badge key={action} variant="outline" className="flex items-center space-x-1">
                    <span>{getActionLabel(action)}</span>
                    <button
                      type="button"
                      onClick={() => removeAction(action)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Schedule (if scheduled type) */}
          {formData.type === 'scheduled' && (
            <div className="space-y-3">
              <Label>Agendamento</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Frequência</Label>
                  <Select 
                    onValueChange={(value) => setFormData(prev => ({
                      ...prev,
                      schedule: { ...prev.schedule, frequency: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">A cada hora</SelectItem>
                      <SelectItem value="daily">Diário</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm">Horário</Label>
                  <Input
                    type="time"
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      schedule: { ...prev.schedule, time: e.target.value }
                    }))}
                  />
                </div>
              </div>
            </div>
          )}

          {/* AI Configuration (if ai-driven) */}
          {formData.type === 'ai-driven' && (
            <div className="bg-purple-50 p-4 rounded-lg space-y-3">
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <Label className="font-medium text-purple-900">Configurações de IA</Label>
              </div>
              <p className="text-sm text-purple-700">
                Esta automação utilizará algoritmos de machine learning para detectar padrões e tomar decisões inteligentes baseadas em dados históricos.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Confiança Mínima</Label>
                  <Select defaultValue="80">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="70">70%</SelectItem>
                      <SelectItem value="80">80%</SelectItem>
                      <SelectItem value="90">90%</SelectItem>
                      <SelectItem value="95">95%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm">Modelo</Label>
                  <Select defaultValue="auto">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Automático</SelectItem>
                      <SelectItem value="classification">Classificação</SelectItem>
                      <SelectItem value="regression">Regressão</SelectItem>
                      <SelectItem value="clustering">Clusterização</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={!formData.name || formData.triggers.length === 0 || formData.actions.length === 0}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Criar Automação
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
