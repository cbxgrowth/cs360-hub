import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Progress } from '../ui/progress';
import { CreditCard, Download, Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { supabase } from "@/integrations/supabase/client";
import { withRetry, retryConditions } from '@/utils/retry';
import { logger } from '@/utils/logger';
import { LoadingSpinner } from '../common/LoadingSpinner';

const plans = [
  {
    name: 'Starter',
    price: 279,
    description: 'Ideal para pequenas equipes de CS',
    features: [
      'Até 30 clientes',
      '2 usuários na equipe',
      'Gestão de clientes',
      'Registro de serviços e contratos',
      'Upsell e CrossSell',
      'Alertas e recomendações IA',
      'Suporte por e-mail',
      '10 Cré1ditos IA'
    ],
    limits: { clients: 30, users: 2, aiCredits: 10 },
    popular: false
  },
  {
    name: 'Professional',
    price: 497,
    description: 'Para equipes em crescimento',
    features: [
      'Até 80 clientes',
      '5 usuários na equipe',
      'Gestão de Clientes',
      'Gestão de Contratos',
      'Alertas de oportunidades e recomendações IA',
      'Upsell e CrossSell',
      'Relatórios avançados',
      'Integração com CRMs',
      'Suporte prioritário',
      'Sistema de Medição e Gestão do NPS',
      'Relatórios e Dashboards Personalizados',
      '50 Créditos IA'
    ],
    limits: { clients: 80, users: 5, aiCredits: 50 },
    popular: true
  },
  {
    name: 'Growth',
    price: 997,
    description: 'Para empresas em aceleração',
    features: [
      '150 Clientes',
      'Todos os usuários da equipe',
      'Funcionalidades personalizadas',
      'Integração com CRMs e APIs',
      'Gestão e Acompanhamento do LTV e CAC',
      'Gestão de Estratégias e Ações',
      'Automação, Alertas e Insights com IA',
      'Relatórios e Dashboards Personalizados',
      'API completa',
      'Treinamento especializado',
      '100 Créditos IA'
    ],
    limits: { clients: 150, users: 999, aiCredits: 100 },
    popular: false
  },
  {
    name: 'Enterprise',
    price: 'Sob consulta',
    description: 'Para grandes empresas',
    features: [
      'Clientes ilimitados',
      'Funcionalidades personalizadas',
      'Integrações personalizadas',
      'API completa',
      'Multi-usuários',
      'Suporte 24/7',
      'Treinamento especializado',
      'Testes personalizados',
      '300 Créditos IA'
    ],
    limits: { clients: 999999, users: 999999, aiCredits: 300 },
    popular: false
  }
];

const invoices = [
  { id: '001', date: '2024-01-01', amount: 497, status: 'paid', plan: 'Professional' },
  { id: '002', date: '2023-12-01', amount: 497, status: 'paid', plan: 'Professional' },
  { id: '003', date: '2023-11-01', amount: 279, status: 'paid', plan: 'Starter' }
];

export const BillingManagementEnhanced = () => {
  const [currentPlan] = useState('Professional');
  const [usage] = useState({
    clients: 45,
    users: 3,
    aiCredits: 28
  });
  const [portalLoading, setPortalLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'error' | 'checking'>('connected');
  const { showSuccess, showError, showWarning, showInfo } = useNotifications();

  const getCurrentPlanData = () => {
    return plans.find(p => p.name === currentPlan) || plans[1];
  };

  const planData = getCurrentPlanData();

  const openStripePortal = async () => {
    setPortalLoading(true);
    setConnectionStatus('checking');
    
    try {
      logger.info('Abrindo portal do Stripe');
      
      const result = await withRetry(
        async () => {
          const { data, error } = await supabase.functions.invoke('customer-portal');
          if (error) throw error;
          if (!data?.url) throw new Error('URL do portal não retornada');
          return data;
        },
        {
          maxAttempts: 3,
          delay: 1000,
          retryCondition: retryConditions.temporaryError
        }
      );
      
      setConnectionStatus('connected');
      logger.info('Portal do Stripe aberto com sucesso');
      
      showSuccess({
        title: "Redirecionando para o portal",
        description: "Você será redirecionado para gerenciar sua assinatura."
      });
      
      window.open(result.url, '_blank');
      
    } catch (err: any) {
      setConnectionStatus('error');
      logger.error('Erro ao abrir portal do Stripe', err);
      
      showError({
        title: "Erro ao acessar portal de pagamento",
        description: err.message || "Tente novamente em alguns instantes ou entre em contato com o suporte."
      });
    } finally {
      setPortalLoading(false);
    }
  };

  const getUsageColor = (current: number, limit: number) => {
    const percentage = (current / limit) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-orange-600';
    return 'text-green-600';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'checking':
        return <Clock className="w-4 h-4 text-orange-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Status de Conexão */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getStatusIcon(connectionStatus)}
              <span className="text-sm font-medium">
                Status da Conexão: {
                  connectionStatus === 'connected' ? 'Conectado' :
                  connectionStatus === 'error' ? 'Erro' : 'Verificando...'
                }
              </span>
            </div>
            {connectionStatus === 'error' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setConnectionStatus('connected')}
              >
                Tentar Reconectar
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Plano Atual */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5" />
            <span>Plano Atual</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold">{planData.name}</h3>
                  <p className="text-gray-600">{planData.description}</p>
                  <p className="text-3xl font-bold text-blue-600 mt-2">
                    R$ {typeof planData.price === 'number' ? planData.price.toLocaleString() : planData.price}/mês
                  </p>
                </div>
                {planData.popular && (
                  <Badge className="bg-orange-100 text-orange-800">Mais Popular</Badge>
                )}
              </div>
              
              {/* Limites de Uso com indicadores visuais melhorados */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Clientes</span>
                    <span className={getUsageColor(usage.clients, planData.limits.clients)}>
                      {usage.clients} / {planData.limits.clients}
                    </span>
                  </div>
                  <Progress 
                    value={(usage.clients / planData.limits.clients) * 100} 
                    className="h-2"
                  />
                  {usage.clients / planData.limits.clients > 0.9 && (
                    <p className="text-xs text-red-600 mt-1">
                      ⚠️ Limite quase atingido - considere fazer upgrade
                    </p>
                  )}
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Usuários</span>
                    <span className={getUsageColor(usage.users, planData.limits.users)}>
                      {usage.users} / {planData.limits.users}
                    </span>
                  </div>
                  <Progress 
                    value={(usage.users / planData.limits.users) * 100} 
                    className="h-2"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Créditos IA</span>
                    <span className={getUsageColor(usage.aiCredits, planData.limits.aiCredits)}>
                      {usage.aiCredits} / {planData.limits.aiCredits}
                    </span>
                  </div>
                  <Progress 
                    value={(usage.aiCredits / planData.limits.aiCredits) * 100} 
                    className="h-2"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button 
                className="w-full"
                onClick={openStripePortal}
                disabled={portalLoading || connectionStatus === 'error'}
              >
                {portalLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Carregando...
                  </>
                ) : (
                  "Fazer Upgrade"
                )}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={openStripePortal}
                disabled={portalLoading || connectionStatus === 'error'}
              >
                {portalLoading ? "Carregando..." : "Alterar Método de Pagamento"}
              </Button>
              <Button
                variant="ghost"
                className="w-full text-red-600"
                onClick={openStripePortal}
                disabled={portalLoading || connectionStatus === 'error'}
              >
                {portalLoading ? "Carregando..." : "Cancelar Assinatura"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Planos Disponíveis */}
      <Card>
        <CardHeader>
          <CardTitle>Planos Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map(plan => (
              <div key={plan.name} className={`border rounded-lg p-6 relative ${plan.name === currentPlan ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                {plan.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-orange-500">
                    Mais Popular
                  </Badge>
                )}
                {plan.name === 'Growth' && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-green-500">
                    Melhor Custo x Benefício
                  </Badge>
                )}
                
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                <p className="text-2xl font-bold text-blue-600 mb-4">
                  R$ {typeof plan.price === 'number' ? plan.price : plan.price}/mês
                </p>
                
                <ul className="space-y-2 mb-6 text-sm">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.name === currentPlan ? "default" : "outline"} 
                  className="w-full"
                  disabled={plan.name === currentPlan}
                >
                  {plan.name === currentPlan ? 'Plano Atual' : 'Selecionar'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Histórico de Faturas com tratamento de erro */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Histórico de Faturas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fatura</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map(invoice => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">#{invoice.id}</TableCell>
                  <TableCell>{new Date(invoice.date).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{invoice.plan}</TableCell>
                  <TableCell>R$ {invoice.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={invoice.status === 'paid' ? 'default' : 'destructive'}>
                      {invoice.status === 'paid' ? 'Pago' : 'Pendente'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => showInfo({
                        title: "Download em desenvolvimento",
                        description: "A funcionalidade de download estará disponível em breve."
                      })}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
