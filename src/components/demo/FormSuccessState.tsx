
import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent } from '../ui/card';
import { CheckCircle, Copy } from 'lucide-react';

interface FormSuccessStateProps {
  formData: any;
  referralLink: string;
  onReset: () => void;
}

export const FormSuccessState = ({ formData, referralLink, onReset }: FormSuccessStateProps) => {
  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="text-center p-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {formData.demoType === 'partner' && formData.partnerType === 'referral' 
            ? 'Indicação Registrada!' 
            : 'Demonstração Agendada!'
          }
        </h3>
        <p className="text-gray-600 mb-6">
          {formData.demoType === 'partner' && formData.partnerType === 'referral'
            ? 'Sua indicação foi registrada com sucesso. Nossa equipe entrará em contato em até 2 horas úteis.'
            : 'Recebemos sua solicitação. Nossa equipe entrará em contato em até 2 horas úteis para confirmar sua demonstração executiva.'
          }
        </p>
        
        {referralLink && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-800 mb-2">Seu Link de Indicação</h4>
            <div className="flex items-center space-x-2">
              <Input 
                value={referralLink} 
                readOnly 
                className="bg-white border-blue-300 text-sm"
              />
              <Button 
                type="button"
                variant="outline" 
                size="sm"
                onClick={copyReferralLink}
                className="border-blue-300 text-blue-600 hover:bg-blue-100"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
        
        <Button onClick={onReset} variant="outline" className="w-full">
          {formData.demoType === 'partner' && formData.partnerType === 'referral'
            ? 'Nova Indicação'
            : 'Agendar Nova Demonstração'
          }
        </Button>
      </CardContent>
    </Card>
  );
};
