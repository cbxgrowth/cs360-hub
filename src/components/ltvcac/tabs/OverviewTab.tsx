
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, BarChart, Bar } from 'recharts';
import { TrendingUp, DollarSign, Users, Calendar, Settings, Target } from 'lucide-react';

interface OverviewTabProps {
  currentLTV: number;
  currentCAC: number;
  ltvCacRatio: number;
  ltvChange: number;
  cacChange: number;
  onConfigureParameters: () => void;
}

const overviewData = [
  { month: 'Jan', ltv: 142000, cac: 2800, ratio: 50.7, customers: 145 },
  { month: 'Fev', ltv: 145000, cac: 2750, ratio: 52.7, customers: 158 },
  { month: 'Mar', ltv: 148000, cac: 2650, ratio: 55.8, customers: 172 },
  { month: 'Abr', ltv: 151000, cac: 2600, ratio: 58.1, customers: 189 },
  { month: 'Mai', ltv: 149000, cac: 2550, ratio: 58.4, customers: 203 },
  { month: 'Jun', ltv: 152000, cac: 2450, ratio: 62.0, customers: 218 }
];

const segmentData = [
  { segment: 'Enterprise', ltv: 280000, cac: 5200, customers: 45 },
  { segment: 'Professional', ltv: 150000, cac: 2800, customers: 123 },
  { segment: 'Starter', ltv: 85000, cac: 1200, customers: 89 }
];

export const OverviewTab: React.FC<OverviewTabProps> = ({
  currentLTV,
  currentCAC,
  ltvCacRatio,
  ltvChange,
  cacChange,
  onConfigureParameters
}) => {
  return (
    <div className="space-y-6">
      {/* Key Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">LTV Médio</p>
                <p className="text-3xl font-bold text-green-700">
                  R$ {(currentLTV / 1000).toFixed(0)}k
                </p>
                <p className="text-xs text-green-600 mt-1">
                  {ltvChange >= 0 ? '+' : ''}{ltvChange.toFixed(1)}% vs anterior
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-orange-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">CAC Médio</p>
                <p className="text-3xl font-bold text-red-700">
                  R$ {(currentCAC / 1000).toFixed(1)}k
                </p>
                <p className="text-xs text-red-600 mt-1">
                  {cacChange >= 0 ? '+' : ''}{cacChange.toFixed(1)}% vs anterior
                </p>
              </div>
              <Target className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-indigo-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Ratio LTV:CAC</p>
                <p className="text-3xl font-bold text-purple-700">
                  {ltvCacRatio.toFixed(1)}:1
                </p>
                <p className="text-xs text-purple-600 mt-1">
                  {ltvCacRatio >= 3 ? 'Saudável' : 'Crítico'}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Payback</p>
                <p className="text-3xl font-bold text-blue-700">18 meses</p>
                <p className="text-xs text-blue-600 mt-1">Tempo médio</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* LTV/CAC Evolution Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Evolução LTV vs CAC
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onConfigureParameters}
          >
            <Settings className="w-4 h-4 mr-2" />
            Configurar Parâmetros
          </Button>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={overviewData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                formatter={(value: any, name: string) => {
                  if (name === 'ltv') return [`R$ ${(value/1000).toFixed(0)}k`, 'LTV'];
                  if (name === 'cac') return [`R$ ${(value/1000).toFixed(1)}k`, 'CAC'];
                  return [value, name];
                }}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="ltv"
                fill="#10B981"
                fillOpacity={0.1}
                stroke="#10B981"
                strokeWidth={3}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="cac"
                stroke="#EF4444"
                strokeWidth={3}
                dot={{ fill: '#EF4444', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Segment Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            Performance por Segmento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={segmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="segment" />
              <YAxis />
              <Tooltip 
                formatter={(value: any, name: string) => {
                  if (name === 'ltv' || name === 'cac') {
                    return [`R$ ${(value/1000).toFixed(0)}k`, name === 'ltv' ? 'LTV' : 'CAC'];
                  }
                  return [value, name === 'customers' ? 'Clientes' : name];
                }}
              />
              <Bar dataKey="ltv" fill="#10B981" name="LTV" />
              <Bar dataKey="cac" fill="#EF4444" name="CAC" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button className="h-16 flex-col" variant="outline">
          <TrendingUp className="w-6 h-6 mb-2" />
          Projetar Cenários
        </Button>
        <Button className="h-16 flex-col" variant="outline">
          <Target className="w-6 h-6 mb-2" />
          Otimizar CAC
        </Button>
        <Button className="h-16 flex-col" variant="outline">
          <DollarSign className="w-6 h-6 mb-2" />
          Aumentar LTV
        </Button>
      </div>
    </div>
  );
};
