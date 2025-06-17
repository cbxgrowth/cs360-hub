
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Calculator, TrendingUp } from 'lucide-react';
import { calculationModels } from '../data/ltvCacData';

export const CalculatorTab: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState('traditional');
  const [parameters, setParameters] = useState({
    arpu: 850,
    churnRate: 3.2,
    customerLifetime: 24
  });

  const activeModel = calculationModels.find(model => model.id === selectedModel);

  const calculateLTV = () => {
    const { arpu, churnRate } = parameters;
    return arpu * (1 / (churnRate / 100 / 12));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-600" />
            Calculadora LTV Personalizada
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>Modelo de Cálculo</Label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {calculationModels.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name} - {model.accuracy}% precisão
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>ARPU Médio (R$)</Label>
              <Input
                type="number"
                value={parameters.arpu}
                onChange={(e) => setParameters({...parameters, arpu: Number(e.target.value)})}
              />
            </div>
            <div>
              <Label>Taxa de Churn Anual (%)</Label>
              <Input
                type="number"
                step="0.1"
                value={parameters.churnRate}
                onChange={(e) => setParameters({...parameters, churnRate: Number(e.target.value)})}
              />
            </div>
          </div>

          <div className="pt-4 border-t text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">LTV Calculado</p>
            <p className="text-3xl font-bold text-green-600">
              R$ {calculateLTV().toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Modelo: {activeModel?.name} ({activeModel?.accuracy}% precisão)
            </p>
          </div>

          <Button className="w-full">
            <TrendingUp className="w-4 h-4 mr-2" />
            Salvar Configuração
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
