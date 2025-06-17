
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { TrendingUp, Eye, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const churnData = [
  { month: 'Jan', rate: 3.2, recovered: 2, lost: 5 },
  { month: 'Fev', rate: 2.8, recovered: 3, lost: 4 },
  { month: 'Mar', rate: 3.5, recovered: 1, lost: 6 },
  { month: 'Abr', rate: 2.1, recovered: 4, lost: 3 },
  { month: 'Mai', rate: 1.8, recovered: 5, lost: 2 },
  { month: 'Jun', rate: 1.5, recovered: 6, lost: 2 }
];

export const ChurnAnalyticsChart: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg text-gray-900 dark:text-white">Análise de Churn</CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">Taxa de cancelamento</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            1.5% Taxa
          </Badge>
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={churnData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border)',
                borderRadius: '8px'
              }}
            />
            <Line type="monotone" dataKey="rate" stroke="#EF4444" strokeWidth={3} name="Taxa %" />
            <Line type="monotone" dataKey="recovered" stroke="#10B981" strokeWidth={2} name="Recuperados" />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Recuperados</p>
            <p className="text-lg font-bold text-green-600">6 clientes</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Meta</p>
            <p className="text-lg font-bold text-blue-600">&lt; 2%</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-blue-600 dark:text-blue-400"
            onClick={() => navigate('/churn-strategies')}
          >
            Estratégias
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
