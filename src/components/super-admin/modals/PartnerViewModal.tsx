
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  DollarSign, 
  Users, 
  TrendingUp,
  Calendar,
  Award
} from 'lucide-react';

interface PartnerViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  partner: any;
}

export const PartnerViewModal = ({ isOpen, onClose, partner }: PartnerViewModalProps) => {
  if (!partner) return null;

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'elite': return 'bg-purple-100 text-purple-800';
      case 'platinum': return 'bg-gray-100 text-gray-800';
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'member': return 'bg-blue-100 text-blue-800';
      case 'starter': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelLabel = (level: string) => {
    const levels = {
      'starter': 'Starter',
      'member': 'Member',
      'gold': 'Gold',
      'platinum': 'Platinum',
      'elite': 'Elite'
    };
    return levels[level as keyof typeof levels] || level;
  };

  const getPartnershipTypeLabel = (type: string) => {
    const types = {
      'indicacao': 'Indicação',
      'revenda': 'Revenda',
      'implementadora': 'Implementadora',
      'white-label': 'White Label'
    };
    return types[type as keyof typeof types] || type;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl">{partner.companyName}</span>
              <div className="flex items-center space-x-2 mt-1">
                <Badge className={getLevelColor(partner.level)}>
                  <Award className="w-3 h-3 mr-1" />
                  {getLevelLabel(partner.level)}
                </Badge>
                <Badge variant="outline">
                  {getPartnershipTypeLabel(partner.partnershipType)}
                </Badge>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Informações de Contato */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Informações de Contato</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <User className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Contato Principal</p>
                  <p className="font-medium">{partner.contactName}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{partner.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Telefone</p>
                  <p className="font-medium">{partner.phone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Localização</p>
                  <p className="font-medium">{partner.address}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Parceiro desde</p>
                  <p className="font-medium">{new Date(partner.joinDate).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Métricas de Performance */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Performance</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Total de Clientes</p>
                    <p className="text-2xl font-bold text-blue-600">{partner.totalClients}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Comissão/Mês</p>
                    <p className="text-xl font-bold text-green-600">
                      {formatCurrency(partner.monthlyCommission)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Total Comissões</p>
                    <p className="text-xl font-bold text-purple-600">
                      {formatCurrency(partner.totalCommission)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="text-sm text-gray-600">Taxa Comissão</p>
                    <p className="text-xl font-bold text-yellow-600">{partner.commissionRate}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status e Observações */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">Status da Parceria</p>
              <Badge className={partner.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {partner.status}
              </Badge>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Última atualização</p>
              <p className="font-medium">{new Date().toLocaleDateString('pt-BR')}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          <Button>
            Editar Parceiro
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
