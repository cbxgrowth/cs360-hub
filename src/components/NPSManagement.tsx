
import React, { useState } from 'react';
import { 
  Star, 
  Plus,
  Download,
  Edit,
  Settings,
  BarChart3,
  Mail,
  ExternalLink,
  MessageSquare,
  TrendingUp,
  Zap,
  Target,
  Users,
  Activity
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { NPSMetricsCards } from './nps/NPSMetricsCards';
import { NPSOverviewTab } from './nps/NPSOverviewTab';
import { NPSSurveysTab } from './nps/NPSSurveysTab';
import { NPSFeedbackTab } from './nps/NPSFeedbackTab';
import { NPSAnalyticsTab } from './nps/NPSAnalyticsTab';
import { NPSSurveyManager } from './nps/NPSSurveyManager';
import { NPSDataCollector } from './nps/NPSDataCollector';
import { NPSFormEditor } from './nps/NPSFormEditor';
import { NPSLinksReports } from './nps/NPSLinksReports';

const npsData = [
  { month: 'Jan', score: 68, responses: 156, promoters: 89, passives: 45, detractors: 22 },
  { month: 'Fev', score: 72, responses: 143, promoters: 98, passives: 32, detractors: 13 },
  { month: 'Mar', score: 69, responses: 167, promoters: 95, passives: 51, detractors: 21 },
  { month: 'Abr', score: 74, responses: 178, promoters: 112, passives: 43, detractors: 23 },
  { month: 'Mai', score: 76, responses: 189, promoters: 125, passives: 41, detractors: 23 },
  { month: 'Jun', score: 78, responses: 201, promoters: 138, passives: 42, detractors: 21 }
];

const surveyData = [
  {
    id: 1,
    name: 'Pesquisa Trimestral Q2',
    status: 'ativa',
    sent: 247,
    responses: 189,
    responseRate: 76.5,
    npsScore: 78,
    createdAt: '2024-06-01',
    expiresAt: '2024-06-30'
  },
  {
    id: 2,
    name: 'Pesquisa Pós-Implementação',
    status: 'finalizada',
    sent: 156,
    responses: 143,
    responseRate: 91.7,
    npsScore: 82,
    createdAt: '2024-05-15',
    expiresAt: '2024-05-30'
  },
  {
    id: 3,
    name: 'Pesquisa de Satisfação Geral',
    status: 'rascunho',
    sent: 0,
    responses: 0,
    responseRate: 0,
    npsScore: 0,
    createdAt: '2024-06-10',
    expiresAt: '2024-07-10'
  }
];

const feedbackData = [
  {
    id: 1,
    client: 'TechCorp LTDA',
    score: 9,
    category: 'promoter',
    feedback: 'Excelente plataforma! O suporte é muito eficiente e os resultados são visíveis.',
    date: '2024-06-15',
    segment: 'Enterprise'
  },
  {
    id: 2,
    client: 'StartupX',
    score: 7,
    category: 'passive',
    feedback: 'Boa ferramenta, mas gostaria de ver mais funcionalidades de automação.',
    date: '2024-06-14',
    segment: 'Growth'
  },
  {
    id: 3,
    client: 'BigCorp S.A.',
    score: 10,
    category: 'promoter',
    feedback: 'Revolucionou nossa gestão de Customer Success. Recomendo fortemente!',
    date: '2024-06-13',
    segment: 'Enterprise'
  },
  {
    id: 4,
    client: 'MidCompany',
    score: 4,
    category: 'detractor',
    feedback: 'A interface poderia ser mais intuitiva. Alguns relatórios são confusos.',
    date: '2024-06-12',
    segment: 'Professional'
  }
];

export const NPSManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSurveyManagerOpen, setIsSurveyManagerOpen] = useState(false);
  const [isFormEditorOpen, setIsFormEditorOpen] = useState(false);
  const [selectedFormConfig, setSelectedFormConfig] = useState(null);
  const [isCollectorOpen, setIsCollectorOpen] = useState(false);

  const currentNPS = npsData[npsData.length - 1]?.score || 0;
  const previousNPS = npsData[npsData.length - 2]?.score || 0;
  const npsChange = currentNPS - previousNPS;

  const totalResponses = npsData[npsData.length - 1]?.responses || 0;
  const responseRate = surveyData.find(s => s.status === 'ativa')?.responseRate || 0;

  const handleExport = () => {
    console.log('Exportando dados NPS...');
  };

  const handleSendSurvey = (surveyId: number) => {
    console.log('Enviando pesquisa:', surveyId);
  };

  const handleCreateForm = () => {
    setSelectedFormConfig(null);
    setIsFormEditorOpen(true);
  };

  const handleEditForm = (formConfig: any) => {
    setSelectedFormConfig(formConfig);
    setIsFormEditorOpen(true);
  };

  const handleSaveForm = (config: any) => {
    console.log('Formulário NPS salvo:', config);
  };

  const handleNPSResponse = (response: any) => {
    console.log('Resposta NPS coletada:', response);
  };

  const handleTestForm = () => {
    setIsCollectorOpen(true);
  };

  const quickActions = [
    {
      title: 'Criar Pesquisa Express',
      description: 'Configure em 2 minutos',
      icon: Zap,
      color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      action: () => setIsSurveyManagerOpen(true)
    },
    {
      title: 'Análise de Segmentos',
      description: 'Insights por perfil',
      icon: Target,
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      action: () => setActiveTab('analytics')
    },
    {
      title: 'Acompanhar Campanhas',
      description: 'Performance em tempo real',
      icon: Activity,
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      action: () => setActiveTab('links')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Enhanced Statistics Cards */}
      <NPSMetricsCards 
        currentNPS={currentNPS}
        npsChange={npsChange}
        totalResponses={totalResponses}
        responseRate={responseRate}
      />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActions.map((action, index) => (
          <Card 
            key={index} 
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all cursor-pointer"
            onClick={action.action}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${action.color}`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{action.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{action.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Main Content */}
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 shadow-xl">
        <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">
                  Sistema NPS Completo
                </CardTitle>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Gestão completa de pesquisas e análises de satisfação
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                <Users className="w-3 h-3 mr-1" />
                {totalResponses} respostas
              </Badge>
              <Button variant="outline" size="sm" onClick={handleCreateForm} className="bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm">
                <Edit className="w-4 h-4 mr-2" />
                Editor Avançado
              </Button>
              <Button variant="outline" size="sm" onClick={handleTestForm} className="bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm">
                <Settings className="w-4 h-4 mr-2" />
                Visualizar
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport} className="bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm">
                <Download className="w-4 h-4 mr-2" />
                Relatórios
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" onClick={() => setIsSurveyManagerOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Nova Pesquisa
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-slate-100/50 dark:bg-slate-700/50">
              <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm">
                <BarChart3 className="w-4 h-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="surveys" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm">
                <Mail className="w-4 h-4" />
                Pesquisas
              </TabsTrigger>
              <TabsTrigger value="links" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm">
                <ExternalLink className="w-4 h-4" />
                Links & Campanhas
              </TabsTrigger>
              <TabsTrigger value="feedback" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm">
                <MessageSquare className="w-4 h-4" />
                Feedback
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm">
                <TrendingUp className="w-4 h-4" />
                Analytics IA
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <NPSOverviewTab data={npsData} />
            </TabsContent>

            <TabsContent value="surveys" className="mt-6">
              <NPSSurveysTab 
                surveyData={surveyData}
                onSendSurvey={handleSendSurvey}
              />
            </TabsContent>

            <TabsContent value="links" className="mt-6">
              <NPSLinksReports onNewCampaignClick={handleCreateForm} />
            </TabsContent>

            <TabsContent value="feedback" className="mt-6">
              <NPSFeedbackTab 
                feedbackData={feedbackData}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <NPSAnalyticsTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Enhanced Modals */}
      <NPSSurveyManager
        isOpen={isSurveyManagerOpen}
        onClose={() => setIsSurveyManagerOpen(false)}
        onSubmit={(data) => {
          console.log('Nova pesquisa criada:', data);
          setIsSurveyManagerOpen(false);
        }}
      />

      <NPSFormEditor
        isOpen={isFormEditorOpen}
        onClose={() => setIsFormEditorOpen(false)}
        formConfig={selectedFormConfig}
        onSave={handleSaveForm}
      />

      {/* Enhanced Collector Modal */}
      {isCollectorOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="mb-4 flex justify-end">
              <Button
                variant="outline"
                onClick={() => setIsCollectorOpen(false)}
                className="bg-white/90 hover:bg-white text-slate-700"
              >
                Fechar Visualização
              </Button>
            </div>
            <NPSDataCollector
              surveyId="preview-survey"
              clientInfo={{
                name: "Cliente Exemplo",
                email: "exemplo@empresa.com",
                segment: "Enterprise"
              }}
              onSubmit={handleNPSResponse}
            />
          </div>
        </div>
      )}
    </div>
  );
};
