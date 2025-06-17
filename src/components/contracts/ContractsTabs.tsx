
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Search } from 'lucide-react';
import { ContractsTable } from './ContractsTable';
import { ContractAnalytics } from '../ContractAnalytics';
import { ContractCalendar } from '../ContractCalendar';
import type { Contract } from './types/contractTypes';

interface ContractsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
  filteredContracts: Contract[];
  contracts: Contract[];
  onEdit: (contract: Contract) => void;
  onView: (contract: Contract) => void;
  onRenew: (contract: Contract) => void;
  onDelete: (contractIds: string[]) => void;
}

export const ContractsTabs: React.FC<ContractsTabsProps> = ({
  activeTab,
  onTabChange,
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  filteredContracts,
  contracts,
  onEdit,
  onView,
  onRenew,
  onDelete
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="mt-6">
      <TabsList className="mb-6">
        <TabsTrigger value="list">Lista de Contratos</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="calendar">Calendário</TabsTrigger>
      </TabsList>

      <TabsContent value="list" className="space-y-4">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar por cliente ou número do contrato..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={onStatusChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todos</SelectItem>
              <SelectItem value="active">Ativo</SelectItem>
              <SelectItem value="expired">Vencido</SelectItem>
              <SelectItem value="suspended">Suspenso</SelectItem>
              <SelectItem value="cancelled">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ContractsTable
          contracts={filteredContracts}
          onEdit={onEdit}
          onView={onView}
          onRenew={onRenew}
          onDelete={onDelete}
        />
      </TabsContent>

      <TabsContent value="analytics">
        <ContractAnalytics />
      </TabsContent>

      <TabsContent value="calendar">
        <ContractCalendar contracts={contracts} />
      </TabsContent>
    </Tabs>
  );
};
