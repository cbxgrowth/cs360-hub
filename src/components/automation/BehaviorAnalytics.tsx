import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter } from 'recharts';
import { 
  Users, 
  TrendingUp, 
  MousePointer, 
  Clock, 
  Eye, 
  MessageSquare,
  Filter,
  Download,
  RefreshCw,
  Activity,
  BarChart3
} from 'lucide-react';
import { useAICredits } from '../../hooks/useAICredits';

const userBehaviorData = [
  { time: '00:00', activeUsers: 45, engagementScore: 65, pageViews: 120 },
  { time: '04:00', activeUsers: 23, engagementScore: 45, pageViews: 67 },
  { time: '08:00', activeUsers: 189, engagementScore: 85, pageViews: 423 },
  { time: '12:00', activeUsers: 267, engagementScore: 92, pageViews: 578 },
  { time: '16:00', activeUsers: 234, engagementScore: 88, pageViews: 512 },
  { time: '20:00', activeUsers: 156, engagementScore: 76, pageViews: 334 },
];

const featureUsageData = [
  { feature: 'Dashboard', usage: 95, satisfaction: 4.8 },
  { feature: 'Relatórios', usage: 78, satisfaction: 4.6 },
  { feature: 'Automações', usage: 62, satisfaction: 4.7 },
  { feature: 'Integrações', usage: 45, satisfaction: 4.2 },
  { feature: 'Analytics', usage: 38, satisfaction: 4.5 },
  { feature: 'Configurações', usage: 89, satisfaction: 4.3 }
];

const cohortData = [
  { cohort: 'Jan 2024', month1: 100, month2: 85, month3: 72, month4: 68, month5: 63, month6: 60 },
  { cohort: 'Fev 2024', month1: 100, month2: 88, month3: 76, month4: 71, month5: 67, month6: null },
  { cohort: 'Mar 2024', month1: 100, month2: 91, month3: 78, month4: 74, month5: null, month6: null },
  { cohort: 'Abr 2024', month1: 100, month2: 89, month3: 81, month4: null, month5: null, month6: null },
  { cohort: 'Mai 2024', month1: 100, month2: 87, month3: null, month4: null, month5: null, month6: null },
  { cohort: 'Jun 2024', month1: 100, month2: null, month3: null, month4: null, month5: null, month6: null }
];

export const BehaviorAnalytics = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [selectedSegment, setSelectedSegment] = useState('all');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { consumeCredits, credits } = useAICredits();

  const handleAIAnalysis = async () => {
    const success = await consumeCredits(30, 'Análise Comportamental Avançada');
    if (success) {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        // Aqui seria chamada a API de análise IA
        console.log('Análise comportamental concluída');
      }, 3000);
    }
  };

  const handleExportData = () => {
    // Simular exportação de dados
    console.log('Exportando dados comportamentais...');
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Análise Comportamental</h3>
          <p className="text-sm text-gray-600 mt-1">
            Insights detalhados sobre comportamento dos usuários
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">24 horas</SelectItem>
              <SelectItem value="7d">7 dias</SelectItem>
              <SelectItem value="30d">30 dias</SelectItem>
              <SelectItem value="90d">90 dias</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedSegment} onValueChange={setSelectedSegment}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos Usuários</SelectItem>
              <SelectItem value="new">Novos Usuários</SelectItem>
              <SelectItem value="active">Usuários Ativos</SelectItem>
              <SelectItem value="premium">Usuários Premium</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleExportData}>
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button 
            onClick={handleAIAnalysis}
            disabled={isAnalyzing || credits < 30}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isAnalyzing ? 'animate-spin' : ''}`} />
            Análise IA (30 créditos)
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Usuários Ativos</p>
                <p className="text-2xl font-bold text-blue-600">1,247</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-sm text-green-600 mt-2">+12% vs período anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Taxa de Engajamento</p>
                <p className="text-2xl font-bold text-green-600">78.3%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-sm text-green-600 mt-2">+5.2% vs período anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tempo Médio de Sessão</p>
                <p className="text-2xl font-bold text-purple-600">14m 32s</p>
              </div>
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-sm text-red-600 mt-2">-2.1% vs período anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Páginas por Sessão</p>
                <p className="text-2xl font-bold text-orange-600">5.7</p>
              </div>
              <Eye className="w-8 h-8 text-orange-600" />
            </div>
            <p className="text-sm text-green-600 mt-2">+8.4% vs período anterior</p>
          </CardContent>
        </Card>
      </div>

      {/* Behavior Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-blue-600" />
            <span>Atividade por Horário</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userBehaviorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="activeUsers" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="Usuários Ativos"
              />
              <Line 
                type="monotone" 
                dataKey="engagementScore" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Score de Engajamento"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Feature Usage Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <span>Uso de Funcionalidades</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {featureUsageData.map((feature, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{feature.feature}</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{feature.usage}% uso</Badge>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        ★ {feature.satisfaction}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={feature.usage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-600" />
              <span>Análise de Coorte</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Coorte</th>
                    <th className="text-center p-2">Mês 1</th>
                    <th className="text-center p-2">Mês 2</th>
                    <th className="text-center p-2">Mês 3</th>
                    <th className="text-center p-2">Mês 4</th>
                    <th className="text-center p-2">Mês 5</th>
                    <th className="text-center p-2">Mês 6</th>
                  </tr>
                </thead>
                <tbody>
                  {cohortData.map((cohort, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2 font-medium">{cohort.cohort}</td>
                      <td className="text-center p-2">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {cohort.month1}%
                        </span>
                      </td>
                      <td className="text-center p-2">
                        {cohort.month2 && (
                          <span className={`px-2 py-1 rounded text-xs ${
                            cohort.month2 >= 80 ? 'bg-green-100 text-green-800' :
                            cohort.month2 >= 60 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {cohort.month2}%
                          </span>
                        )}
                      </td>
                      <td className="text-center p-2">
                        {cohort.month3 && (
                          <span className={`px-2 py-1 rounded text-xs ${
                            cohort.month3 >= 70 ? 'bg-green-100 text-green-800' :
                            cohort.month3 >= 50 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {cohort.month3}%
                          </span>
                        )}
                      </td>
                      <td className="text-center p-2">
                        {cohort.month4 && (
                          <span className={`px-2 py-1 rounded text-xs ${
                            cohort.month4 >= 60 ? 'bg-green-100 text-green-800' :
                            cohort.month4 >= 40 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {cohort.month4}%
                          </span>
                        )}
                      </td>
                      <td className="text-center p-2">
                        {cohort.month5 && (
                          <span className={`px-2 py-1 rounded text-xs ${
                            cohort.month5 >= 60 ? 'bg-green-100 text-green-800' :
                            cohort.month5 >= 40 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {cohort.month5}%
                          </span>
                        )}
                      </td>
                      <td className="text-center p-2">
                        {cohort.month6 && (
                          <span className={`px-2 py-1 rounded text-xs ${
                            cohort.month6 >= 60 ? 'bg-green-100 text-green-800' :
                            cohort.month6 >= 40 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {cohort.month6}%
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Analysis Results */}
      {isAnalyzing && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
              <div>
                <p className="font-medium text-blue-900">Analisando Padrões Comportamentais...</p>
                <p className="text-sm text-blue-700">
                  IA está processando dados de comportamento para identificar insights
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
