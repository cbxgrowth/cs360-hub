
export const emailTemplates = [
  {
    id: 'standard',
    name: 'Template Padrão',
    subject: 'Como você avalia nossa solução? Sua opinião é importante!',
    content: `Olá {CLIENTE_NOME},

Esperamos que esteja aproveitando ao máximo nossa solução CS360°.

Gostaríamos de saber como tem sido sua experiência conosco. Em uma escala de 0 a 10, o quanto você recomendaria nossa solução para um colega ou parceiro de negócios?

[ESCALA NPS 0-10]

Sua resposta nos ajuda a melhorar continuamente nossos serviços.

Obrigado pelo seu tempo!
Equipe CS360°`
  },
  {
    id: 'detailed',
    name: 'Template Detalhado',
    subject: 'Pesquisa de Satisfação CS360° - 2 minutos para nos ajudar',
    content: `Prezado(a) {CLIENTE_NOME},

Como parte do nosso compromisso com a excelência, gostaríamos de conhecer sua opinião sobre nossa solução.

1. Em uma escala de 0 a 10, o quanto você recomendaria o CS360° para outros profissionais?
[ESCALA NPS 0-10]

2. O que mais te agrada em nossa solução?
3. O que poderíamos melhorar?

Sua participação é fundamental para continuarmos evoluindo.

Atenciosamente,
Equipe CS360°`
  }
];
