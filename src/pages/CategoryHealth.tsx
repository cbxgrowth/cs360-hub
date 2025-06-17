
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { Heart, ArrowLeft, TrendingUp, Users, DollarSign, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const healthSegmentData = [
  { type: 'Hospitais', clients: 8, revenue: 95000 },
  { type: 'Clínicas', clients: 12, revenue: 67000 },
  { type: 'Laboratórios', clients: 6, revenue: 45000 },
  { type: 'Farmácias', clients: 4, revenue: 28000 }
];

const complianceData = [
  { name: 'LGPD Compliant', value: 92, color: '#10B981' },
  { name: 'ANVISA Approved', value: 88, color: '#3B82F6' },
  { name: 'ISO 27001', value: 95, color: '#8B5CF6' }
];

const CategoryHealth = () => {
  const navigate = useNavigate();

  return (
    <AppLayout
      title="Categoria: Saúde"
      description="Análise detalhada dos clientes do segmento de saúde"
      icon={<Heart className="w-6 h-6 text-white" />}
      gradientColors="bg-gradient-to-r from-green-600 to-emerald-600"
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
                  <p className="text-3xl font-bold text-green-600">30</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-sm text-green-600 mt-2">23% do portfólio</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Receita Mensal</p>
                  <p className="text-3xl font-bold text-emerald-600">R$ 235K</p>
                </div>
                <DollarSign className="w-8 h-8 text-emerald-600" />
              </div>
              <p className="text-sm text-emerald-600 mt-2">+5.4% vs mês anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Compliance</p>
                  <p className="text-3xl font-bold text-blue-600">95%</p>
                </div>
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-sm text-blue-600 mt-2">Certificações ativas</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Retenção</p>
                  <p className="text-3xl font-bold text-purple-600">97%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-sm text-purple-600 mt-2">Alta fidelidade</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Distribuição por Tipo */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Tipo de Instituição</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={healthSegmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="clients" fill="#10B981" name="Clientes" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Compliance Status */}
          <Card>
            <CardHeader>
              <CardTitle>Status de Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ width: `${item.value}%`, backgroundColor: item.color }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold" style={{ color: item.color }}>
                        {item.value}%
                      </span>
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

export default CategoryHealth;
