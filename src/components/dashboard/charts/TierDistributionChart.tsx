import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Star, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const tierDistribution = [
  { name: 'Tier A', value: 23, color: '#3B82F6' },
  { name: 'Tier B', value: 45, color: '#8B5CF6' },
  { name: 'Tier C', value: 89, color: '#EC4899' },
  { name: 'Prospects', value: 26, color: '#10B981' }
];

export const TierDistributionChart: React.FC = () => {
  const navigate = useNavigate();

  const handleViewTier = (tier: string) => {
    // remove 'Tier ' for url param, prospects is unchanged
    let tierParam = tier.replace('Tier ', '');
    if (tier === 'Prospects') tierParam = 'prospect';
    navigate(`/clients?tier=${encodeURIComponent(tierParam)}`);
  };

  return (
    <Card className="bg-white border border-slate-100 shadow-md rounded-2xl">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <CardTitle className="text-lg font-bold text-gray-900">
              Distribuição por Tier
            </CardTitle>
            <Badge className="bg-yellow-100 text-yellow-800 ml-2 font-semibold rounded-lg px-3 py-0.5 shadow-sm text-[13px]">
              4 tiers
            </Badge>
            <Eye className="w-4 h-4 text-gray-400 ml-2" />
          </div>
        </div>
        <div className="text-sm text-slate-500 mt-1 ml-7">
          Clientes por nível de prioridade
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-3">
          {/* Pie Chart */}
          <div className="flex-1 flex flex-col items-center justify-center min-w-[225px]">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie
                  data={tierDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => ''}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {tierDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any, name: string) => [
                    `${value} clientes`,
                    name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Label central (opcional, pode destacar tier selecionado) */}
            <div className="mt-2 text-[15px] font-semibold text-[#8B5CF6] text-center">
              Tier B: 45
            </div>
          </div>
          {/* Tiers Cards */}
          <div className="flex-1 flex flex-col gap-3 w-full max-w-xs">
            {tierDistribution.map((tier, idx) => (
              <div
                key={tier.name}
                className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tier.color }} />
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{tier.name}</div>
                    <div className="text-[13px] text-gray-500">{tier.value} clientes</div>
                  </div>
                </div>
                <Button
                  variant="link"
                  className="text-blue-600 px-2 text-sm font-bold"
                  onClick={() => handleViewTier(tier.name)}
                >
                  Ver
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
