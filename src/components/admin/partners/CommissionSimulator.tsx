
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Calculator, TrendingUp } from 'lucide-react';

export const CommissionSimulator = () => {
  const [simulation, setSimulation] = useState({
    partnerType: '',
    partnerLevel: '',
    plan: '',
    mrr: 0
  });

  const calculateCommission = () => {
    const commissionRates: { [key: string]: { [key: string]: number } } = {
      'indicacao': { 'starter': 10, 'member': 10, 'gold': 10, 'platinum': 15, 'elite': 15 },
      'revenda': { 'starter': 20, 'member': 25, 'gold': 30, 'platinum': 35, 'elite': 40 },
      'implementadora': { 'starter': 25, 'member': 30, 'gold': 35, 'platinum': 40, 'elite': 40 }
    };

    const rate = commissionRates[simulation.partnerType]?.[simulation.partnerLevel] || 0;
    return (simulation.mrr * rate) / 100;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="w-5 h-5" />
            <span>Simulador de Comissões</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Tipo de Parceria</Label>
            <Select value={simulation.partnerType} onValueChange={(value) => setSimulation({...simulation, partnerType: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="indicacao">Indicação</SelectItem>
                <SelectItem value="revenda">Revenda</SelectItem>
                <SelectItem value="implementadora">Implementadora</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Nível do Parceiro</Label>
            <Select value={simulation.partnerLevel} onValueChange={(value) => setSimulation({...simulation, partnerLevel: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o nível" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="starter">Starter</SelectItem>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="gold">Gold</SelectItem>
                <SelectItem value="platinum">Platinum</SelectItem>
                <SelectItem value="elite">Elite</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>MRR Gerado (R$)</Label>
            <Input 
              type="number" 
              value={simulation.mrr} 
              onChange={(e) => setSimulation({...simulation, mrr: Number(e.target.value)})}
              placeholder="Ex: 5000"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Resultado da Simulação</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">
                R$ {calculateCommission().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-sm text-muted-foreground mt-1">Comissão Mensal</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Comissão Anual:</span>
                <div className="font-semibold">R$ {(calculateCommission() * 12).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Taxa Aplicada:</span>
                <div className="font-semibold">
                  {simulation.partnerType && simulation.partnerLevel ? 
                    `${(() => {
                      const rates: { [key: string]: { [key: string]: number } } = {
                        'indicacao': { 'starter': 10, 'member': 10, 'gold': 10, 'platinum': 15, 'elite': 15 },
                        'revenda': { 'starter': 20, 'member': 25, 'gold': 30, 'platinum': 35, 'elite': 40 },
                        'implementadora': { 'starter': 25, 'member': 30, 'gold': 35, 'platinum': 40, 'elite': 40 }
                      };
                      return rates[simulation.partnerType]?.[simulation.partnerLevel] || 0;
                    })()}%` 
                    : '--'
                  }
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
