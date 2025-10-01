import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { CreditCard, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  planPrice: number;
  planDescription: string;
  onSuccess?: () => void;
}

export const CheckoutModal = ({ 
  isOpen, 
  onClose, 
  planName, 
  planPrice, 
  planDescription,
  onSuccess 
}: CheckoutModalProps) => {
  const { showSuccess, showError } = useNotifications();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'payment' | 'processing' | 'success'>('payment');
  
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, '').length <= 16) {
      setCardData({ ...cardData, number: formatted });
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    if (formatted.length <= 5) {
      setCardData({ ...cardData, expiry: formatted });
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/gi, '');
    if (value.length <= 4) {
      setCardData({ ...cardData, cvv: value });
    }
  };

  const validateCard = () => {
    if (cardData.number.replace(/\s/g, '').length !== 16) {
      showError({ title: 'Erro', description: 'Número do cartão inválido' });
      return false;
    }
    if (!cardData.name.trim()) {
      showError({ title: 'Erro', description: 'Nome do titular é obrigatório' });
      return false;
    }
    if (cardData.expiry.length !== 5) {
      showError({ title: 'Erro', description: 'Data de validade inválida' });
      return false;
    }
    if (cardData.cvv.length < 3) {
      showError({ title: 'Erro', description: 'CVV inválido' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCard()) return;

    setLoading(true);
    setStep('processing');

    try {
      // Simular processamento de pagamento
      // Em produção, aqui você chamaria a API do Stripe via backend
      await new Promise(resolve => setTimeout(resolve, 2000));

      setStep('success');
      
      showSuccess({
        title: 'Pagamento Aprovado!',
        description: `Seu plano ${planName} foi ativado com sucesso.`
      });

      setTimeout(() => {
        onSuccess?.();
        onClose();
        setStep('payment');
        setCardData({ number: '', name: '', expiry: '', cvv: '' });
      }, 2000);

    } catch (error: any) {
      setStep('payment');
      showError({
        title: 'Erro no Pagamento',
        description: error.message || 'Não foi possível processar o pagamento. Tente novamente.'
      });
    } finally {
      setLoading(false);
    }
  };

  const getCardBrand = (number: string) => {
    const cleaned = number.replace(/\s/g, '');
    if (cleaned.startsWith('4')) return 'Visa';
    if (cleaned.startsWith('5')) return 'Mastercard';
    if (cleaned.startsWith('3')) return 'Amex';
    if (cleaned.startsWith('6')) return 'Elo';
    return '';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {step === 'payment' && 'Finalizar Assinatura'}
            {step === 'processing' && 'Processando Pagamento...'}
            {step === 'success' && 'Pagamento Aprovado!'}
          </DialogTitle>
          <DialogDescription>
            {step === 'payment' && 'Preencha os dados do cartão para ativar seu plano'}
            {step === 'processing' && 'Aguarde enquanto processamos seu pagamento'}
            {step === 'success' && 'Seu plano foi ativado com sucesso'}
          </DialogDescription>
        </DialogHeader>

        {step === 'payment' && (
          <div className="space-y-6">
            {/* Resumo do Plano */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{planName}</h3>
                    <p className="text-gray-600 text-sm">{planDescription}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">
                      R$ {planPrice.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">por mês</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Formulário de Pagamento */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                  <Lock className="w-4 h-4 text-blue-600" />
                  <span>Seus dados estão protegidos com criptografia de nível bancário</span>
                </div>

                {/* Número do Cartão */}
                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Número do Cartão
                    {getCardBrand(cardData.number) && (
                      <Badge variant="outline" className="ml-2">
                        {getCardBrand(cardData.number)}
                      </Badge>
                    )}
                  </Label>
                  <Input
                    id="cardNumber"
                    placeholder="0000 0000 0000 0000"
                    value={cardData.number}
                    onChange={handleCardNumberChange}
                    className="text-lg"
                    required
                  />
                </div>

                {/* Nome do Titular */}
                <div className="space-y-2">
                  <Label htmlFor="cardName">Nome do Titular (como está no cartão)</Label>
                  <Input
                    id="cardName"
                    placeholder="NOME COMPLETO"
                    value={cardData.name}
                    onChange={(e) => setCardData({ ...cardData, name: e.target.value.toUpperCase() })}
                    className="text-lg uppercase"
                    required
                  />
                </div>

                {/* Validade e CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Validade</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/AA"
                      value={cardData.expiry}
                      onChange={handleExpiryChange}
                      className="text-lg"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      type="password"
                      placeholder="123"
                      value={cardData.cvv}
                      onChange={handleCvvChange}
                      className="text-lg"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Informações de Segurança */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Renovação automática mensal</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Cancele quando quiser, sem multas</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>30 dias de garantia de reembolso</span>
                </div>
              </div>

              {/* Botões */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={loading}
                >
                  {loading ? 'Processando...' : `Pagar R$ ${planPrice.toLocaleString()}`}
                </Button>
              </div>
            </form>
          </div>
        )}

        {step === 'processing' && (
          <div className="py-12 text-center space-y-6">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Processando seu pagamento...</h3>
              <p className="text-gray-600">Isso pode levar alguns segundos</p>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="py-12 text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">Pagamento Aprovado!</h3>
              <p className="text-gray-600">Seu plano {planName} foi ativado com sucesso</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
