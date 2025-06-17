
import React from 'react';
import { Card, CardContent } from '../../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Button } from '../../ui/button';
import { Search, Filter, Plus } from 'lucide-react';
import { Input } from '../../ui/input';

interface PartnerFiltersProps {
  filters: {
    type: string;
    level: string;
    status: string;
  };
  onFiltersChange: (filters: any) => void;
}

export const PartnerFilters: React.FC<PartnerFiltersProps> = ({ filters, onFiltersChange }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar por nome, email..." className="pl-10" />
            </div>
          </div>
          
          <Select value={filters.type || 'todos'} onValueChange={(value) => onFiltersChange({...filters, type: value})}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo de Parceria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="indicacao">Indicação</SelectItem>
              <SelectItem value="revenda">Revenda</SelectItem>
              <SelectItem value="implementadora">Implementadora</SelectItem>
              <SelectItem value="white-label">White Label</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.level || 'todos'} onValueChange={(value) => onFiltersChange({...filters, level: value})}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Nível" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="starter">Starter</SelectItem>
              <SelectItem value="member">Member</SelectItem>
              <SelectItem value="gold">Gold</SelectItem>
              <SelectItem value="platinum">Platinum</SelectItem>
              <SelectItem value="elite">Elite</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.status || 'todos'} onValueChange={(value) => onFiltersChange({...filters, status: value})}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="approved">Aprovado</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="suspended">Suspenso</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Limpar
          </Button>

          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Novo Parceiro
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
