
export const getTierColor = (tier: string): string => {
  const colors = {
    'A': 'bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200',
    'B': 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200',
    'C': 'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200'
  };
  return colors[tier as keyof typeof colors] || colors['B'];
};

export const getStatusColor = (status: string): string => {
  const colors = {
    'Ativo': 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200',
    'Risco': 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200',
    'Inativo': 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200'
  };
  return colors[status as keyof typeof colors] || colors['Ativo'];
};

export const getRiskColor = (score: number): string => {
  if (score >= 70) return 'bg-red-500';
  if (score >= 40) return 'bg-yellow-500';
  return 'bg-green-500';
};

export const getNPSColor = (score: number | null): string => {
  if (score === null) return 'bg-gray-100 text-gray-800 border-gray-200';
  if (score >= 9) return 'bg-green-100 text-green-800 border-green-200';
  if (score >= 7) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  return 'bg-red-100 text-red-800 border-red-200';
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('pt-BR');
};
