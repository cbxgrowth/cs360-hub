import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../ui/table';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { 
  Eye,
  Edit,
  Trash2,
  Copy,
  MoreHorizontal,
  TrendingUp,
  Users,
  DollarSign,
  Package,
  Plus
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import type { Service } from '@/hooks/useServices';

interface ServicesTableProps {
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (serviceIds: string[]) => void;
  onView: (service: Service) => void;
  onDuplicate: (service: Service) => void;
}

export const ServicesTable: React.FC<ServicesTableProps> = ({
  services,
  onEdit,
  onDelete,
  onView,
  onDuplicate
}) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleSelectService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSelectAll = () => {
    if (selectedServices.length === services.length) {
      setSelectedServices([]);
    } else {
      setSelectedServices(services.map(s => s.id));
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'plano': 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800',
      'addon': 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800',
      'implementacao': 'bg-gradient-to-r from-green-100 to-green-200 text-green-800',
      'treinamento': 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800',
      'consultoria': 'bg-gradient-to-r from-pink-100 to-pink-200 text-pink-800',
      'suporte': 'bg-gradient-to-r from-cyan-100 to-cyan-200 text-cyan-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (active: boolean) => {
    return active 
      ? 'bg-gradient-to-r from-green-100 to-emerald-200 text-green-800'
      : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800';
  };

  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
          <Package className="w-12 h-12 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          Nenhum serviço encontrado
        </h3>
        <p className="text-slate-500 dark:text-slate-400 mb-4">
          Comece criando seu primeiro serviço para gerenciar seu portfólio.
        </p>
        <Button className="bg-gradient-to-r from-orange-600 to-red-600">
          <Plus className="w-4 h-4 mr-2" />
          Criar Primeiro Serviço
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {selectedServices.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
            {selectedServices.length} serviço(s) selecionado(s)
          </span>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onDelete(selectedServices)}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir Selecionados
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setSelectedServices([])}
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 dark:bg-slate-800">
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedServices.length === services.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="font-bold text-slate-900 dark:text-white">
                Serviço
              </TableHead>
              <TableHead className="font-bold text-slate-900 dark:text-white">
                Categoria
              </TableHead>
              <TableHead className="font-bold text-slate-900 dark:text-white">
                Preço
              </TableHead>
              <TableHead className="font-bold text-slate-900 dark:text-white">
                Status
              </TableHead>
              <TableHead className="font-bold text-slate-900 dark:text-white">
                Métricas
              </TableHead>
              <TableHead className="font-bold text-slate-900 dark:text-white">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => {
              const estimatedClients = Math.floor(Math.random() * 100) + 10;
              const estimatedMRR = Number(service.price) * estimatedClients;
              
              return (
                <TableRow 
                  key={service.id} 
                  className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedServices.includes(service.id)}
                      onCheckedChange={() => handleSelectService(service.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {service.name}
                      </div>
                      {service.description && (
                        <div className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                          {service.description}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getCategoryColor(service.category)} capitalize font-medium`}>
                      {service.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold text-slate-900 dark:text-white">
                      R$ {Number(service.price).toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(service.active)} font-medium`}>
                      {service.active ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                        <Users className="w-3 h-3 mr-1" />
                        {estimatedClients} clientes
                      </div>
                      <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                        <DollarSign className="w-3 h-3 mr-1" />
                        R$ {(estimatedMRR / 1000).toFixed(0)}k MRR
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(service)}
                        className="text-slate-600 dark:text-slate-400 hover:text-blue-600"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(service)}
                        className="text-slate-600 dark:text-slate-400 hover:text-blue-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-slate-600 dark:text-slate-400"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onDuplicate(service)}>
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <TrendingUp className="w-4 h-4 mr-2" />
                            Ver Analytics
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => onDelete([service.id])}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
