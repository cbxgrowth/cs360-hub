import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Target, TrendingUp, DollarSign, Users, Zap, Brain, AlertTriangle } from 'lucide-react';

interface CACAnalysisTabProps {
  onOptimizeCAC: (channel: string) => void;
  onRecommendationAction: (description: string, credits: number) => void;
}

const channelData = [
  { channel: 'Google Ads', cac: 2800, efficiency: 85, volume: 45, trend: 'up' },
  { channel: 'Facebook Ads', cac: 3200, efficiency: 78, volume: 38, trend: 'down' },
  { channel: 'LinkedIn Ads', cac: 4500, efficiency: 92, volume: 22, trend: 'up' },
  { channel: 'SEO Orgânico', cac: 1200, efficiency: 95, volume: 15, trend: 'stable' },
  { channel: 'Email Marketing', cac: 800, efficiency: 88, volume: 28, trend: 'up' },
  { channel: 'Referral', cac: 600, efficiency: 96, volume: 12, trend: 'up' }
];

const cacTrendData = [
  { month: 'Jan', googleAds: 2600, facebook: 3100, linkedin: 4200, organic: 1100 },
  { month: 'Fev', googleAds: 2700, facebook: 3050, linkedin: 4300, organic: 1150 },
  { month: 'Mar', googleAds: 2750, facebook: 3150, linkedin: 4400, organic: 1180 },
  { month: 'Abr', googleAds: 2800, facebook: 3200, linkedin: 4500, organic: 1200 },
  { month: 'Mai', googleAds: 2850, facebook: 3250, linkedin: 4450, organic: 1220 },
  { month: 'Jun', googleAds: 2800, facebook: 3200, linkedin: 4500, organic: 1200 }
];

const conversionFunnelData = [
  { stage: 'Visitantes', value: 10000, conversion: 100 },
  { stage: 'Leads', value: 1500, conversion: 15 },
  { stage: 'MQLs', value: 750, conversion: 7.5 },
  { stage: 'SQLs', value: 300, conversion: 3 },
  { stage: 'Clientes', value: 75, conversion: 0.75 }
];

export const CACAnalysisTab: React.FC<CACAnalysisTabProps> = ({ onOptimizeCAC, onRecommendationAction }) => {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return 'text-green-600';
    if (efficiency >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend === 'down') return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
    return <div className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Channel Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {channelData.map((channel, index) => (
          <Card 
            key={channel.channel} 
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedChannel === channel.channel ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedChannel(channel.channel)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {channel.channel}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {channel.volume}% do volume total
                  </p>
                </div>
                {getTrendIcon(channel.trend)}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">CAC</span>
                  <span className="font-bold text-lg">R$ {channel.cac.toLocaleString()}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Eficiência</span>
                    <span className={`font-medium ${getEfficiencyColor(channel.efficiency)}`}>
                      {channel.efficiency}%
                    </span>
                  </div>
                  <Progress value={channel.efficiency} className="h-2" />
                </div>

                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOptimizeCAC(channel.channel);
                  }}
                  size="sm"
                  className="w-full mt-3"
                  variant="outline"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Otimizar CAC
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CAC Trend Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Evolução CAC por Canal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cacTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value: any) => [`R$ ${value.toLocaleString()}`, '']}
                labelFormatter={(label) => `Mês: ${label}`}
              />
              <Line type="monotone" dataKey="googleAds" stroke="#3B82F6" strokeWidth={2} name="Google Ads" />
              <Line type="monotone" dataKey="facebook" stroke="#8B5CF6" strokeWidth={2} name="Facebook" />
              <Line type="monotone" dataKey="linkedin" stroke="#EC4899" strokeWidth={2} name="LinkedIn" />
              <Line type="monotone" dataKey="organic" stroke="#10B981" strokeWidth={2} name="Orgânico" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            Funil de Conversão
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conversionFunnelData.map((stage, index) => (
              <div key={stage.stage} className="flex items-center space-x-4">
                <div className="w-24 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {stage.stage}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {stage.value.toLocaleString()}
                    </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {stage.conversion}%
                    </span>
                  </div>
                  <Progress value={stage.conversion * 10} className="h-3" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Optimization Recommendations */}
      <Card className="border-l-4 border-l-yellow-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-yellow-600" />
            Recomendações de Otimização
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Facebook Ads com CAC crescente
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Considere revisar audiências e criativos. CAC subiu 6% no último mês.
                </p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => onRecommendationAction('Analisar detalhes sobre CAC do Facebook Ads', 5)}
                >
                  Ver Detalhes
                </Button>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Oportunidade: Escalar SEO Orgânico
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  CAC mais baixo e alta eficiência. Considere aumentar investimento em conteúdo.
                </p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => onRecommendationAction('Criar plano de ação para escalar SEO Orgânico', 15)}
                >
                  Criar Plano
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
