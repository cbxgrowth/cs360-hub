
export const getTierColor = (tier: string) => {
  const colors = {
    'A': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    'B': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    'C': 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
  };
  return colors[tier as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
};

export const getNPSColor = (category: string) => {
  const colors = {
    'Promotor': 'text-green-600 dark:text-green-400',
    'Passivo': 'text-yellow-600 dark:text-yellow-400',
    'Detrator': 'text-red-600 dark:text-red-400'
  };
  return colors[category as keyof typeof colors] || 'text-gray-600 dark:text-gray-400';
};

export const getStatusColor = (status: string) => {
  const colors = {
    'Ativo': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    'Risco': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    'Inativo': 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
  };
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
};

export const getRiskColor = (score: number) => {
  if (score <= 30) return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
  if (score <= 60) return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
  return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
};
