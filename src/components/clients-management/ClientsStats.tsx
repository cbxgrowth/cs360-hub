
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign,
  Target,
  Activity,
  Clock,
  Award
} from 'lucide-react';
import { Badge } from '../ui/badge';
import type { Client } from '@/hooks/useClients';

interface ClientsStatsProps {
  clients: Client[];
}

export const ClientsStats: React.FC<ClientsStatsProps> = ({ clients }) => {
  const stats = {
    total: clients.length,
    active: clients.filter(c => c.status === 'Ativo').length,
    atRisk: clients.filter(c => c.status === 'Risco').length,
    inactive: clients.filter(c => c.status === 'Inativo').length,
    totalMRR: clients.reduce((acc, c) => acc + (c.mrr || 0), 0),
    totalLTV: clients.reduce((acc, c) => acc + (c.ltv || 0), 0),
    avgHealthScore: clients.length > 0 
      ? Math.round(clients.reduce((acc, c) => acc + (c.health_score || 0), 0) / clients.length) 
      : 0,
    avgNPS: clients.length > 0 
      ? Math.round(clients.reduce((acc, c) => acc + (c.nps_score || 0), 0) / clients.length) 
      : 0,
    tierA: clients.filter(c => c.tier === 'A').length,
    tierB: clients.filter(c => c.tier === 'B').length,
    tierC: clients.filter(c => c.tier === 'C').length,
    churnRate: clients.length > 0 
      ? ((clients.filter(c => c.status === 'Inativo').length / clients.length) * 100).toFixed(1)
      : '0',
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getNPSColor = (score: number) => {
    if (score >= 9) return 'text-green-600';
    if (score >= 7) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Clients */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-2">
            <Badge variant="outline" className="text-green-600">A: {stats.tierA}</Badge>
            <Badge variant="outline" className="text-blue-600">B: {stats.tierB}</Badge>
            <Badge variant="outline" className="text-orange-600">C: {stats.tierC}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Status Distribution */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Status dos Clientes</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-600">Ativos</span>
              <Badge className="bg-green-100 text-green-800">{stats.active}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-yellow-600">Em Risco</span>
              <Badge className="bg-yellow-100 text-yellow-800">{stats.atRisk}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-red-600">Inativos</span>
              <Badge className="bg-red-100 text-red-800">{stats.inactive}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Metrics */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Métricas Financeiras</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <span className="text-xs text-muted-foreground">MRR Total</span>
              <div className="text-lg font-bold">R$ {stats.totalMRR.toLocaleString()}</div>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">LTV Total</span>
              <div className="text-sm font-medium">R$ {stats.totalLTV.toLocaleString()}</div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Taxa de Churn</span>
              <Badge variant="outline" className="text-red-600">{stats.churnRate}%</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Métricas de Performance</CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Health Score Médio</span>
              <Badge className={getHealthScoreColor(stats.avgHealthScore)}>
                {stats.avgHealthScore}%
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">NPS Médio</span>
              <Badge className={getNPSColor(stats.avgNPS)}>
                {stats.avgNPS}/10
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Clientes Premium</span>
              <Badge className="bg-purple-100 text-purple-800">{stats.tierA}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
