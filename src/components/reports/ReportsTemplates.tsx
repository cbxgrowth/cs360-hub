
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { 
  Download, 
  Eye, 
  Edit, 
  Copy, 
  Share, 
  Settings, 
  Plus, 
  Search,
  Filter,
  BarChart3,
  FileText,
  PieChart,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  AlertTriangle,
  Palette,
  Sparkles,
  Zap
} from 'lucide-react';

const templateCategories = [
  { id: 'all', name: 'Todos', count: 12 },
  { id: 'executive', name: 'Executivos', count: 3 },
  { id: 'operational', name: 'Operacionais', count: 4 },
  { id: 'financial', name: 'Financeiros', count: 2 },
  { id: 'analytics', name: 'Analytics', count: 3 }
];

const templatesData = [
  {
    id: 1,
    name: 'Executive Dashboard',
    description: 'Visão executiva completa com KPIs principais e tendências',
    category: 'executive',
    complexity: 'high',
    estimatedTime: '15-20 min',
    widgets: ['Revenue Trends', 'Customer Growth', 'NPS Evolution', 'Churn Rate'],
    formats: ['PDF', 'PowerPoint', 'Interactive'],
    usage: 156,
    lastUpdated: '2024-06-01',
    status: 'active',
    preview: '/previews/executive-dashboard.png',
    tags: ['kpis', 'trends', 'executive'],
    icon: BarChart3
  },
  {
    id: 2,
    name: 'Customer Health Report',
    description: 'Análise detalhada do health score e segmentação de clientes',
    category: 'operational',
    complexity: 'medium',
    estimatedTime: '10-15 min',
    widgets: ['Health Distribution', 'Risk Matrix', 'Segment Analysis', 'Action Items'],
    formats: ['PDF', 'Excel', 'Email'],
    usage: 234,
    lastUpdated: '2024-05-28',
    status: 'active',
    preview: '/previews/health-report.png',
    tags: ['health', 'customers', 'segmentation'],
    icon: Users
  },
  {
    id: 3,
    name: 'Revenue Growth Analysis',
    description: 'Relatório financeiro com análise de crescimento e oportunidades',
    category: 'financial',
    complexity: 'high',
    estimatedTime: '20-25 min',
    widgets: ['MRR Trends', 'Expansion Revenue', 'Churn Impact', 'Forecasting'],
    formats: ['PDF', 'Excel', 'PowerPoint'],
    usage: 89,
    lastUpdated: '2024-06-05',
    status: 'active',
    preview: '/previews/revenue-analysis.png',
    tags: ['revenue', 'growth', 'financial'],
    icon: DollarSign
  },
  {
    id: 4,
    name: 'Churn Risk Alert',
    description: 'Identificação proativa de clientes em risco com ações recomendadas',
    category: 'operational',
    complexity: 'medium',
    estimatedTime: '8-12 min',
    widgets: ['Risk Score', 'Early Warning', 'Recommendations', 'Contact History'],
    formats: ['PDF', 'Email', 'SMS'],
    usage: 345,
    lastUpdated: '2024-06-10',
    status: 'active',
    preview: '/previews/churn-alert.png',
    tags: ['churn', 'risk', 'alerts'],
    icon: AlertTriangle
  },
  {
    id: 5,
    name: 'Performance Analytics',
    description: 'Métricas de performance da equipe e produtividade',
    category: 'analytics',
    complexity: 'medium',
    estimatedTime: '12-18 min',
    widgets: ['Team Metrics', 'Individual Performance', 'Goals Progress', 'Benchmarks'],
    formats: ['PDF', 'Interactive', 'Excel'],
    usage: 167,
    lastUpdated: '2024-06-07',
    status: 'active',
    preview: '/previews/performance-analytics.png',
    tags: ['performance', 'team', 'productivity'],
    icon: Target
  },
  {
    id: 6,
    name: 'Market Insights',
    description: 'Análise de mercado e posicionamento competitivo',
    category: 'analytics',
    complexity: 'high',
    estimatedTime: '25-30 min',
    widgets: ['Market Trends', 'Competitive Analysis', 'Opportunities', 'Threats'],
    formats: ['PDF', 'PowerPoint'],
    usage: 76,
    lastUpdated: '2024-05-30',
    status: 'draft',
    preview: '/previews/market-insights.png',
    tags: ['market', 'competitive', 'insights'],
    icon: TrendingUp
  }
];

interface ReportsTemplatesProps {
  onCreateCustom?: () => void;
}

export const ReportsTemplates: React.FC<ReportsTemplatesProps> = ({ onCreateCustom }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('usage');

  const getComplexityColor = (complexity: string) => {
    const colors = {
      low: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      high: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
    };
    return colors[complexity as keyof typeof colors] || colors.medium;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      draft: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
      deprecated: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
    };
    return colors[status as keyof typeof colors] || colors.active;
  };

  const filteredTemplates = templatesData
    .filter(template => 
      (selectedCategory === 'all' || template.category === selectedCategory) &&
      (searchTerm === '' || 
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    )
    .sort((a, b) => {
      if (sortBy === 'usage') return b.usage - a.usage;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'updated') return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      return 0;
    });

  return (
    <div className="space-y-6">
      {/* Customization Banner */}
      <Card className="bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-indigo-900/20 border-purple-200 dark:border-purple-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl shadow-lg">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Personalizar 100%
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Crie relatórios únicos com total liberdade de customização
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Avançado
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  <Zap className="w-3 h-3 mr-1" />
                  IA Integrada
                </Badge>
              </div>
              
              <Button 
                onClick={onCreateCustom}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Criar Personalizado
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <BarChart3 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Gráficos Dinâmicos</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">15+ tipos de visualização</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Settings className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Filtros Avançados</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Segmentação inteligente</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                <Share className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Compartilhamento</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Múltiplos formatos</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Templates de Relatórios
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {filteredTemplates.length} templates disponíveis
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="usage">Mais Usados</option>
            <option value="name">Nome</option>
            <option value="updated">Última Atualização</option>
          </select>
          
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
          
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-blue-600 to-purple-600"
            onClick={onCreateCustom}
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Template
          </Button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {templateCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'
            }`}
          >
            {category.name} ({category.count})
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => {
          const Icon = template.icon;
          return (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getStatusColor(template.status)}>
                          {template.status}
                        </Badge>
                        <Badge className={getComplexityColor(template.complexity)}>
                          {template.complexity}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {template.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Tempo estimado:</span>
                    <span className="font-medium">{template.estimatedTime}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Uso:</span>
                    <span className="font-medium">{template.usage} vezes</span>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Widgets inclusos:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.widgets.slice(0, 3).map((widget, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {widget}
                        </Badge>
                      ))}
                      {template.widgets.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{template.widgets.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Formatos:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.formats.map((format, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-blue-50 text-blue-700">
                          {format}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Tags:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                      <Download className="w-4 h-4 mr-1" />
                      Usar
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
