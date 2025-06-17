
import { 
  BarChart3, 
  TrendingUp, 
  Brain,
  Award,
  PieChart,
  FileText,
  Sparkles,
  Search,
  Workflow,
  Bell,
  Calendar,
  RefreshCw,
  MessageSquare,
  Mail,
  Phone,
  Heart,
  Database,
  Upload,
  Globe,
  Monitor,
  Shield,
  Lock,
  Eye,
  Activity
} from 'lucide-react';

export const featuresData = {
  dashboard: [
    {
      icon: BarChart3,
      title: 'Dashboard 360° Inteligente',
      description: 'Visão unificada de todos os dados do cliente em tempo real',
      features: [
        'Métricas customizáveis e KPIs personalizados',
        'Visualizações interativas e gráficos dinâmicos',
        'Filtros avançados e drill-down',
        'Exportação automática de relatórios',
        'Alertas e notificações em tempo real'
      ],
      benefits: 'Tome decisões baseadas em dados com visibilidade total do seu CS'
    },
    {
      icon: TrendingUp,
      title: 'Health Score Dinâmico',
      description: 'Pontuação de saúde do cliente atualizada em tempo real',
      features: [
        'Algoritmo proprietário de 50+ variáveis',
        'Histórico e tendências do health score',
        'Alertas automáticos de mudanças críticas',
        'Segmentação por score e perfil',
        'Predição de health score futuro'
      ],
      benefits: 'Identifique riscos e oportunidades antes que seja tarde'
    },
    {
      icon: PieChart,
      title: 'Análise de Segmentação',
      description: 'Segmente clientes automaticamente por comportamento e valor',
      features: [
        'Segmentação automática por IA',
        'Grupos personalizados e dinâmicos',
        'Análise de cohort e comportamento',
        'Comparação entre segmentos',
        'Estratégias específicas por segmento'
      ],
      benefits: 'Entenda seus clientes profundamente e personalize abordagens'
    },
    {
      icon: FileText,
      title: 'Relatórios Avançados',
      description: 'Relatórios personalizáveis e automatizados',
      features: [
        'Templates prontos e personalizáveis',
        'Agendamento automático de envios',
        'Múltiplos formatos (PDF, Excel, PPT)',
        'Comentários e insights automáticos',
        'Compartilhamento seguro com stakeholders'
      ],
      benefits: 'Comunicação eficaz com executivos e equipes'
    }
  ],
  ai: [
    {
      icon: Brain,
      title: 'IA Preditiva de Churn',
      description: 'Previsão de churn com 95% de precisão usando machine learning',
      features: [
        'Algoritmos de deep learning proprietários',
        'Análise de 200+ sinais comportamentais',
        'Predição com até 90 dias de antecedência',
        'Score de probabilidade de churn',
        'Recomendações automáticas de ação'
      ],
      benefits: 'Reduza churn em até 40% com intervenções antecipadas'
    },
    {
      icon: Sparkles,
      title: 'Insights Automáticos',
      description: 'IA identifica padrões e gera insights acionáveis automaticamente',
      features: [
        'Detecção automática de anomalias',
        'Insights contextuais por cliente',
        'Correlações entre métricas',
        'Sugestões de próximas ações',
        'Alertas inteligentes prioritizados'
      ],
      benefits: 'Descubra oportunidades ocultas sem esforço manual'
    },
    {
      icon: Award,
      title: 'NPS Inteligente',
      description: 'Análise avançada de NPS com processamento de linguagem natural',
      features: [
        'Análise de sentimento automática',
        'Categorização de feedbacks',
        'Tendências e drivers de NPS',
        'Benchmarking automático',
        'Ações sugeridas por IA'
      ],
      benefits: 'Transforme feedback em ações concretas de melhoria'
    },
    {
      icon: Search,
      title: 'Busca Inteligente',
      description: 'Encontre qualquer informação usando linguagem natural',
      features: [
        'Busca por linguagem natural',
        'Resultados contextualizados',
        'Sugestões inteligentes',
        'Histórico de buscas',
        'Filtros automáticos'
      ],
      benefits: 'Acesse informações instantaneamente com perguntas simples'
    }
  ],
  automation: [
    {
      icon: Workflow,
      title: 'Workflows Inteligentes',
      description: 'Automação completa de processos de Customer Success',
      features: [
        'Designer visual de workflows',
        'Triggers baseados em comportamento',
        'Condições lógicas complexas',
        'Integração com ferramentas externas',
        'Templates prontos para usar'
      ],
      benefits: 'Automatize 80% das tarefas repetitivas da sua equipe'
    },
    {
      icon: Bell,
      title: 'Alertas Proativos',
      description: 'Sistema avançado de notificações e alertas automáticos',
      features: [
        'Alertas personalizáveis por usuário',
        'Múltiplos canais (email, SMS, Slack)',
        'Escalabilidade automática',
        'Snooze e lembretes',
        'Histórico completo de alertas'
      ],
      benefits: 'Nunca perca uma oportunidade ou risco importante'
    },
    {
      icon: Calendar,
      title: 'Onboarding Automatizado',
      description: 'Jornada de onboarding personalizada e automatizada',
      features: [
        'Jornadas personalizadas por perfil',
        'Check-ins automáticos',
        'Conteúdo dinâmico',
        'Acompanhamento de progresso',
        'Intervenções automáticas'
      ],
      benefits: 'Aumente success rate do onboarding em 60%'
    },
    {
      icon: RefreshCw,
      title: 'Sincronização Automática',
      description: 'Sincronização contínua com todas as suas ferramentas',
      features: [
        'Sync em tempo real',
        'Mapeamento automático de campos',
        'Resolução de conflitos',
        'Histórico de sincronizações',
        'Monitoramento de status'
      ],
      benefits: 'Dados sempre atualizados sem intervenção manual'
    }
  ],
  communication: [
    {
      icon: MessageSquare,
      title: 'Centro de Comunicação',
      description: 'Todas as interações com clientes em um só lugar',
      features: [
        'Histórico unificado de comunicações',
        'Templates personalizáveis',
        'Agendamento de mensagens',
        'Tracking de abertura e cliques',
        'Respostas automáticas inteligentes'
      ],
      benefits: 'Comunicação consistente e profissional sempre'
    },
    {
      icon: Mail,
      title: 'Email Marketing Inteligente',
      description: 'Campanhas de email personalizadas e automatizadas',
      features: [
        'Segmentação automática avançada',
        'Personalização por IA',
        'A/B testing automático',
        'Análise de performance detalhada',
        'Otimização contínua'
      ],
      benefits: 'Aumente engajamento em 45% com emails relevantes'
    },
    {
      icon: Phone,
      title: 'Call Center Integrado',
      description: 'Sistema de chamadas integrado com histórico completo',
      features: [
        'Discador automático inteligente',
        'Gravação e transcrição automática',
        'Scripts dinâmicos contextuais',
        'Agendamento inteligente',
        'Análise de performance de calls'
      ],
      benefits: 'Maximize eficiência e qualidade das ligações'
    },
    {
      icon: Heart,
      title: 'Feedback 360°',
      description: 'Sistema completo de coleta e análise de feedback',
      features: [
        'Múltiplos tipos de pesquisa',
        'Timing automático otimizado',
        'Análise de sentimento avançada',
        'Closed-loop feedback',
        'Benchmarking automático'
      ],
      benefits: 'Transforme feedback em melhorias concretas'
    }
  ],
  integrations: [
    {
      icon: Database,
      title: 'Hub de Integrações',
      description: 'Conecte com 200+ ferramentas sem código',
      features: [
        '200+ integrações nativas',
        'API REST completa',
        'Webhooks bidirecionais',
        'Mapeamento visual de dados',
        'Marketplace de conectores'
      ],
      benefits: 'Unifique seu stack tecnológico sem complexidade'
    },
    {
      icon: Upload,
      title: 'Import/Export Avançado',
      description: 'Migração e sincronização de dados simplificada',
      features: [
        'Importação em massa inteligente',
        'Validação automática de dados',
        'Mapeamento assistido por IA',
        'Rollback automático',
        'Agendamento de sincronizações'
      ],
      benefits: 'Migre dados complexos em minutos, não semanas'
    },
    {
      icon: Globe,
      title: 'API Enterprise',
      description: 'API robusta para integrações customizadas',
      features: [
        'REST API documentada',
        'GraphQL support',
        'Rate limiting inteligente',
        'Autenticação OAuth2',
        'SDKs para principais linguagens'
      ],
      benefits: 'Desenvolva integrações customizadas rapidamente'
    },
    {
      icon: Monitor,
      title: 'Business Intelligence',
      description: 'Conecte com ferramentas de BI para análises avançadas',
      features: [
        'Conectores nativos (Tableau, Power BI)',
        'Data warehouse otimizado',
        'ETL automatizado',
        'Modelos de dados pré-construídos',
        'Refresh automático'
      ],
      benefits: 'Potencialize análises com ferramentas familiares'
    }
  ],
  security: [
    {
      icon: Shield,
      title: 'Segurança Enterprise',
      description: 'Proteção de dados de nível bancário',
      features: [
        'Criptografia AES-256',
        'HTTPS/TLS 1.3',
        'Backup automático multi-região',
        'SOC 2 Type II certificado',
        'Conformidade LGPD/GDPR'
      ],
      benefits: 'Dados seguros com conformidade total'
    },
    {
      icon: Lock,
      title: 'Controle de Acesso',
      description: 'Gestão granular de permissões e acessos',
      features: [
        'SSO (Single Sign-On)',
        'MFA (Multi-Factor Authentication)',
        'RBAC (Role-Based Access Control)',
        'Auditoria completa de acessos',
        'Sessões seguras'
      ],
      benefits: 'Controle total sobre quem acessa o quê'
    },
    {
      icon: Eye,
      title: 'Auditoria e Compliance',
      description: 'Rastreamento completo de ações e conformidade',
      features: [
        'Log completo de atividades',
        'Relatórios de compliance',
        'Retenção configurável',
        'Alertas de violação',
        'Certificações internacionais'
      ],
      benefits: 'Transparência total e conformidade garantida'
    },
    {
      icon: Activity,
      title: 'Monitoramento 24/7',
      description: 'Monitoramento contínuo de segurança e performance',
      features: [
        'Detecção de anomalias',
        'Alertas de segurança em tempo real',
        'Monitoring de performance',
        'SLA de 99.9% uptime',
        'Resposta a incidentes'
      ],
      benefits: 'Tranquilidade com monitoramento profissional'
    }
  ]
};
