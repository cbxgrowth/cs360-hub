
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Check, X, Crown } from 'lucide-react';

const comparisonData = [
  {
    feature: 'IA Preditiva de Churn',
    cs360: true,
    competitors: false,
    highlight: true
  },
  {
    feature: 'Dashboard Executivo 360°',
    cs360: true,
    competitors: false,
    highlight: true
  },
  {
    feature: 'Implementação em 48h',
    cs360: true,
    competitors: false,
    highlight: false
  },
  {
    feature: 'Success Manager Dedicado',
    cs360: true,
    competitors: false,
    highlight: false
  },
  {
    feature: 'Automação Inteligente',
    cs360: true,
    competitors: 'Limitada',
    highlight: false
  },
  {
    feature: 'Integrações Nativas',
    cs360: '20+',
    competitors: '5-10',
    highlight: false
  },
  {
    feature: 'Compliance LGPD/SOC2',
    cs360: true,
    competitors: 'Parcial',
    highlight: false
  },
  {
    feature: 'Suporte 24/7',
    cs360: true,
    competitors: 'Horário Comercial',
    highlight: false
  }
];

export const ComparisonSection = () => {
  return (
    <section className="py-20 md:py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='15' cy='45' r='1'/%3E%3Ccircle cx='45' cy='15' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-8 bg-white/20 text-white border-white/30 px-4 py-2 text-base font-semibold backdrop-blur-md">
            <Crown className="w-4 h-4 mr-2" />
            Comparativo Técnico
          </Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-6">
            Por que CS360° é
            <span className="block text-blue-300">Superior à Concorrência?</span>
          </h2>
          <p className="text-base md:text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Análise comparativa com as principais soluções do mercado
          </p>
        </div>
        
        <Card className="bg-white/10 backdrop-blur-md border-white/20 overflow-hidden">
          <CardContent className="p-0">
            {/* Header */}
            <div className="grid grid-cols-3 bg-white/5 p-6 border-b border-white/10">
              <div className="text-white/70 font-semibold text-sm lg:text-base">Recursos</div>
              <div className="text-center">
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 font-bold">
                  CS360°
                </Badge>
              </div>
              <div className="text-center text-white/70 font-semibold text-sm lg:text-base">Concorrentes</div>
            </div>
            
            {/* Comparison Rows */}
            {comparisonData.map((item, index) => (
              <div key={index} className={`grid grid-cols-3 p-4 lg:p-6 border-b border-white/10 hover:bg-white/5 transition-colors ${item.highlight ? 'bg-white/5' : ''}`}>
                {/* Feature */}
                <div className="flex items-center">
                  <span className={`text-sm lg:text-base ${item.highlight ? 'font-bold text-blue-300' : 'text-white/90'}`}>
                    {item.feature}
                  </span>
                  {item.highlight && (
                    <Crown className="w-4 h-4 text-yellow-400 ml-2" />
                  )}
                </div>
                
                {/* CS360° */}
                <div className="flex justify-center items-center">
                  {typeof item.cs360 === 'boolean' ? (
                    item.cs360 ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <X className="w-5 h-5 text-red-400" />
                    )
                  ) : (
                    <span className="text-green-400 font-semibold text-sm lg:text-base">{item.cs360}</span>
                  )}
                </div>
                
                {/* Competitors */}
                <div className="flex justify-center items-center">
                  {typeof item.competitors === 'boolean' ? (
                    item.competitors ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <X className="w-5 h-5 text-red-400" />
                    )
                  ) : (
                    <span className="text-orange-400 font-semibold text-sm lg:text-base">{item.competitors}</span>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-blue-200 text-base lg:text-lg mb-6">
            Veja por si mesmo a diferença que faz escolher a plataforma líder
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Badge className="bg-white/20 text-white px-6 py-3 text-sm font-semibold">
              <Check className="w-4 h-4 mr-2" />
              Teste Grátis por 14 Dias
            </Badge>
            <Badge className="bg-white/20 text-white px-6 py-3 text-sm font-semibold">
              <Crown className="w-4 h-4 mr-2" />
              Demo Executiva Gratuita
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};
