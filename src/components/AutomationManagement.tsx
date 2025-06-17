
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { AutomationMetrics } from './automation/AutomationMetrics';
import { AutomationRuleBuilder } from './automation/AutomationRuleBuilder';
import { AIInsightsPanel } from './automation/AIInsightsPanel';
import { BehaviorAnalytics } from './automation/BehaviorAnalytics';
import { SmartRecommendations } from './automation/SmartRecommendations';
import { AIAdvancedFeatures } from './ai/AIAdvancedFeatures';
import { CreateAutomationModal } from './automation/CreateAutomationModal';
import { AutomationDashboard } from './automation/AutomationDashboard';
import { 
  Plus, 
  Settings, 
  Zap, 
  Bot, 
  Clock, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  Play,
  Pause,
  Edit,
  Eye,
  Target,
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  FileText,
  BarChart3,
  Brain,
  Lightbulb,
  CheckCircle,
  Activity,
  DollarSign,
  Database,
  Shield,
  RefreshCw,
  Download,
  Upload
} from 'lucide-react';
import { useAICredits } from '../hooks/useAICredits';

interface Automation {
  id: string;
  name: string;
  description: string;
  type: 'trigger' | 'scheduled' | 'ai-driven';
  status: 'active' | 'paused' | 'draft';
  category: 'customer' | 'sales' | 'support' | 'marketing';
  triggers: string[];
  actions: string[];
  lastRun: string;
  nextRun?: string;
  executions: number;
  successRate: number;
}

const mockAutomations: Automation[] = [
  {
    id: 'auto_001',
    name: 'Alerta Churn Risk Inteligente',
    description: 'Detecta padrões de churn usando ML e aciona intervenções automáticas',
    type: 'ai-driven',
    status: 'active',
    category: 'customer',
    triggers: ['nps_drop', 'usage_decline', 'support_frequency'],
    actions: ['send_alert', 'create_task', 'schedule_call'],
    lastRun: '2024-06-10',
    executions: 89,
    successRate: 92
  },
  {
    id: 'auto_002',
    name: 'Upsell Opportunity Detector',
    description: 'Identifica momentos ideais para upsell baseado em comportamento',
    type: 'ai-driven',
    status: 'active',
    category: 'sales',
    triggers: ['usage_spike', 'feature_requests', 'growth_indicators'],
    actions: ['notify_sales', 'prepare_proposal', 'schedule_demo'],
    lastRun: '2024-06-10',
    executions: 156,
    successRate: 87
  },
  {
    id: 'auto_003',
    name: 'Onboarding Personalizado',
    description: 'Adapta o onboarding baseado no perfil e comportamento do cliente',
    type: 'trigger',
    status: 'active',
    category: 'customer',
    triggers: ['new_client', 'company_size', 'industry_type'],
    actions: ['send_welcome', 'assign_csm', 'create_timeline'],
    lastRun: '2024-06-09',
    executions: 47,
    successRate: 95
  },
  {
    id: 'auto_004',
    name: 'Support Ticket Classification',
    description: 'Classifica automaticamente tickets de suporte por prioridade e categoria',
    type: 'ai-driven',
    status: 'active',
    category: 'support',
    triggers: ['new_ticket', 'ticket_content', 'user_history'],
    actions: ['classify_ticket', 'assign_agent', 'set_priority'],
    lastRun: '2024-06-10',
    executions: 234,
    successRate: 94
  }
];

// Mock metrics data
const mockMetrics = {
  activeAutomations: 12,
  aiActionsToday: 247,
  averageAccuracy: 91.4,
  roiGenerated: 2800000,
  successfulExecutions: 1247,
  failedExecutions: 23,
  timesSaved: 156,
  predictionsToday: 89
};

export const AutomationManagement = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [automations, setAutomations] = useState(mockAutomations);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showRuleBuilder, setShowRuleBuilder] = useState(false);
  const [selectedAutomation, setSelectedAutomation] = useState<Automation | null>(null);
  const { credits } = useAICredits();

  const handleToggleAutomation = (automationId: string) => {
    setAutomations(prev => prev.map(auto => 
      auto.id === automationId 
        ? { ...auto, status: auto.status === 'active' ? 'paused' : 'active' }
        : auto
    ));
  };

  const handleCreateAutomation = (newAutomation: any) => {
    const automation: Automation = {
      ...newAutomation,
      id: `auto_${Date.now()}`,
      executions: 0,
      successRate: 0,
      lastRun: new Date().toISOString().split('T')[0]
    };
    setAutomations(prev => [...prev, automation]);
    setIsCreateModalOpen(false);
    setShowRuleBuilder(false);
    console.log('Nova automação criada:', automation);
  };

  const handleEditAutomation = (automation: Automation) => {
    setSelectedAutomation(automation);
    setShowRuleBuilder(true);
  };

  const handleViewAutomation = (automation: Automation) => {
    setSelectedAutomation(automation);
    // Aqui poderia abrir um modal de detalhes
    console.log('Visualizar automação:', automation);
  };

  const handleDuplicateAutomation = (automation: Automation) => {
    const duplicated: Automation = {
      ...automation,
      id: `auto_${Date.now()}`,
      name: `${automation.name} (Cópia)`,
      status: 'draft',
      executions: 0,
      successRate: 0
    };
    setAutomations(prev => [...prev, duplicated]);
    console.log('Automação duplicada:', duplicated);
  };

  const handleDeleteAutomation = (automationId: string) => {
    setAutomations(prev => prev.filter(auto => auto.id !== automationId));
    console.log('Automação deletada:', automationId);
  };

  const handleExportAutomations = () => {
    const dataStr = JSON.stringify(automations, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'automations-export.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImportAutomations = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const importedAutomations = JSON.parse(e.target?.result as string);
            setAutomations(prev => [...prev, ...importedAutomations]);
            console.log('Automações importadas:', importedAutomations);
          } catch (error) {
            console.error('Erro ao importar automações:', error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'active': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'paused': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      'draft': 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300'
    };
    const labels = {
      'active': 'Ativa',
      'paused': 'Pausada',
      'draft': 'Rascunho'
    };
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      'trigger': <Zap className="w-4 h-4" />,
      'scheduled': <Clock className="w-4 h-4" />,
      'ai-driven': <Brain className="w-4 h-4" />
    };
    return icons[type as keyof typeof icons] || <Bot className="w-4 h-4" />;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'customer': 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300',
      'sales': 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300',
      'support': 'text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-300',
      'marketing': 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300'
    };
    return colors[category as keyof typeof colors] || 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Sistema de Automação & IA</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Plataforma inteligente que analisa comportamentos, prediz resultados e automatiza ações estratégicas
          </p>
          <div className="flex items-center space-x-4 mt-3">
            <Badge className="bg-blue-100 text-blue-800">
              {automations.filter(a => a.status === 'active').length} ativas
            </Badge>
            <Badge className="bg-purple-100 text-purple-800">
              {credits} créditos IA
            </Badge>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleImportAutomations}>
            <Upload className="w-4 h-4 mr-2" />
            Importar
          </Button>
          <Button variant="outline" onClick={handleExportAutomations}>
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button variant="outline" onClick={() => setActiveTab('advanced')}>
            <Settings className="w-4 h-4 mr-2" />
            Configurações IA
          </Button>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nova Automação
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6 bg-slate-100/50 dark:bg-slate-700/50">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="automations" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Automações
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Insights IA
          </TabsTrigger>
          <TabsTrigger value="behavior" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Comportamento
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Recomendações
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Avançado
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-6">
          <div className="space-y-6">
            <AutomationDashboard />
            <AutomationMetrics metrics={mockMetrics} />
          </div>
        </TabsContent>

        <TabsContent value="automations" className="mt-6">
          {showRuleBuilder ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">
                  {selectedAutomation ? 'Editar Automação' : 'Criar Nova Automação'}
                </h3>
                <Button variant="outline" onClick={() => {
                  setShowRuleBuilder(false);
                  setSelectedAutomation(null);
                }}>
                  Voltar à Lista
                </Button>
              </div>
              <AutomationRuleBuilder 
                onSave={handleCreateAutomation} 
                editingRule={selectedAutomation as any}
              />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Automation Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600">{automations.length}</p>
                    <p className="text-sm text-gray-600">Total</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {automations.filter(a => a.status === 'active').length}
                    </p>
                    <p className="text-sm text-gray-600">Ativas</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-yellow-600">
                      {automations.filter(a => a.status === 'paused').length}
                    </p>
                    <p className="text-sm text-gray-600">Pausadas</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-purple-600">
                      {automations.filter(a => a.type === 'ai-driven').length}
                    </p>
                    <p className="text-sm text-gray-600">IA-Driven</p>
                  </CardContent>
                </Card>
              </div>

              {/* Automations Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {automations.map((automation) => (
                  <Card key={automation.id} className="hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {getStatusBadge(automation.status)}
                            <Badge className={getCategoryColor(automation.category)}>
                              {automation.category}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg flex items-center space-x-2">
                            {getTypeIcon(automation.type)}
                            <span className="text-gray-900 dark:text-white">{automation.name}</span>
                          </CardTitle>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{automation.description}</p>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <p className="text-gray-500 dark:text-gray-400">Execuções</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{automation.executions}</p>
                        </div>
                        <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <p className="text-gray-500 dark:text-gray-400">Sucesso</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{automation.successRate}%</p>
                        </div>
                      </div>

                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        <p>Última execução: {automation.lastRun}</p>
                        {automation.nextRun && <p>Próxima execução: {automation.nextRun}</p>}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleViewAutomation(automation)}
                          className="flex-1"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Ver
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditAutomation(automation)}
                          className="flex-1"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Editar
                        </Button>
                        <Button 
                          onClick={() => handleToggleAutomation(automation.id)} 
                          variant="outline" 
                          size="sm"
                        >
                          {automation.status === 'active' ? 
                            <Pause className="w-4 h-4" /> : 
                            <Play className="w-4 h-4" />
                          }
                        </Button>
                      </div>
                      
                      <div className="flex space-x-1 pt-2 border-t">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDuplicateAutomation(automation)}
                          className="flex-1 text-xs"
                        >
                          Duplicar
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteAutomation(automation.id)}
                          className="flex-1 text-xs text-red-600 hover:text-red-800"
                        >
                          Excluir
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="insights" className="mt-6">
          <AIInsightsPanel />
        </TabsContent>

        <TabsContent value="behavior" className="mt-6">
          <BehaviorAnalytics />
        </TabsContent>

        <TabsContent value="recommendations" className="mt-6">
          <SmartRecommendations />
        </TabsContent>

        <TabsContent value="advanced" className="mt-6">
          <AIAdvancedFeatures />
        </TabsContent>
      </Tabs>

      {/* Create Automation Modal */}
      <CreateAutomationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateAutomation={handleCreateAutomation}
      />
    </div>
  );
};
