
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Users, TrendingUp, DollarSign, Award } from 'lucide-react';

export const PartnerStats = () => {
  const stats = [
    {
      title: "Total de Parceiros",
      value: "247",
      change: "+12%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "MRR por Parceiros",
      value: "R$ 125.340",
      change: "+23%",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Leads Gerados",
      value: "1.847",
      change: "+8%",
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "NPS Médio",
      value: "8.7",
      change: "+0.3",
      icon: Award,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{stat.change}</span> vs mês anterior
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
