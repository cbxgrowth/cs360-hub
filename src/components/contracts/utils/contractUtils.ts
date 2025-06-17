
export const exportContractsToCSV = (contracts: any[]) => {
  const csvContent = [
    ['Cliente', 'Contrato', 'Início', 'Término', 'Valor', 'Status', 'Renovação'],
    ...contracts.map(contract => [
      contract.clientName,
      contract.contractNumber,
      contract.startDate,
      contract.endDate,
      contract.value,
      contract.status,
      contract.renewalStatus
    ])
  ].map(row => row.join(',')).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'contratos.csv';
  a.click();
  window.URL.revokeObjectURL(url);
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

export const calculateDaysToExpiry = (endDate: string): number => {
  const today = new Date();
  const expiry = new Date(endDate);
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
