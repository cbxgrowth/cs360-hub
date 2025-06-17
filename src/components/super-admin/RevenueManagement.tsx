
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  Users,
  Calendar,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

export const RevenueManagement = () => {
  const revenueStats = [
    {
      title: "MRR Total",
      value: "R$ 624.350",
      change: "+8.2%",
      trend: "up",
      icon: DollarSign
    },
    {
      title: "ARR Projetado",
      value: "R$ 7.492.200",
      change: "+12.5%",
      trend: "up",
      icon: TrendingUp
    },
    {
      title: "Churn Rate",
      value: "3.2%",
      change: "-0.8%",
      trend: "down",
      icon: Users
    },
    {
      title: "ARPU",
      value: "R$ 501",
      change: "+5.1%",
      trend: "up",
      icon: CreditCard
    }
  ];

  const revenueByPlan = [
    { plan: "Enterprise", revenue: "R$ 234.560", accounts: 60, growth: "+15.2%" },
    { plan: "Growth", revenue: "R$ 198.420", accounts: 246, growth: "+8.7%" },
    { plan: "Professional", revenue: "R$ 156.890", accounts: 398, growth: "+12.1%" },
    { plan: "Starter", revenue: "R$ 34.480", accounts: 543, growth: "+3.4%" }
  ];

  const monthlyTrend = [
    { month: "Jan", revenue: 542300, growth: 8.2 },
    { month: "Fev", revenue: 567800, growth: 4.7 },
    { month: "Mar", revenue: 589200, growth: 3.8 },
    { month: "Abr", revenue: 612450, growth: 3.9 },
    { month: "Mai", revenue: 624350, growth: 1.9 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestão de Receita</h2>
          <p className="text-muted-foreground">Análise financeira detalhada e projeções</p>
        </div>
        <Badge className="bg-green-100 text-green-800">
          <TrendingUp className="w-3 h-3 mr-1" />
          Crescimento Saudável
        </Badge>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {revenueStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center text-xs">
                    {stat.trend === "up" ? (
                      <ArrowUp className="w-3 h-3 text-green-500 mr-1" />
                    ) : (
                      <ArrowDown className="w-3 h-3 text-green-500 mr-1" />
                    )}
                    <span className="text-green-600">{stat.change}</span>
                    <span className="text-muted-foreground ml-1">vs mês anterior</span>
                  </div>
                </div>
                <stat.icon className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Plan */}
        <Card>
          <CardHeader>
            <CardTitle>Receita por Plano</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueByPlan.map((plan, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">{plan.plan}</div>
                    <div className="text-sm text-muted-foreground">{plan.accounts} contas</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{plan.revenue}</div>
                    <div className="text-sm text-green-600">{plan.growth}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Tendência Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyTrend.map((month, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{month.month}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">R$ {(month.revenue / 1000).toFixed(0)}K</div>
                    <div className="text-sm text-green-600">+{month.growth}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Análise Detalhada</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Receita Recorrente</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">R$ 598.7K</div>
              <div className="text-sm text-muted-foreground">95.9% do total</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="font-medium">Crescimento Net</span>
              </div>
              <div className="text-2xl font-bold text-green-600">+R$ 47.2K</div>
              <div className="text-sm text-muted-foreground">Este mês</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CreditCard className="w-5 h-5 text-purple-600" />
                <span className="font-medium">Pagamentos</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">99.2%</div>
              <div className="text-sm text-muted-foreground">Taxa sucesso</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
