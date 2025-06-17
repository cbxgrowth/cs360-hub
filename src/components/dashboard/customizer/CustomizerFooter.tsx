
import React from 'react';
import { Button } from '../../ui/button';
import { Separator } from '../../ui/separator';
import { Check, RotateCcw } from 'lucide-react';
import { metricOptions, chartOptions, sectionOptions } from './customizationData';

interface CustomizerFooterProps {
  onClose: () => void;
  onReset: () => void;
  hasChanges: boolean;
}

export const CustomizerFooter = ({ 
  onClose, 
  onReset, 
  hasChanges 
}: CustomizerFooterProps) => {
  return (
    <>
      <Separator />
      <div className="p-6 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
            <Check className="w-3 h-3 text-green-500" />
            <span>As alterações são salvas automaticamente</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs"
              onClick={onReset}
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Resetar
            </Button>
            <Button 
              size="sm" 
              className="text-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" 
              onClick={onClose}
            >
              <Check className="w-3 h-3 mr-1" />
              Concluído
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
