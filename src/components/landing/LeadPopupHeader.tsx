
import React from 'react';
import { DialogHeader, DialogTitle } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Crown, CheckCircle } from 'lucide-react';

export const LeadPopupHeader: React.FC = () => {
  return (
    <>
      <DialogHeader className="text-center mb-6 relative">
        <Badge className="bg-white/25 text-white px-4 py-2 backdrop-blur-md text-sm font-semibold mx-auto mb-4 w-fit">
          <Crown className="w-4 h-4 mr-2" />
          Exclusivo para Líderes
        </Badge>
        
        <DialogTitle className="text-2xl md:text-3xl font-black mb-4 leading-tight">
          PlayBook Executivo
          <span className="block text-blue-300 text-xl md:text-2xl">
            Customer Success
          </span>
        </DialogTitle>
        
        <p className="text-blue-100/90 text-base leading-relaxed">
          Estratégias comprovadas por 500+ líderes que transformaram CS em motor de crescimento
        </p>
      </DialogHeader>

      {/* Benefits */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          'ROI 850% no 1º ano',
          'Redução 60% churn',
          'Metodologia OKR',
          'Cases C-Level'
        ].map((benefit, index) => (
          <div key={index} className="flex items-center bg-white/15 backdrop-blur-md rounded-lg px-3 py-2">
            <CheckCircle className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" />
            <span className="text-sm font-semibold">{benefit}</span>
          </div>
        ))}
      </div>
    </>
  );
};
