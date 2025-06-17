
export interface ContractData {
  id: number;
  clientName: string;
  contractNumber: string;
  startDate: string;
  endDate: string;
  value: number;
  status: string;
  renewalStatus: string;
  daysToExpiry: number;
  services: string[];
  tier: string;
  lastModified: string;
  modifiedBy: string;
}

export const contractsData: ContractData[] = [
  {
    id: 1,
    clientName: 'TechCorp LTDA',
    contractNumber: 'CT-2024-001',
    startDate: '2024-01-15',
    endDate: '2024-12-15',
    value: 120000,
    status: 'Ativo',
    renewalStatus: 'Pendente',
    daysToExpiry: 45,
    services: ['Premium', 'Support'],
    tier: 'A',
    lastModified: '2024-06-01',
    modifiedBy: 'João Silva'
  },
  {
    id: 2,
    clientName: 'StartupX',
    contractNumber: 'CT-2024-002',
    startDate: '2024-03-01',
    endDate: '2025-02-28',
    value: 60000,
    status: 'Ativo',
    renewalStatus: 'Renovado',
    daysToExpiry: 125,
    services: ['Basic', 'Analytics'],
    tier: 'B',
    lastModified: '2024-05-15',
    modifiedBy: 'Maria Santos'
  },
  {
    id: 3,
    clientName: 'BigCorp S.A.',
    contractNumber: 'CT-2024-003',
    startDate: '2024-02-10',
    endDate: '2024-08-10',
    value: 200000,
    status: 'Encerrado',
    renewalStatus: 'Em Negociação',
    daysToExpiry: -15,
    services: ['Enterprise', 'Premium Support', 'Custom'],
    tier: 'A',
    lastModified: '2024-08-05',
    modifiedBy: 'Carlos Lima'
  }
];

export const registeredClients = [
  { id: 1, name: 'TechCorp LTDA', tier: 'A' },
  { id: 2, name: 'StartupX', tier: 'B' },
  { id: 3, name: 'BigCorp S.A.', tier: 'A' },
  { id: 4, name: 'Inovação LTDA', tier: 'B' },
  { id: 5, name: 'Digital Solutions', tier: 'C' }
];

export const registeredServices = [
  { id: 1, name: 'CS360° Premium', category: 'plano' },
  { id: 2, name: 'CS360° Standard', category: 'plano' },
  { id: 3, name: 'CS360° Basic', category: 'plano' },
  { id: 4, name: 'Support Plus', category: 'addon' },
  { id: 5, name: 'Analytics Pro', category: 'addon' },
  { id: 6, name: 'Implementação Dedicada', category: 'implementacao' },
  { id: 7, name: 'Treinamento Avançado', category: 'treinamento' }
];

export const generateContractNumber = () => {
  const currentYear = new Date().getFullYear();
  const existingContracts = contractsData.filter(c => 
    c.contractNumber.includes(currentYear.toString())
  );
  const nextNumber = existingContracts.length + 1;
  return `CT-${currentYear}-${nextNumber.toString().padStart(3, '0')}`;
};
