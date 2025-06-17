
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Sparkles, Brain, BarChart3, Zap, Target, Shield, Users
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Inteligência Preditiva Avançada',
    description: 'IA que identifica riscos de churn com 95% de precisão, permitindo ações proativas e estratégicas para retenção.',
    benefit: 'Reduza churn em até 60%'
  },
  {
    icon: BarChart3,
    title: 'Dashboard Executivo 360°',
    description: 'Visão completa da saúde dos clientes com métricas executivas, KPIs em tempo real e insights acionáveis.',
    benefit: 'Decisões 5x mais rápidas'
  },
  {
    icon: Zap,
    title: 'Automação Estratégica',
    description: 'Workflows inteligentes que escalam operações sem perder qualidade, liberando sua equipe para tarefas estratégicas.',
    benefit: 'Eficiência operacional +300%'
  },
  {
    icon: Target,
    title: 'Gestão de Objetivos Inteligente',
    description: 'Acompanhe metas de retenção, expansão e satisfação com metodologia OKR integrada e alertas automáticos.',
    benefit: 'Alcance de metas +40%'
  },
  {
    icon: Shield,
    title: 'Segurança Enterprise',
    description: 'Conformidade LGPD, SOC2 e ISO 27001. Criptografia end-to-end e auditoria completa para tranquilidade total.',
    benefit: 'Compliance 100% garantido'
  },
  {
    icon: Users,
    title: 'Orquestração de Equipes',
    description: 'Gerencie territórios, distribua contas e monitore performance individual com inteligência artificial.',
    benefit: 'Produtividade da equipe +250%'
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 md:py-24 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <Badge className="bg-blue-100 text-blue-800 px-4 py-2 mb-6 text-base font-semibold">
            <Sparkles className="w-4 h-4 mr-2" />
            Tecnologia Enterprise
          </Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 mb-6 lg:mb-8 leading-tight">
            Funcionalidades que
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Geram Resultados Exponenciais
            </span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Cada recurso foi desenvolvido para atender demandas específicas de líderes e gestores
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-4 border-0 bg-white/95 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-6 lg:p-8">
                <div className="relative">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 lg:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    <feature.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <Badge className="mb-3 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border-emerald-200 text-xs font-semibold">
                    {feature.benefit}
                  </Badge>
                  <h3 className="text-lg lg:text-xl font-black text-slate-900 mb-3 lg:mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm lg:text-base">
                    {feature.description}
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
