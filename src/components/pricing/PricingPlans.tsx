
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  CheckCircle,
  Crown,
  Shield,
  Phone,
  Users,
  Building2,
  Zap,
  TrendingUp,
  Sparkles
} from 'lucide-react';

interface PricingPlansProps {
  isAnnual: boolean;
}

export const PricingPlans = ({ isAnnual }: PricingPlansProps) => {
  const navigate = useNavigate();

  const handleStartTrial = () => {
    navigate('/register');
  };

  const handleContactSales = () => {
    window.open('https://wa.me/88988432310?text=Olá! Gostaria de falar com um especialista em vendas sobre o CS360°', '_blank');
  };

  const plans = [
    {
      name: 'Starter',
      subtitle: 'Para começar no CS',
      monthlyPrice: 299,
      annualPrice: 199,
      originalAnnual: 299,
      description: 'Ideal para pequenas empresas iniciando no Customer Success',
      features: [
        'Até 50 clientes ativos',
        'Dashboard básico com métricas essenciais',
        'NPS automático mensal',
        'Health Score básico',
        'Relatórios pré-definidos (10)',
        '1 usuário incluído (+R$ 99/usuário extra)',
        'Suporte via email (48h)',
        'Integrações básicas (5)',
        'Onboarding guiado (2h)',
        'Armazenamento 5GB',
        'Histórico de 6 meses',
        '10 Créditos IA por mês'
      ],
      limitations: [
        'Sem automações avançadas',
        'Sem IA preditiva',
        'Relatórios limitados'
      ],
      highlight: 'Perfeito para começar',
      popular: false,
      savings: isAnnual ? 33 : 0,
      color: 'from-blue-500 to-blue-600',
      features_highlight: ['NPS Automático', 'Health Score', 'Dashboard']
    },
    {
      name: 'Professional',
      subtitle: 'Para escalar seu CS',
      monthlyPrice: 799,
      annualPrice: 499,
      originalAnnual: 799,
      description: 'Para empresas em crescimento que precisam de mais recursos',
      features: [
        'Até 150 clientes ativos',
        'Dashboard avançado com IA',
        'Automações inteligentes ilimitadas',
        'Health Score com IA preditiva (85% precisão)',
        'NPS trimestral + CSAT + CES',
        '5 usuários incluídos (+R$ 79/usuário extra)',
        'Relatórios personalizáveis (50+)',
        'Integrações avançadas (20+)',
        'API básica (1000 req/hora)',
        'Suporte prioritário (24h)',
        'Treinamento online (10h)',
        'Armazenamento 50GB',
        'Histórico de 2 anos',
        'Alertas inteligentes',
        'Segmentação automática',
        '30 Créditos IA por mês'
      ],
      limitations: [
        'IA com precisão limitada',
        'API com rate limit'
      ],
      highlight: 'Mais vendido',
      popular: true,
      savings: isAnnual ? 38 : 0,
      color: 'from-purple-500 to-purple-600',
      features_highlight: ['IA Preditiva', 'Automações', 'API']
    },
    {
      name: 'Growth',
      subtitle: 'Para maximizar resultados',
      monthlyPrice: 1599,
      annualPrice: 999,
      originalAnnual: 1599,
      description: 'Solução completa para empresas escalando rapidamente',
      features: [
        'Até 500 clientes ativos',
        'IA preditiva avançada (95% precisão)',
        'Programa de parceiros incluso',
        'Análise de sentimento avançada',
        '15 usuários incluídos (+R$ 59/usuário extra)',
        'Automações com machine learning',
        'API completa (10.000 req/hora)',
        'Integrações ilimitadas',
        'CSM dedicado (4h/mês)',
        'Treinamento presencial (20h)',
        'SLA de 4 horas',
        'Armazenamento 200GB',
        'Histórico ilimitado',
        'Customizações básicas',
        'Consultoria mensal (2h)',
        'Backup automático',
        'Relatórios executivos',
        '50 Créditos IA por mês'
      ],
      limitations: [],
      highlight: 'Máximo desempenho',
      popular: false,
      savings: isAnnual ? 37 : 0,
      color: 'from-emerald-500 to-emerald-600',
      features_highlight: ['95% Precisão IA', 'CSM Dedicado', 'Customizações']
    },
    {
      name: 'Enterprise',
      subtitle: 'Solução corporativa',
      monthlyPrice: null,
      annualPrice: null,
      originalAnnual: null,
      description: 'Solução personalizada para grandes corporações',
      features: [
        'Clientes ilimitados',
        'Infraestrutura dedicada na AWS',
        'IA personalizada para seu negócio',
        'Customizações completas',
        'Usuários ilimitados',
        'Implementação guiada completa (80h)',
        'Consultoria estratégica inclusa (10h/mês)',
        'Treinamento da equipe (40h)',
        'API enterprise (100.000 req/hora)',
        'SLA de 1 hora garantido',
        'Suporte 24/7/365',
        'Success Manager exclusivo',
        'Roadmap personalizado',
        'Integração customizada ilimitada',
        'Compliance total (SOX, HIPAA)',
        'Backup em tempo real',
        'Disaster recovery',
        'Auditoria de segurança',
        'Onboarding premium (6 meses)',
        'Créditos IA ilimitados'
      ],
      limitations: [],
      highlight: 'Solução corporativa',
      popular: false,
      savings: 0,
      color: 'from-orange-500 to-red-500',
      features_highlight: ['Unlimited', 'Dedicated', 'Premium Support']
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl ${
              plan.popular 
                ? 'border-2 border-purple-500 shadow-2xl scale-105 ring-4 ring-purple-100' 
                : 'border border-gray-200 hover:shadow-xl hover:-translate-y-1'
            }`}>
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-3 text-sm font-bold">
                  <Crown className="w-4 h-4 inline mr-2" />
                  MAIS POPULAR
                </div>
              )}
              
              {plan.savings > 0 && (
                <Badge className="absolute top-4 right-4 bg-red-500 text-white font-bold">
                  {plan.savings}% OFF
                </Badge>
              )}
              
              <CardHeader className={`text-center ${plan.popular ? 'pt-16' : 'pt-8'}`}>
                <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  {plan.name === 'Starter' && <Users className="w-8 h-8 text-white" />}
                  {plan.name === 'Professional' && <Zap className="w-8 h-8 text-white" />}
                  {plan.name === 'Growth' && <TrendingUp className="w-8 h-8 text-white" />}
                  {plan.name === 'Enterprise' && <Building2 className="w-8 h-8 text-white" />}
                </div>
                
                <CardTitle className="text-2xl text-gray-900 mb-1">{plan.name}</CardTitle>
                <p className="text-sm text-gray-500 mb-4">{plan.subtitle}</p>
                
                <div className="mb-4">
                  {plan.monthlyPrice ? (
                    <>
                      {isAnnual && plan.originalAnnual && (
                        <div className="text-lg text-gray-400 line-through">
                          R$ {plan.originalAnnual}/mês
                        </div>
                      )}
                      <div className="flex items-center justify-center">
                        <span className="text-4xl font-bold text-gray-900">
                          R$ {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                        </span>
                        <span className="text-gray-600 ml-1">/mês</span>
                      </div>
                      {isAnnual && (
                        <div className="text-sm text-green-600 font-medium">
                          Economize R$ {(plan.monthlyPrice * 12) - (plan.annualPrice * 12)}/ano
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-3xl font-bold text-gray-900">Sob consulta</div>
                  )}
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  {plan.features_highlight.map((feature, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              
              <CardContent className="px-6 pb-8">
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Incluído no plano:
                  </h4>
                  <ul className="space-y-2 max-h-60 overflow-y-auto">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.limitations.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Shield className="w-4 h-4 text-orange-500 mr-2" />
                      Limitações:
                    </h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <div className="w-4 h-4 border-2 border-orange-300 rounded mr-2 flex-shrink-0 mt-0.5"></div>
                          <span className="text-gray-500">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <Button 
                  className={`w-full mb-4 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800' 
                      : plan.name === 'Enterprise'
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
                      : ''
                  }`}
                  onClick={plan.name === 'Enterprise' ? handleContactSales : handleStartTrial}
                >
                  {plan.name === 'Enterprise' ? (
                    <>
                      <Phone className="w-4 h-4 mr-2" />
                      Falar com Vendas
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Começar Teste Grátis
                    </>
                  )}
                </Button>
                
                <div className="text-center">
                  <Badge variant="outline" className="text-xs">
                    {plan.highlight}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
