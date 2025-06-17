import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { PartnerForm } from './PartnerForm';
import { PartnerViewModal } from './modals/PartnerViewModal';
import { PartnerEditForm } from './forms/PartnerEditForm';
import { Handshake, Users, Search, Filter, Plus, Eye, Edit, Trash2, Download, TrendingUp, DollarSign, Award, Building2, Phone, Mail, MapPin } from 'lucide-react';

export const PartnersManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('todos');
  const [filterLevel, setFilterLevel] = useState('todos');
  const [showPartnerForm, setShowPartnerForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);

  const partners = [
    {
      id: '1',
      companyName: 'CS Agency Pro',
      contactName: 'Roberto Silva',
      email: 'roberto@csagencypro.com',
      phone: '(11) 99999-9999',
      address: 'São Paulo, SP',
      partnershipType: 'revenda',
      level: 'gold',
      commissionRate: 15,
      totalClients: 23,
      monthlyCommission: 8450,
      totalCommission: 67200,
      status: 'Ativo',
      joinDate: '2023-06-15'
    },
    {
      id: '2',
      companyName: 'TechPartner Solutions',
      contactName: 'Amanda Costa',
      email: 'amanda@techpartner.com',
      phone: '(21) 88888-8888',
      address: 'Rio de Janeiro, RJ',
      partnershipType: 'implementadora',
      level: 'platinum',
      commissionRate: 20,
      totalClients: 45,
      monthlyCommission: 15670,
      totalCommission: 125400,
      status: 'Ativo',
      joinDate: '2023-03-22'
    },
    {
      id: '3',
      companyName: 'Growth Indicators',
      contactName: 'Carlos Mendes',
      email: 'carlos@growthindicators.com',
      phone: '(31) 77777-7777',
      address: 'Belo Horizonte, MG',
      partnershipType: 'indicacao',
      level: 'member',
      commissionRate: 10,
      totalClients: 12,
      monthlyCommission: 2340,
      totalCommission: 18720,
      status: 'Ativo',
      joinDate: '2023-09-10'
    }
  ];

  const partnerStats = [
    { title: 'Total Parceiros', value: '47', change: '+18.2%', icon: Handshake },
    { title: 'Parceiros Ativos', value: '43', change: '+12.5%', icon: Users },
    { title: 'Comissões Este Mês', value: 'R$ 89.4K', change: '+23.1%', icon: DollarSign },
    { title: 'Clientes Indicados', value: '234', change: '+15.8%', icon: TrendingUp }
  ];

  const getPartnershipTypeLabel = (type: string) => {
    const types = {
      'indicacao': 'Indicação',
      'revenda': 'Revenda',
      'implementadora': 'Implementadora',
      'white-label': 'White Label'
    };
    return types[type as keyof typeof types] || type;
  };

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

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'todos' || partner.partnershipType === filterType;
    const matchesLevel = filterLevel === 'todos' || partner.level === filterLevel;
    
    return matchesSearch && matchesType && matchesLevel;
  });

  const handleCreatePartner = (data: any) => {
    console.log('Novo parceiro:', data);
    // Aqui você implementaria a lógica para criar o parceiro
  };

  const handleViewPartner = (partner: any) => {
    setSelectedPartner(partner);
    setShowViewModal(true);
  };

  const handleEditPartner = (partner: any) => {
    setSelectedPartner(partner);
    setShowEditForm(true);
  };

  const handleUpdatePartner = (partnerData: any) => {
    console.log('Parceiro atualizado:', partnerData);
    // Aqui você implementaria a lógica para atualizar o parceiro
    setShowEditForm(false);
    setSelectedPartner(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestão de Parceiros</h2>
          <p className="text-muted-foreground">Administração completa da rede de parceiros</p>
        </div>
        <Button onClick={() => setShowPartnerForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Parceiro
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {partnerStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.change}
                  </p>
                </div>
                <stat.icon className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filtros e Busca</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar parceiros..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de parceria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Tipos</SelectItem>
                <SelectItem value="indicacao">Indicação</SelectItem>
                <SelectItem value="revenda">Revenda</SelectItem>
                <SelectItem value="implementadora">Implementadora</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterLevel} onValueChange={setFilterLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Nível do parceiro" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Níveis</SelectItem>
                <SelectItem value="starter">Starter</SelectItem>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="gold">Gold</SelectItem>
                <SelectItem value="platinum">Platinum</SelectItem>
                <SelectItem value="elite">Elite</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Partners List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPartners.map((partner) => (
          <Card key={partner.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <span className="text-lg">{partner.companyName}</span>
                </div>
                <Badge className={getLevelColor(partner.level)}>
                  {getLevelLabel(partner.level)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{partner.contactName}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{partner.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{partner.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{partner.address}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <Badge variant="outline">
                  {getPartnershipTypeLabel(partner.partnershipType)}
                </Badge>
                <span className="text-sm font-medium">{partner.commissionRate}% comissão</span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{partner.totalClients}</div>
                  <div className="text-xs text-muted-foreground">Clientes</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">
                    R$ {(partner.monthlyCommission / 1000).toFixed(1)}K
                  </div>
                  <div className="text-xs text-muted-foreground">Comissão/mês</div>
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleViewPartner(partner)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Ver
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleEditPartner(partner)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Editar
                </Button>
                <Button size="sm" variant="outline">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <PartnerForm
        isOpen={showPartnerForm}
        onClose={() => setShowPartnerForm(false)}
        onSubmit={handleCreatePartner}
      />

      <PartnerViewModal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedPartner(null);
        }}
        partner={selectedPartner}
      />

      <PartnerEditForm
        isOpen={showEditForm}
        onClose={() => {
          setShowEditForm(false);
          setSelectedPartner(null);
        }}
        onSubmit={handleUpdatePartner}
        partner={selectedPartner}
      />
    </div>
  );
};
