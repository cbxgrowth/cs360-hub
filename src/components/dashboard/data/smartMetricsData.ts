
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Target
} from 'lucide-react';

export const smartMetricsData = [
  {
    title: "Receita Recorrente",
    value: "R$ 524.780",
    previousValue: "R$ 483.120",
    target: 600000,
    trend: 'up' as const,
    change: "+8.6%",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-50",
    insight: "Crescimento sustentável mantido por 3 meses consecutivos. Projeção indica atingir meta em 2 meses.",
    prediction: "R$ 615.000 em 60 dias",
    alertLevel: 'none' as const
  },
  {
    title: "Clientes Ativos",
    value: 1247,
    target: 1500,
    trend: 'up' as const,
    change: "+12.3%",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    insight: "Taxa de conversão melhorou 15% este mês. Foco em onboarding está gerando resultados.",
    prediction: "1.380 clientes em 30 dias"
  },
  {
    title: "Taxa de Conversão",
    value: "28.4%",
    target: 35,
    trend: 'up' as const,
    change: "+2.1%",
    icon: Target,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    insight: "Otimizações no funil de vendas impactaram positivamente. Continue investindo em automação.",
    alertLevel: 'warning' as const
  },
  {
    title: "Health Score Médio",
    value: "8.7",
    target: 9,
    trend: 'up' as const,
    change: "+0.3",
    icon: TrendingUp,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    insight: "Melhoria consistente na satisfação. Clientes estão respondendo bem às novas features."
  }
];

export const chartData = [
  { name: 'Jan', value: 420, predicted: 435, target: 450, anomaly: false },
  { name: 'Fev', value: 445, predicted: 460, target: 450, anomaly: false },
  { name: 'Mar', value: 465, predicted: 480, target: 450, anomaly: false },
  { name: 'Abr', value: 485, predicted: 500, target: 450, anomaly: false },
  { name: 'Mai', value: 512, predicted: 525, target: 450, anomaly: true },
  { name: 'Jun', value: 535, predicted: 550, target: 450, anomaly: false }
];
