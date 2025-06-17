
import { 
  Users,
  DollarSign,
  Star,
  TrendingUp,
  Activity,
  Target,
  AlertTriangle,
  BarChart3,
  Layout,
  PieChart,
  Sidebar,
  FileText,
  Clock,
  ThumbsUp,
  UserCheck,
  Calendar,
  ShoppingCart,
  HeartHandshake,
  TrendingDown,
  Zap,
  Award
} from 'lucide-react';

export interface CustomizationOption {
  id: string;
  name: string;
  icon: any;
  description: string;
  category?: string;
}

export const metricOptions: CustomizationOption[] = [
  { 
    id: 'mrr', 
    name: 'MRR - Receita Recorrente Mensal', 
    icon: DollarSign, 
    description: 'Receita mensal recorrente com predições IA',
    category: 'Financeiro'
  },
  { 
    id: 'arr', 
    name: 'ARR - Receita Recorrente Anual', 
    icon: BarChart3, 
    description: 'Receita anual recorrente e projeções',
    category: 'Financeiro'
  },
  { 
    id: 'clients', 
    name: 'Clientes Ativos', 
    icon: Users, 
    description: 'Total de clientes ativos no sistema',
    category: 'Clientes'
  },
  { 
    id: 'conversion', 
    name: 'Taxa de Conversão', 
    icon: Target, 
    description: 'Taxa de conversão do funil de vendas',
    category: 'Conversão'
  },
  { 
    id: 'health', 
    name: 'Health Score Médio', 
    icon: TrendingUp, 
    description: 'Pontuação média de saúde dos clientes',
    category: 'Saúde'
  },
  { 
    id: 'nps', 
    name: 'Net Promoter Score', 
    icon: Award, 
    description: 'Índice de satisfação e recomendação',
    category: 'Satisfação'
  },
  { 
    id: 'churn', 
    name: 'Taxa de Churn', 
    icon: TrendingDown, 
    description: 'Taxa de cancelamento de clientes',
    category: 'Retenção'
  },
  { 
    id: 'engagement', 
    name: 'Engajamento Médio', 
    icon: Zap, 
    description: 'Nível de engajamento dos usuários',
    category: 'Uso'
  },
  { 
    id: 'ltv', 
    name: 'Lifetime Value', 
    icon: BarChart3, 
    description: 'Valor médio do tempo de vida do cliente',
    category: 'Financeiro'
  },
  { 
    id: 'cac', 
    name: 'Custo de Aquisição', 
    icon: ShoppingCart, 
    description: 'Custo médio para aquisição de clientes',
    category: 'Financeiro'
  },
  { 
    id: 'feature_adoption', 
    name: 'Adoção de Features', 
    icon: Activity, 
    description: 'Taxa de adoção de novas funcionalidades',
    category: 'Produto'
  },
  { 
    id: 'support_tickets', 
    name: 'Tickets de Suporte', 
    icon: HeartHandshake, 
    description: 'Volume e tendência de suporte',
    category: 'Suporte'
  },
  { 
    id: 'satisfaction', 
    name: 'Satisfação do Cliente', 
    icon: Star, 
    description: 'Score médio de satisfação',
    category: 'Satisfação'
  },
  { 
    id: 'response_time', 
    name: 'Tempo de Resposta', 
    icon: Clock, 
    description: 'Tempo médio de resposta do suporte',
    category: 'Suporte'
  },
  { 
    id: 'renewal_rate', 
    name: 'Taxa de Renovação', 
    icon: UserCheck, 
    description: 'Percentual de renovações de contratos',
    category: 'Retenção'
  },
  { 
    id: 'expansion_revenue', 
    name: 'Receita de Expansão', 
    icon: TrendingUp, 
    description: 'Receita adicional de upsells e cross-sells',
    category: 'Financeiro'
  }
];

export const chartOptions: CustomizationOption[] = [
  { 
    id: 'revenue', 
    name: 'Evolução da Receita', 
    icon: DollarSign, 
    description: 'Crescimento de MRR e ARR ao longo do tempo',
    category: 'Financeiro'
  },
  { 
    id: 'clients', 
    name: 'Crescimento de Clientes', 
    icon: Users, 
    description: 'Novos clientes vs. churn e retenção',
    category: 'Clientes'
  },
  { 
    id: 'health', 
    name: 'Health Score por Segmento', 
    icon: Activity, 
    description: 'Distribuição de health score por categorias',
    category: 'Análise'
  },
  { 
    id: 'tiers', 
    name: 'Distribuição por Tier', 
    icon: Star, 
    description: 'Clientes organizados por tier/categoria',
    category: 'Segmentação'
  },
  { 
    id: 'nps', 
    name: 'Análise Detalhada do NPS', 
    icon: Award, 
    description: 'Evolução e segmentação do NPS',
    category: 'Satisfação'
  },
  { 
    id: 'churn', 
    name: 'Análise de Churn', 
    icon: TrendingDown, 
    description: 'Tendências e causas de cancelamento',
    category: 'Retenção'
  },
  { 
    id: 'segments', 
    name: 'Performance por Segmento', 
    icon: BarChart3, 
    description: 'Comparativo de performance entre segmentos',
    category: 'Segmentação'
  },
  { 
    id: 'categories', 
    name: 'Distribuição por Categoria', 
    icon: PieChart, 
    description: 'Distribuição de clientes por categoria',
    category: 'Análise'
  }
];

export const sectionOptions: CustomizationOption[] = [
  { 
    id: 'quickInsights', 
    name: 'Insights Inteligentes', 
    icon: BarChart3, 
    description: 'Insights automáticos baseados em IA',
    category: 'IA & Insights'
  },
  { 
    id: 'metrics', 
    name: 'Métricas Inteligentes', 
    icon: Target, 
    description: 'Cards de métricas com predições e insights',
    category: 'Indicadores'
  },
  { 
    id: 'charts', 
    name: 'Gráficos Principais', 
    icon: PieChart, 
    description: 'Visualizações primárias do dashboard',
    category: 'Visualizações'
  },
  { 
    id: 'analytics', 
    name: 'Analytics Avançado', 
    icon: TrendingUp, 
    description: 'Análises detalhadas e comparativos',
    category: 'Análises'
  },
  { 
    id: 'sidebar', 
    name: 'Painel de Informações', 
    icon: Sidebar, 
    description: 'Informações complementares e alertas',
    category: 'Layout'
  },
  { 
    id: 'clients', 
    name: 'Gestão de Clientes', 
    icon: Users, 
    description: 'Seção completa de gestão e monitoramento',
    category: 'Gestão'
  }
];
