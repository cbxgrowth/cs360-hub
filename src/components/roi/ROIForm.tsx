
import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Calculator } from 'lucide-react';
import { ROIFormData } from './utils/roiCalculations';

interface ROIFormProps {
  formData: ROIFormData;
  onInputChange: (field: string, value: string) => void;
  onCalculate: () => void;
}

export const ROIForm = ({ formData, onInputChange, onCalculate }: ROIFormProps) => {
  const isFormValid = formData.currentCustomers && formData.averageMonthlyRevenue && formData.currentChurnRate;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="customers">Número atual de clientes</Label>
          <Input
            id="customers"
            type="number"
            placeholder="Ex: 150"
            value={formData.currentCustomers}
            onChange={(e) => onInputChange('currentCustomers', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="revenue">Receita média mensal por cliente (R$)</Label>
          <Input
            id="revenue"
            type="number"
            placeholder="Ex: 2500"
            value={formData.averageMonthlyRevenue}
            onChange={(e) => onInputChange('averageMonthlyRevenue', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="churn">Taxa de churn mensal atual (%)</Label>
          <Input
            id="churn"
            type="number"
            placeholder="Ex: 5"
            step="0.1"
            value={formData.currentChurnRate}
            onChange={(e) => onInputChange('currentChurnRate', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="cac">Custo de aquisição por cliente (R$)</Label>
          <Input
            id="cac"
            type="number"
            placeholder="Ex: 3000"
            value={formData.customerAcquisitionCost}
            onChange={(e) => onInputChange('customerAcquisitionCost', e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button 
          onClick={onCalculate}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
          disabled={!isFormValid}
        >
          <Calculator className="w-4 h-4 mr-2" />
          Calcular ROI
        </Button>
      </div>
    </>
  );
};
