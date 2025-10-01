import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Progress } from '../ui/progress';
import { CreditCard, Download, Calendar, AlertCircle, CheckCircle, Clock, Zap } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { UpgradePlanModal } from '../billing/UpgradePlanModal';
import { PurchaseCreditsModal } from '../billing/PurchaseCreditsModal';

const plans = [
  {
    name: 'Starter',
    price: 299,
    description: 'Ideal para pequenas equipes de CS',
    features: [
      'Até 50 clientes ativos',
      '1 usuário incluído (+R$ 99/usuário extra)',
      'Dashboard básico com métricas essenciais',
      'NPS automático mensal',
      'Health Score básico',
      'Relatórios pré-definidos (10)',
      'Suporte via email (48h)',
      'Integrações básicas (5)',
      'Onboarding guiado (2h)',
      'Armazenamento 5GB',
      'Histórico de 6 meses',
      '10 Créditos IA por mês'
    ],
    limits: { clients: 50, users: 1, aiCredits: 10 },
    popular: false
  },
  {
    name: 'Professional',
    price: 799,
    description: 'Para equipes em crescimento',
    features: [
      'Até 150 clientes ativos',
      '5 usuários incluídos (+R$ 79/usuário extra)',
      'Dashboard avançado com IA',
      'Automações inteligentes ilimitadas',
      'Health Score com IA preditiva (85% precisão)',
      'NPS trimestral + CSAT + CES',
      'Relatórios personalizáveis (50+)',
      'Integrações avançadas (20+)',
      'API básica (1000 req/hora)',
      'Suporte prioritário (24h)',
      'Treinamento online (10h)',
      'Armazenamento 50GB',
      'Histórico de 2 anos',
      'Alertas inteligentes',
      'Segmentação automática',
      '30 Créditos IA por mês'
    ],
    limits: { clients: 150, users: 5, aiCredits: 30 },
    popular: true
  },
  {
    name: 'Growth',
    price: 1599,
    description: 'Para empresas em aceleração',
    features: [
      'Até 500 clientes ativos',
      '15 usuários incluídos (+R$ 59/usuário extra)',
      'IA preditiva avançada (95% precisão)',
      'Programa de parceiros incluso',
      'Análise de sentimento avançada',
      'Automações com machine learning',
      'API completa (10.000 req/hora)',
      'Integrações ilimitadas',
      'CSM dedicado (4h/mês)',
      'Treinamento presencial (20h)',
      'SLA de 4 horas',
      'Armazenamento 200GB',
      'Histórico ilimitado',
      'Customizações básicas',
      'Consultoria mensal (2h)',
      'Backup automático',
      'Relatórios executivos',
      '50 Créditos IA por mês'
    ],
    limits: { clients: 500, users: 15, aiCredits: 50 },
    popular: false
  },
  {
    name: 'Enterprise',
    price: 'Sob consulta',
    description: 'Para grandes empresas',
    features: [
      'Clientes ilimitados',
      'Usuários ilimitados',
      'Infraestrutura dedicada na AWS',
      'IA personalizada para seu negócio',
      'Customizações completas',
      'Implementação guiada completa (80h)',
      'Consultoria estratégica inclusa (10h/mês)',
      'Treinamento da equipe (40h)',
      'API enterprise (100.000 req/hora)',
      'SLA de 1 hora garantido',
      'Suporte 24/7/365',
      'Success Manager exclusivo',
      'Roadmap personalizado',
      'Integração customizada ilimitada',
      'Compliance total (SOX, HIPAA)',
      'Backup em tempo real',
      'Disaster recovery',
      'Auditoria de segurança',
      'Onboarding premium (6 meses)',
      'Créditos IA ilimitados'
    ],
    limits: { clients: 999999, users: 999999, aiCredits: -1 },
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
  const [usage, setUsage] = useState({
    clients: 45,
    users: 3,
    aiCredits: 28
  });
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showCreditsModal, setShowCreditsModal] = useState(false);
  const { showSuccess, showInfo } = useNotifications();

  const getCurrentPlanData = () => {
    return plans.find(p => p.name === currentPlan) || plans[1];
  };

  const planData = getCurrentPlanData();

  const handleUpgradeSuccess = () => {
    showSuccess({
      title: "Plano Atualizado!",
      description: "Seu plano foi atualizado com sucesso."
    });
  };

  const handleCreditsSuccess = () => {
    setUsage(prev => ({ ...prev, aiCredits: prev.aiCredits + 50 }));
    showSuccess({
      title: "Créditos Adicionados!",
      description: "Seus créditos de IA foram adicionados com sucesso."
    });
  };

  const getUsageColor = (current: number, limit: number) => {
    const percentage = (current / limit) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-orange-600';
    return 'text-green-600';
  };


  return (
    <div className="space-y-6">

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
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => setShowUpgradeModal(true)}
              >
                Mudar de Plano
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowCreditsModal(true)}
              >
                <Zap className="w-4 h-4 mr-2" />
                Comprar Créditos IA
              </Button>
              <Button
                variant="ghost"
                className="w-full text-gray-600"
                onClick={() => showInfo({
                  title: "Gerenciar Assinatura",
                  description: "Entre em contato com o suporte para alterar método de pagamento ou cancelar."
                })}
              >
                Gerenciar Pagamento
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

      {/* Modais */}
      <UpgradePlanModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        currentPlan={currentPlan}
        onSuccess={handleUpgradeSuccess}
      />

      <PurchaseCreditsModal
        isOpen={showCreditsModal}
        onClose={() => setShowCreditsModal(false)}
        currentCredits={usage.aiCredits}
        onSuccess={handleCreditsSuccess}
      />
    </div>
  );
};
