
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { CheckCircle, Users, TrendingUp, Shield, Clock, Star } from 'lucide-react';

const benefits = [
  {
    icon: CheckCircle,
    title: 'Implementação Rápida',
    description: 'Configure seu CS360° em apenas 48 horas com nossa equipe especializada',
    metric: '48h',
    color: 'from-green-500 to-emerald-600'
  },
  {
    icon: Users,
    title: 'Equipe Dedicada',
    description: 'Success Manager exclusivo para garantir seu sucesso desde o primeiro dia',
    metric: '1:1',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    icon: TrendingUp,
    title: 'ROI Garantido',
    description: 'Resultados comprovados em 90 dias ou seu investimento de volta',
    metric: '90 dias',
    color: 'from-purple-500 to-violet-600'
  },
  {
    icon: Shield,
    title: 'Segurança Total',
    description: 'Compliance LGPD, ISO 27001 e SOC2 para máxima proteção de dados',
    metric: '99.9%',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Clock,
    title: 'Suporte 24/7',
    description: 'Atendimento especializado disponível a qualquer hora do dia',
    metric: '24/7',
    color: 'from-indigo-500 to-blue-600'
  },
  {
    icon: Star,
    title: 'Satisfação Garantida',
    description: 'Mais de 98% dos clientes recomendam nossa plataforma',
    metric: '98%',
    color: 'from-yellow-500 to-orange-500'
  }
];

export const BenefitsSection = () => {
  return (
    <section className="py-20 md:py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23A855F7' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='3'/%3E%3Ccircle cx='15' cy='15' r='1'/%3E%3Ccircle cx='45' cy='45' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-8 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200 px-4 py-2 text-base font-semibold">
            <Star className="w-4 h-4 mr-2" />
            Benefícios Exclusivos
          </Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 mb-6">
            Por que Líderes Escolhem
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              CS360°?
            </span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Benefícios únicos que garantem o sucesso do seu Customer Success
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white/95 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-6 lg:p-8">
                <div className="relative">
                  <div className={`w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mb-4 lg:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                    <benefit.icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                  </div>
                  <Badge className="mb-3 bg-slate-100 text-slate-800 text-sm font-bold">
                    {benefit.metric}
                  </Badge>
                  <h3 className="text-lg lg:text-xl font-black text-slate-900 mb-3 lg:mb-4 group-hover:text-purple-600 transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm lg:text-base">
                    {benefit.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
