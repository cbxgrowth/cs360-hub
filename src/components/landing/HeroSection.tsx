
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Crown, Briefcase, FileText, Clock, Shield, Award } from 'lucide-react';

const executiveBenefits = [
  { icon: Clock, text: 'Implementação em 48h' },
  { icon: Shield, text: 'Compliance Enterprise' },
  { icon: Award, text: 'Suporte C-Level 24/7' },
  { icon: Crown, text: 'Success Manager Dedicado' }
];

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 min-h-screen flex items-center">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='0' cy='0' r='1'/%3E%3Ccircle cx='60' cy='60' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-slate-900/30"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center">
          {/* Premium Badge */}
          <div className="inline-flex items-center justify-center mb-8 animate-fade-in">
            <Badge className="bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-blue-200 border-blue-400/50 px-6 py-3 text-base font-semibold backdrop-blur-md shadow-lg">
              <Crown className="w-5 h-5 mr-3" />
              🏆 Plataforma #1 Escolhida por C-Levels no Brasil
            </Badge>
          </div>
          
          {/* Enhanced Main Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight tracking-tight animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Transforme Retenção em
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mt-2 animate-shimmer">
              Vantagem Competitiva
            </span>
          </h1>
          
          {/* Enhanced Executive Subtitle */}
          <p className="text-base md:text-lg lg:text-xl text-blue-100/90 mb-10 max-w-4xl mx-auto leading-relaxed font-light animate-fade-in" style={{ animationDelay: '0.4s' }}>
            A única plataforma de Customer Success com IA preditiva para 
            <span className="font-semibold text-blue-300 block mt-2 text-lg md:text-xl lg:text-2xl"> 
              empresários e líderes que exigem resultados exponenciais
            </span>
          </p>
          
          {/* Enhanced Executive CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Link to="/executive-demo">
              <Button 
                size="lg" 
                className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-bold rounded-xl text-white"
              >
                <Briefcase className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                Demonstração Executiva
              </Button>
            </Link>
            <Link to="/register">
              <Button 
                variant="outline" 
                size="lg" 
                className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4 border-2 border-blue-400/40 bg-white/15 backdrop-blur-md text-white hover:bg-white/25 transition-all duration-300 font-bold rounded-xl"
              >
                <FileText className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                Testar grátis
              </Button>
            </Link>
          </div>

          {/* Executive Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-blue-200 mb-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            {executiveBenefits.map((benefit, index) => (
              <div key={index} className="flex items-center bg-white/15 backdrop-blur-md rounded-full px-4 py-2 hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-lg">
                <benefit.icon className="w-4 h-4 text-blue-400 mr-2" />
                <span className="font-semibold text-sm md:text-base">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* Payment Security Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-blue-200 animate-fade-in" style={{ animationDelay: '1s' }}>
            <div className="flex items-center text-xs md:text-sm">
              <Shield className="w-3 h-3 md:w-4 md:h-4 text-green-400 mr-1.5" />
              <span className="font-medium">Pagamento 100% Seguro</span>
            </div>
            <div className="flex items-center text-xs md:text-sm">
              <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-400 mr-1.5" />
              <span className="font-medium">Cancele Quando Quiser</span>
            </div>
            <div className="flex items-center text-xs md:text-sm">
              <Award className="w-3 h-3 md:w-4 md:h-4 text-green-400 mr-1.5" />
              <span className="font-medium">30 Dias de Garantia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
