
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { 
  Users, Search, Filter, Download, Eye, Mail, 
  Phone, Calendar, DollarSign, TrendingUp, AlertCircle 
} from 'lucide-react';

export const PartnerClients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const clients = [
    {
      id: "1",
      name: "TechCorp Ltda",
      email: "contato@techcorp.com",
      phone: "(11) 99999-9999",
      plan: "Professional",
      mrr: 499,
      status: "Ativo",
      health_score: 85,
      last_login: "2024-01-15",
      signup_date: "2024-01-01",
      commission_earned: 149.70,
      nps_score: 9
    },
    {
      id: "2",
      name: "StartupXYZ",
      email: "admin@startupxyz.com", 
      phone: "(21) 88888-8888",
      plan: "Growth",
      mrr: 999,
      status: "Ativo",
      health_score: 92,
      last_login: "2024-01-14",
      signup_date: "2023-12-15",
      commission_earned: 299.70,
      nps_score: 10
    },
    {
      id: "3",
      name: "Digital Agency",
      email: "hello@digitalagency.com",
      phone: "(31) 77777-7777",
      plan: "Starter",
      mrr: 199,
      status: "Risco",
      health_score: 45,
      last_login: "2024-01-10",
      signup_date: "2023-11-20",
      commission_earned: 59.70,
      nps_score: 6
    },
    {
      id: "4",
      name: "Enterprise Inc",
      email: "contact@enterprise.com",
      phone: "(41) 66666-6666",
      plan: "Enterprise",
      mrr: 2499,
      status: "Ativo",
      health_score: 98,
      last_login: "2024-01-15",
      signup_date: "2023-10-01",
      commission_earned: 874.65,
      nps_score: 10
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Ativo': { variant: 'default' as const, color: 'bg-green-100 text-green-800' },
      'Risco': { variant: 'secondary' as const, color: 'bg-yellow-100 text-yellow-800' },
      'Inativo': { variant: 'destructive' as const, color: 'bg-red-100 text-red-800' }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig['Ativo'];
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalStats = {
    total_clients: clients.length,
    active_clients: clients.filter(c => c.status === 'Ativo').length,
    total_mrr: clients.reduce((sum, c) => sum + c.mrr, 0),
    total_commission: clients.reduce((sum, c) => sum + c.commission_earned, 0),
    avg_health_score: Math.round(clients.reduce((sum, c) => sum + c.health_score, 0) / clients.length),
    avg_nps: (clients.reduce((sum, c) => sum + c.nps_score, 0) / clients.length).toFixed(1)
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Clientes</p>
                <p className="text-2xl font-bold">{totalStats.total_clients}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Clientes Ativos</p>
                <p className="text-2xl font-bold text-green-600">{totalStats.active_clients}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">MRR Total</p>
                <p className="text-2xl font-bold">R$ {totalStats.total_mrr.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Comissão Total</p>
                <p className="text-2xl font-bold">R$ {totalStats.total_commission.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Health Score Médio</p>
                <p className={`text-2xl font-bold ${getHealthScoreColor(totalStats.avg_health_score)}`}>
                  {totalStats.avg_health_score}%
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">NPS Médio</p>
                <p className="text-2xl font-bold text-blue-600">{totalStats.avg_nps}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              Meus Clientes Indicados
            </CardTitle>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Buscar clientes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border rounded px-3 py-2"
              >
                <option value="all">Todos os Status</option>
                <option value="Ativo">Ativo</option>
                <option value="Risco">Risco</option>
                <option value="Inativo">Inativo</option>
              </select>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead>MRR</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Health Score</TableHead>
                <TableHead>NPS</TableHead>
                <TableHead>Comissão</TableHead>
                <TableHead>Último Acesso</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-gray-500">{client.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{client.plan}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">R$ {client.mrr}</span>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(client.status).color}>
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        client.health_score >= 80 ? 'bg-green-500' :
                        client.health_score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <span className={getHealthScoreColor(client.health_score)}>
                        {client.health_score}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{client.nps_score}/10</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-green-600">
                      R$ {client.commission_earned.toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-500">
                      {new Date(client.last_login).toLocaleDateString('pt-BR')}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Client Health Alert */}
      <Card className="border-l-4 border-l-yellow-500">
        <CardHeader>
          <CardTitle className="flex items-center text-yellow-700">
            <AlertCircle className="w-5 h-5 mr-2" />
            Atenção Necessária
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-yellow-800">Digital Agency</p>
                <p className="text-sm text-yellow-700">Health Score baixo (45%) - Cliente em risco</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Ligar
                </Button>
                <Button size="sm" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Agendar
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
