
import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { CreditCard, Check, Crown, Star, Zap } from 'lucide-react';

interface PlanSetupStepProps {
  onComplete: () => void;
}

export const PlanSetupStep: React.FC<PlanSetupStepProps> = ({ onComplete }) => {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 199,
      icon: Zap,
      features: ['Até 100 clientes', 'Dashboard básico', 'NPS automático', '1 usuário'],
      recommended: false
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 499,
      icon: Star,
      features: ['Até 500 clientes', 'IA preditiva', 'Automações', '5 usuários'],
      recommended: true
    },
    {
      id: 'growth',
      name: 'Growth',
      price: 999,
      icon: Crown,
      features: ['Até 2.000 clientes', 'White-label', 'CSM dedicado', '15 usuários'],
      recommended: false
    }
  ];

  const paymentMethods = [
    { value: 'credit_card', label: 'Cartão de Crédito' },
    { value: 'boleto', label: 'Boleto Bancário' },
    { value: 'pix', label: 'PIX' }
  ];

  const selectedPlanData = plans.find(plan => plan.id === selectedPlan);

  const handleComplete = () => {
    if (selectedPlan && paymentMethod) {
      localStorage.setItem('cs360-plan-setup', JSON.stringify({
        plan: selectedPlan,
        paymentMethod
      }));
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <CreditCard className="w-12 h-12 mx-auto text-blue-600 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Escolha seu Plano
        </h2>
        <p className="text-gray-600">
          Selecione o plano ideal para seu negócio
        </p>
      </div>

      {/* Plans Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map(plan => (
          <Card 
            key={plan.id}
            className={`cursor-pointer transition-all ${
              selectedPlan === plan.id 
                ? 'ring-2 ring-blue-500 bg-blue-50' 
                : 'hover:shadow-md'
            } ${plan.recommended ? 'border-blue-500' : ''}`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            <CardHeader className="text-center pb-4">
              {plan.recommended && (
                <Badge className="mb-2 bg-blue-600 text-white w-fit mx-auto">
                  Mais Popular
                </Badge>
              )}
              <plan.icon className="w-8 h-8 mx-auto text-blue-600 mb-2" />
              <CardTitle className="text-lg">{plan.name}</CardTitle>
              <div className="text-2xl font-bold text-gray-900">
                R$ {plan.price}
                <span className="text-sm font-normal text-gray-600">/mês</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment Method */}
      {selectedPlan && (
        <Card className="bg-gray-50">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Método de Pagamento</h3>
            
            <div className="space-y-3">
              <Label>Escolha como deseja pagar</Label>
              <Select onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o método de pagamento" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map(method => (
                    <SelectItem key={method.value} value={method.value}>
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedPlanData && (
              <div className="mt-4 p-4 bg-white rounded-lg border">
                <h4 className="font-medium text-gray-900 mb-2">Resumo do Pedido</h4>
                <div className="flex justify-between items-center">
                  <span>Plano {selectedPlanData.name}</span>
                  <span className="font-bold">R$ {selectedPlanData.price}/mês</span>
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  ✨ Primeiros 14 dias grátis
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end">
        <Button 
          onClick={handleComplete}
          disabled={!selectedPlan || !paymentMethod}
          className="bg-gradient-to-r from-green-600 to-emerald-600"
        >
          Confirmar Plano e Continuar
        </Button>
      </div>
    </div>
  );
};
