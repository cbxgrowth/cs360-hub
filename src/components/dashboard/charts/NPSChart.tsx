
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { Smile, Meh, Frown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const npsData = [
  { name: 'Promotores', value: 68, fill: '#10B981' },
  { name: 'Passivos', value: 19, fill: '#F59E0B' },
  { name: 'Detratores', value: 13, fill: '#EF4444' },
];

const npsScore = npsData[0].value - npsData[2].value;

export const NPSChart: React.FC = () => {
  const navigate = useNavigate();

  const handleNpsClick = (npsCategory: string) => {
    navigate(`/clients?nps=${encodeURIComponent(npsCategory.toLowerCase())}`);
  };

  return (
    <Card className="bg-white border border-slate-100 shadow-md rounded-2xl">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smile className="w-5 h-5 text-green-500" />
            <CardTitle className="text-lg font-bold text-gray-900">
              Net Promoter Score (NPS)
            </CardTitle>
          </div>
          <Badge className="bg-green-100 text-green-800 font-bold rounded-lg px-3 py-1 shadow-sm text-lg">
            {npsScore}
          </Badge>
        </div>
        <div className="text-sm text-slate-500 mt-1 ml-7">
          Satisfação geral dos clientes
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={npsData} layout="vertical" margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" hide />
            <Tooltip
              formatter={(value: any) => [`${value}%`, 'Percentual']}
              cursor={{ fill: 'transparent' }}
            />
            <Bar dataKey="value" barSize={20} radius={[10, 10, 10, 10]}>
                {npsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex justify-around mt-2 text-sm text-gray-600">
          <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => handleNpsClick('promotores')}>
            <Smile className="w-4 h-4 text-green-500" />
            <span>Promotores ({npsData[0].value}%)</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => handleNpsClick('passivos')}>
            <Meh className="w-4 h-4 text-yellow-500" />
            <span>Passivos ({npsData[1].value}%)</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => handleNpsClick('detratores')}>
            <Frown className="w-4 h-4 text-red-500" />
            <span>Detratores ({npsData[2].value}%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
