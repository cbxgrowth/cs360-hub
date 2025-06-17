
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { 
  Package, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Calendar,
  Tag,
  FileText,
  Activity
} from 'lucide-react';
import type { Service } from '@/hooks/useServices';

interface ServiceViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

export const ServiceViewModal: React.FC<ServiceViewModalProps> = ({
  isOpen,
  onClose,
  service
}) => {
  if (!service) return null;

  const estimatedClients = Math.floor(Math.random() * 100) + 10;
  const estimatedMRR = Number(service.price) * estimatedClients;
  const estimatedGrowth = (Math.random() * 30 - 5).toFixed(1);

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Package className="w-5 h-5" />
            Detalhes do Serviço - {service.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Category */}
          <div className="flex items-center gap-3">
            <Badge className={`${getCategoryColor(service.category)} capitalize font-medium`}>
              {service.category}
            </Badge>
            <Badge className={service.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
              {service.active ? 'Ativo' : 'Inativo'}
            </Badge>
          </div>

          {/* Service Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Informações Básicas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Nome do Serviço
                  </label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {service.name}
                  </p>
                </div>
                {service.description && (
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Descrição
                    </label>
                    <p className="text-gray-700 dark:text-gray-300">
                      {service.description}
                    </p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Preço
                  </label>
                  <p className="text-2xl font-bold text-green-600">
                    R$ {Number(service.price).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Métricas de Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Clientes Ativos
                    </span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {estimatedClients}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      MRR Estimado
                    </span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    R$ {(estimatedMRR / 1000).toFixed(0)}k
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Crescimento
                    </span>
                  </div>
                  <span className={`font-semibold ${Number(estimatedGrowth) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {Number(estimatedGrowth) >= 0 ? '+' : ''}{estimatedGrowth}%
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Timestamps */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-600" />
                Histórico
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Data de Criação
                </label>
                <p className="text-gray-900 dark:text-white">
                  {new Date(service.created_at).toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Última Atualização
                </label>
                <p className="text-gray-900 dark:text-white">
                  {new Date(service.updated_at).toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
