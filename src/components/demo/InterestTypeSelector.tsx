
import React from 'react';
import { Label } from '../ui/label';
import { Building, Handshake } from 'lucide-react';

interface InterestTypeSelectorProps {
  formData: any;
  handleSelectChange: (name: string, value: string) => void;
}

export const InterestTypeSelector = ({ formData, handleSelectChange }: InterestTypeSelectorProps) => {
  return (
    <div className="space-y-3">
      <Label className="text-base font-semibold">Tipo de Interesse</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div 
          className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
            formData.demoType === 'customer' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => handleSelectChange('demoType', 'customer')}
        >
          <div className="flex items-center space-x-3">
            <Building className="w-5 h-5 text-blue-600" />
            <div>
              <div className="font-semibold">Contratar para Empresa</div>
              <div className="text-sm text-gray-600">Implementar CS360° na sua empresa</div>
            </div>
          </div>
        </div>
        <div 
          className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
            formData.demoType === 'partner' 
              ? 'border-purple-500 bg-purple-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => handleSelectChange('demoType', 'partner')}
        >
          <div className="flex items-center space-x-3">
            <Handshake className="w-5 h-5 text-purple-600" />
            <div>
              <div className="font-semibold">Programa de Parceiros</div>
              <div className="text-sm text-gray-600">Conhecer oportunidades de parceria</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
