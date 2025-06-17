
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Laptop, Heart, Banknote, ShoppingCart, TrendingUp, Users, DollarSign, Target, Package, Shield } from 'lucide-react';

const categoryData = {
  technology: {
    icon: Laptop,
    color: 'blue',
    clients: 58,
    revenue: 289000,
    satisfaction: 9.0,
    growth: 12,
    data: [
      { month: 'Jan', clients: 42, revenue: 185000, satisfaction: 8.5 },
      { month: 'Fev', clients: 45, revenue: 198000, satisfaction: 8.7 },
      { month: 'Mar', clients: 48, revenue: 215000, satisfaction: 8.4 },
      { month: 'Abr', clients: 52, revenue: 234000, satisfaction: 8.9 },
      { month: 'Mai', clients: 55, revenue: 267000, satisfaction: 9.1 },
      { month: 'Jun', clients: 58, revenue: 289000, satisfaction: 9.0 }
    ]
  },
  health: {
    icon: Heart,
    color: 'green',
    clients: 30,
    revenue: 235000,
    satisfaction: 9.5,
    growth: 5.4,
    data: [
      { type: 'Hospitais', clients: 8, revenue: 95000 },
      { type: 'Clínicas', clients: 12, revenue: 67000 },
      { type: 'Laboratórios', clients: 6, revenue: 45000 },
      { type: 'Farmácias', clients: 4, revenue: 28000 }
    ]
  },
  financial: {
    icon: Banknote,
    color: 'purple',
    clients: 24,
    revenue: 168000,
    satisfaction: 9.7,
    growth: 7.7,
    data: [
      { month: 'Jan', revenue: 125000, clients: 18, risk: 2.1 },
      { month: 'Fev', revenue: 132000, clients: 19, risk: 1.8 },
      { month: 'Mar', revenue: 128000, clients: 20, risk: 2.3 },
      { month: 'Abr', revenue: 145000, clients: 22, risk: 1.5 },
      { month: 'Mai', revenue: 156000, clients: 23, risk: 1.2 },
      { month: 'Jun', revenue: 168000, clients: 24, risk: 0.9 }
    ]
  },
  ecommerce: {
    icon: ShoppingCart,
    color: 'orange',
    clients: 18,
    revenue: 3580000,
    satisfaction: 8.7,
    growth: 18,
    data: [
      { month: 'Jan', gmv: 2450000, clients: 14, conversion: 3.2 },
      { month: 'Fev', gmv: 2680000, clients: 15, conversion: 3.5 },
      { month: 'Mar', gmv: 2890000, clients: 16, conversion: 3.8 },
      { month: 'Abr', gmv: 3120000, clients: 17, conversion: 4.1 },
      { month: 'Mai', gmv: 3350000, clients: 18, conversion: 4.4 },
      { month: 'Jun', gmv: 3580000, clients: 18, conversion: 4.7 }
    ]
  }
};

export const CategoryStrategies = () => {
  const [activeCategory, setActiveCategory] = useState('technology');

  const renderCategoryMetrics = (category: keyof typeof categoryData) => {
    const data = categoryData[category];
    const IconComponent = data.icon;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total de Clientes</p>
                <p className={`text-3xl font-bold text-${data.color}-600`}>{data.clients}</p>
              </div>
              <Users className={`w-8 h-8 text-${data.color}-600`} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Receita Mensal</p>
                <p className="text-3xl font-bold text-green-600">
                  R$ {category === 'ecommerce' ? `${(data.revenue / 1000000).toFixed(1)}M` : `${data.revenue / 1000}K`}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Satisfação</p>
                <p className="text-3xl font-bold text-purple-600">{data.satisfaction}</p>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Crescimento</p>
                <p className="text-3xl font-bold text-orange-600">+{data.growth}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderCategoryChart = (category: keyof typeof categoryData) => {
    const data = categoryData[category];
    
    if (category === 'technology') {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Evolução do Segmento Tecnologia</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.data}>
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
      );
    }

    if (category === 'health') {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Tipo de Instituição</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="clients" fill="#10B981" name="Clientes" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>Evolução do Segmento</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey={category === 'ecommerce' ? 'gmv' : 'revenue'} stroke="#F97316" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="technology" className="flex items-center space-x-2">
            <Laptop className="w-4 h-4" />
            <span>Tecnologia</span>
          </TabsTrigger>
          <TabsTrigger value="health" className="flex items-center space-x-2">
            <Heart className="w-4 h-4" />
            <span>Saúde</span>
          </TabsTrigger>
          <TabsTrigger value="financial" className="flex items-center space-x-2">
            <Banknote className="w-4 h-4" />
            <span>Financeiro</span>
          </TabsTrigger>
          <TabsTrigger value="ecommerce" className="flex items-center space-x-2">
            <ShoppingCart className="w-4 h-4" />
            <span>E-commerce</span>
          </TabsTrigger>
        </TabsList>

        {Object.keys(categoryData).map((category) => (
          <TabsContent key={category} value={category} className="space-y-6">
            {renderCategoryMetrics(category as keyof typeof categoryData)}
            {renderCategoryChart(category as keyof typeof categoryData)}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
