import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { AIInsightsDashboard } from './AIInsightsDashboard';
import { 
  TrendingUp, 
  Users, 
  Building2, 
  DollarSign, 
  Handshake,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  Activity,
  Cpu,
  HardDrive,
  Wifi,
  Database,
  Server,
  Brain,
  BarChart3
} from 'lucide-react';

export const SuperAdminDashboard = () => {
  const stats = [
    {
      title: "Contas Ativas",
      value: "1,247",
      change: "+12.5%",
      trend: "up",
      icon: Building2,
      color: "text-blue-600",
      description: "vs mês anterior"
    },
    {
      title: "MRR Total",
      value: "R$ 624.350",
      change: "+8.2%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      description: "Receita Mensal Recorrente"
    },
    {
      title: "Usuários Ativos",
      value: "8.943",
      change: "+15.7%",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
      description: "Últimas 24h"
    },
    {
      title: "Taxa de Churn",
      value: "2.8%",
      change: "-0.5%",
      trend: "down",
      icon: TrendingUp,
      color: "text-orange-600",
      description: "vs mês anterior"
    }
  ];

  const systemMetrics = [
    { name: "CPU Usage", value: "24%", status: "normal", icon: Cpu },
    { name: "RAM Usage", value: "67%", status: "normal", icon: HardDrive },
    { name: "Disk Space", value: "43%", status: "normal", icon: Database },
    { name: "Network", value: "156 MB/s", status: "normal", icon: Wifi },
    { name: "Database", value: "12ms", status: "normal", icon: Server },
    { name: "API Response", value: "245ms", status: "warning", icon: Activity }
  ];

  const recentActivity = [
    {
      type: "new_account",
      message: "Nova conta Enterprise: TechFlow Solutions",
      time: "2 min atrás",
      status: "success",
      value: "+R$ 4.997/mês"
    },
    {
      type: "upgrade",
      message: "DataInova fez upgrade para Growth",
      time: "8 min atrás",
      status: "success",
      value: "+R$ 1.248/mês"
    },
    {
      type: "payment_failed",
      message: "Falha no pagamento: CloudSoft",
      time: "15 min atrás",
      status: "error",
      value: "-R$ 897/mês"
    },
    {
      type: "partner_signup",
      message: "Nova solicitação de parceria: CS Agency Pro",
      time: "32 min atrás",
      status: "warning",
      value: "Pendente análise"
    },
    {
      type: "system_alert",
      message: "Alta latência detectada no servidor US-East",
      time: "1h atrás",
      status: "error",
      value: "Resolvido"
    }
  ];

  const planDistribution = [
    { plan: "Starter", count: 543, percentage: 43.5, color: "bg-gray-400", mrr: "R$ 108.6K" },
    { plan: "Professional", count: 398, percentage: 31.9, color: "bg-blue-500", mrr: "R$ 198.6K" },
    { plan: "Growth", count: 246, percentage: 19.7, color: "bg-purple-500", mrr: "R$ 245.8K" },
    { plan: "Enterprise", count: 60, percentage: 4.8, color: "bg-green-500", mrr: "R$ 71.9K" }
  ];

  const getMetricStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getActivityStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Visão Geral</span>
          </TabsTrigger>
          <TabsTrigger value="ai-insights" className="flex items-center space-x-2">
            <Brain className="w-4 h-4" />
            <span>Insights IA</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Real-time Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    {stat.trend === "up" ? (
                      <ArrowUp className="w-3 h-3 text-green-500 mr-1" />
                    ) : (
                      <ArrowDown className="w-3 h-3 text-green-500 mr-1" />
                    )}
                    <span className={stat.trend === "up" ? "text-green-600" : "text-green-600"}>
                      {stat.change}
                    </span>
                    <span className="ml-1">{stat.description}</span>
                  </div>
                </CardContent>
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${stat.color.replace('text-', 'bg-')}`}></div>
              </Card>
            ))}
          </div>

          {/* System Health Monitoring */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-blue-500" />
                <span>Sistema em Tempo Real</span>
                <Badge variant="outline" className="ml-auto">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                  Online
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {systemMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <metric.icon className={`w-5 h-5 ${getMetricStatusColor(metric.status)}`} />
                      <div>
                        <div className="text-sm font-medium">{metric.name}</div>
                        <div className={`text-lg font-bold ${getMetricStatusColor(metric.status)}`}>
                          {metric.value}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-800">Sistema Estável</span>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    99.98% Uptime
                  </Badge>
                </div>
                <div className="text-sm text-green-600 mt-1">
                  Todos os serviços operando normalmente
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Plan Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="w-5 h-5" />
                <span>Distribuição de Planos</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-4">
                  {planDistribution.map((plan, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${plan.color}`}></div>
                          <span className="font-medium">{plan.plan}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{plan.count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${plan.color}`}
                          style={{ width: `${plan.percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{plan.percentage}%</span>
                        <span className="font-medium text-green-600">{plan.mrr}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Recent Activity Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Atividade em Tempo Real</span>
                <Badge variant="outline" className="ml-auto">
                  Ao vivo
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-80">
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-shrink-0 mt-1">
                        <div className={`w-3 h-3 rounded-full ${getActivityStatusColor(activity.status)}`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                          <span className={`text-xs font-medium ${
                            activity.status === 'success' ? 'text-green-600' :
                            activity.status === 'warning' ? 'text-yellow-600' :
                            activity.status === 'error' ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {activity.value}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                  <Users className="w-6 h-6" />
                  <span className="text-sm">Nova Conta</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                  <DollarSign className="w-6 h-6" />
                  <span className="text-sm">Faturamento</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                  <Activity className="w-6 h-6" />
                  <span className="text-sm">Monitoramento</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                  <AlertTriangle className="w-6 h-6" />
                  <span className="text-sm">Alertas</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-insights">
          <AIInsightsDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};
