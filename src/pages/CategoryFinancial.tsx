
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts';
import { Banknote, ArrowLeft, TrendingUp, Users, DollarSign, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const financialTrendData = [
  { month: 'Jan', revenue: 125000, clients: 18, risk: 2.1 },
  { month: 'Fev', revenue: 132000, clients: 19, risk: 1.8 },
  { month: 'Mar', revenue: 128000, clients: 20, risk: 2.3 },
  { month: 'Abr', revenue: 145000, clients: 22, risk: 1.5 },
  { month: 'Mai', revenue: 156000, clients: 23, risk: 1.2 },
  { month: 'Jun', revenue: 168000, clients: 24, risk: 0.9 }
];

const financialServices = [
  { service: 'Bancos', clients: 8, compliance: 98 },
  { service: 'Fintechs', clients: 10, compliance: 95 },
  { service: 'Seguradoras', clients: 4, compliance: 99 },
  { service: 'Corretoras', clients: 2, compliance: 96 }
];

const CategoryFinancial = () => {
  const navigate = useNavigate();

  return (
    <AppLayout
      title="Categoria: Financeiro"
      description="Análise detalhada dos clientes do segmento financeiro"
      icon={<Banknote className="w-6 h-6 text-white" />}
      gradientColors="bg-gradient-to-r from-purple-600 to-indigo-600"
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
                  <p className="text-3xl font-bold text-purple-600">24</p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-sm text-purple-600 mt-2">18% do portfólio</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Receita Mensal</p>
                  <p className="text-3xl font-bold text-indigo-600">R$ 168K</p>
                </div>
                <DollarSign className="w-8 h-8 text-indigo-600" />
              </div>
              <p className="text-sm text-indigo-600 mt-2">+7.7% vs mês anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Compliance</p>
                  <p className="text-3xl font-bold text-green-600">97%</p>
                </div>
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-sm text-green-600 mt-2">Regulamentações</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Risco Médio</p>
                  <p className="text-3xl font-bold text-red-600">0.9%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-red-600" />
              </div>
              <p className="text-sm text-green-600 mt-2">Baixo risco</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Evolução Financeira */}
          <Card>
            <CardHeader>
              <CardTitle>Evolução do Segmento Financeiro</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={financialTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} name="Receita" />
                  <Line type="monotone" dataKey="clients" stroke="#3B82F6" strokeWidth={2} name="Clientes" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Serviços Financeiros */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Serviços</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {financialServices.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{service.service}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{service.clients} clientes</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={service.compliance >= 98 ? "default" : "secondary"}>
                        {service.compliance}% Compliance
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default CategoryFinancial;
