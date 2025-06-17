
import React from 'react';
import { WebsiteLayout } from '../components/layout/WebsiteLayout';
import { ExecutiveDemoForm } from '../components/demo/ExecutiveDemoForm';
import { Badge } from '../components/ui/badge';
import { Shield, Clock, Users, Crown } from 'lucide-react';

const ExecutiveDemo = () => {
  const benefits = [
    {
      icon: Crown,
      title: "Apresentação C-Level",
      description: "Demonstração focada em ROI e resultados executivos"
    },
    {
      icon: Clock,
      title: "45 Minutos",
      description: "Tempo dedicado para conhecer suas necessidades específicas"
    },
    {
      icon: Users,
      title: "Especialista Dedicado",
      description: "Success Manager sênior conduzirá sua demonstração"
    },
    {
      icon: Shield,
      title: "100% Confidencial",
      description: "Seus dados e informações totalmente protegidos"
    }
  ];

  return (
    <WebsiteLayout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 px-4 py-2">
            <Crown className="w-4 h-4 mr-2" />
            Acesso Exclusivo para Líderes
          </Badge>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Demonstração Executiva
            <span className="block text-blue-300 mt-2">CS360°</span>
          </h1>
          
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Veja como os líderes de Customer Success estão transformando resultados 
            com nossa plataforma de IA preditiva
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <benefit.icon className="w-6 h-6 text-blue-300 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-blue-100 opacity-90">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ExecutiveDemoForm />
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              O que você verá na demonstração
            </h2>
            <p className="text-lg text-gray-600">
              Uma apresentação personalizada focada nos seus desafios específicos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-lg">1</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Análise do Cenário Atual</h3>
              <p className="text-gray-600">
                Mapeamento dos seus desafios atuais em Customer Success e identificação de oportunidades
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold text-lg">2</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Demo Personalizada</h3>
              <p className="text-gray-600">
                Apresentação das funcionalidades mais relevantes para o seu negócio e segmento
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-lg">3</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Roadmap de Implementação</h3>
              <p className="text-gray-600">
                Plano detalhado de como implementar o CS360° na sua empresa com cronograma e ROI projetado
              </p>
            </div>
          </div>
        </div>
      </section>
    </WebsiteLayout>
  );
};

export default ExecutiveDemo;
