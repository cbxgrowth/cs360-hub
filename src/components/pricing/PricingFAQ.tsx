
import React from 'react';
import { Card, CardContent } from '../ui/card';

export const PricingFAQ = () => {
  const faq = [
    {
      question: 'Posso trocar de plano a qualquer momento?',
      answer: 'Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. No caso de upgrade, a diferença é cobrada proporcionalmente. No downgrade, o crédito fica disponível para os próximos ciclos.'
    },
    {
      question: 'Como funciona o período de teste gratuito?',
      answer: 'Oferecemos 14 dias de teste gratuito completo do plano Professional, sem necessidade de cartão de crédito. Você terá acesso a todas as funcionalidades para avaliar nossa plataforma.'
    },
    {
      question: 'Existe contrato de fidelidade?',
      answer: 'Não exigimos contratos de fidelidade. Você pode cancelar a qualquer momento. Nos planos anuais, oferecemos desconto significativo, mas sem obrigatoriedade de permanência.'
    },
    {
      question: 'Como funciona o suporte técnico?',
      answer: 'Oferecemos suporte via email para todos os planos. Nos planos superiores, temos suporte prioritário, CSM dedicado e até suporte 24/7 no Enterprise.'
    },
    {
      question: 'Meus dados ficam seguros?',
      answer: 'Absolutamente. Utilizamos criptografia de nível bancário, backup automático, conformidade com LGPD/GDPR e infraestrutura na AWS com certificação SOC 2 Type II.'
    },
    {
      question: 'Posso integrar com minhas ferramentas atuais?',
      answer: 'Sim! Oferecemos mais de 200 integrações nativas, API completa e nossa equipe pode desenvolver integrações customizadas para o plano Enterprise.'
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
