
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Label } from '../../../ui/label';
import { Input } from '../../../ui/input';
import { Switch } from '../../../ui/switch';
import { Slider } from '../../../ui/slider';
import { DollarSign, Percent, Calendar, TrendingUp } from 'lucide-react';

interface Parameters {
  arpu: number;
  churnRate: number;
  discountRate: number;
  growthRate: number;
  includeUpsell: boolean;
  includeExpansion: boolean;
  timeHorizon: number;
}

interface ParametersConfigurationProps {
  parameters: Parameters;
  onParametersChange: (parameters: Parameters) => void;
  calculatedLTV: number;
}

export const ParametersConfiguration: React.FC<ParametersConfigurationProps> = ({
  parameters,
  onParametersChange,
  calculatedLTV
}) => {
  const updateParameter = (key: keyof Parameters, value: any) => {
    onParametersChange({
      ...parameters,
      [key]: value
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-600" />
          Configuração de Parâmetros
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* ARPU */}
        <div className="space-y-2">
          <Label htmlFor="arpu" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            ARPU (Average Revenue Per User)
          </Label>
          <Input
            id="arpu"
            type="number"
            value={parameters.arpu}
            onChange={(e) => updateParameter('arpu', parseFloat(e.target.value) || 0)}
            placeholder="Receita média por usuário"
          />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            R$ {parameters.arpu.toLocaleString()} / mês
          </p>
        </div>

        {/* Churn Rate */}
        <div className="space-y-2">
          <Label htmlFor="churnRate" className="flex items-center gap-2">
            <Percent className="w-4 h-4" />
            Taxa de Churn (% anual)
          </Label>
          <div className="space-y-2">
            <Slider
              value={[parameters.churnRate]}
              onValueChange={(value) => updateParameter('churnRate', value[0])}
              max={50}
              min={0}
              step={0.1}
              className="w-full"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {parameters.churnRate}% ao ano
            </p>
          </div>
        </div>

        {/* Discount Rate */}
        <div className="space-y-2">
          <Label htmlFor="discountRate" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Taxa de Desconto (% anual)
          </Label>
          <div className="space-y-2">
            <Slider
              value={[parameters.discountRate]}
              onValueChange={(value) => updateParameter('discountRate', value[0])}
              max={20}
              min={0}
              step={0.5}
              className="w-full"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {parameters.discountRate}% ao ano
            </p>
          </div>
        </div>

        {/* Growth Rate */}
        <div className="space-y-2">
          <Label htmlFor="growthRate" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Taxa de Crescimento da Receita (% anual)
          </Label>
          <div className="space-y-2">
            <Slider
              value={[parameters.growthRate]}
              onValueChange={(value) => updateParameter('growthRate', value[0])}
              max={30}
              min={-10}
              step={0.5}
              className="w-full"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {parameters.growthRate >= 0 ? '+' : ''}{parameters.growthRate}% ao ano
            </p>
          </div>
        </div>

        {/* Time Horizon */}
        <div className="space-y-2">
          <Label htmlFor="timeHorizon" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Horizonte Temporal (meses)
          </Label>
          <div className="space-y-2">
            <Slider
              value={[parameters.timeHorizon]}
              onValueChange={(value) => updateParameter('timeHorizon', value[0])}
              max={60}
              min={12}
              step={1}
              className="w-full"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {parameters.timeHorizon} meses ({(parameters.timeHorizon / 12).toFixed(1)} anos)
            </p>
          </div>
        </div>

        {/* Advanced Options */}
        <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="font-medium text-gray-900 dark:text-white">
            Opções Avançadas
          </h4>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="includeUpsell">Incluir Upsell</Label>
            <Switch
              id="includeUpsell"
              checked={parameters.includeUpsell}
              onCheckedChange={(checked) => updateParameter('includeUpsell', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="includeExpansion">Incluir Expansão de Conta</Label>
            <Switch
              id="includeExpansion"
              checked={parameters.includeExpansion}
              onCheckedChange={(checked) => updateParameter('includeExpansion', checked)}
            />
          </div>
        </div>

        {/* Calculated LTV Display */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-green-600 mb-1">
                LTV Calculado
              </p>
              <p className="text-3xl font-bold text-green-700">
                R$ {(calculatedLTV / 1000).toFixed(0)}k
              </p>
              <p className="text-xs text-green-600 mt-1">
                Por cliente
              </p>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};
