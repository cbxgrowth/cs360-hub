
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Shield, CreditCard, RefreshCw, Lock, CheckCircle, Zap } from 'lucide-react';

export const PricingPaymentInfo = () => {
  const paymentFeatures = [
    {
      icon: Shield,
      title: 'Pagamento Seguro',
      description: 'Processamento com certificação PCI DSS Level 1 e criptografia bancária',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: CreditCard,
      title: 'Múltiplas Formas',
      description: 'Cartões de crédito (Visa, Mastercard, Amex, Elo) e boleto',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: RefreshCw,
      title: 'Cancele Quando Quiser',
      description: 'Sem multas, sem taxas de cancelamento, sem burocracia',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Lock,
      title: 'Dados Protegidos',
      description: 'Seus dados de pagamento nunca são armazenados em nossos servidores',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const aiCreditsInfo = [
    {
      icon: Zap,
      title: 'Créditos Inclusos',
      description: 'Todos os planos incluem créditos mensais de IA',
      details: 'Starter: 10 • Professional: 30 • Growth: 50 • Enterprise: Ilimitado'
    },
    {
      icon: CheckCircle,
      title: 'Compra Avulsa',
      description: 'Precisa de mais? Compre créditos extras por R$ 5,00/crédito',
      details: 'Disponível diretamente no painel de billing'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Payment Security Section */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200 px-6 py-2">
            <Shield className="w-5 h-5 mr-2" />
            Pagamento 100% Seguro
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Transparência e Segurança em Primeiro Lugar
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Processamos pagamentos com os mais altos padrões de segurança do mercado
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {paymentFeatures.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Credits Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold mb-4">
              Como Funcionam os Créditos de IA?
            </h3>
            <p className="text-blue-100 text-lg max-w-3xl mx-auto">
              Créditos de IA são usados para recursos avançados como análise preditiva, recomendações inteligentes e automações com machine learning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {aiCreditsInfo.map((info, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{info.title}</h4>
                      <p className="text-blue-100 mb-3">{info.description}</p>
                      <p className="text-sm text-blue-200 font-medium">{info.details}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">💡</span>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-2">Dica Importante</h4>
                <p className="text-blue-100">
                  Créditos não utilizados <strong>não acumulam</strong> para o próximo mês. Escolha o plano adequado ao seu uso mensal ou compre créditos extras conforme necessário através do painel de billing.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6 text-lg font-medium">
            Confiado por empresas que valorizam segurança
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <Badge variant="outline" className="px-6 py-3 text-base">
              <Lock className="w-5 h-5 mr-2" />
              PCI DSS Level 1
            </Badge>
            <Badge variant="outline" className="px-6 py-3 text-base">
              <CheckCircle className="w-5 h-5 mr-2" />
              LGPD Compliant
            </Badge>
            <Badge variant="outline" className="px-6 py-3 text-base">
              <Shield className="w-5 h-5 mr-2" />
              SOC 2 Type II
            </Badge>
            <Badge variant="outline" className="px-6 py-3 text-base">
              <Shield className="w-5 h-5 mr-2" />
              Criptografia Bancária
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};
