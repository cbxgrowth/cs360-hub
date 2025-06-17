
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Calculator } from 'lucide-react';
import { ROIForm } from './roi/ROIForm';
import { ROIResults } from './roi/ROIResults';
import { ROIFormData, ROIResults as ROIResultsType, calculateROI } from './roi/utils/roiCalculations';

interface ROICalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ROICalculatorModal = ({ isOpen, onClose }: ROICalculatorModalProps) => {
  const [formData, setFormData] = useState<ROIFormData>({
    currentCustomers: '',
    averageMonthlyRevenue: '',
    currentChurnRate: '',
    customerAcquisitionCost: '',
  });

  const [results, setResults] = useState<ROIResultsType | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCalculate = () => {
    const calculatedResults = calculateROI(formData);
    setResults(calculatedResults);
  };

  const resetCalculator = () => {
    setFormData({
      currentCustomers: '',
      averageMonthlyRevenue: '',
      currentChurnRate: '',
      customerAcquisitionCost: '',
    });
    setResults(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <Calculator className="w-6 h-6 mr-3 text-blue-600" />
            Calculadora de ROI Personalizado
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {!results ? (
            <ROIForm 
              formData={formData}
              onInputChange={handleInputChange}
              onCalculate={handleCalculate}
            />
          ) : (
            <ROIResults 
              results={results}
              onReset={resetCalculator}
              onClose={onClose}
            />
          )}

          <div className="text-xs text-gray-500 text-center">
            * Cálculos baseados em dados médios de clientes CS360°. Resultados podem variar.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
