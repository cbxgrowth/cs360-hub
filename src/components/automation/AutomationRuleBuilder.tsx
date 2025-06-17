
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Plus, 
  X, 
  Zap, 
  Clock, 
  Brain, 
  Play,
  Save,
  Settings
} from 'lucide-react';

interface AutomationRule {
  id: string;
  name: string;
  description: string;
  type: 'trigger' | 'scheduled' | 'ai-driven';
  status: 'active' | 'paused' | 'draft';
  triggers: {
    type: string;
    condition: string;
    value: string;
  }[];
  actions: {
    type: string;
    parameters: Record<string, any>;
  }[];
  schedule?: {
    frequency: string;
    time?: string;
    days?: string[];
  };
}

interface AutomationRuleBuilderProps {
  onSave: (rule: AutomationRule) => void;
  editingRule?: AutomationRule;
}

const triggerTypes = [
  { value: 'nps_change', label: 'Mudança no NPS' },
  { value: 'usage_drop', label: 'Queda no Uso' },
  { value: 'contract_expiring', label: 'Contrato Vencendo' },
  { value: 'support_ticket', label: 'Ticket de Suporte' },
  { value: 'feature_request', label: 'Solicitação de Feature' },
  { value: 'payment_issue', label: 'Problema de Pagamento' }
];

const actionTypes = [
  { value: 'send_email', label: 'Enviar Email' },
  { value: 'create_task', label: 'Criar Tarefa' },
  { value: 'notify_team', label: 'Notificar Equipe' },
  { value: 'schedule_call', label: 'Agendar Ligação' },
  { value: 'update_status', label: 'Atualizar Status' },
  { value: 'generate_report', label: 'Gerar Relatório' }
];

export const AutomationRuleBuilder = ({ onSave, editingRule }: AutomationRuleBuilderProps) => {
  const [rule, setRule] = useState<Partial<AutomationRule>>(editingRule || {
    name: '',
    description: '',
    type: 'trigger',
    status: 'draft',
    triggers: [],
    actions: []
  });

  const addTrigger = () => {
    setRule(prev => ({
      ...prev,
      triggers: [...(prev.triggers || []), { type: '', condition: 'equals', value: '' }]
    }));
  };

  const removeTrigger = (index: number) => {
    setRule(prev => ({
      ...prev,
      triggers: prev.triggers?.filter((_, i) => i !== index) || []
    }));
  };

  const updateTrigger = (index: number, field: string, value: string) => {
    setRule(prev => ({
      ...prev,
      triggers: prev.triggers?.map((trigger, i) => 
        i === index ? { ...trigger, [field]: value } : trigger
      ) || []
    }));
  };

  const addAction = () => {
    setRule(prev => ({
      ...prev,
      actions: [...(prev.actions || []), { type: '', parameters: {} }]
    }));
  };

  const removeAction = (index: number) => {
    setRule(prev => ({
      ...prev,
      actions: prev.actions?.filter((_, i) => i !== index) || []
    }));
  };

  const updateAction = (index: number, field: string, value: any) => {
    setRule(prev => ({
      ...prev,
      actions: prev.actions?.map((action, i) => 
        i === index ? { ...action, [field]: value } : action
      ) || []
    }));
  };

  const handleSave = () => {
    if (rule.name && rule.triggers && rule.actions) {
      onSave({
        ...rule,
        id: editingRule?.id || `rule_${Date.now()}`
      } as AutomationRule);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'trigger': return <Zap className="w-4 h-4" />;
      case 'scheduled': return <Clock className="w-4 h-4" />;
      case 'ai-driven': return <Brain className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Configuração da Automação</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Automação</Label>
              <Input
                id="name"
                value={rule.name || ''}
                onChange={(e) => setRule(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: Alerta de Churn Risk"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select value={rule.type} onValueChange={(value) => setRule(prev => ({ ...prev, type: value as any }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trigger">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4" />
                      <span>Por Evento</span>
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={rule.description || ''}
              onChange={(e) => setRule(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descreva o que esta automação faz..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Triggers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Gatilhos</span>
            </div>
            <Button size="sm" onClick={addTrigger}>
              <Plus className="w-4 h-4 mr-1" />
              Adicionar
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {rule.triggers?.map((trigger, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="outline">Gatilho {index + 1}</Badge>
                <Button variant="ghost" size="sm" onClick={() => removeTrigger(index)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Select 
                  value={trigger.type} 
                  onValueChange={(value) => updateTrigger(index, 'type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o evento" />
                  </SelectTrigger>
                  <SelectContent>
                    {triggerTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select 
                  value={trigger.condition} 
                  onValueChange={(value) => updateTrigger(index, 'condition', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equals">Igual a</SelectItem>
                    <SelectItem value="greater_than">Maior que</SelectItem>
                    <SelectItem value="less_than">Menor que</SelectItem>
                    <SelectItem value="contains">Contém</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  value={trigger.value}
                  onChange={(e) => updateTrigger(index, 'value', e.target.value)}
                  placeholder="Valor"
                />
              </div>
            </Card>
          ))}
          {rule.triggers?.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              <Zap className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Adicione gatilhos para ativar esta automação</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Ações</span>
            </div>
            <Button size="sm" onClick={addAction}>
              <Plus className="w-4 h-4 mr-1" />
              Adicionar
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {rule.actions?.map((action, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="outline">Ação {index + 1}</Badge>
                <Button variant="ghost" size="sm" onClick={() => removeAction(index)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-3">
                <Select 
                  value={action.type} 
                  onValueChange={(value) => updateAction(index, 'type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a ação" />
                  </SelectTrigger>
                  <SelectContent>
                    {actionTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {action.type && (
                  <Textarea
                    placeholder="Parâmetros da ação (JSON ou texto livre)"
                    rows={2}
                    onChange={(e) => updateAction(index, 'parameters', { content: e.target.value })}
                  />
                )}
              </div>
            </Card>
          ))}
          {rule.actions?.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              <Play className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Adicione ações para executar quando os gatilhos forem ativados</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-3">
        <Button variant="outline">
          Cancelar
        </Button>
        <Button onClick={handleSave} disabled={!rule.name || !rule.triggers?.length || !rule.actions?.length}>
          <Save className="w-4 h-4 mr-2" />
          Salvar Automação
        </Button>
      </div>
    </div>
  );
};
