
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { 
  Settings, 
  BarChart3,
  Users,
  DollarSign,
  Star,
  TrendingUp,
  Activity,
  Target,
  AlertTriangle,
  Layout,
  PieChart,
  Sidebar,
  FileText,
  RefreshCw,
  Download,
  Eye,
  EyeOff,
  RotateCcw,
  Check
} from 'lucide-react';

interface DashboardCustomizerProps {
  onToggleMetric: (metricId: string) => void;
  onToggleChart: (chartId: string) => void;
  onToggleSection: (sectionId: string) => void;
  visibleMetrics: string[];
  visibleCharts: string[];
  visibleSections: string[];
}

const metricOptions = [
  { 
    id: 'clients', 
    name: 'Clientes Ativos', 
    icon: Users, 
    description: 'Total de clientes ativos no sistema',
    category: 'Clientes'
  },
  { 
    id: 'contracts', 
    name: 'Contratos Vigentes', 
    icon: FileText, 
    description: 'Contratos ativos e em andamento',
    category: 'Contratos'
  },
  { 
    id: 'mrr', 
    name: 'Receita Recorrente (MRR)', 
    icon: DollarSign, 
    description: 'Receita mensal recorrente',
    category: 'Financeiro'
  },
  { 
    id: 'goals', 
    name: 'Metas Alcançadas', 
    icon: Target, 
    description: 'Progresso das metas estabelecidas',
    category: 'Performance'
  },
  { 
    id: 'nps', 
    name: 'Net Promoter Score', 
    icon: Star, 
    description: 'Índice de satisfação dos clientes',
    category: 'Satisfação'
  },
  { 
    id: 'churn', 
    name: 'Taxa de Churn', 
    icon: TrendingUp, 
    description: 'Taxa de cancelamento de clientes',
    category: 'Retenção'
  },
  { 
    id: 'health', 
    name: 'Health Score', 
    icon: Activity, 
    description: 'Pontuação de saúde geral dos clientes',
    category: 'Saúde'
  },
  { 
    id: 'alerts', 
    name: 'Alertas Ativos', 
    icon: AlertTriangle, 
    description: 'Alertas que requerem atenção imediata',
    category: 'Alertas'
  }
];

const chartOptions = [
  { 
    id: 'revenue', 
    name: 'Crescimento de Receita', 
    icon: DollarSign, 
    description: 'Evolução da receita (MRR, ARR)',
    category: 'Financeiro'
  },
  { 
    id: 'clients', 
    name: 'Evolução de Clientes', 
    icon: Users, 
    description: 'Novos clientes vs. Churn',
    category: 'Clientes'
  },
  { 
    id: 'health', 
    name: 'Health Score por Segmento', 
    icon: Activity, 
    description: 'Distribuição do health score',
    category: 'Análise'
  },
  { 
    id: 'tiers', 
    name: 'Distribuição por Tier', 
    icon: Star, 
    description: 'Clientes organizados por categoria',
    category: 'Segmentação'
  },
  { 
    id: 'nps', 
    name: 'Analytics NPS', 
    icon: Star, 
    description: 'Análise detalhada do NPS',
    category: 'Satisfação'
  },
  { 
    id: 'churn', 
    name: 'Análise de Churn', 
    icon: TrendingUp, 
    description: 'Tendências de cancelamento',
    category: 'Retenção'
  }
];

const sectionOptions = [
  { 
    id: 'quickInsights', 
    name: 'Quick Insights', 
    icon: BarChart3, 
    description: 'Insights rápidos e alertas importantes',
    category: 'Visão Geral'
  },
  { 
    id: 'metrics', 
    name: 'Métricas Principais', 
    icon: Target, 
    description: 'Cards com indicadores principais',
    category: 'Indicadores'
  },
  { 
    id: 'charts', 
    name: 'Gráficos Principais', 
    icon: PieChart, 
    description: 'Visualizações do dashboard principal',
    category: 'Visualizações'
  },
  { 
    id: 'analytics', 
    name: 'Analytics Avançado', 
    icon: TrendingUp, 
    description: 'Análises detalhadas e aprofundadas',
    category: 'Análises'
  },
  { 
    id: 'sidebar', 
    name: 'Painel Lateral', 
    icon: Sidebar, 
    description: 'Informações complementares na lateral',
    category: 'Layout'
  },
  { 
    id: 'clients', 
    name: 'Gestão de Clientes', 
    icon: Users, 
    description: 'Seção completa de gestão de clientes',
    category: 'Gestão'
  }
];

export const DashboardCustomizer = ({ 
  onToggleMetric, 
  onToggleChart, 
  onToggleSection,
  visibleMetrics, 
  visibleCharts,
  visibleSections 
}: DashboardCustomizerProps) => {
  const [open, setOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleToggleMetric = (metricId: string) => {
    onToggleMetric(metricId);
    setHasChanges(true);
  };

  const handleToggleChart = (chartId: string) => {
    onToggleChart(chartId);
    setHasChanges(true);
  };

  const handleToggleSection = (sectionId: string) => {
    onToggleSection(sectionId);
    setHasChanges(true);
  };

  const resetToDefault = () => {
    // Reset para configuração padrão
    metricOptions.slice(0, 4).forEach(metric => {
      if (!visibleMetrics.includes(metric.id)) {
        onToggleMetric(metric.id);
      }
    });
    chartOptions.slice(0, 4).forEach(chart => {
      if (!visibleCharts.includes(chart.id)) {
        onToggleChart(chart.id);
      }
    });
    sectionOptions.forEach(section => {
      if (!visibleSections.includes(section.id)) {
        onToggleSection(section.id);
      }
    });
    setHasChanges(false);
  };

  const SectionToggle = ({ 
    item, 
    isVisible, 
    onToggle, 
    type 
  }: { 
    item: any, 
    isVisible: boolean, 
    onToggle: () => void,
    type: 'metric' | 'chart' | 'section'
  }) => (
    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${
          type === 'metric' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
          type === 'chart' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' :
          'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
        }`}>
          <item.icon className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {item.name}
            </p>
            {item.category && (
              <Badge variant="outline" className="text-xs px-2 py-0.5">
                {item.category}
              </Badge>
            )}
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            {item.description}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {isVisible ? (
          <Eye className="w-4 h-4 text-green-500" />
        ) : (
          <EyeOff className="w-4 h-4 text-gray-400" />
        )}
        <Switch
          checked={isVisible}
          onCheckedChange={onToggle}
        />
      </div>
    </div>
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all relative"
        >
          <Settings className="w-4 h-4 mr-2" />
          Personalizar
          {hasChanges && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[480px] p-0" align="end">
        <Card className="border-0 shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg text-gray-900 dark:text-white">
                    Personalizar Dashboard
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Configure os elementos que deseja visualizar
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
                ×
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <Tabs defaultValue="sections" className="w-full">
              <div className="px-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="sections" className="flex items-center space-x-2">
                    <Layout className="w-4 h-4" />
                    <span>Seções</span>
                  </TabsTrigger>
                  <TabsTrigger value="metrics" className="flex items-center space-x-2">
                    <BarChart3 className="w-4 h-4" />
                    <span>Métricas</span>
                  </TabsTrigger>
                  <TabsTrigger value="charts" className="flex items-center space-x-2">
                    <PieChart className="w-4 h-4" />
                    <span>Gráficos</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="px-6 py-4 max-h-96 overflow-y-auto">
                <TabsContent value="sections" className="space-y-4 mt-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      Seções do Dashboard
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {visibleSections.length}/{sectionOptions.length} ativas
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    {sectionOptions.map((section) => (
                      <SectionToggle
                        key={section.id}
                        item={section}
                        isVisible={visibleSections.includes(section.id)}
                        onToggle={() => handleToggleSection(section.id)}
                        type="section"
                      />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="metrics" className="space-y-4 mt-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      Indicadores Principais
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {visibleMetrics.length}/{metricOptions.length} ativos
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    {metricOptions.map((metric) => (
                      <SectionToggle
                        key={metric.id}
                        item={metric}
                        isVisible={visibleMetrics.includes(metric.id)}
                        onToggle={() => handleToggleMetric(metric.id)}
                        type="metric"
                      />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="charts" className="space-y-4 mt-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      Gráficos Analytics
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {visibleCharts.length}/{chartOptions.length} ativos
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    {chartOptions.map((chart) => (
                      <SectionToggle
                        key={chart.id}
                        item={chart}
                        isVisible={visibleCharts.includes(chart.id)}
                        onToggle={() => handleToggleChart(chart.id)}
                        type="chart"
                      />
                    ))}
                  </div>
                </TabsContent>
              </div>
            </Tabs>

            <Separator />

            <div className="p-6 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                  <Check className="w-3 h-3 text-green-500" />
                  <span>As alterações são salvas automaticamente</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs"
                    onClick={resetToDefault}
                  >
                    <RotateCcw className="w-3 h-3 mr-1" />
                    Resetar
                  </Button>
                  <Button 
                    size="sm" 
                    className="text-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" 
                    onClick={() => {
                      setOpen(false);
                      setHasChanges(false);
                    }}
                  >
                    <Check className="w-3 h-3 mr-1" />
                    Concluído
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};
