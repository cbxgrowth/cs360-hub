
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { TrendingDown, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../ui/button';

const churnData = [
  { month: 'Jan', churnRate: 2.5, churnedMRR: 5200 },
  { month: 'Fev', churnRate: 2.8, churnedMRR: 6100 },
  { month: 'Mar', churnRate: 2.2, churnedMRR: 4800 },
  { month: 'Abr', churnRate: 3.1, churnedMRR: 7200 },
  { month: 'Mai', churnRate: 2.9, churnedMRR: 6800 },
  { month: 'Jun', churnRate: 2.6, churnedMRR: 6300 },
];

export const ChurnAnalysisChart: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Card className="bg-white border border-slate-100 shadow-md rounded-2xl">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-red-500" />
            <CardTitle className="text-lg font-bold text-gray-900">
              Análise de Churn
            </CardTitle>
          </div>
          <Button variant="link" className="text-blue-600 font-semibold px-2" onClick={() => navigate('/churn-strategies')}>
            Estratégias <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="text-sm text-slate-500 mt-1 ml-7">
          Taxa de cancelamento e MRR perdido
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={churnData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorChurn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.5} />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" unit="%" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" unit="k" transform="translate(10, 0)" tick={{ fontSize: 12 }} tickFormatter={(value) => `${value / 1000}`} />
            <Tooltip
              formatter={(value: any, name: string) => {
                if (name === 'churnRate') return [`${value}%`, 'Taxa de Churn'];
                if (name === 'churnedMRR') return [`R$ ${value.toLocaleString()}`, 'MRR Perdido'];
                return [value, name];
              }}
            />
            <Area yAxisId="left" type="monotone" dataKey="churnRate" stroke="#EF4444" fill="url(#colorChurn)" strokeWidth={2} name="Taxa de Churn" />
            <Area yAxisId="right" type="monotone" dataKey="churnedMRR" stroke="#F87171" fill="transparent" name="MRR Perdido" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
