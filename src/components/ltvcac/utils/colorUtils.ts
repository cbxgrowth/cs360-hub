
// Utilitários para cores dos componentes LTV/CAC
export const getSegmentColor = (segment: string) => {
  const colors = {
    'Enterprise': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    'Nível A - Enterprise': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    'Growth': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    'Nível B - Growth': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    'Starter': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    'Nível C - Starter': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
  };
  return colors[segment as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

export const getRatioColor = (ratio: number) => {
  if (ratio >= 5) return 'text-green-600 dark:text-green-400';
  if (ratio >= 3) return 'text-blue-600 dark:text-blue-400';
  if (ratio >= 2) return 'text-yellow-600 dark:text-yellow-400';
  return 'text-red-600 dark:text-red-400';
};

export const getRiskColor = (risk: string) => {
  const colors = {
    'Baixo': 'text-green-600 dark:text-green-400',
    'Médio': 'text-yellow-600 dark:text-yellow-400',
    'Alto': 'text-red-600 dark:text-red-400'
  };
  return colors[risk as keyof typeof colors] || 'text-gray-600';
};
