import React from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Award, TrendingUp, Zap } from 'lucide-react';
interface PartnerPortalHeaderProps {
  availableCommission: number;
  monthlyGrowth: number;
  partnerLevel: string;
}
export const PartnerPortalHeader: React.FC<PartnerPortalHeaderProps> = ({
  availableCommission,
  monthlyGrowth,
  partnerLevel
}) => {
  return <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Portal do Parceiro CS360°</h1>
            <p className="text-blue-100 text-lg mb-4">
              Bem-vindo de volta! Gerencie seu negócio e maximize seus resultados
            </p>
            <div className="flex items-center gap-4">
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                <Award className="w-4 h-4 mr-2" />
                {partnerLevel}
              </Badge>
              <Badge className="bg-green-500/20 text-white border-green-400/30 px-4 py-2">
                <TrendingUp className="w-4 h-4 mr-2" />
                +{monthlyGrowth}% este mês
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-blue-100 text-sm">Comissão Disponível</p>
              <p className="text-3xl font-bold">R$ {availableCommission.toLocaleString('pt-BR')}</p>
            </div>
            <Button className="bg-white hover:bg-blue-50 text-violet-900">
              <Zap className="w-4 h-4 mr-2" />
              Solicitar Pagamento
            </Button>
          </div>
        </div>
      </div>
    </div>;
};