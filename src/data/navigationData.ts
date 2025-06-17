
import { 
  Home,
  Zap,
  DollarSign,
  Users,
  Handshake,
  Brain,
  BarChart3,
  Workflow,
  Heart,
  Link,
  FileText,
  Target,
  TrendingUp,
  Bot,
  PieChart
} from 'lucide-react';

export const navigationItems = [
  {
    label: 'Home',
    href: '/',
    icon: Home
  },
  {
    label: 'Recursos',
    href: '/features',
    icon: Zap,
    dropdown: {
      title: 'Funcionalidades Avançadas',
      items: [
        { label: 'IA Preditiva', href: '/features#ai', description: '95% de precisão na previsão de churn', icon: Brain },
        { label: 'Dashboard 360°', href: '/features#dashboard', description: 'Visão completa do customer journey', icon: BarChart3 },
        { label: 'Automação', href: '/features#automation', description: 'Workflows inteligentes e escaláveis', icon: Workflow },
        { label: 'Health Score', href: '/features#health', description: 'Monitoramento em tempo real', icon: Heart },
        { label: 'Integrações', href: '/features#integrations', description: 'Conecte com 200+ ferramentas', icon: Link },
        { label: 'Relatórios', href: '/features#reports', description: 'Insights acionáveis e personalizados', icon: FileText }
      ]
    }
  },
  {
    label: 'Preços',
    href: '/pricing',
    icon: DollarSign,
    dropdown: {
      title: 'Planos Flexíveis',
      items: [
        { label: 'Starter', href: '/pricing#starter', description: 'R$ 199/mês - Ideal para começar', icon: Target },
        { label: 'Professional', href: '/pricing#professional', description: 'R$ 499/mês - Mais vendido', icon: TrendingUp },
        { label: 'Growth', href: '/pricing#growth', description: 'R$ 999/mês - Máximo desempenho', icon: BarChart3 },
        { label: 'Enterprise', href: '/pricing#enterprise', description: 'Sob consulta - Solução corporativa', icon: Bot },
        { label: 'Ver detalhes dos planos', href: '/pricing', description: 'Compare todos os planos disponíveis', icon: DollarSign }
      ]
    }
  },
  {
    label: 'Parceiros',
    href: '/partners-program',
    icon: Handshake,
    dropdown: {
      title: 'Programa de Parceiros',
      items: [
        { label: 'Seja um Parceiro', href: '/partners-program#join', description: 'Até 40% de comissão recorrente', icon: Users },
        { label: 'Portal do Parceiro', href: '/partner-portal-website', description: 'Acesse sua área exclusiva', icon: Link },
        { label: 'Materiais de Apoio', href: '/partners-program#materials', description: 'Downloads e recursos', icon: FileText },
        { label: 'Certificações', href: '/partners-program#certifications', description: 'Torne-se especialista certificado', icon: PieChart },
        { label: 'Ver todos os detalhes', href: '/partners-program', description: 'Conheça nosso programa completo', icon: Handshake }
      ]
    }
  }
];
