
import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Separator } from '../../ui/separator';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../ui/popover';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import { 
  Settings, 
  Download,
  Upload,
  RotateCcw,
  Check,
  FileText,
  Sparkles,
  Eye,
  Monitor,
  Palette
} from 'lucide-react';
import { CustomizerTabs } from './CustomizerTabs';

interface AdvancedDashboardCustomizerProps {
  onToggleMetric: (metricId: string) => void;
  onToggleChart: (chartId: string) => void;
  onToggleSection: (sectionId: string) => void;
  visibleMetrics: string[];
  visibleCharts: string[];
  visibleSections: string[];
  onExportConfig: () => void;
  onImportConfig: (file: File) => void;
  onResetToDefault: () => void;
}

export const AdvancedDashboardCustomizer = ({
  onToggleMetric,
  onToggleChart,
  onToggleSection,
  visibleMetrics,
  visibleCharts,
  visibleSections,
  onExportConfig,
  onImportConfig,
  onResetToDefault
}: AdvancedDashboardCustomizerProps) => {
  const [open, setOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImportConfig(file);
      setImportDialogOpen(false);
    }
  };

  const totalElements = visibleMetrics.length + visibleCharts.length + visibleSections.length;
  const maxElements = 16 + 8 + 6; // Total de métricas + gráficos + seções disponíveis
  const visibilityPercentage = Math.round((totalElements / maxElements) * 100);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 border-2 hover:border-blue-300 dark:hover:border-blue-600"
          >
            <div className="flex items-center space-x-2">
              <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded">
                <Settings className="w-3 h-3 text-white" />
              </div>
              <span className="font-medium">Personalizar</span>
              <Badge 
                variant="secondary" 
                className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-xs"
              >
                {visibilityPercentage}%
              </Badge>
            </div>
          </Button>
        </PopoverTrigger>
        
        <PopoverContent className="w-[600px] p-0" align="end">
          <Card className="border-0 shadow-2xl">
            <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                    <Palette className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">
                      Dashboard Personalizado
                    </CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Configure elementos visíveis e organize sua experiência
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant="outline" 
                    className="bg-white/50 dark:bg-gray-800/50 flex items-center space-x-1"
                  >
                    <Eye className="w-3 h-3" />
                    <span>{totalElements} elementos</span>
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              {/* Stats Summary */}
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {visibleMetrics.length}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Métricas Ativas
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {visibleCharts.length}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Gráficos Ativos
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {visibleSections.length}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Seções Ativas
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Configuration */}
              <CustomizerTabs
                visibleMetrics={visibleMetrics}
                visibleCharts={visibleCharts}
                visibleSections={visibleSections}
                onToggleMetric={onToggleMetric}
                onToggleChart={onToggleChart}
                onToggleSection={onToggleSection}
              />
            </CardContent>

            <Separator />

            {/* Action Buttons */}
            <div className="p-6 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                  <Sparkles className="w-3 h-3 text-blue-500" />
                  <span>Configurações salvas automaticamente</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={onExportConfig}
                    className="text-xs hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Exportar
                  </Button>
                  
                  <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-xs hover:bg-green-50 dark:hover:bg-green-900/20"
                      >
                        <Upload className="w-3 h-3 mr-1" />
                        Importar
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Importar Configuração</DialogTitle>
                        <DialogDescription>
                          Selecione um arquivo de configuração (.json) para importar suas preferências.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <input
                          id="config-file"
                          type="file"
                          accept=".json"
                          onChange={handleFileImport}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={onResetToDefault}
                    className="text-xs hover:bg-orange-50 dark:hover:bg-orange-900/20"
                  >
                    <RotateCcw className="w-3 h-3 mr-1" />
                    Resetar
                  </Button>
                  
                  <Button 
                    size="sm" 
                    className="text-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" 
                    onClick={() => setOpen(false)}
                  >
                    <Check className="w-3 h-3 mr-1" />
                    Concluído
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </PopoverContent>
      </Popover>
    </>
  );
};
