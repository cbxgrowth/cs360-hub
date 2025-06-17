
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, BarChart, Bar } from 'recharts';
import { 
  Zap, 
  Brain, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Users,
  Target,
  Activity
} from 'lucide-react';

interface AutomationMetricsProps {
  metrics: {
    activeAutomations: number;
    aiActionsToday: number;
    averageAccuracy: number;
    roiGenerated: number;
    successfulExecutions: number;
    failedExecutions: number;
    timesSaved: number;
    predictionsToday: number;
  };
}

const performanceData = [
  { date: '01/06', executions: 45, success: 42, accuracy: 93 },
  { date: '02/06', executions: 52, success: 48, accuracy: 92 },
  { date: '03/06', executions: 38, success: 36, accuracy: 95 },
  { date: '04/06', executions: 67, success: 61, accuracy: 91 },
  { date: '05/06', executions: 71, success: 68, accuracy: 96 },
  { date: '06/06', executions: 58, success: 55, accuracy: 95 },
  { date: '07/06', executions: 63, success: 59, accuracy: 94 }
];

const automationTypes = [
  { name: 'Churn Prevention', value: 35, color: '#ef4444' },
  { name: 'Upsell Detection', value: 28, color: '#10b981' },
  { name: 'Support Automation', value: 22, color: '#3b82f6' },
  { name: 'Lead Scoring', value: 15, color: '#f59e0b' }
];

export const AutomationMetrics: React.FC<AutomationMetricsProps> = ({ metrics }) => {
  const successRate = metrics.successfulExecutions / (metrics.successfulExecutions + metrics.failedExecutions) * 100;
  
  return (
    <div className="space-y-6">
      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Automações Ativas</p>
                <p className="text-3xl font-bold">{metrics.activeAutomations}</p>
              </div>
              <Zap className="w-8 h-8 text-blue-200" />
            </div>
            <div className="mt-4">
              <Badge className="bg-white/20 text-white">
                +3 esta semana
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Ações IA Hoje</p>
                <p className="text-3xl font-bold">{metrics.aiActionsToday}</p>
              </div>
              <Brain className="w-8 h-8 text-purple-200" />
            </div>
            <div className="mt-4">
              <Badge className="bg-white/20 text-white">
                +12% vs ontem
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">ROI Gerado</p>
                <p className="text-3xl font-bold">R$ {(metrics.roiGenerated / 1000000).toFixed(1)}M</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-200" />
            </div>
            <div className="mt-4">
              <Badge className="bg-white/20 text-white">
                +28% este mês
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Precisão IA</p>
                <p className="text-3xl font-bold">{metrics.averageAccuracy.toFixed(1)}%</p>
              </div>
              <Target className="w-8 h-8 text-orange-200" />
            </div>
            <div className="mt-4">
              <Progress value={metrics.averageAccuracy} className="h-2 bg-white/20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Execution Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <span>Performance de Execução</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="executions" 
                  stackId="1"
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.6}
                  name="Execuções"
                />
                <Area 
                  type="monotone" 
                  dataKey="success" 
                  stackId="2"
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.6}
                  name="Sucessos"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Automation Types */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-purple-600" />
              <span>Tipos de Automação</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={automationTypes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Taxa de Sucesso</span>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Execuções Bem-sucedidas</span>
                <span className="font-semibold">{metrics.successfulExecutions}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Execuções Falhadas</span>
                <span className="font-semibold text-red-600">{metrics.failedExecutions}</span>
              </div>
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Taxa de Sucesso</span>
                  <span className="text-lg font-bold text-green-600">{successRate.toFixed(1)}%</span>
                </div>
                <Progress value={successRate} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Tempo Economizado</span>
              <Clock className="w-5 h-5 text-blue-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{metrics.timesSaved}h</p>
                <p className="text-sm text-gray-600">Horas economizadas este mês</p>
              </div>
              <div className="text-sm text-gray-600">
                <p>• Processamento automático de leads</p>
                <p>• Classificação de tickets de suporte</p>
                <p>• Análise de padrões de churn</p>
                <p>• Geração de relatórios</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Predições IA</span>
              <Brain className="w-5 h-5 text-purple-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">{metrics.predictionsToday}</p>
                <p className="text-sm text-gray-600">Predições geradas hoje</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Risco de Churn</span>
                  <span className="font-semibold">34</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Oportunidades Upsell</span>
                  <span className="font-semibold">28</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Leads Qualificados</span>
                  <span className="font-semibold">27</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
