
import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Switch } from '../../ui/switch';
import { Separator } from '../../ui/separator';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../ui/popover';
import {
  Settings,
  BarChart3,
  TrendingUp,
  Users,
  Download,
  Upload,
  RotateCcw,
  Eye,
  EyeOff
} from 'lucide-react';

interface DashboardCustomizerProps {
  visibleMetrics: string[];
  visibleCharts: string[];
  visibleSections: string[];
  onToggleMetric: (metric: string) => void;
  onToggleChart: (chart: string) => void;
  onToggleSection: (section: string) => void;
}

const metricOptions = [
  { id: 'clients', label: 'Clientes', icon: Users },
  { id: 'contracts', label: 'Contratos', icon: BarChart3 },
  { id: 'mrr', label: 'MRR', icon: TrendingUp },
  { id: 'goals', label: 'Metas', icon: TrendingUp },
  { id: 'nps', label: 'NPS', icon: BarChart3 },
  { id: 'churn', label: 'Churn', icon: TrendingUp }
];

const chartOptions = [
  { id: 'revenue', label: 'Receita', icon: TrendingUp },
  { id: 'clients', label: 'Clientes', icon: Users },
  { id: 'health', label: 'Health Score', icon: BarChart3 },
  { id: 'tiers', label: 'Tiers', icon: BarChart3 },
  { id: 'nps', label: 'NPS', icon: TrendingUp },
  { id: 'churn', label: 'Churn', icon: TrendingUp },
  { id: 'segments', label: 'Segmentos', icon: BarChart3 }
];

const sectionOptions = [
  { id: 'quickInsights', label: 'Insights Rápidos', icon: Eye },
  { id: 'metrics', label: 'Métricas', icon: BarChart3 },
  { id: 'charts', label: 'Gráficos', icon: TrendingUp },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'sidebar', label: 'Sidebar Info', icon: Eye },
  { id: 'clients', label: 'Gestão Clientes', icon: Users }
];

export const DashboardCustomizer: React.FC<DashboardCustomizerProps> = ({
  visibleMetrics,
  visibleCharts,
  visibleSections,
  onToggleMetric,
  onToggleChart,
  onToggleSection
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          Personalizar Dashboard
          <Badge className="ml-2 bg-blue-100 text-blue-800">
            {visibleSections.length}
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96" align="end">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Personalizar Dashboard</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Seções do Dashboard */}
            <div>
              <h4 className="font-medium mb-3 flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>Seções Visíveis</span>
              </h4>
              <div className="space-y-2">
                {sectionOptions.map(section => (
                  <div key={section.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <section.icon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{section.label}</span>
                    </div>
                    <Switch
                      checked={visibleSections.includes(section.id)}
                      onCheckedChange={() => onToggleSection(section.id)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Métricas */}
            <div>
              <h4 className="font-medium mb-3 flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>Métricas</span>
              </h4>
              <div className="space-y-2">
                {metricOptions.map(metric => (
                  <div key={metric.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <metric.icon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{metric.label}</span>
                    </div>
                    <Switch
                      checked={visibleMetrics.includes(metric.id)}
                      onCheckedChange={() => onToggleMetric(metric.id)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Gráficos */}
            <div>
              <h4 className="font-medium mb-3 flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>Gráficos</span>
              </h4>
              <div className="space-y-2">
                {chartOptions.map(chart => (
                  <div key={chart.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <chart.icon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{chart.label}</span>
                    </div>
                    <Switch
                      checked={visibleCharts.includes(chart.id)}
                      onCheckedChange={() => onToggleChart(chart.id)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Ações */}
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Exportar Configuração
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Importar Configuração
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                <RotateCcw className="w-4 h-4 mr-2" />
                Restaurar Padrão
              </Button>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};
