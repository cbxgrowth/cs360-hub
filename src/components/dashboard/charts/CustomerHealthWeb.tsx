
import React from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Heart, Users, AlertTriangle, CheckCircle } from 'lucide-react';

const healthData = [
  {
    subject: 'Engajamento',
    score: 85,
    benchmark: 78,
    fullMark: 100
  },
  {
    subject: 'Utilização',
    score: 92,
    benchmark: 85,
    fullMark: 100
  },
  {
    subject: 'Satisfação',
    score: 88,
    benchmark: 82,
    fullMark: 100
  },
  {
    subject: 'Suporte',
    score: 76,
    benchmark: 80,
    fullMark: 100
  },
  {
    subject: 'Pagamentos',
    score: 94,
    benchmark: 90,
    fullMark: 100
  },
  {
    subject: 'Renovação',
    score: 89,
    benchmark: 85,
    fullMark: 100
  }
];

export const CustomerHealthWeb = () => {
  const avgScore = Math.round(healthData.reduce((acc, item) => acc + item.score, 0) / healthData.length);
  
  const getHealthColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthIcon = (score: number) => {
    if (score >= 85) return CheckCircle;
    if (score >= 70) return AlertTriangle;
    return AlertTriangle;
  };

  const HealthIcon = getHealthIcon(avgScore);

  return (
    <Card className="shadow-xl border-0 bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 dark:from-rose-900/20 dark:via-pink-900/20 dark:to-fuchsia-900/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 shadow-lg">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Health Score Detalhado
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Análise multidimensional da saúde dos clientes
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={`${avgScore >= 85 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : avgScore >= 70 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
              <HealthIcon className="w-3 h-3 mr-1" />
              {avgScore}/100
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
              <Users className="w-3 h-3 mr-1" />
              1,247 Clientes
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={healthData} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
            <defs>
              <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EC4899" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#EC4899" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="benchmarkGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6B7280" stopOpacity={0.6}/>
                <stop offset="95%" stopColor="#6B7280" stopOpacity={0.1}/>
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <PolarGrid 
              stroke="#E5E7EB" 
              strokeWidth={1}
              gridType="polygon"
            />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fontSize: 12, fill: '#6B7280', fontWeight: 500 }}
              className="text-gray-700 dark:text-gray-300"
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              tick={{ fontSize: 10, fill: '#9CA3AF' }}
              tickCount={5}
            />
            <Radar
              name="Score Atual"
              dataKey="score"
              stroke="#EC4899"
              fill="url(#healthGradient)"
              strokeWidth={3}
              dot={{ fill: '#EC4899', strokeWidth: 2, r: 5, filter: 'url(#glow)' }}
            />
            <Radar
              name="Benchmark"
              dataKey="benchmark"
              stroke="#6B7280"
              fill="url(#benchmarkGradient)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#6B7280', strokeWidth: 2, r: 3 }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
            />
          </RadarChart>
        </ResponsiveContainer>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {healthData.map((item, index) => (
            <div key={index} className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm">
              <div className={`text-lg font-bold ${getHealthColor(item.score)}`}>
                {item.score}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">{item.subject}</div>
              <div className="text-xs text-gray-500 dark:text-gray-500">
                vs {item.benchmark} (benchmark)
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
