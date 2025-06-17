
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';
import { Laptop, ArrowLeft, TrendingUp, Users, DollarSign, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const technologyClientsData = [
  { month: 'Jan', clients: 42, revenue: 185000, satisfaction: 8.5 },
  { month: 'Fev', clients: 45, revenue: 198000, satisfaction: 8.7 },
  { month: 'Mar', clients: 48, revenue: 215000, satisfaction: 8.4 },
  { month: 'Abr', clients: 52, revenue: 234000, satisfaction: 8.9 },
  { month: 'Mai', clients: 55, revenue: 267000, satisfaction: 9.1 },
  { month: 'Jun', clients: 58, revenue: 289000, satisfaction: 9.0 }
];

const topTechClients = [
  { name: 'TechCorp Solutions', revenue: 45000, employees: 250, plan: 'Enterprise' },
  { name: 'InnovateTech', revenue: 38000, employees: 180, plan: 'Professional' },
  { name: 'DataFlow Systems', revenue: 32000, employees: 120, plan: 'Growth' },
  { name: 'CloudSync', revenue: 28000, employees: 95, plan: 'Professional' },
  { name: 'DevBoost', revenue: 25000, employees: 75, plan: 'Growth' }
];

const CategoryTechnology = () => {
  const navigate = useNavigate();

  return (
    <AppLayout
      title="Categoria: Tecnologia"
      description="Análise detalhada dos clientes do segmento de tecnologia"
      icon={<Laptop className="w-6 h-6 text-white" />}
      gradientColors="bg-gradient-to-r from-blue-600 to-indigo-600"
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
        </div>

        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total de Clientes</p>
                  <p className="text-3xl font-bold text-blue-600">58</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-sm text-blue-600 mt-2">45% do portfólio</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Receita Mensal</p>
                  <p className="text-3xl font-bold text-green-600">R$ 289K</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-sm text-green-600 mt-2">+8.2% vs mês anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Satisfação Média</p>
                  <p className="text-3xl font-bold text-purple-600">9.0</p>
                </div>
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-sm text-purple-600 mt-2">Acima da meta</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Crescimento</p>
                  <p className="text-3xl font-bold text-orange-600">+12%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
              <p className="text-sm text-orange-600 mt-2">Últimos 6 meses</p>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico de Evolução */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução do Segmento Tecnologia</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={technologyClientsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="clients" stroke="#3B82F6" strokeWidth={3} name="Clientes" />
                <Line type="monotone" dataKey="satisfaction" stroke="#8B5CF6" strokeWidth={2} name="Satisfação" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Clientes */}
        <Card>
          <CardHeader>
            <CardTitle>Principais Clientes - Tecnologia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topTechClients.map((client, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{client.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{client.employees} funcionários</p>
                  </div>
                  <div className="text-center mx-4">
                    <Badge variant="outline">{client.plan}</Badge>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">R$ {client.revenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">mensais</p>
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

export default CategoryTechnology;
