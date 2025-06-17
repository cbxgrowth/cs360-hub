
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Brain, TrendingUp, Users, DollarSign, AlertTriangle, Lightbulb, Zap, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AIRecommendation {
  id: number;
  type: 'upsell' | 'churn_risk' | 'engagement' | 'optimization' | 'retention';
  priority: 'urgent' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  confidence: number;
  potentialValue: string;
  action: string;
  icon: React.ComponentType<any>;
  color: string;
  client?: string;
  credits: number;
}

const initialRecommendations: AIRecommendation[] = [
  {
    id: 1,
    type: 'upsell',
    priority: 'high',
    title: 'Oportunidade de Upsell Detectada',
    description: 'TechCorp LTDA apresenta padrões de uso que indicam necessidade do plano Enterprise',
    confidence: 89,
    potentialValue: 'R$ 15.000/mês',
    action: 'Agendar reunião comercial',
    icon: TrendingUp,
    color: 'text-green-600',
    client: 'TechCorp LTDA',
    credits: 5
  },
  {
    id: 2,
    type: 'churn_risk',
    priority: 'urgent',
    title: 'Risco de Churn Identificado',
    description: 'Cliente BigCorp mostra sinais de baixo engajamento nos últimos 15 dias',
    confidence: 92,
    potentialValue: 'R$ 8.500/mês em risco',
    action: 'Intervenção do CS',
    icon: AlertTriangle,
    color: 'text-red-600',
    client: 'BigCorp',
    credits: 8
  },
  {
    id: 3,
    type: 'engagement',
    priority: 'medium',
    title: 'Oportunidade de Engajamento',
    description: 'StartupXYZ não está utilizando recursos avançados disponíveis no plano',
    confidence: 76,
    potentialValue: 'Melhor retenção',
    action: 'Sessão de treinamento',
    icon: Users,
    color: 'text-blue-600',
    client: 'StartupXYZ',
    credits: 3
  }
];

const alternativeRecommendations: AIRecommendation[] = [
  {
    id: 4,
    type: 'optimization',
    priority: 'high',
    title: 'Otimização de Processo Detectada',
    description: 'FinanceCorp pode automatizar 40% das tarefas manuais atuais',
    confidence: 85,
    potentialValue: 'R$ 12.000/mês economia',
    action: 'Implementar automação',
    icon: Zap,
    color: 'text-purple-600',
    client: 'FinanceCorp',
    credits: 6
  },
  {
    id: 5,
    type: 'retention',
    priority: 'urgent',
    title: 'Cliente em Risco Crítico',
    description: 'HealthPlus reduziu uso em 60% e não respondeu últimas 3 comunicações',
    confidence: 94,
    potentialValue: 'R$ 22.000/mês em risco',
    action: 'Escalação executiva',
    icon: AlertTriangle,
    color: 'text-red-600',
    client: 'HealthPlus',
    credits: 10
  },
  {
    id: 6,
    type: 'upsell',
    priority: 'medium',
    title: 'Expansão de Conta Identificada',
    description: 'RetailMax solicitou integrações avançadas 5x no último mês',
    confidence: 88,
    potentialValue: 'R$ 18.500/mês',
    action: 'Proposta customizada',
    icon: TrendingUp,
    color: 'text-green-600',
    client: 'RetailMax',
    credits: 4
  }
];

export const AIRecommendationsPanel = () => {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>(initialRecommendations);
  const [executingId, setExecutingId] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleExecuteRecommendation = async (recommendation: AIRecommendation) => {
    setExecutingId(recommendation.id);
    
    // Simular consumo de créditos
    toast({
      title: "Executando Ação IA",
      description: `Consumindo ${recommendation.credits} créditos IA para executar: ${recommendation.action}`,
    });

    // Simular processamento
    setTimeout(() => {
      toast({
        title: "Ação Executada com Sucesso",
        description: `${recommendation.action} foi executada. Cliente: ${recommendation.client}`,
      });

      // Remover a recomendação executada e adicionar uma nova
      const newRecommendations = recommendations.filter(r => r.id !== recommendation.id);
      const availableAlternatives = alternativeRecommendations.filter(
        alt => !newRecommendations.some(rec => rec.id === alt.id)
      );
      
      if (availableAlternatives.length > 0) {
        const randomAlternative = availableAlternatives[Math.floor(Math.random() * availableAlternatives.length)];
        newRecommendations.push(randomAlternative);
      }

      setRecommendations(newRecommendations);
      setExecutingId(null);
    }, 2000);
  };

  const handleRefreshRecommendations = async () => {
    setIsRefreshing(true);
    
    toast({
      title: "Atualizando Recomendações",
      description: "IA está analisando dados para gerar novas recomendações...",
    });

    setTimeout(() => {
      // Embaralhar e selecionar 3 recomendações aleatórias
      const allRecommendations = [...initialRecommendations, ...alternativeRecommendations];
      const shuffled = allRecommendations.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      
      setRecommendations(selected);
      setIsRefreshing(false);
      
      toast({
        title: "Recomendações Atualizadas",
        description: "Novas oportunidades foram identificadas pela IA!",
      });
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <span>Recomendações de IA</span>
            <Badge className="bg-purple-100 text-purple-800">
              {recommendations.length} ativas
            </Badge>
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefreshRecommendations}
            disabled={isRefreshing}
            className="flex items-center space-x-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Atualizar</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  <rec.icon className={`w-5 h-5 ${rec.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                    <Badge className={getPriorityColor(rec.priority)}>
                      {rec.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>Confiança: {rec.confidence}%</span>
                    <span className="text-green-600 font-medium">{rec.potentialValue}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-600 font-medium">{rec.action}</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {rec.credits} créditos
                      </Badge>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleExecuteRecommendation(rec)}
                        disabled={executingId === rec.id}
                        className="min-w-[80px]"
                      >
                        {executingId === rec.id ? (
                          <>
                            <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                            Executando...
                          </>
                        ) : (
                          'Executar'
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="pt-2 border-t">
          <Button variant="ghost" className="w-full">
            <Lightbulb className="w-4 h-4 mr-2" />
            Ver todas as recomendações
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
