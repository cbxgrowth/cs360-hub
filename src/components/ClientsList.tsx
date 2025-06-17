
import React, { useState } from 'react';
import { Search, Download, Plus, Eye, Edit, MessageCircle, AlertTriangle, CheckCircle, Star, TrendingUp, TrendingDown } from 'lucide-react';
import { ClientFilter } from '../pages/Clients';

interface ClientsListProps {
  filters: ClientFilter;
}

const clientsData = [
  {
    id: 1,
    name: 'TechCorp LTDA',
    avatar: 'TC',
    contact: 'Maria Silva',
    email: 'maria@techcorp.com',
    phone: '+55 11 99999-9999',
    level: 'A',
    profile: 'Arrojado',
    status: 'Ativo',
    nps: 85,
    npsCategory: 'Promotor',
    ltv: 120000,
    ltvProjected: 150000,
    cac: 3500,
    contractStart: '2023-01-15',
    contractEnd: '2024-12-15',
    trust: 3,
    services: 5,
    additionalServices: 2,
    riskScore: 15,
    lastInteraction: '2024-01-15',
    avatar_bg: 'from-blue-500 to-purple-600'
  },
  {
    id: 2,
    name: 'StartupX',
    avatar: 'SX',
    contact: 'João Santos',
    email: 'joao@startupx.com',
    phone: '+55 11 88888-8888',
    level: 'B',
    profile: 'Moderado',
    status: 'Ativo',
    nps: 45,
    npsCategory: 'Passivo',
    ltv: 45000,
    ltvProjected: 60000,
    cac: 2800,
    contractStart: '2023-06-20',
    contractEnd: '2024-08-20',
    trust: 2,
    services: 2,
    additionalServices: 0,
    riskScore: 65,
    lastInteraction: '2024-01-10',
    avatar_bg: 'from-green-500 to-teal-600'
  },
  {
    id: 3,
    name: 'BigCorp S.A.',
    avatar: 'BC',
    contact: 'Ana Costa',
    email: 'ana@bigcorp.com',
    phone: '+55 11 77777-7777',
    level: 'A',
    profile: 'Conservador',
    status: 'Risco',
    nps: 25,
    npsCategory: 'Detrator',
    ltv: 200000,
    ltvProjected: 180000,
    cac: 4200,
    contractStart: '2022-03-10',
    contractEnd: '2024-06-30',
    trust: 1,
    services: 8,
    additionalServices: 3,
    riskScore: 85,
    lastInteraction: '2024-01-05',
    avatar_bg: 'from-red-500 to-pink-600'
  }
];

export const ClientsList: React.FC<ClientsListProps> = ({ filters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const getTrustStars = (trust: number) => {
    return Array.from({ length: 3 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < trust ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getNPSIcon = (category: string) => {
    if (category === 'Promotor') return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (category === 'Detrator') return <TrendingDown className="w-4 h-4 text-red-600" />;
    return null;
  };

  const getStatusIcon = (status: string) => {
    if (status === 'Ativo') return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (status === 'Risco') return <AlertTriangle className="w-4 h-4 text-red-600" />;
    return null;
  };

  const getRiskColor = (score: number) => {
    if (score <= 30) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (score <= 60) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Lista de Clientes</h3>
          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </button>
            <button className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              Novo Cliente
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar por nome, email ou contato..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="name">Ordenar por Nome</option>
            <option value="nps">Ordenar por NPS</option>
            <option value="ltv">Ordenar por LTV</option>
            <option value="risk">Ordenar por Risco</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Cliente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Perfil/Nível</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">NPS</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">LTV</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Confiança</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Serviços</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Risco</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {clientsData.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${client.avatar_bg} flex items-center justify-center mr-3`}>
                      <span className="text-white font-medium text-sm">{client.avatar}</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{client.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{client.contact}</div>
                      <div className="text-xs text-gray-400 dark:text-gray-500">{client.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Nível {client.level}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{client.profile}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <span className={`text-lg font-semibold ${
                      client.npsCategory === 'Promotor' ? 'text-green-600 dark:text-green-400' :
                      client.npsCategory === 'Passivo' ? 'text-yellow-600 dark:text-yellow-400' :
                      'text-red-600 dark:text-red-400'
                    }`}>
                      {client.nps}
                    </span>
                    {getNPSIcon(client.npsCategory)}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{client.npsCategory}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    R$ {(client.ltv / 1000).toFixed(0)}k
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Proj: R$ {(client.ltvProjected / 1000).toFixed(0)}k
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-1">
                    {getTrustStars(client.trust)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {client.services} ativos
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    +{client.additionalServices} adicionais
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(client.riskScore)}`}>
                    {client.riskScore}%
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(client.status)}
                    <span className={`text-sm ${
                      client.status === 'Ativo' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {client.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Mostrando 1-3 de 247 clientes
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors">
              Anterior
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors">
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
