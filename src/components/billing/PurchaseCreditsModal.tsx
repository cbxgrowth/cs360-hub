import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Zap, Plus, Minus, CreditCard, CheckCircle, Sparkles } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { CheckoutModal } from './CheckoutModal';

interface PurchaseCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCredits: number;
  onSuccess?: () => void;
}

const CREDIT_PRICE = 5; // R$ 5,00 por crédito

const CREDIT_PACKAGES = [
  { credits: 10, bonus: 0, popular: false },
  { credits: 50, bonus: 5, popular: true },
  { credits: 100, bonus: 15, popular: false },
  { credits: 200, bonus: 40, popular: false }
];

export const PurchaseCreditsModal = ({ 
  isOpen, 
  onClose, 
  currentCredits,
  onSuccess 
}: PurchaseCreditsModalProps) => {
  const { showSuccess } = useNotifications();
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState(10);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutAmount, setCheckoutAmount] = useState(0);
  const [checkoutCredits, setCheckoutCredits] = useState(0);

  const handlePackageSelect = (pkg: typeof CREDIT_PACKAGES[0]) => {
    const totalCredits = pkg.credits + pkg.bonus;
    const totalPrice = pkg.credits * CREDIT_PRICE;
    
    setCheckoutCredits(totalCredits);
    setCheckoutAmount(totalPrice);
    setShowCheckout(true);
  };

  const handleCustomPurchase = () => {
    if (customAmount < 1) return;
    
    const totalPrice = customAmount * CREDIT_PRICE;
    setCheckoutCredits(customAmount);
    setCheckoutAmount(totalPrice);
    setShowCheckout(true);
  };

  const handleCheckoutSuccess = () => {
    showSuccess({
      title: 'Créditos Adicionados!',
      description: `${checkoutCredits} créditos foram adicionados à sua conta.`
    });
    onSuccess?.();
    setShowCheckout(false);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen && !showCheckout} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-500" />
              Comprar Créditos de IA
            </DialogTitle>
            <DialogDescription>
              Use créditos para recursos avançados como análise preditiva e automações inteligentes
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Saldo Atual */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Saldo Atual</div>
                      <div className="text-2xl font-bold text-gray-900">{currentCredits} créditos</div>
                    </div>
                  </div>
                  <Badge className="bg-blue-600 text-white">
                    R$ {CREDIT_PRICE},00 por crédito
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Pacotes Recomendados */}
            <div>
              <h3 className="text-lg font-bold mb-4">Pacotes Recomendados</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {CREDIT_PACKAGES.map((pkg, index) => {
                  const totalCredits = pkg.credits + pkg.bonus;
                  const totalPrice = pkg.credits * CREDIT_PRICE;
                  const savings = pkg.bonus * CREDIT_PRICE;

                  return (
                    <Card 
                      key={index}
                      className={`relative cursor-pointer transition-all hover:shadow-lg ${
                        pkg.popular ? 'border-2 border-purple-500 shadow-lg' : 'border border-gray-200'
                      }`}
                      onClick={() => handlePackageSelect(pkg)}
                    >
                      {pkg.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-purple-600 text-white">
                            Mais Popular
                          </Badge>
                        </div>
                      )}
                      {pkg.bonus > 0 && (
                        <div className="absolute -top-3 right-3">
                          <Badge className="bg-green-600 text-white">
                            +{pkg.bonus} Bônus
                          </Badge>
                        </div>
                      )}
                      
                      <CardContent className="p-6 text-center">
                        <div className="mb-4">
                          <div className="text-4xl font-bold text-gray-900">{totalCredits}</div>
                          <div className="text-sm text-gray-600">créditos</div>
                          {pkg.bonus > 0 && (
                            <div className="text-xs text-green-600 font-medium mt-1">
                              ({pkg.credits} + {pkg.bonus} bônus)
                            </div>
                          )}
                        </div>
                        
                        <div className="mb-4">
                          <div className="text-2xl font-bold text-blue-600">
                            R$ {totalPrice}
                          </div>
                          {savings > 0 && (
                            <div className="text-xs text-green-600 font-medium">
                              Economize R$ {savings}
                            </div>
                          )}
                        </div>

                        <Button 
                          className={`w-full ${
                            pkg.popular 
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600' 
                              : ''
                          }`}
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Comprar
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Quantidade Personalizada */}
            <Card className="border-2 border-dashed border-gray-300">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Quantidade Personalizada</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCustomAmount(Math.max(1, customAmount - 10))}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    
                    <div className="flex-1">
                      <Label htmlFor="customAmount" className="sr-only">Quantidade</Label>
                      <Input
                        id="customAmount"
                        type="number"
                        min="1"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(Math.max(1, parseInt(e.target.value) || 1))}
                        className="text-center text-xl font-bold"
                      />
                    </div>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCustomAmount(customAmount + 10)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-600">Total a pagar</div>
                      <div className="text-2xl font-bold text-gray-900">
                        R$ {(customAmount * CREDIT_PRICE).toLocaleString()}
                      </div>
                    </div>
                    <Button 
                      onClick={handleCustomPurchase}
                      className="bg-gradient-to-r from-blue-600 to-purple-600"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Comprar {customAmount} créditos
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informações */}
            <div className="bg-blue-50 p-4 rounded-lg space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span>Créditos são adicionados instantaneamente após o pagamento</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span>Créditos não expiram e podem ser usados a qualquer momento</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span>Pagamento seguro com criptografia de nível bancário</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Checkout */}
      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        planName={`${checkoutCredits} Créditos de IA`}
        planPrice={checkoutAmount}
        planDescription="Créditos para recursos avançados de IA"
        onSuccess={handleCheckoutSuccess}
      />
    </>
  );
};
