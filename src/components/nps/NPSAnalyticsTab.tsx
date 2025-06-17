
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Brain, 
  Target, 
  Users, 
  AlertTriangle,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const analyticsData = [
  { month: 'Jan', nps: 68, satisfaction: 8.2, churn: 3.5, retention: 96.5 },
  { month: 'Fev', nps: 72, satisfaction: 8.5, churn: 2.8, retention: 97.2 },
  { month: 'Mar', nps: 69, satisfaction: 8.1, churn: 4.2, retention: 95.8 },
  { month: 'Abr', nps: 74, satisfaction: 8.7, churn: 2.1, retention: 97.9 },
  { month: 'Mai', nps: 76, satisfaction: 8.9, churn: 1.8, retention: 98.2 },
  { month: 'Jun', nps: 78, satisfaction: 9.1, churn: 1.5, retention: 98.5 }
];

const segmentData = [
  { segment: 'Enterprise', count: 45, nps: 82, color: '#10B981' },
  { segment: 'Professional', count: 89, nps: 76, color: '#3B82F6' },
  { segment: 'Growth', count: 67, nps: 71, color: '#8B5CF6' },
  { segment: 'Starter', count: 123, nps: 65, color: '#F59E0B' }
];

const insights = [
  {
    type: 'positive',
    title: 'Crescimento Consistente',
    description: 'NPS aumentou 14.7% nos últimos 6 meses',
    impact: 'Alto',
    recommendation: 'Mantenha as estratégias atuais de Customer Success'
  },
  {
    type: 'warning',
    title: 'Segmento Starter Preocupante',
    description: 'NPS de 65 está abaixo da meta de 70+',
    impact: 'Médio',
    recommendation: 'Implementar programa de onboarding melhorado'
  },
  {
    type: 'opportunity',
    title: 'Oportunidade Enterprise',
    description: 'Segmento com maior NPS (82) tem potencial para expansão',
    impact: 'Alto',
    recommendation: 'Focar em upsell e referrals neste segmento'
  }
];

export const NPSAnalyticsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* IA Insights */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            Insights com IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights.map((insight, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {insight.type === 'positive' && <CheckCircle className="w-4 h-4 text-green-600" />}
                    {insight.type === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-600" />}
                    {insight.type === 'opportunity' && <Target className="w-4 h-4 text-blue-600" />}
                    <span className="font-semibold text-sm">{insight.title}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {insight.impact}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {insight.description}
                </p>
                <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                  💡 {insight.recommendation}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trends Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Evolução de Métricas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="nps" stroke="#10B981" strokeWidth={2} name="NPS" />
                <Line type="monotone" dataKey="satisfaction" stroke="#3B82F6" strokeWidth={2} name="Satisfação" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              NPS por Segmento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={segmentData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="segment" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="nps" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Predictive Analytics */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-600" />
            Análise Preditiva
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">NPS Projetado</span>
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-600">82</div>
              <div className="text-xs text-gray-500">Próximos 3 meses</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Churn Risk</span>
                <TrendingDown className="w-4 h-4 text-red-600" />
              </div>
              <div className="text-2xl font-bold text-red-600">1.2%</div>
              <div className="text-xs text-gray-500">Redução esperada</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Satisfação</span>
                <CheckCircle className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-600">9.3</div>
              <div className="text-xs text-gray-500">Score projetado</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">ROI Campaign</span>
                <Target className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-purple-600">340%</div>
              <div className="text-xs text-gray-500">Retorno esperado</div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              Ver Relatório Completo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
