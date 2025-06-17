import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { TrendingUp, Users, Sparkles } from 'lucide-react';
import { ROIResults as ROIResultsType } from './utils/roiCalculations';

interface ROIResultsProps {
  results: ROIResultsType;
  onReset: () => void;
  onClose: () => void;
}

export const ROIResults = ({ results, onReset, onClose }: ROIResultsProps) => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate('/onboarding');
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">
              {results.roiPercentage.toFixed(0)}%
            </div>
            <div className="text-sm text-green-700">ROI Anual Projetado</div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">
              R$ {results.monthlySavings.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
            </div>
            <div className="text-sm text-blue-700">Economia Mensal</div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {results.churnReduction}%
            </div>
            <div className="text-sm text-purple-700">Redução de Churn</div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              2.3x
            </div>
            <div className="text-sm text-orange-700">Aumento do LTV</div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Resumo dos Resultados
        </h3>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>LTV Atual:</span>
            <span className="font-medium">R$ {results.currentLTV.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}</span>
          </div>
          <div className="flex justify-between">
            <span>LTV Projetado:</span>
            <span className="font-medium text-green-600">R$ {results.projectedLTV.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}</span>
          </div>
          <div className="flex justify-between">
            <span>Economia Anual:</span>
            <span className="font-medium text-blue-600">R$ {(results.monthlySavings * 12).toLocaleString('pt-BR', { minimumFractionDigits: 0 })}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-green-600 to-blue-600 text-white"
          onClick={handleCreateAccount}
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Criar Conta e Começar Teste Grátis
        </Button>
        
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={onReset}
            className="flex-1"
          >
            Calcular Novamente
          </Button>
          <Button 
            variant="outline" 
            onClick={onClose}
            className="flex-1"
          >
            Fechar
          </Button>
        </div>
      </div>
    </>
  );
};
