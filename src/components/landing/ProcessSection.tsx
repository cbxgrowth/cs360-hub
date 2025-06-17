
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { ArrowRight, Calendar, Settings, Rocket, BarChart3 } from 'lucide-react';

const processSteps = [
  {
    step: '01',
    icon: Calendar,
    title: 'Demonstração Personalizada',
    description: 'Agende uma demo executiva de 30 minutos adaptada ao seu negócio',
    duration: '30 min',
    color: 'from-blue-500 to-blue-600'
  },
  {
    step: '02',
    icon: Settings,
    title: 'Configuração Express',
    description: 'Nossa equipe configura tudo em 48h com suas integrações existentes',
    duration: '48 horas',
    color: 'from-purple-500 to-purple-600'
  },
  {
    step: '03',
    icon: Rocket,
    title: 'Lançamento Guiado',
    description: 'Treinamento completo da equipe e início das operações',
    duration: '1 semana',
    color: 'from-green-500 to-green-600'
  },
  {
    step: '04',
    icon: BarChart3,
    title: 'Resultados Comprovados',
    description: 'Acompanhe o impacto nos seus KPIs de Customer Success',
    duration: '30 dias',
    color: 'from-orange-500 to-orange-600'
  }
];

export const ProcessSection = () => {
  return (
    <section className="py-20 md:py-24 bg-white relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-8 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-200 px-4 py-2 text-base font-semibold">
            <Rocket className="w-4 h-4 mr-2" />
            Processo Otimizado
          </Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 mb-6">
            Do Primeiro Contato aos
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Primeiros Resultados
            </span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Nosso processo comprovado garante implementação rápida e resultados consistentes
          </p>
        </div>
        
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-orange-200 transform -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-2 border-white bg-white overflow-hidden">
                  <CardContent className="p-6 lg:p-8 text-center">
                    {/* Step Number */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className={`w-8 h-8 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                        {step.step}
                      </div>
                    </div>
                    
                    {/* Icon */}
                    <div className={`w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-all duration-500 shadow-lg mt-4`}>
                      <step.icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                    </div>
                    
                    {/* Duration Badge */}
                    <Badge className="mb-3 bg-slate-100 text-slate-700 text-xs font-semibold">
                      {step.duration}
                    </Badge>
                    
                    {/* Content */}
                    <h3 className="text-lg lg:text-xl font-black text-slate-900 mb-3 lg:mb-4">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-sm lg:text-base">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
                
                {/* Arrow (except for last item) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <ArrowRight className="w-8 h-8 text-slate-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
