
import React from 'react';
import { Button } from '../ui/button';
import { Calculator } from 'lucide-react';

interface PricingROIProps {
  onOpenROIModal: () => void;
}

export const PricingROI = ({ onOpenROIModal }: PricingROIProps) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Calcule seu ROI com o CS360°
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Empresas que usam CS360° veem resultados em média de:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl">
            <div className="text-4xl font-bold text-green-600 mb-2">40%</div>
            <div className="text-lg font-medium text-gray-900 mb-2">Redução de Churn</div>
            <div className="text-gray-600 text-sm">Mantenha mais clientes por mais tempo</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
            <div className="text-4xl font-bold text-blue-600 mb-2">2.3x</div>
            <div className="text-lg font-medium text-gray-900 mb-2">Aumento do LTV</div>
            <div className="text-gray-600 text-sm">Maximize o valor de cada cliente</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-8 rounded-2xl">
            <div className="text-4xl font-bold text-purple-600 mb-2">450%</div>
            <div className="text-lg font-medium text-gray-900 mb-2">ROI Médio</div>
            <div className="text-gray-600 text-sm">Retorno em 12 meses</div>
          </div>
        </div>

        <Button 
          size="lg" 
          className="bg-gradient-to-r from-blue-600 to-purple-600"
          onClick={onOpenROIModal}
        >
          <Calculator className="w-5 h-5 mr-2" />
          Calcular Meu ROI Personalizado
        </Button>
      </div>
    </section>
  );
};
