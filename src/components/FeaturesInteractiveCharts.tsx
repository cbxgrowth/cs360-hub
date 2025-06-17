
import React, { useState } from 'react';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, AlertTriangle, Target, Activity } from 'lucide-react';

const FeaturesInteractiveCharts = () => {
  const [hoveredChart, setHoveredChart] = useState<string | null>(null);

  // Dados para Matriz de Risco Inteligente
  const riskMatrixData = [
    { name: 'Cliente A', ltv: 15000, churnRisk: 25, size: 120, status: 'baixo', revenue: 'R$ 15k' },
    { name: 'Cliente B', ltv: 45000, churnRisk: 15, size: 180, status: 'baixo', revenue: 'R$ 45k' },
    { name: 'Cliente C', ltv: 28000, churnRisk: 45, size: 140, status: 'medio', revenue: 'R$ 28k' },
    { name: 'Cliente D', ltv: 65000, churnRisk: 70, size: 220, status: 'alto', revenue: 'R$ 65k' },
    { name: 'Cliente E', ltv: 12000, churnRisk: 80, size: 100, status: 'critico', revenue: 'R$ 12k' },
    { name: 'Cliente F', ltv: 38000, churnRisk: 30, size: 160, status: 'medio', revenue: 'R$ 38k' },
    { name: 'Cliente G', ltv: 52000, churnRisk: 20, size: 190, status: 'baixo', revenue: 'R$ 52k' },
    { name: 'Cliente H', ltv: 22000, churnRisk: 60, size: 130, status: 'alto', revenue: 'R$ 22k' }
  ];

  // Dados para Evolução do NPS
  const npsData = [
    { mes: 'Jan', nps: 42, previsao: 40, satisfacao: 68 },
    { mes: 'Fev', nps: 38, previsao: 42, satisfacao: 65 },
    { mes: 'Mar', nps: 45, previsao: 44, satisfacao: 72 },
    { mes: 'Abr', nps: 52, previsao: 48, satisfacao: 75 },
    { mes: 'Mai', nps: 48, previsao: 52, satisfacao: 73 },
    { mes: 'Jun', nps: 55, previsao: 54, satisfacao: 78 },
    { mes: 'Jul', nps: 62, previsao: 58, satisfacao: 82 },
    { mes: 'Ago', nps: 59, previsao: 62, satisfacao: 80 }
  ];

  // Dados para Health Score 360°
  const healthScoreData = [
    { dimensao: 'Engajamento', score: 85, fullMark: 100 },
    { dimensao: 'Adoção', score: 72, fullMark: 100 },
    { dimensao: 'Suporte', score: 90, fullMark: 100 },
    { dimensao: 'Satisfação', score: 78, fullMark: 100 },
    { dimensao: 'Crescimento', score: 65, fullMark: 100 },
    { dimensao: 'Retenção', score: 88, fullMark: 100 }
  ];

  const getRiskColor = (status: string) => {
    switch (status) {
      case 'baixo': return '#10B981';
      case 'medio': return '#F59E0B';
      case 'alto': return '#EF4444';
      case 'critico': return '#DC2626';
      default: return '#6B7280';
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{payload[0]?.payload?.name || label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.dataKey}: ${entry.value}${entry.dataKey === 'churnRisk' ? '%' : ''}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Matriz de Risco Inteligente */}
      <Card 
        className={`transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer ${
          hoveredChart === 'risk' ? 'ring-2 ring-blue-500' : ''
        }`}
        onMouseEnter={() => setHoveredChart('risk')}
        onMouseLeave={() => setHoveredChart(null)}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Matriz de Risco Inteligente</CardTitle>
                <p className="text-sm text-gray-600">LTV vs Risco de Churn</p>
              </div>
            </div>
            <Badge className="bg-red-100 text-red-800 animate-pulse">
              <Activity className="w-3 h-3 mr-1" />
              Live
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <ScatterChart data={riskMatrixData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="ltv" 
                domain={['dataMin', 'dataMax']}
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => `${value/1000}k`}
              />
              <YAxis 
                dataKey="churnRisk"
                domain={[0, 100]}
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Scatter dataKey="churnRisk">
                {riskMatrixData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={getRiskColor(entry.status)}
                    className={hoveredChart === 'risk' ? 'animate-pulse' : ''}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
              Baixo Risco
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
              Alto Risco
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Evolução do NPS com IA */}
      <Card 
        className={`transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer ${
          hoveredChart === 'nps' ? 'ring-2 ring-purple-500' : ''
        }`}
        onMouseEnter={() => setHoveredChart('nps')}
        onMouseLeave={() => setHoveredChart(null)}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Evolução do NPS com IA</CardTitle>
                <p className="text-sm text-gray-600">Predição Inteligente</p>
              </div>
            </div>
            <Badge className="bg-purple-100 text-purple-800 animate-pulse">
              <Activity className="w-3 h-3 mr-1" />
              Live
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={npsData}>
              <defs>
                <linearGradient id="npsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="previsaoGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EC4899" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#EC4899" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="previsao" 
                stroke="#EC4899" 
                fill="url(#previsaoGradient)"
                strokeDasharray="5 5"
                className={hoveredChart === 'nps' ? 'animate-pulse' : ''}
              />
              <Area 
                type="monotone" 
                dataKey="nps" 
                stroke="#8B5CF6" 
                fill="url(#npsGradient)"
                strokeWidth={2}
                className={hoveredChart === 'nps' ? 'animate-pulse' : ''}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-1"></div>
              NPS Real
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-pink-500 rounded-full mr-1"></div>
              Predição IA
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Health Score 360° */}
      <Card 
        className={`transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer ${
          hoveredChart === 'health' ? 'ring-2 ring-green-500' : ''
        }`}
        onMouseEnter={() => setHoveredChart('health')}
        onMouseLeave={() => setHoveredChart(null)}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Health Score 360°</CardTitle>
                <p className="text-sm text-gray-600">Análise Multidimensional</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800 animate-pulse">
              <Activity className="w-3 h-3 mr-1" />
              Live
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={healthScoreData}>
              <PolarGrid stroke="#E5E7EB" />
              <PolarAngleAxis 
                dataKey="dimensao" 
                tick={{ fontSize: 9, fill: '#6B7280' }}
              />
              <PolarRadiusAxis 
                domain={[0, 100]} 
                tick={{ fontSize: 8 }}
                tickCount={4}
              />
              <Radar
                name="Health Score"
                dataKey="score"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={hoveredChart === 'health' ? 0.4 : 0.2}
                strokeWidth={2}
                className={hoveredChart === 'health' ? 'animate-pulse' : ''}
              />
            </RadarChart>
          </ResponsiveContainer>
          <div className="text-center mt-2">
            <div className="text-2xl font-bold text-green-600">78</div>
            <div className="text-xs text-gray-500">Score Médio</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeaturesInteractiveCharts;
