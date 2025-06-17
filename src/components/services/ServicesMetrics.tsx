
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { 
  Package, 
  TrendingUp, 
  Users, 
  DollarSign,
  Target,
  Activity,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { Badge } from '../ui/badge';
import type { Service } from '@/hooks/useServices';

interface ServicesMetricsProps {
  services: Service[];
}

export const ServicesMetrics: React.FC<ServicesMetricsProps> = ({ services }) => {
  const activeServices = services.filter(s => s.active).length;
  const totalMRR = services.reduce((sum, service) => {
    // Simulate MRR calculation based on price and estimated clients
    const estimatedClients = Math.floor(Math.random() * 100) + 10;
    return sum + (Number(service.price) * estimatedClients);
  }, 0);

  const avgPrice = services.length > 0 
    ? services.reduce((sum, service) => sum + Number(service.price), 0) / services.length 
    : 0;

  const categoryDistribution = services.reduce((acc, service) => {
    acc[service.category] = (acc[service.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topCategory = Object.entries(categoryDistribution)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10"></div>
        <CardContent className="relative p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                Serviços Ativos
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                {activeServices}
              </p>
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-1 flex items-center">
                <Activity className="w-3 h-3 mr-1" />
                de {services.length} total
              </div>
            </div>
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10"></div>
        <CardContent className="relative p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                MRR Estimado
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                R$ {(totalMRR / 1000).toFixed(0)}k
              </p>
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +15% este mês
              </div>
            </div>
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl shadow-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
        <CardContent className="relative p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                Preço Médio
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                R$ {avgPrice.toFixed(0)}
              </p>
              <div className="text-xs font-bold text-purple-600 dark:text-purple-400 mt-1 flex items-center">
                <Sparkles className="w-3 h-3 mr-1" />
                por serviço
              </div>
            </div>
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10"></div>
        <CardContent className="relative p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                Categoria Top
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white capitalize">
                {topCategory}
              </p>
              <div className="text-xs font-bold text-orange-600 dark:text-orange-400 mt-1 flex items-center">
                <Users className="w-3 h-3 mr-1" />
                {categoryDistribution[topCategory] || 0} serviços
              </div>
            </div>
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
