import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Crown, CheckCircle, TrendingUp, Zap, Users, Building2 } from 'lucide-react';
import { CheckoutModal } from './CheckoutModal';

interface Plan {
  name: string;
  price: number;
  description: string;
  features: string[];
  icon: any;
  color: string;
  popular?: boolean;
}

interface UpgradePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: string;
  onSuccess?: () => void;
}

const PLANS: Plan[] = [
  {
    name: 'Starter',
    price: 299,
    description: 'Ideal para pequenas equipes de CS',
    icon: Users,
    color: 'from-blue-500 to-blue-600',
    features: [
      'Até 50 clientes ativos',
      '1 usuário incluído',
      'Dashboard básico',
      'NPS automático mensal',
      '10 Créditos IA/mês'
    ]
  },
  {
    name: 'Professional',
    price: 799,
    description: 'Para equipes em crescimento',
    icon: Zap,
    color: 'from-purple-500 to-purple-600',
    popular: true,
    features: [
      'Até 150 clientes ativos',
      '5 usuários incluídos',
      'Dashboard avançado com IA',
      'Automações ilimitadas',
      'IA preditiva 85% precisão',
      '30 Créditos IA/mês'
    ]
  },
  {
    name: 'Growth',
    price: 1599,
    description: 'Para empresas em aceleração',
    icon: TrendingUp,
    color: 'from-emerald-500 to-emerald-600',
    features: [
      'Até 500 clientes ativos',
      '15 usuários incluídos',
      'IA preditiva 95% precisão',
      'CSM dedicado',
      'API completa',
      '50 Créditos IA/mês'
    ]
  },
  {
    name: 'Enterprise',
    price: 0,
    description: 'Solução corporativa',
    icon: Building2,
    color: 'from-orange-500 to-red-500',
    features: [
      'Clientes ilimitados',
      'Usuários ilimitados',
      'IA personalizada',
      'Suporte 24/7/365',
      'Créditos IA ilimitados'
    ]
  }
];

export const UpgradePlanModal = ({ 
  isOpen, 
  onClose, 
  currentPlan,
  onSuccess 
}: UpgradePlanModalProps) => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const handlePlanSelect = (plan: Plan) => {
    if (plan.name === 'Enterprise') {
      // Redirecionar para contato com vendas
      window.open('https://wa.me/88988432310?text=Olá! Gostaria de falar sobre o plano Enterprise', '_blank');
      return;
    }

    setSelectedPlan(plan);
    setShowCheckout(true);
  };

  const handleCheckoutSuccess = () => {
    onSuccess?.();
    setShowCheckout(false);
    onClose();
  };

  const isPlanCurrent = (planName: string) => planName === currentPlan;
  const isPlanDowngrade = (planName: string) => {
    const planOrder = ['Starter', 'Professional', 'Growth', 'Enterprise'];
    const currentIndex = planOrder.indexOf(currentPlan);
    const targetIndex = planOrder.indexOf(planName);
    return targetIndex < currentIndex;
  };

  return (
    <>
      <Dialog open={isOpen && !showCheckout} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Crown className="w-6 h-6 text-yellow-500" />
              Escolha Seu Plano
            </DialogTitle>
            <DialogDescription>
              Selecione o plano ideal para suas necessidades. Você pode mudar a qualquer momento.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Plano Atual */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-900">
                  Plano Atual: <span className="text-blue-600">{currentPlan}</span>
                </span>
              </div>
            </div>

            {/* Grid de Planos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PLANS.map((plan, index) => {
                const Icon = plan.icon;
                const isCurrent = isPlanCurrent(plan.name);
                const isDowngrade = isPlanDowngrade(plan.name);

                return (
                  <Card 
                    key={index}
                    className={`relative transition-all hover:shadow-xl ${
                      plan.popular 
                        ? 'border-2 border-purple-500 shadow-lg scale-105' 
                        : isCurrent
                        ? 'border-2 border-blue-500'
                        : 'border border-gray-200'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-purple-600 text-white">
                          Mais Popular
                        </Badge>
                      </div>
                    )}
                    {isCurrent && (
                      <div className="absolute -top-3 right-3">
                        <Badge className="bg-blue-600 text-white">
                          Plano Atual
                        </Badge>
                      </div>
                    )}

                    <CardContent className="p-6">
                      {/* Ícone e Nome */}
                      <div className={`w-14 h-14 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mb-4`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{plan.description}</p>

                      {/* Preço */}
                      <div className="mb-6">
                        {plan.price > 0 ? (
                          <>
                            <div className="text-3xl font-bold text-gray-900">
                              R$ {plan.price}
                            </div>
                            <div className="text-sm text-gray-600">por mês</div>
                          </>
                        ) : (
                          <div className="text-2xl font-bold text-gray-900">
                            Sob consulta
                          </div>
                        )}
                      </div>

                      {/* Features */}
                      <ul className="space-y-2 mb-6">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Botão */}
                      <Button
                        className={`w-full ${
                          plan.popular 
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600' 
                            : isCurrent
                            ? 'bg-gray-400'
                            : ''
                        }`}
                        disabled={isCurrent}
                        onClick={() => handlePlanSelect(plan)}
                      >
                        {isCurrent 
                          ? 'Plano Atual' 
                          : isDowngrade 
                          ? 'Fazer Downgrade' 
                          : plan.name === 'Enterprise'
                          ? 'Falar com Vendas'
                          : 'Selecionar Plano'
                        }
                      </Button>

                      {isDowngrade && !isCurrent && (
                        <p className="text-xs text-orange-600 mt-2 text-center">
                          Crédito disponível no próximo ciclo
                        </p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Informações */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Mudança de plano é instantânea após confirmação do pagamento</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>No upgrade, você paga apenas a diferença proporcional</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>No downgrade, o crédito fica disponível para os próximos ciclos</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Cancele quando quiser, sem multas ou taxas</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Checkout */}
      {selectedPlan && (
        <CheckoutModal
          isOpen={showCheckout}
          onClose={() => setShowCheckout(false)}
          planName={selectedPlan.name}
          planPrice={selectedPlan.price}
          planDescription={selectedPlan.description}
          onSuccess={handleCheckoutSuccess}
        />
      )}
    </>
  );
};
