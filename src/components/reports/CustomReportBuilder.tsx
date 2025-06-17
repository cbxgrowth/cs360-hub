
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Plus, Settings, BarChart3, PieChart, LineChart, TrendingUp,
  Database, Calendar, Filter, Download, Save, Play, Eye
} from 'lucide-react';

const availableMetrics = [
  { id: 'revenue', name: 'Receita', category: 'financeiro', icon: TrendingUp, color: '#10B981' },
  { id: 'users', name: 'Usuários', category: 'engagement', icon: BarChart3, color: '#3B82F6' },
  { id: 'conversion', name: 'Conversão', category: 'marketing', icon: PieChart, color: '#8B5CF6' },
  { id: 'nps', name: 'NPS', category: 'satisfacao', icon: LineChart, color: '#F59E0B' },
  { id: 'ltv', name: 'LTV', category: 'financeiro', icon: TrendingUp, color: '#EF4444' },
  { id: 'cac', name: 'CAC', category: 'marketing', icon: BarChart3, color: '#06B6D4' }
];

const chartTypes = [
  { id: 'line', name: 'Linha', icon: LineChart, description: 'Ideal para tendências' },
  { id: 'bar', name: 'Barras', icon: BarChart3, description: 'Comparações simples' },
  { id: 'pie', name: 'Pizza', icon: PieChart, description: 'Distribuições' },
  { id: 'area', name: 'Área', icon: TrendingUp, description: 'Volumes ao longo do tempo' }
];

const dataSources = [
  { id: 'analytics', name: 'Google Analytics', status: 'connected', icon: Database },
  { id: 'crm', name: 'CRM Interno', status: 'connected', icon: Database },
  { id: 'finance', name: 'Sistema Financeiro', status: 'pending', icon: Database },
  { id: 'marketing', name: 'Plataforma Marketing', status: 'connected', icon: Database }
];

export const CustomReportBuilder = () => {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [selectedChart, setSelectedChart] = useState('line');
  const [reportName, setReportName] = useState('');
  const [selectedDataSource, setSelectedDataSource] = useState('analytics');
  const [isBuilding, setIsBuilding] = useState(false);

  const handleMetricToggle = (metricId: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metricId) 
        ? prev.filter(id => id !== metricId)
        : [...prev, metricId]
    );
  };

  const handleBuildReport = async () => {
    setIsBuilding(true);
    try {
      // Simulate report building
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Building report with:', {
        name: reportName,
        metrics: selectedMetrics,
        chart: selectedChart,
        dataSource: selectedDataSource
      });
    } finally {
      setIsBuilding(false);
    }
  };

  const getMetricsByCategory = (category: string) => {
    return availableMetrics.filter(metric => metric.category === category);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Construtor de Relatórios
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Crie relatórios personalizados com dados específicos
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button 
                onClick={handleBuildReport}
                disabled={isBuilding || selectedMetrics.length === 0}
                className="bg-gradient-to-r from-indigo-500 to-purple-500"
              >
                <Play className="w-4 h-4 mr-2" />
                {isBuilding ? 'Construindo...' : 'Construir Relatório'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Report Settings */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-blue-600" />
                <span>Configurações do Relatório</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nome do Relatório
                </label>
                <input
                  type="text"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  placeholder="Ex: Análise de Performance Mensal"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Fonte de Dados
                </label>
                <select
                  value={selectedDataSource}
                  onChange={(e) => setSelectedDataSource(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white"
                >
                  {dataSources.map(source => (
                    <option key={source.id} value={source.id} disabled={source.status !== 'connected'}>
                      {source.name} {source.status !== 'connected' && '(Não conectado)'}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Metrics Selection */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-green-600" />
                <span>Métricas</span>
                <Badge>{selectedMetrics.length} selecionadas</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="financeiro" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
                  <TabsTrigger value="marketing">Marketing</TabsTrigger>
                  <TabsTrigger value="engagement">Engagement</TabsTrigger>
                  <TabsTrigger value="satisfacao">Satisfação</TabsTrigger>
                </TabsList>

                {['financeiro', 'marketing', 'engagement', 'satisfacao'].map(category => (
                  <TabsContent key={category} value={category} className="mt-4">
                    <div className="grid grid-cols-2 gap-3">
                      {getMetricsByCategory(category).map(metric => {
                        const Icon = metric.icon;
                        const isSelected = selectedMetrics.includes(metric.id);
                        return (
                          <div
                            key={metric.id}
                            onClick={() => handleMetricToggle(metric.id)}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                              isSelected
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div 
                                className={`p-2 rounded-lg ${isSelected ? 'bg-blue-500' : 'bg-gray-100 dark:bg-gray-700'}`}
                                style={{ backgroundColor: isSelected ? metric.color : undefined }}
                              >
                                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`} />
                              </div>
                              <div>
                                <p className={`font-medium ${isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-gray-900 dark:text-white'}`}>
                                  {metric.name}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          {/* Chart Type Selection */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                <span>Tipo de Gráfico</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {chartTypes.map(chart => {
                  const Icon = chart.icon;
                  const isSelected = selectedChart === chart.id;
                  return (
                    <div
                      key={chart.id}
                      onClick={() => setSelectedChart(chart.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
                      }`}
                    >
                      <div className="text-center">
                        <div className={`inline-flex p-3 rounded-lg mb-3 ${
                          isSelected ? 'bg-purple-500' : 'bg-gray-100 dark:bg-gray-700'
                        }`}>
                          <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`} />
                        </div>
                        <h3 className={`font-medium ${isSelected ? 'text-purple-700 dark:text-purple-300' : 'text-gray-900 dark:text-white'}`}>
                          {chart.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {chart.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          {/* Data Sources Status */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-blue-600" />
                <span>Fontes de Dados</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {dataSources.map(source => {
                const Icon = source.icon;
                return (
                  <div key={source.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {source.name}
                      </span>
                    </div>
                    <Badge className={
                      source.status === 'connected' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }>
                      {source.status === 'connected' ? 'Conectado' : 'Pendente'}
                    </Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Report Summary */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-green-600" />
                <span>Resumo do Relatório</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {reportName || 'Sem nome definido'}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Métricas Selecionadas</p>
                <div className="flex flex-wrap gap-1">
                  {selectedMetrics.length > 0 ? (
                    selectedMetrics.map(metricId => {
                      const metric = availableMetrics.find(m => m.id === metricId);
                      return (
                        <Badge key={metricId} style={{ backgroundColor: `${metric?.color}20`, color: metric?.color }}>
                          {metric?.name}
                        </Badge>
                      );
                    })
                  ) : (
                    <p className="text-sm text-gray-500">Nenhuma métrica selecionada</p>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tipo de Gráfico</p>
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                  {chartTypes.find(c => c.id === selectedChart)?.name}
                </Badge>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fonte de Dados</p>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  {dataSources.find(s => s.id === selectedDataSource)?.name}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="shadow-lg border-0">
            <CardContent className="p-4 space-y-3">
              <Button 
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500"
                disabled={!reportName || selectedMetrics.length === 0}
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar Template
              </Button>
              
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Exportar Configuração
              </Button>
              
              <Button variant="outline" className="w-full">
                <Calendar className="w-4 h-4 mr-2" />
                Agendar Relatório
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
