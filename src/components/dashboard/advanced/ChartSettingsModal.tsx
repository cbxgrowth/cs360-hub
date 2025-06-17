
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Switch } from '../../ui/switch';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Slider } from '../../ui/slider';
import { Badge } from '../../ui/badge';
import { Settings, Palette, BarChart3, Eye, Target, Zap } from 'lucide-react';

interface ChartSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: {
    showPredictions: boolean;
    showAnomalies: boolean;
    showTarget: boolean;
    chartType: 'area' | 'line' | 'bar';
    color: string;
    height: number;
    refreshInterval: number;
  };
  onSettingsChange: (settings: any) => void;
}

export const ChartSettingsModal = ({
  open,
  onOpenChange,
  settings,
  onSettingsChange
}: ChartSettingsModalProps) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSave = () => {
    onSettingsChange(localSettings);
    onOpenChange(false);
  };

  const colorOptions = [
    { value: '#3B82F6', label: 'Azul', color: 'bg-blue-500' },
    { value: '#10B981', label: 'Verde', color: 'bg-green-500' },
    { value: '#8B5CF6', label: 'Roxo', color: 'bg-purple-500' },
    { value: '#F59E0B', label: 'Amarelo', color: 'bg-yellow-500' },
    { value: '#EF4444', label: 'Vermelho', color: 'bg-red-500' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Configurações do Gráfico</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Configurações de Exibição */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              Elementos Visuais
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="predictions" className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-purple-500" />
                  <span>Mostrar Previsões</span>
                </Label>
                <Switch
                  id="predictions"
                  checked={localSettings.showPredictions}
                  onCheckedChange={(checked) => 
                    setLocalSettings(prev => ({ ...prev, showPredictions: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="anomalies" className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-red-500" />
                  <span>Detectar Anomalias</span>
                </Label>
                <Switch
                  id="anomalies"
                  checked={localSettings.showAnomalies}
                  onCheckedChange={(checked) => 
                    setLocalSettings(prev => ({ ...prev, showAnomalies: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="target" className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-orange-500" />
                  <span>Linha de Meta</span>
                </Label>
                <Switch
                  id="target"
                  checked={localSettings.showTarget}
                  onCheckedChange={(checked) => 
                    setLocalSettings(prev => ({ ...prev, showTarget: checked }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Tipo de Gráfico */}
          <div className="space-y-3">
            <Label className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Tipo de Gráfico</span>
            </Label>
            <Select
              value={localSettings.chartType}
              onValueChange={(value: 'area' | 'line' | 'bar') => 
                setLocalSettings(prev => ({ ...prev, chartType: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="area">Área</SelectItem>
                <SelectItem value="line">Linha</SelectItem>
                <SelectItem value="bar">Barras</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Cor do Gráfico */}
          <div className="space-y-3">
            <Label className="flex items-center space-x-2">
              <Palette className="w-4 h-4" />
              <span>Cor Principal</span>
            </Label>
            <div className="flex space-x-2">
              {colorOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => 
                    setLocalSettings(prev => ({ ...prev, color: option.value }))
                  }
                  className={`w-8 h-8 rounded-full ${option.color} border-2 transition-all ${
                    localSettings.color === option.value 
                      ? 'border-gray-900 dark:border-white scale-110' 
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  title={option.label}
                />
              ))}
            </div>
          </div>

          {/* Altura do Gráfico */}
          <div className="space-y-3">
            <Label>Altura do Gráfico: {localSettings.height}px</Label>
            <Slider
              value={[localSettings.height]}
              onValueChange={([value]) => 
                setLocalSettings(prev => ({ ...prev, height: value }))
              }
              min={250}
              max={500}
              step={50}
              className="w-full"
            />
          </div>

          {/* Intervalo de Atualização */}
          <div className="space-y-3">
            <Label>Atualização Automática</Label>
            <Select
              value={localSettings.refreshInterval.toString()}
              onValueChange={(value) => 
                setLocalSettings(prev => ({ ...prev, refreshInterval: parseInt(value) }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5000">5 segundos</SelectItem>
                <SelectItem value="10000">10 segundos</SelectItem>
                <SelectItem value="30000">30 segundos</SelectItem>
                <SelectItem value="60000">1 minuto</SelectItem>
                <SelectItem value="0">Desabilitado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Salvar Configurações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
