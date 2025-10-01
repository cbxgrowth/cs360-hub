
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Crown, Calendar, Sparkles, CheckCircle, Shield } from 'lucide-react';

export const CTASection = () => {
  return (
    <section className="py-20 md:py-24 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3Ccircle cx='15' cy='15' r='2'/%3E%3Ccircle cx='45' cy='45' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-6 lg:mb-8">
          <Badge className="bg-white/25 text-white px-4 py-2 backdrop-blur-md text-base font-semibold">
            <Crown className="w-4 h-4 mr-2" />
            Exclusivo para Líderes
          </Badge>
        </div>
        
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-6 lg:mb-8 leading-tight">
          Pronto para Liderar a
          <span className="block text-blue-300">Transformação do CS?</span>
        </h2>
        
        <p className="text-base md:text-lg lg:text-xl mb-10 lg:mb-12 opacity-95 max-w-4xl mx-auto leading-relaxed">
          Junte-se aos 500+ líderes que já revolucionaram seus resultados
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center mb-12 lg:mb-16">
          <Link to="/executive-demo">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 shadow-xl font-black transform hover:scale-105 transition-all duration-300 rounded-xl"
            >
              <Calendar className="w-4 lg:w-5 h-4 lg:h-5 mr-2" />
              Agendar Demonstração C-Level
            </Button>
          </Link>
          <Link to="/register">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white/40 bg-white/15 backdrop-blur-md hover:bg-white/25 text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 text-white font-black transition-all duration-300 rounded-xl"
            >
              <Sparkles className="w-4 lg:w-5 h-4 lg:h-5 mr-2" />
              Testar grátis
            </Button>
          </Link>
        </div>

        {/* Executive Final Benefits */}
        <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6 text-blue-200 mb-8">
          <div className="flex items-center bg-white/15 backdrop-blur-md rounded-full px-4 py-2 hover:bg-white/20 transition-all duration-300">
            <CheckCircle className="w-4 h-4 mr-2" />
            <span className="font-semibold text-sm lg:text-base">Success Manager Dedicado</span>
          </div>
          <div className="flex items-center bg-white/15 backdrop-blur-md rounded-full px-4 py-2 hover:bg-white/20 transition-all duration-300">
            <Shield className="w-4 h-4 mr-2" />
            <span className="font-semibold text-sm lg:text-base">Implementação Express</span>
          </div>
          <div className="flex items-center bg-white/15 backdrop-blur-md rounded-full px-4 py-2 hover:bg-white/20 transition-all duration-300">
            <Crown className="w-4 h-4 mr-2" />
            <span className="font-semibold text-sm lg:text-base">Suporte C-Level 24/7</span>
          </div>
        </div>

        {/* Payment Security Badges */}
        <div className="pt-8 border-t border-white/20">
          <p className="text-blue-200 mb-4 text-sm font-medium">Pagamento 100% Seguro</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Badge variant="outline" className="bg-white/10 border-white/30 text-white px-4 py-2 backdrop-blur-md">
              <Shield className="w-4 h-4 mr-2" />
              Pagamento Seguro
            </Badge>
            <Badge variant="outline" className="bg-white/10 border-white/30 text-white px-4 py-2 backdrop-blur-md">
              <CheckCircle className="w-4 h-4 mr-2" />
              Cancele Quando Quiser
            </Badge>
            <Badge variant="outline" className="bg-white/10 border-white/30 text-white px-4 py-2 backdrop-blur-md">
              <Shield className="w-4 h-4 mr-2" />
              30 Dias de Garantia
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};
