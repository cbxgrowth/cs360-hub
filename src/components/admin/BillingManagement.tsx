import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Progress } from '../ui/progress';
import { CreditCard, Download, Calendar, DollarSign, Users, TrendingUp, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from "@/integrations/supabase/client";

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
      '10 Créditos IA'
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

export const BillingManagement = () => {
  const [currentPlan] = useState('Professional');
  const [usage] = useState({
    clients: 45,
    users: 3,
    aiCredits: 28
  });
  const [portalLoading, setPortalLoading] = useState(false);
  const { toast } = useToast();

  const getCurrentPlanData = () => {
    return plans.find(p => p.name === currentPlan) || plans[1];
  };

  const planData = getCurrentPlanData();

  const openStripePortal = async () => {
    setPortalLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      if (error || !data?.url) {
        toast({
          title: "Erro ao abrir portal Stripe",
          description: error?.message || "Tente novamente ou entre em contato com suporte.",
          variant: "destructive",
        });
        return;
      }
      window.open(data.url, '_blank');
    } catch (err: any) {
      toast({
        title: "Erro ao conectar ao Stripe",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setPortalLoading(false);
    }
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
                    R$ {typeof planData.price === 'number' ? planData.price : planData.price}/mês
                  </p>
                </div>
                {planData.popular && (
                  <Badge className="bg-orange-100 text-orange-800">Mais Popular</Badge>
                )}
              </div>
              
              {/* Limites de Uso */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Clientes</span>
                    <span>{usage.clients} / {planData.limits.clients}</span>
                  </div>
                  <Progress value={(usage.clients / planData.limits.clients) * 100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Usuários</span>
                    <span>{usage.users} / {planData.limits.users}</span>
                  </div>
                  <Progress value={(usage.users / planData.limits.users) * 100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Créditos IA</span>
                    <span>{usage.aiCredits} / {planData.limits.aiCredits}</span>
                  </div>
                  <Progress value={(usage.aiCredits / planData.limits.aiCredits) * 100} className="h-2" />
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button 
                className="w-full"
                onClick={openStripePortal}
                disabled={portalLoading}
              >
                {portalLoading ? "Carregando..." : "Fazer Upgrade"}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={openStripePortal}
                disabled={portalLoading}
              >
                {portalLoading ? "Carregando..." : "Alterar Método de Pagamento"}
              </Button>
              <Button
                variant="ghost"
                className="w-full text-red-600"
                onClick={openStripePortal}
                disabled={portalLoading}
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

      {/* Histórico de Faturas */}
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
                  <TableCell>R$ {invoice.amount}</TableCell>
                  <TableCell>
                    <Badge variant={invoice.status === 'paid' ? 'default' : 'destructive'}>
                      {invoice.status === 'paid' ? 'Pago' : 'Pendente'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
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
