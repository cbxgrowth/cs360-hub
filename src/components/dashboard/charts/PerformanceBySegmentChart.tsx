
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const segmentData = [
  { segment: 'Enterprise', mrr: 120000, ltv: 480000 },
  { segment: 'SMB', mrr: 85000, ltv: 255000 },
  { segment: 'Startup', mrr: 45000, ltv: 90000 },
  { segment: 'Varejo', mrr: 65000, ltv: 150000 },
];

export const PerformanceBySegmentChart: React.FC = () => {
  const navigate = useNavigate();

  const handleBarClick = (data: any) => {
    if (data && data.activeLabel) {
      const segment = data.activeLabel;
      navigate(`/clients?segment=${encodeURIComponent(segment.toLowerCase())}`);
    }
  };

  return (
    <Card className="bg-white border border-slate-100 shadow-md rounded-2xl">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <PieChartIcon className="w-5 h-5 text-purple-500" />
          <CardTitle className="text-lg font-bold text-gray-900">
            Performance por Segmento
          </CardTitle>
        </div>
        <div className="text-sm text-slate-500 mt-1 ml-7">
          MRR e LTV por segmento de cliente
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={segmentData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            onClick={handleBarClick}
            style={{ cursor: 'pointer' }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.5} />
            <XAxis dataKey="segment" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `R$${value/1000}k`} />
            <Tooltip
              formatter={(value: number) => `R$ ${value.toLocaleString()}`}
            />
            <Legend wrapperStyle={{fontSize: "12px"}}/>
            <Bar dataKey="mrr" fill="#8B5CF6" name="MRR" radius={[4, 4, 0, 0]} />
            <Bar dataKey="ltv" fill="#3B82F6" name="LTV" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
