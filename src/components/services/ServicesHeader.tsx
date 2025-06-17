
import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  RefreshCw,
  BarChart3,
  Settings,
  TrendingUp
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';

interface ServicesHeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  categoryFilter: string;
  onCategoryChange: (category: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
  onNewService: () => void;
  onImport: () => void;
  onExport: () => void;
  onRefresh: () => void;
  totalServices: number;
  activeServices: number;
}

export const ServicesHeader: React.FC<ServicesHeaderProps> = ({
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  statusFilter,
  onStatusChange,
  onNewService,
  onImport,
  onExport,
  onRefresh,
  totalServices,
  activeServices
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Gestão de Serviços & Upsell
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <Badge variant="outline" className="text-blue-600">
                {totalServices} Total
              </Badge>
              <Badge variant="outline" className="text-green-600">
                {activeServices} Ativos
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="bg-white/80 dark:bg-slate-700"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onImport}
            className="bg-white/80 dark:bg-slate-700"
          >
            <Upload className="w-4 h-4 mr-2" />
            Importar
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            className="bg-white/80 dark:bg-slate-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
            onClick={onNewService}
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Serviço
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Buscar serviços por nome, categoria ou descrição..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-white/80 dark:bg-slate-700"
            />
          </div>
        </div>
        
        <div className="flex gap-3">
          <Select value={categoryFilter} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-48 bg-white/80 dark:bg-slate-700">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todas Categorias</SelectItem>
              <SelectItem value="plano">Planos</SelectItem>
              <SelectItem value="addon">Add-ons</SelectItem>
              <SelectItem value="implementacao">Implementação</SelectItem>
              <SelectItem value="treinamento">Treinamento</SelectItem>
              <SelectItem value="consultoria">Consultoria</SelectItem>
              <SelectItem value="suporte">Suporte</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={onStatusChange}>
            <SelectTrigger className="w-32 bg-white/80 dark:bg-slate-700">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="ativo">Ativos</SelectItem>
              <SelectItem value="inativo">Inativos</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="bg-white/80 dark:bg-slate-700">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <TrendingUp className="w-4 h-4 mr-2" />
                Mais Vendidos
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Maior MRR
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Limpar Filtros</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
