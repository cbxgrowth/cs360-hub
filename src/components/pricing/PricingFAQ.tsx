
import React from 'react';
import { Card, CardContent } from '../ui/card';

export const PricingFAQ = () => {
  const faq = [
    {
      question: 'Quais formas de pagamento são aceitas?',
      answer: 'Aceitamos cartões de crédito (Visa, Mastercard, Amex, Elo) e boleto bancário. Todos os pagamentos são processados de forma segura com criptografia de nível bancário e certificação PCI DSS através de processadores líderes de mercado.'
    },
    {
      question: 'Como funcionam os créditos de IA?',
      answer: 'Cada plano inclui créditos mensais de IA que são usados para recursos como análise preditiva, recomendações inteligentes e automações avançadas. Caso precise de mais créditos, você pode comprá-los avulsamente através do painel de billing por R$ 5,00 por crédito. Créditos não utilizados não acumulam para o próximo mês.'
    },
    {
      question: 'Posso trocar de plano a qualquer momento?',
      answer: 'Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento através do painel de billing. No caso de upgrade, a diferença é cobrada proporcionalmente. No downgrade, o crédito fica disponível para os próximos ciclos.'
    },
    {
      question: 'Como funciona o período de teste gratuito?',
      answer: 'Oferecemos 14 dias de teste gratuito completo do plano Professional, sem necessidade de cartão de crédito. Você terá acesso a todas as funcionalidades para avaliar nossa plataforma, incluindo 30 créditos de IA para testar os recursos avançados.'
    },
    {
      question: 'Existe contrato de fidelidade?',
      answer: 'Não exigimos contratos de fidelidade. Você pode cancelar a qualquer momento através do portal de pagamento, sem multas ou taxas de cancelamento. Nos planos anuais, oferecemos desconto de até 38%, mas sem obrigatoriedade de permanência.'
    },
    {
      question: 'Como funciona a renovação da assinatura?',
      answer: 'A renovação é automática e ocorre mensalmente ou anualmente, dependendo do plano escolhido. Você receberá um email de lembrete 7 dias antes da renovação. Pode cancelar ou alterar seu plano a qualquer momento através do painel de billing.'
    },
    {
      question: 'Como funciona o suporte técnico?',
      answer: 'Oferecemos suporte via email para todos os planos. Nos planos superiores, temos suporte prioritário (resposta em 24h), CSM dedicado no Growth e até suporte 24/7/365 no Enterprise com SLA de 1 hora.'
    },
    {
      question: 'Meus dados ficam seguros?',
      answer: 'Absolutamente. Utilizamos criptografia de nível bancário, backup automático, conformidade com LGPD/GDPR e infraestrutura na AWS com certificação SOC 2 Type II. Seus dados de pagamento são processados por parceiros certificados e nunca armazenados em nossos servidores.'
    },
    {
      question: 'Posso integrar com minhas ferramentas atuais?',
      answer: 'Sim! Oferecemos mais de 20 integrações nativas (CRMs, email marketing, etc.), API completa e nossa equipe pode desenvolver integrações customizadas para o plano Enterprise.'
    },
    {
      question: 'Como funciona o reembolso?',
      answer: 'Oferecemos garantia de reembolso de 30 dias para novos clientes. Se não estiver satisfeito com a plataforma, basta solicitar o reembolso através do suporte e devolveremos 100% do valor pago, sem perguntas.'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-gray-600">
            Tire suas dúvidas sobre nossos planos e funcionalidades
          </p>
        </div>

        <div className="space-y-6">
          {faq.map((item, index) => (
            <Card key={index} className="border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {item.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.answer}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
