
import React, { useState } from 'react';
import { Calendar, MessageCircle, Phone, Mail, Video, FileText, AlertTriangle, CheckCircle, Filter, Search } from 'lucide-react';
import { ClientFilter } from '../pages/Clients';

interface ClientsInteractionsProps {
  filters: ClientFilter;
}

const interactionsData = [
  {
    id: 1,
    client: 'TechCorp LTDA',
    clientAvatar: 'TC',
    type: 'call',
    title: 'Reunião de Alinhamento Estratégico',
    description: 'Discussão sobre roadmap 2024 e expansão de serviços',
    date: '2024-01-15T14:30:00',
    duration: '45 min',
    outcome: 'success',
    risk: 'low',
    notes: 'Cliente demonstrou interesse em upgrade para plano Enterprise',
    assignee: 'Maria Santos',
    status: 'concluida'
  },
  {
    id: 2,
    client: 'StartupX',
    clientAvatar: 'SX',
    type: 'email',
    title: 'Follow-up Implementação',
    description: 'Acompanhamento do processo de onboarding',
    date: '2024-01-14T10:15:00',
    duration: null,
    outcome: 'neutral',
    risk: 'medium',
    notes: 'Cliente relatou dificuldades na integração inicial',
    assignee: 'João Silva',
    status: 'pendente'
  },
  {
    id: 3,
    client: 'BigCorp S.A.',
    clientAvatar: 'BC',
    type: 'video',
    title: 'Reunião de Emergência - Renovação',
    description: 'Discussão sobre concerns de renovação de contrato',
    date: '2024-01-13T16:00:00',
    duration: '90 min',
    outcome: 'risk',
    risk: 'high',
    notes: 'Cliente expressou insatisfação com performance do sistema',
    assignee: 'Ana Costa',
    status: 'acao_requerida'
  }
];

const interactionTypes = [
  { id: 'all', name: 'Todas', icon: FileText },
  { id: 'call', name: 'Ligações', icon: Phone },
  { id: 'email', name: 'E-mails', icon: Mail },
  { id: 'video', name: 'Reuniões', icon: Video },
  { id: 'message', name: 'Mensagens', icon: MessageCircle }
];

export const ClientsInteractions: React.FC<ClientsInteractionsProps> = ({ filters }) => {
  const [selectedType, setSelectedType] = useState('all');
  const [dateFilter, setDateFilter] = useState('7d');
  const [searchTerm, setSearchTerm] = useState('');

  const getTypeIcon = (type: string) => {
    const icons = {
      call: Phone,
      email: Mail,
      video: Video,
      message: MessageCircle
    };
    const Icon = icons[type as keyof typeof icons] || FileText;
    return <Icon className="w-4 h-4" />;
  };

  const getOutcomeColor = (outcome: string) => {
    const colors = {
      success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      neutral: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      risk: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };
    return colors[outcome as keyof typeof colors] || colors.neutral;
  };

  const getRiskIcon = (risk: string) => {
    if (risk === 'high') return <AlertTriangle className="w-4 h-4 text-red-500" />;
    if (risk === 'medium') return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    return <CheckCircle className="w-4 h-4 text-green-500" />;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-4">
          <Filter className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Histórico de Interações</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar interações..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {interactionTypes.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>

          {/* Date Filter */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
            <option value="90d">Últimos 90 dias</option>
            <option value="custom">Período personalizado</option>
          </select>

          {/* Export */}
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Exportar Relatório
          </button>
        </div>
      </div>

      {/* Interactions Timeline */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Timeline de Interações</h3>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {interactionsData.map((interaction, index) => (
              <div key={interaction.id} className="relative">
                {/* Timeline line */}
                {index < interactionsData.length - 1 && (
                  <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                )}

                <div className="flex items-start space-x-4">
                  {/* Timeline dot */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    interaction.outcome === 'success' ? 'bg-green-100 text-green-600' :
                    interaction.outcome === 'risk' ? 'bg-red-100 text-red-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {getTypeIcon(interaction.type)}
                  </div>

                  <div className="flex-1 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {interaction.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {interaction.client} • {formatDate(interaction.date)}
                          {interaction.duration && ` • ${interaction.duration}`}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getRiskIcon(interaction.risk)}
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getOutcomeColor(interaction.outcome)}`}>
                          {interaction.outcome === 'success' ? 'Sucesso' :
                           interaction.outcome === 'risk' ? 'Risco' : 'Neutro'}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      {interaction.description}
                    </p>

                    {interaction.notes && (
                      <div className="bg-white dark:bg-gray-800 rounded p-3 mb-3">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <strong>Observações:</strong> {interaction.notes}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Responsável: <strong>{interaction.assignee}</strong>
                      </span>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
                          Ver Detalhes
                        </button>
                        <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                          Adicionar Follow-up
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <button className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              Carregar Mais Interações
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <Phone className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold text-blue-500">23</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Ligações esta semana</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <Mail className="w-8 h-8 text-green-500" />
            <span className="text-2xl font-bold text-green-500">47</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">E-mails enviados</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <Video className="w-8 h-8 text-purple-500" />
            <span className="text-2xl font-bold text-purple-500">12</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Reuniões realizadas</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-8 h-8 text-red-500" />
            <span className="text-2xl font-bold text-red-500">3</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Ações pendentes</p>
        </div>
      </div>
    </div>
  );
};
