
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Switch } from '../ui/switch';
import { Progress } from '../ui/progress';
import { 
  Target, 
  Plus, 
  Users, 
  Calendar as CalendarIcon, 
  Tag, 
  AlertCircle,
  CheckCircle,
  TrendingUp,
  DollarSign,
  Percent,
  Hash
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const goalTemplates = [
  {
    id: 1,
    name: 'Aumentar NPS',
    category: 'Customer Success',
    description: 'Meta para melhorar a satisfação dos clientes',
    targetType: 'numeric',
    unit: 'pontos',
    defaultTarget: 80
  },
  {
    id: 2,
    name: 'Reduzir Churn',
    category: 'Retenção',
    description: 'Diminuir taxa de cancelamentos',
    targetType: 'percentage',
    unit: '%',
    defaultTarget: 2
  },
  {
    id: 3,
    name: 'Aumentar MRR',
    category: 'Vendas',
    description: 'Crescimento de receita recorrente mensal',
    targetType: 'currency',
    unit: 'R$',
    defaultTarget: 100000
  },
  {
    id: 4,
    name: 'Novos Clientes',
    category: 'Vendas',
    description: 'Aquisição de novos clientes',
    targetType: 'numeric',
    unit: 'clientes',
    defaultTarget: 50
  }
];

const departments = [
  'Customer Success',
  'Vendas',
  'Marketing',
  'Financeiro',
  'Produto',
  'Tecnologia'
];

const users = [
  { id: 1, name: 'João Silva', role: 'CS Manager', department: 'Customer Success' },
  { id: 2, name: 'Maria Santos', role: 'Sales Rep', department: 'Vendas' },
  { id: 3, name: 'Carlos Oliveira', role: 'CS Specialist', department: 'Customer Success' },
  { id: 4, name: 'Ana Costa', role: 'Marketing Analyst', department: 'Marketing' }
];

export const GoalsCreation = () => {
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    targetType: 'numeric',
    targetValue: '',
    unit: '',
    deadline: null as Date | null,
    assignedUsers: [] as number[],
    department: '',
    priority: 'medium',
    isPublic: true,
    milestones: [] as any[],
    notifications: true
  });

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template);
    setFormData({
      ...formData,
      title: template.name,
      description: template.description,
      category: template.category,
      targetType: template.targetType,
      unit: template.unit,
      targetValue: template.defaultTarget.toString()
    });
    setStep(2);
  };

  const handleUserToggle = (userId: number) => {
    setFormData({
      ...formData,
      assignedUsers: formData.assignedUsers.includes(userId)
        ? formData.assignedUsers.filter(id => id !== userId)
        : [...formData.assignedUsers, userId]
    });
  };

  const addMilestone = () => {
    setFormData({
      ...formData,
      milestones: [
        ...formData.milestones,
        {
          id: Date.now(),
          title: '',
          description: '',
          targetValue: '',
          deadline: null,
          completed: false
        }
      ]
    });
  };

  const updateMilestone = (id: number, field: string, value: any) => {
    setFormData({
      ...formData,
      milestones: formData.milestones.map(m => 
        m.id === id ? { ...m, [field]: value } : m
      )
    });
  };

  const removeMilestone = (id: number) => {
    setFormData({
      ...formData,
      milestones: formData.milestones.filter(m => m.id !== id)
    });
  };

  const getTargetIcon = (type: string) => {
    switch (type) {
      case 'currency': return <DollarSign className="w-4 h-4" />;
      case 'percentage': return <Percent className="w-4 h-4" />;
      default: return <Hash className="w-4 h-4" />;
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {[1, 2, 3, 4].map((stepNumber) => (
        <div key={stepNumber} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
            step >= stepNumber 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-200 text-gray-600'
          }`}>
            {step > stepNumber ? <CheckCircle className="w-5 h-5" /> : stepNumber}
          </div>
          {stepNumber < 4 && (
            <div className={`w-16 h-1 mx-2 ${
              step > stepNumber ? 'bg-green-500' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-green-500" />
            <span>Criar Nova Meta</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderStepIndicator()}

          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">Escolha um modelo ou crie do zero</h3>
                <p className="text-gray-600">Selecione um template para acelerar a criação da sua meta</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {goalTemplates.map((template) => (
                  <Card 
                    key={template.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-green-200"
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {getTargetIcon(template.targetType)}
                          <h4 className="font-semibold">{template.name}</h4>
                        </div>
                        <Badge variant="outline">{template.category}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Meta padrão:</span>
                        <span className="font-medium">
                          {template.defaultTarget} {template.unit}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button 
                  variant="outline" 
                  onClick={() => setStep(2)}
                  className="flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Criar Meta Personalizada</span>
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Título da Meta</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Ex: Aumentar NPS para 80+"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Customer Success">Customer Success</SelectItem>
                      <SelectItem value="Vendas">Vendas</SelectItem>
                      <SelectItem value="Retenção">Retenção</SelectItem>
                      <SelectItem value="Upsell">Upsell</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Descreva os objetivos e contexto desta meta..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="targetType">Tipo de Meta</Label>
                  <Select value={formData.targetType} onValueChange={(value) => setFormData({...formData, targetType: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="numeric">Numérica</SelectItem>
                      <SelectItem value="percentage">Percentual</SelectItem>
                      <SelectItem value="currency">Monetária</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="targetValue">Valor Alvo</Label>
                  <Input
                    id="targetValue"
                    value={formData.targetValue}
                    onChange={(e) => setFormData({...formData, targetValue: e.target.value})}
                    placeholder="100"
                    type="number"
                  />
                </div>
                <div>
                  <Label htmlFor="unit">Unidade</Label>
                  <Input
                    id="unit"
                    value={formData.unit}
                    onChange={(e) => setFormData({...formData, unit: e.target.value})}
                    placeholder="pontos, %, R$"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Data Limite</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.deadline ? format(formData.deadline, "PPP", { locale: ptBR }) : "Selecione uma data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.deadline}
                        onSelect={(date) => setFormData({...formData, deadline: date})}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="priority">Prioridade</Label>
                  <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baixa</SelectItem>
                      <SelectItem value="medium">Média</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="critical">Crítica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Voltar
                </Button>
                <Button onClick={() => setStep(3)}>
                  Próximo
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="department">Departamento</Label>
                <Select value={formData.department} onValueChange={(value) => setFormData({...formData, department: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Responsáveis</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  {users.map((user) => (
                    <div 
                      key={user.id} 
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        formData.assignedUsers.includes(user.id) 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleUserToggle(user.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.role}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 ${
                          formData.assignedUsers.includes(user.id)
                            ? 'bg-green-500 border-green-500'
                            : 'border-gray-300'
                        }`}>
                          {formData.assignedUsers.includes(user.id) && (
                            <CheckCircle className="w-3 h-3 text-white m-0.5" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="isPublic">Meta Pública</Label>
                  <Switch 
                    id="isPublic"
                    checked={formData.isPublic}
                    onCheckedChange={(checked) => setFormData({...formData, isPublic: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications">Notificações</Label>
                  <Switch 
                    id="notifications"
                    checked={formData.notifications}
                    onCheckedChange={(checked) => setFormData({...formData, notifications: checked})}
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Voltar
                </Button>
                <Button onClick={() => setStep(4)}>
                  Próximo
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Marcos (Opcional)</h3>
                <Button onClick={addMilestone} size="sm" className="flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Adicionar Marco</span>
                </Button>
              </div>

              {formData.milestones.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhum marco definido ainda.</p>
                  <p className="text-sm">Marcos ajudam a dividir metas grandes em etapas menores.</p>
                </div>
              )}

              {formData.milestones.map((milestone, index) => (
                <Card key={milestone.id} className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="font-medium">Marco {index + 1}</h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeMilestone(milestone.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remover
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Título do Marco</Label>
                      <Input
                        value={milestone.title}
                        onChange={(e) => updateMilestone(milestone.id, 'title', e.target.value)}
                        placeholder="Ex: Atingir 60% da meta"
                      />
                    </div>
                    <div>
                      <Label>Valor Alvo</Label>
                      <Input
                        value={milestone.targetValue}
                        onChange={(e) => updateMilestone(milestone.id, 'targetValue', e.target.value)}
                        placeholder="Ex: 60"
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label>Descrição</Label>
                    <Textarea
                      value={milestone.description}
                      onChange={(e) => updateMilestone(milestone.id, 'description', e.target.value)}
                      placeholder="Descreva este marco..."
                      rows={2}
                    />
                  </div>
                </Card>
              ))}

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(3)}>
                  Voltar
                </Button>
                <div className="space-x-2">
                  <Button variant="outline">
                    Salvar Rascunho
                  </Button>
                  <Button className="bg-green-500 hover:bg-green-600">
                    Criar Meta
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
