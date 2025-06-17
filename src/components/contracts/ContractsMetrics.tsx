
import React, { useMemo } from 'react';
import { CheckCircle, Clock, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { calculateDaysToExpiry, formatCurrency } from './utils/contractUtils';

interface ContractMetric {
  icon: React.ComponentType<any>;
  value: string;
  label: string;
  trend: string;
  trendColor: string;
  bgColor: string;
}

interface ContractsMetricsProps {
  contracts: any[];
}

export const ContractsMetrics: React.FC<ContractsMetricsProps> = ({ contracts = [] }) => {
  const metrics = useMemo(() => {
    const activeContracts = contracts.filter(c => c.status === 'active');
    const expiringSoon = contracts.filter(c => {
      const days = calculateDaysToExpiry(c.end_date);
      return days <= 30 && days > 0;
    });
    const totalValue = contracts.reduce((sum, c) => sum + (parseFloat(c.value?.toString() || '0') || 0), 0);
    const renewedContracts = contracts.filter(c => c.renewal_status === 'renewed');
    const renewalRate = contracts.length > 0 ? (renewedContracts.length / contracts.length) * 100 : 0;

    const metricsData: ContractMetric[] = [
      {
        icon: CheckCircle,
        value: activeContracts.length.toString(),
        label: 'Contratos Ativos',
        trend: '+5%',
        trendColor: 'text-green-600 dark:text-green-400',
        bgColor: 'bg-gradient-to-r from-green-500 to-green-600'
      },
      {
        icon: expiringSoon.length > 0 ? AlertCircle : Clock,
        value: expiringSoon.length.toString(),
        label: 'Vencem em 30 dias',
        trend: expiringSoon.length > 5 ? '+15%' : '-2%',
        trendColor: expiringSoon.length > 5 ? 'text-red-600 dark:text-red-400' : 'text-orange-600 dark:text-orange-400',
        bgColor: expiringSoon.length > 0 ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-orange-500 to-orange-600'
      },
      {
        icon: DollarSign,
        value: formatCurrency(totalValue),
        label: 'Valor Total Anual',
        trend: '+18%',
        trendColor: 'text-green-600 dark:text-green-400',
        bgColor: 'bg-gradient-to-r from-blue-500 to-blue-600'
      },
      {
        icon: TrendingUp,
        value: `${renewalRate.toFixed(1)}%`,
        label: 'Taxa de Renovação',
        trend: renewalRate > 90 ? '+2%' : '-5%',
        trendColor: renewalRate > 90 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400',
        bgColor: renewalRate > 90 ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-yellow-500 to-yellow-600'
      }
    ];

    return metricsData;
  }, [contracts]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg h-full">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${metric.bgColor} flex items-center justify-center flex-shrink-0 shadow-sm`}>
              <metric.icon className="w-6 h-6 text-white" />
            </div>
            <span className={`text-sm font-medium ${metric.trendColor} bg-gray-50 dark:bg-gray-700/50 px-2 py-1 rounded`}>
              {metric.trend}
            </span>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {metric.value}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {metric.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
