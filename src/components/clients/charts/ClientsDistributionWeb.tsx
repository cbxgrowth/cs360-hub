
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { Layers, DollarSign, Award } from 'lucide-react';

const tierRadarData = [
  {
    tier: 'Tier A',
    clientes: 45,
    receita: 85,
    satisfacao: 92,
    retencao: 95
  },
  {
    tier: 'Tier B', 
    clientes: 78,
    receita: 65,
    satisfacao: 78,
    retencao: 88
  },
  {
    tier: 'Tier C',
    clientes: 124,
    receita: 35,
    satisfacao: 65,
    retencao: 75
  }
];

const tierPieData = [
  { name: 'Tier A', value: 45, color: '#10B981', percentage: 18.2 },
  { name: 'Tier B', value: 78, color: '#F59E0B', percentage: 31.6 },
  { name: 'Tier C', value: 124, color: '#EF4444', percentage: 50.2 }
];

export const ClientsDistributionWeb = () => {
  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-900/20 dark:via-teal-900/20 dark:to-cyan-900/20">
      <CardHeader>
        <CardTitle className="flex items-center">
          <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg mr-4">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Distribuição por Tiers
            </span>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Análise comparativa de segmentos de clientes
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Radar Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={tierRadarData} margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
                <defs>
                  <filter id="tierGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <PolarGrid stroke="#E5E7EB" strokeOpacity={0.3} />
                <PolarAngleAxis 
                  dataKey="tier" 
                  tick={{ fontSize: 12, fill: '#6B7280', fontWeight: 'medium' }}
                />
                <PolarRadiusAxis 
                  domain={[0, 100]} 
                  tick={{ fontSize: 10, fill: '#9CA3AF' }}
                  axisLine={false}
                />
                <Radar
                  name="Clientes"
                  dataKey="clientes"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.2}
                  strokeWidth={2}
                  filter="url(#tierGlow)"
                />
                <Radar
                  name="Receita"
                  dataKey="receita"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Radar
                  name="Satisfação"
                  dataKey="satisfacao"
                  stroke="#F59E0B"
                  fill="#F59E0B"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  <filter id="pieShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
                  </filter>
                </defs>
                <Pie
                  data={tierPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                  filter="url(#pieShadow)"
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  labelLine={false}
                >
                  {tierPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={2} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          {tierPieData.map((tier, index) => (
            <div key={tier.name} className="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
              <div className="flex items-center justify-center mb-2">
                <div 
                  className="w-4 h-4 rounded-full mr-2" 
                  style={{ backgroundColor: tier.color }}
                ></div>
                <Award className="w-6 h-6" style={{ color: tier.color }} />
              </div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">{tier.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{tier.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-500">{tier.percentage}%</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
