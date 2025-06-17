
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Progress } from '../../ui/progress';
import { 
  Trophy, 
  Star, 
  Crown, 
  Award,
  ArrowUp,
  CheckCircle
} from 'lucide-react';

interface PartnerLevel {
  level: string;
  name: string;
  requirements: {
    leads: number;
    conversions: number;
    certifications: number;
    npsScore: number;
  };
  benefits: string[];
  commissionRate: number;
  icon: React.ComponentType<any>;
  color: string;
}

const partnerLevels: PartnerLevel[] = [
  {
    level: 'starter',
    name: 'Starter',
    requirements: { leads: 5, conversions: 1, certifications: 1, npsScore: 6.0 },
    benefits: ['10% comissão', 'Suporte básico', 'Materiais de marketing'],
    commissionRate: 10,
    icon: Star,
    color: 'from-gray-500 to-gray-600'
  },
  {
    level: 'member',
    name: 'Member',
    requirements: { leads: 20, conversions: 5, certifications: 2, npsScore: 7.0 },
    benefits: ['15% comissão', 'Suporte prioritário', 'Treinamentos exclusivos'],
    commissionRate: 15,
    icon: Award,
    color: 'from-blue-500 to-blue-600'
  },
  {
    level: 'gold',
    name: 'Gold',
    requirements: { leads: 50, conversions: 15, certifications: 3, npsScore: 8.0 },
    benefits: ['25% comissão', 'Account manager dedicado', 'Co-marketing'],
    commissionRate: 25,
    icon: Trophy,
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    level: 'platinum',
    name: 'Platinum',
    requirements: { leads: 100, conversions: 35, certifications: 4, npsScore: 8.5 },
    benefits: ['35% comissão', 'Eventos exclusivos', 'Beta features'],
    commissionRate: 35,
    icon: Award,
    color: 'from-purple-500 to-purple-600'
  },
  {
    level: 'elite',
    name: 'Elite',
    requirements: { leads: 200, conversions: 75, certifications: 5, npsScore: 9.0 },
    benefits: ['40% comissão', 'Conselho consultivo', 'Revenue sharing'],
    commissionRate: 40,
    icon: Crown,
    color: 'from-red-500 to-red-600'
  }
];

interface PartnerLevelsProps {
  currentLevel: string;
  currentMetrics: {
    leads: number;
    conversions: number;
    certifications: number;
    npsScore: number;
  };
}

export const PartnerLevels: React.FC<PartnerLevelsProps> = ({ currentLevel, currentMetrics }) => {
  const currentLevelIndex = partnerLevels.findIndex(level => level.level === currentLevel);
  const nextLevel = partnerLevels[currentLevelIndex + 1];

  const getProgressPercentage = (current: number, required: number) => {
    return Math.min((current / required) * 100, 100);
  };

  const checkRequirement = (current: number, required: number) => {
    return current >= required;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span>Níveis de Parceria</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {partnerLevels.map((level, index) => {
              const isCurrent = level.level === currentLevel;
              const isCompleted = index < currentLevelIndex;
              const Icon = level.icon;

              return (
                <Card 
                  key={level.level} 
                  className={`relative ${isCurrent ? 'ring-2 ring-blue-500' : ''} ${isCompleted ? 'bg-green-50' : ''}`}
                >
                  <CardContent className="p-4 text-center">
                    <div className={`mx-auto w-12 h-12 rounded-full bg-gradient-to-r ${level.color} flex items-center justify-center mb-3`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-1">{level.name}</h3>
                    <Badge variant={isCurrent ? "default" : "outline"} className="mb-2">
                      {level.commissionRate}% comissão
                    </Badge>
                    {isCompleted && (
                      <CheckCircle className="w-4 h-4 text-green-500 mx-auto" />
                    )}
                    {isCurrent && (
                      <Badge className="bg-blue-100 text-blue-800">Atual</Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {nextLevel && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ArrowUp className="w-5 h-5 text-green-500" />
              <span>Progresso para {nextLevel.name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Leads Gerados</span>
                  <span>{currentMetrics.leads} / {nextLevel.requirements.leads}</span>
                </div>
                <Progress value={getProgressPercentage(currentMetrics.leads, nextLevel.requirements.leads)} />
                {checkRequirement(currentMetrics.leads, nextLevel.requirements.leads) && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Conversões</span>
                  <span>{currentMetrics.conversions} / {nextLevel.requirements.conversions}</span>
                </div>
                <Progress value={getProgressPercentage(currentMetrics.conversions, nextLevel.requirements.conversions)} />
                {checkRequirement(currentMetrics.conversions, nextLevel.requirements.conversions) && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Certificações</span>
                  <span>{currentMetrics.certifications} / {nextLevel.requirements.certifications}</span>
                </div>
                <Progress value={getProgressPercentage(currentMetrics.certifications, nextLevel.requirements.certifications)} />
                {checkRequirement(currentMetrics.certifications, nextLevel.requirements.certifications) && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>NPS Score</span>
                  <span>{currentMetrics.npsScore} / {nextLevel.requirements.npsScore}</span>
                </div>
                <Progress value={getProgressPercentage(currentMetrics.npsScore, nextLevel.requirements.npsScore)} />
                {checkRequirement(currentMetrics.npsScore, nextLevel.requirements.npsScore) && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Benefícios do nível {nextLevel.name}:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                {nextLevel.benefits.map((benefit, index) => (
                  <li key={index}>• {benefit}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
