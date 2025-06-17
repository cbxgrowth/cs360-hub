
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Star, Eye, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const npsData = [
  { month: 'Jan', score: 8.2, promoters: 65, detractors: 8 },
  { month: 'Fev', score: 8.5, promoters: 68, detractors: 6 },
  { month: 'Mar', score: 8.1, promoters: 63, detractors: 9 },
  { month: 'Abr', score: 8.7, promoters: 72, detractors: 5 },
  { month: 'Mai', score: 8.9, promoters: 75, detractors: 4 },
  { month: 'Jun', score: 9.1, promoters: 78, detractors: 3 }
];

export const NPSAnalyticsChart: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
            <Star className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg text-gray-900 dark:text-white">Net Promoter Score</CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">Evolução da satisfação</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            NPS: 9.1 ⭐
          </Badge>
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={npsData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis domain={[0, 10]} className="text-xs" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border)',
                borderRadius: '8px'
              }}
              formatter={(value: any, name: string) => [
                name === 'score' ? `${value}/10` : `${value}%`,
                name === 'score' ? 'NPS Score' : name === 'promoters' ? 'Promotores' : 'Detratores'
              ]}
            />
            <Area type="monotone" dataKey="score" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Promotores</p>
            <p className="text-lg font-bold text-green-600">78%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Detratores</p>
            <p className="text-lg font-bold text-red-600">3%</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-blue-600 dark:text-blue-400"
            onClick={() => navigate('/nps-details')}
          >
            Detalhes
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
