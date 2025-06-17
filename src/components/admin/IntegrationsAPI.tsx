import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Copy, Key, Settings, Trash2, Plus, Eye, EyeOff, RefreshCw, CheckCircle, XCircle, AlertTriangle, Clock, Zap } from 'lucide-react';
const integrations = [{
  id: '1',
  name: 'Salesforce CRM',
  type: 'CRM',
  status: 'active',
  lastSync: '2024-01-15 14:30',
  description: 'Sincronização de leads e oportunidades',
  logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg',
  color: 'from-blue-500 to-blue-600'
}, {
  id: '2',
  name: 'HubSpot',
  type: 'CRM',
  status: 'active',
  lastSync: '2024-01-15 13:45',
  description: 'Gestão de contatos e campanhas',
  logo: 'https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png',
  color: 'from-orange-500 to-orange-600'
}, {
  id: '3',
  name: 'Stripe',
  type: 'Pagamento',
  status: 'inactive',
  lastSync: 'Nunca',
  description: 'Processamento de pagamentos',
  logo: '💳',
  color: 'from-purple-600 to-indigo-600'
}, {
  id: '4',
  name: 'SAP ERP',
  type: 'ERP',
  status: 'error',
  lastSync: '2024-01-14 10:20',
  description: 'Integração com sistema financeiro',
  logo: '🏭',
  color: 'from-blue-600 to-indigo-700'
}, {
  id: '5',
  name: 'Slack',
  type: 'Comunicação',
  status: 'active',
  lastSync: '2024-01-15 15:00',
  description: 'Notificações e alertas automáticos',
  logo: '💬',
  color: 'from-purple-500 to-pink-500'
}, {
  id: '6',
  name: 'Microsoft Teams',
  type: 'Comunicação',
  status: 'active',
  lastSync: '2024-01-15 14:45',
  description: 'Reuniões e colaboração',
  logo: '🟦',
  color: 'from-blue-600 to-indigo-600'
}, {
  id: '7',
  name: 'Zendesk',
  type: 'Support',
  status: 'active',
  lastSync: '2024-01-15 14:15',
  description: 'Gestão de tickets e suporte',
  logo: '🎧',
  color: 'from-green-600 to-teal-600'
}, {
  id: '8',
  name: 'Power BI',
  type: 'Analytics',
  status: 'active',
  lastSync: '2024-01-15 12:30',
  description: 'Dashboards e relatórios avançados',
  logo: '📊',
  color: 'from-yellow-500 to-orange-500'
}];
const availableIntegrations = [{
  name: 'Gmail',
  category: 'Email',
  logo: '📧',
  color: 'from-red-500 to-pink-500',
  description: 'Sincronização de emails e contatos'
}, {
  name: 'Outlook',
  category: 'Email',
  logo: '📨',
  color: 'from-blue-600 to-indigo-600',
  description: 'Integração com Microsoft 365'
}, {
  name: 'Zapier',
  category: 'Automação',
  logo: '⚡',
  color: 'from-orange-500 to-red-500',
  description: 'Automação de workflows'
}, {
  name: 'Pipedrive',
  category: 'CRM',
  logo: 'https://cdn.worldvectorlogo.com/logos/pipedrive.svg',
  color: 'from-green-500 to-green-600',
  description: 'CRM para equipes de vendas'
}, {
  name: 'Tableau',
  category: 'Analytics',
  logo: '📈',
  color: 'from-blue-500 to-indigo-600',
  description: 'Visualização de dados avançada'
}, {
  name: 'Mixpanel',
  category: 'Analytics',
  logo: '📊',
  color: 'from-purple-500 to-pink-500',
  description: 'Analytics de produto'
}, {
  name: 'Monday.com',
  category: 'Gestão',
  logo: '📅',
  color: 'from-blue-500 to-purple-500',
  description: 'Gestão de projetos'
}, {
  name: 'Asana',
  category: 'Gestão',
  logo: '✅',
  color: 'from-pink-500 to-red-500',
  description: 'Colaboração e tarefas'
}, {
  name: 'WhatsApp Business',
  category: 'Comunicação',
  logo: '💚',
  color: 'from-green-500 to-green-600',
  description: 'Comunicação via WhatsApp'
}, {
  name: 'Oracle',
  category: 'Database',
  logo: '🔴',
  color: 'from-red-600 to-red-700',
  description: 'Banco de dados empresarial'
}, {
  name: 'AWS',
  category: 'Cloud',
  logo: '☁️',
  color: 'from-orange-500 to-yellow-500',
  description: 'Serviços em nuvem'
}, {
  name: 'Google Cloud',
  category: 'Cloud',
  logo: '🌐',
  color: 'from-blue-500 to-green-500',
  description: 'Plataforma Google Cloud'
}];
const apiKeys = [{
  id: '1',
  name: 'Produção - Web App',
  key: 'cs360_prod_abc123***',
  permissions: ['read', 'write'],
  lastUsed: '2024-01-15 14:30',
  status: 'active'
}, {
  id: '2',
  name: 'Desenvolvimento - Mobile',
  key: 'cs360_dev_xyz789***',
  permissions: ['read'],
  lastUsed: '2024-01-14 09:15',
  status: 'active'
}, {
  id: '3',
  name: 'Teste - API Externa',
  key: 'cs360_test_def456***',
  permissions: ['read', 'write', 'admin'],
  lastUsed: '2024-01-10 16:45',
  status: 'revoked'
}];
export const IntegrationsAPI = () => {
  const [showKeys, setShowKeys] = useState<{
    [key: string]: boolean;
  }>({});
  const [isCreateKeyDialogOpen, setIsCreateKeyDialogOpen] = useState(false);
  const [selectedIntegrationCategory, setSelectedIntegrationCategory] = useState('Todos');
  const categories = ['Todos', 'CRM', 'Comunicação', 'Support', 'Analytics', 'Email', 'Automação', 'Cloud'];
  const filteredAvailableIntegrations = selectedIntegrationCategory === 'Todos' ? availableIntegrations : availableIntegrations.filter(integration => integration.category === selectedIntegrationCategory);
  const getStatusBadge = (status: string) => {
    const configs = {
      active: {
        label: 'Ativo',
        className: 'bg-green-100 text-green-800',
        icon: CheckCircle
      },
      inactive: {
        label: 'Inativo',
        className: 'bg-gray-100 text-gray-800',
        icon: Clock
      },
      error: {
        label: 'Erro',
        className: 'bg-red-100 text-red-800',
        icon: AlertTriangle
      },
      revoked: {
        label: 'Revogada',
        className: 'bg-red-100 text-red-800',
        icon: XCircle
      }
    };
    const config = configs[status as keyof typeof configs] || configs.inactive;
    const IconComponent = config.icon;
    return <Badge className={`${config.className} flex items-center gap-1`}>
        <IconComponent className="w-3 h-3" />
        {config.label}
      </Badge>;
  };
  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  const generateNewKey = () => {
    const newKey = `cs360_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    console.log('Nova chave gerada:', newKey);
    setIsCreateKeyDialogOpen(false);
  };
  const renderIntegrationLogo = (integration: any) => {
    if (integration.logo?.startsWith('http')) {
      return <img src={integration.logo} alt={integration.name} className="w-6 h-6 object-contain" />;
    }
    return <span className="text-lg">{integration.logo}</span>;
  };
  return <div className="space-y-8">
      {/* Integrações Disponíveis */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader className="pb-6 bg-transparent">
          <div className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-3 text-2xl">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span>Integrações Disponíveis</span>
              <Badge className="bg-blue-100 text-blue-800">
                {availableIntegrations.length}+ disponíveis
              </Badge>
            </CardTitle>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map(category => <button key={category} onClick={() => setSelectedIntegrationCategory(category)} className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${selectedIntegrationCategory === category ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>
                {category}
              </button>)}
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {filteredAvailableIntegrations.map((integration, index) => <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-300 cursor-pointer bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4 text-center bg-transparent">
                  <div className={`w-12 h-12 bg-gradient-to-r ${integration.color} rounded-xl mx-auto mb-3 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {renderIntegrationLogo(integration)}
                  </div>
                  <div className="font-semibold text-gray-900 text-sm mb-1">{integration.name}</div>
                  <Badge variant="outline" className="text-xs text-gray-500 mb-2">
                    {integration.category}
                  </Badge>
                  <Button size="sm" className="w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    <Plus className="w-3 h-3 mr-1" />
                    Conectar
                  </Button>
                </CardContent>
              </Card>)}
          </div>
        </CardContent>
      </Card>

      {/* Integrações Ativas */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-3 text-xl">
            <Settings className="w-6 h-6" />
            <span>Integrações Ativas</span>
            <Badge className="bg-green-100 text-green-800">
              {integrations.filter(i => i.status === 'active').length} ativas
            </Badge>
          </CardTitle>
          <Button className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500">
            <Plus className="w-4 h-4" />
            <span>Nova Integração</span>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Integração</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Última Sinc.</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {integrations.map(integration => <TableRow key={integration.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 bg-gradient-to-r ${integration.color} rounded-lg flex items-center justify-center shadow-sm`}>
                        {renderIntegrationLogo(integration)}
                      </div>
                      <span>{integration.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{integration.type}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(integration.status)}</TableCell>
                  <TableCell className="text-sm text-gray-500">{integration.lastSync}</TableCell>
                  <TableCell className="text-sm max-w-xs truncate">{integration.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="hover:bg-blue-50">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="hover:bg-green-50">
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Gerenciamento de API Keys */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Key className="w-5 h-5" />
            <span>Chaves de API</span>
          </CardTitle>
          <Dialog open={isCreateKeyDialogOpen} onOpenChange={setIsCreateKeyDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Nova Chave</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Nova Chave de API</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nome da Chave</label>
                  <Input placeholder="Ex: Aplicação Web Produção" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Permissões</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="read" className="rounded" />
                      <label htmlFor="read" className="text-sm">Leitura</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="write" className="rounded" />
                      <label htmlFor="write" className="text-sm">Escrita</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="admin" className="rounded" />
                      <label htmlFor="admin" className="text-sm">Administração</label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateKeyDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={generateNewKey}>Gerar Chave</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Chave</TableHead>
                <TableHead>Permissões</TableHead>
                <TableHead>Último Uso</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map(apiKey => <TableRow key={apiKey.id}>
                  <TableCell className="font-medium">{apiKey.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <code className="px-2 py-1 rounded text-sm bg-transparent">
                        {showKeys[apiKey.id] ? `cs360_prod_abc123def456ghi789` : apiKey.key}
                      </code>
                      <Button variant="ghost" size="sm" onClick={() => toggleKeyVisibility(apiKey.id)}>
                        {showKeys[apiKey.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(apiKey.key)}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {apiKey.permissions.map(permission => <Badge key={permission} variant="outline" className="text-xs">
                          {permission}
                        </Badge>)}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">{apiKey.lastUsed}</TableCell>
                  <TableCell>{getStatusBadge(apiKey.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Políticas de Retenção de Dados */}
      <Card>
        <CardHeader>
          <CardTitle>Políticas de Retenção de Dados (LGPD)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Configurações de Retenção</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Dados de clientes inativos</span>
                  <select className="text-sm border rounded px-2 py-1 bg-transparent">
                    <option>2 anos</option>
                    <option>3 anos</option>
                    <option>5 anos</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Logs de auditoria</span>
                  <select className="text-sm border rounded px-2 py-1 bg-transparent">
                    <option>1 ano</option>
                    <option>2 anos</option>
                    <option>3 anos</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Dados de performance</span>
                  <select className="text-sm border rounded px-2 py-1 bg-transparent">
                    <option>1 ano</option>
                    <option>2 anos</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Conformidade LGPD</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Consentimento documentado</span>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Criptografia de dados pessoais</span>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Direito ao esquecimento</span>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Relatório de impacto</span>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
};