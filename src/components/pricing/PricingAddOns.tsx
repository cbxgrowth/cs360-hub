
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Gift, CheckCircle, ArrowRight, Phone, UserPlus, HardDrive, HeadphonesIcon, GraduationCap } from 'lucide-react';

export const PricingAddOns = () => {
  const navigate = useNavigate();

  const handleAddToPlan = () => {
    navigate('/login');
  };

  const handleContactSpecialist = () => {
    window.open('https://wa.me/88988432310?text=Olá! Gostaria de falar com um especialista sobre complementos do CS360°', '_blank');
  };

  const addOns = [
    {
      name: 'Usuários Extras',
      description: 'Adicione mais membros à sua equipe de Customer Success',
      icon: UserPlus,
      color: 'from-blue-500 to-blue-600',
      pricing: [
        { plan: 'Starter', price: 'R$ 99', period: '/usuário/mês' },
        { plan: 'Professional', price: 'R$ 79', period: '/usuário/mês' },
        { plan: 'Growth', price: 'R$ 59', period: '/usuário/mês' },
        { plan: 'Enterprise', price: 'Incluído', period: '' }
      ],
      features: ['Acesso completo à plataforma', 'Permissões personalizáveis', 'Relatórios individuais'],
      actionType: 'add_to_plan'
    },
    {
      name: 'Armazenamento Extra',
      description: 'Aumente sua capacidade de armazenamento de dados',
      icon: HardDrive,
      color: 'from-emerald-500 to-emerald-600',
      pricing: [
        { plan: 'Starter', price: 'R$ 49', period: '/10GB/mês' },
        { plan: 'Professional', price: 'R$ 39', period: '/50GB/mês' },
        { plan: 'Growth', price: 'R$ 29', period: '/100GB/mês' },
        { plan: 'Enterprise', price: 'Ilimitado', period: '' }
      ],
      features: ['Backup automático', 'Acesso em nuvem', 'Sincronização em tempo real'],
      actionType: 'add_to_plan'
    },
    {
      name: 'Consultoria Premium',
      description: 'Consultoria estratégica especializada em Customer Success',
      icon: HeadphonesIcon,
      color: 'from-purple-500 to-purple-600',
      pricing: [
        { plan: 'Starter', price: 'R$ 599', period: '/hora' },
        { plan: 'Professional', price: 'R$ 499', period: '/hora' },
        { plan: 'Growth', price: 'R$ 399', period: '/hora' },
        { plan: 'Enterprise', price: 'Incluído', period: '' }
      ],
      features: ['CSM sênior dedicado', 'Análise estratégica', 'Roadmap personalizado'],
      actionType: 'contact_sales'
    },
    {
      name: 'Treinamento Avançado',
      description: 'Certificação CS360° para capacitar sua equipe',
      icon: GraduationCap,
      color: 'from-orange-500 to-orange-600',
      pricing: [
        { plan: 'Starter', price: 'R$ 2.999', period: '/pessoa' },
        { plan: 'Professional', price: 'R$ 1.999', period: '/pessoa' },
        { plan: 'Growth', price: 'R$ 999', period: '/pessoa' },
        { plan: 'Enterprise', price: 'Incluído', period: '' }
      ],
      features: ['Certificação oficial', 'Material exclusivo', 'Suporte pós-treinamento'],
      actionType: 'contact_sales'
    }
  ];

  const handleAddonAction = (actionType: string) => {
    if (actionType === 'add_to_plan') {
      handleAddToPlan();
    } else if (actionType === 'contact_sales') {
      handleContactSpecialist();
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200 px-6 py-2">
            <Gift className="w-5 h-5 mr-2" />
            Serviços Opcionais
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Complementos e Serviços Extras
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Potencialize ainda mais sua experiência com CS360° através dos nossos serviços adicionais especializados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {addOns.map((addon, index) => {
            const IconComponent = addon.icon;
            return (
              <Card key={index} className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${addon.color}`}></div>
                
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 bg-gradient-to-r ${addon.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl text-gray-900 mb-2">{addon.name}</CardTitle>
                      <p className="text-gray-600 text-sm leading-relaxed">{addon.description}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      {addon.pricing.map((item, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-3">
                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                            {item.plan}
                          </div>
                          <div className="flex items-baseline">
                            <span className={`text-lg font-bold ${
                              item.price === 'Incluído' || item.price === 'Ilimitado' 
                                ? 'text-green-600' 
                                : 'text-gray-900'
                            }`}>
                              {item.price}
                            </span>
                            {item.period && (
                              <span className="text-xs text-gray-500 ml-1">{item.period}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-3 border-t border-gray-100">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Incluído:
                      </h4>
                      <ul className="space-y-1">
                        {addon.features.map((feature, featureIdx) => (
                          <li key={featureIdx} className="text-sm text-gray-600 flex items-center">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                      onClick={() => handleAddonAction(addon.actionType)}
                    >
                      {addon.actionType === 'add_to_plan' ? (
                        <>
                          <ArrowRight className="w-4 h-4 mr-2" />
                          Adicionar ao Plano
                        </>
                      ) : (
                        <>
                          <Phone className="w-4 h-4 mr-2" />
                          Falar com Vendas
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Precisa de algo personalizado?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Nossa equipe pode desenvolver soluções customizadas para atender às necessidades específicas da sua empresa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600"
                onClick={handleContactSpecialist}
              >
                <Phone className="w-5 h-5 mr-2" />
                Falar com Especialista
              </Button>
              <Button variant="outline" size="lg">
                <ArrowRight className="w-5 h-5 mr-2" />
                Ver Casos de Uso
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
