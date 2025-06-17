
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
import { Star, TrendingUp, Users, MessageSquare, ArrowLeft, Calendar, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const detailedNPSData = [
  { month: 'Jan', nps: 8.2, promoters: 65, passives: 27, detractors: 8, responses: 120 },
  { month: 'Fev', nps: 8.5, promoters: 68, passives: 26, detractors: 6, responses: 135 },
  { month: 'Mar', nps: 8.1, promoters: 63, passives: 28, detractors: 9, responses: 142 },
  { month: 'Abr', nps: 8.7, promoters: 72, passives: 23, detractors: 5, responses: 156 },
  { month: 'Mai', nps: 8.9, promoters: 75, passives: 21, detractors: 4, responses: 168 },
  { month: 'Jun', nps: 9.1, promoters: 78, passives: 19, detractors: 3, responses: 175 }
];

const segmentData = [
  { segment: 'Enterprise', nps: 9.2, count: 45 },
  { segment: 'Corporativo', nps: 8.8, count: 89 },
  { segment: 'PME', nps: 8.5, count: 156 },
  { segment: 'Startup', nps: 8.1, count: 234 }
];

const NPSDetails = () => {
  const navigate = useNavigate();

  return (
    <AppLayout
      title="Detalhes do NPS"
      description="Análise detalhada do Net Promoter Score"
      icon={<Star className="w-6 h-6 text-white" />}
      gradientColors="bg-gradient-to-r from-green-600 to-emerald-600"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => navigate('/app')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Dashboard</span>
          </Button>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Período
            </Button>
          </div>
        </div>

        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">NPS Atual</p>
                  <p className="text-3xl font-bold text-green-600">9.1</p>
                </div>
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-sm text-green-600 mt-2">+0.2 vs mês anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Promotores</p>
                  <p className="text-3xl font-bold text-blue-600">78%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-sm text-blue-600 mt-2">+3% vs mês anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Detratores</p>
                  <p className="text-3xl font-bold text-red-600">3%</p>
                </div>
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <p className="text-sm text-green-600 mt-2">-1% vs mês anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Respostas</p>
                  <p className="text-3xl font-bold text-purple-600">175</p>
                </div>
                <MessageSquare className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-sm text-purple-600 mt-2">+7 este mês</p>
            </CardContent>
          </Card>
        </div>

        {/* Evolução Detalhada */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução Detalhada do NPS</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={detailedNPSData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="nps" stroke="#10B981" strokeWidth={3} name="NPS Score" />
                <Line type="monotone" dataKey="promoters" stroke="#3B82F6" strokeWidth={2} name="Promotores %" />
                <Line type="monotone" dataKey="detractors" stroke="#EF4444" strokeWidth={2} name="Detratores %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Análise por Segmento */}
        <Card>
          <CardHeader>
            <CardTitle>NPS por Segmento de Cliente</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={segmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="segment" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="nps" fill="#10B981" name="NPS Score" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Feedback Recente */}
        <Card>
          <CardHeader>
            <CardTitle>Feedback Recente dos Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { score: 10, comment: "Excelente serviço, muito satisfeito com o atendimento.", client: "Cliente Enterprise A", date: "Hoje" },
                { score: 9, comment: "Produto de qualidade, recomendo para outras empresas.", client: "Cliente Corporativo B", date: "Ontem" },
                { score: 8, comment: "Bom custo-benefício, atende nossas necessidades.", client: "Cliente PME C", date: "2 dias atrás" },
                { score: 2, comment: "Problemas técnicos frequentes, precisa melhorar.", client: "Cliente Startup D", date: "3 dias atrás" }
              ].map((feedback, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Badge variant={feedback.score >= 9 ? "default" : feedback.score >= 7 ? "secondary" : "destructive"}>
                    {feedback.score}/10
                  </Badge>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">{feedback.comment}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-gray-500">{feedback.client}</p>
                      <p className="text-xs text-gray-500">{feedback.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default NPSDetails;
