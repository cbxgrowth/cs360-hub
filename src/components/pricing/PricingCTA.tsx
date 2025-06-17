
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { CheckCircle, Sparkles, Phone } from 'lucide-react';

export const PricingCTA = () => {
  const navigate = useNavigate();

  const handleStartTrial = () => {
    navigate('/register');
  };

  const handleContactSpecialist = () => {
    window.open('https://wa.me/88988432310?text=Olá! Gostaria de falar com um especialista sobre o CS360°', '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Pronto para começar sua transformação?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Teste gratuitamente por 14 dias, sem cartão de crédito
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100" 
            onClick={handleStartTrial}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Começar Teste Grátis
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={handleContactSpecialist} 
            className="border-white hover:bg-white text-slate-900"
          >
            <Phone className="w-5 h-5 mr-2" />
            Falar com Especialista
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-sm opacity-75 mt-8">
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            14 dias gratuitos
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            Sem cartão de crédito
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            Suporte especializado
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            Implementação guiada
          </div>
        </div>
      </div>
    </section>
  );
};
