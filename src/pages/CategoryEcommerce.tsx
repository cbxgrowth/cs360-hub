
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';
import { ShoppingCart, ArrowLeft, TrendingUp, Users, DollarSign, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ecommerceGrowthData = [
  { month: 'Jan', gmv: 2450000, clients: 14, conversion: 3.2 },
  { month: 'Fev', gmv: 2680000, clients: 15, conversion: 3.5 },
  { month: 'Mar', gmv: 2890000, clients: 16, conversion: 3.8 },
  { month: 'Abr', gmv: 3120000, clients: 17, conversion: 4.1 },
  { month: 'Mai', gmv: 3350000, clients: 18, conversion: 4.4 },
  { month: 'Jun', gmv: 3580000, clients: 18, conversion: 4.7 }
];

const topEcommerceClients = [
  { name: 'MegaStore Online', gmv: 850000, category: 'Moda', growth: '+15%' },
  { name: 'TechMarket', gmv: 720000, category: 'Eletrônicos', growth: '+22%' },
  { name: 'HomeDecor Shop', gmv: 680000, category: 'Casa', growth: '+18%' },
  { name: 'SportZone', gmv: 620000, category: 'Esportes', growth: '+12%' },
  { name: 'BeautyPlus', gmv: 580000, category: 'Beleza', growth: '+25%' }
];

const CategoryEcommerce = () => {
  const navigate = useNavigate();

  return (
    <AppLayout
      title="Categoria: E-commerce"
      description="Análise detalhada dos clientes do segmento de e-commerce"
      icon={<ShoppingCart className="w-6 h-6 text-white" />}
      gradientColors="bg-gradient-to-r from-orange-600 to-red-600"
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
                  <p className="text-3xl font-bold text-orange-600">18</p>
                </div>
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <p className="text-sm text-orange-600 mt-2">14% do portfólio</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">GMV Total</p>
                  <p className="text-3xl font-bold text-red-600">R$ 3.58M</p>
                </div>
                <DollarSign className="w-8 h-8 text-red-600" />
              </div>
              <p className="text-sm text-red-600 mt-2">+46% vs ano anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Conversão Média</p>
                  <p className="text-3xl font-bold text-green-600">4.7%</p>
                </div>
                <Package className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-sm text-green-600 mt-2">+1.5% vs mês anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Crescimento</p>
                  <p className="text-3xl font-bold text-purple-600">+18%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-sm text-purple-600 mt-2">Média mensal</p>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico de Crescimento */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução do E-commerce</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={ecommerceGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="gmv" stroke="#F97316" strokeWidth={3} name="GMV (R$)" />
                <Line type="monotone" dataKey="conversion" stroke="#10B981" strokeWidth={2} name="Conversão %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top E-commerces */}
        <Card>
          <CardHeader>
            <CardTitle>Principais E-commerces</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topEcommerceClients.map((client, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{client.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{client.category}</p>
                  </div>
                  <div className="text-center mx-4">
                    <Badge 
                      variant="outline" 
                      className={client.growth.includes('+2') ? 'border-green-500 text-green-700' : 'border-blue-500 text-blue-700'}
                    >
                      {client.growth}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-orange-600">R$ {client.gmv.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">GMV mensal</p>
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

export default CategoryEcommerce;
