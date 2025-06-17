
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target,
  Award,
  Calendar
} from 'lucide-react';

interface PartnerMetricsProps {
  partnerId: string;
  metrics: {
    totalLeads: number;
    conversions: number;
    conversionRate: number;
    monthlyCommission: number;
    annualCommission: number;
    npsScore: number;
    activeClients: number;
    certificationLevel: number;
    performanceScore: number;
    nextMilestone: {
      target: number;
      current: number;
      reward: string;
    };
  };
}

export const PartnerMetrics: React.FC<PartnerMetricsProps> = ({ partnerId, metrics }) => {
  const milestoneProgress = (metrics.nextMilestone.current / metrics.nextMilestone.target) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-sm font-medium">
            Performance Geral
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{metrics.performanceScore}/100</div>
          <Progress value={metrics.performanceScore} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-2">
            Score baseado em conversões, NPS e certificações
          </p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-sm font-medium">
            Comissões
            <DollarSign className="w-4 h-4 text-green-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            R$ {metrics.monthlyCommission.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Este mês</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm">Anual:</span>
            <span className="font-semibold">R$ {metrics.annualCommission.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-purple-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-sm font-medium">
            Conversões
            <Target className="w-4 h-4 text-purple-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">{metrics.conversionRate}%</div>
          <p className="text-xs text-muted-foreground">
            {metrics.conversions} de {metrics.totalLeads} leads
          </p>
          <div className="mt-2">
            <Progress value={metrics.conversionRate} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-orange-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-sm font-medium">
            Clientes Ativos
            <Users className="w-4 h-4 text-orange-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">{metrics.activeClients}</div>
          <p className="text-xs text-muted-foreground">Clientes gerenciados</p>
          <Badge variant="outline" className="mt-2">
            NPS: {metrics.npsScore}
          </Badge>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-amber-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-sm font-medium">
            Certificações
            <Award className="w-4 h-4 text-amber-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-600">{metrics.certificationLevel}/5</div>
          <p className="text-xs text-muted-foreground">Certificações conquistadas</p>
          <Progress value={(metrics.certificationLevel / 5) * 100} className="mt-2" />
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-indigo-500">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-sm font-medium">
            Próxima Meta
            <Calendar className="w-4 h-4 text-indigo-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground mb-2">
            {metrics.nextMilestone.current} / {metrics.nextMilestone.target}
          </div>
          <Progress value={milestoneProgress} className="mb-2" />
          <Badge variant="secondary" className="text-xs">
            Recompensa: {metrics.nextMilestone.reward}
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
};
