
import { 
  BarChart3, 
  Brain,
  Target,
  MessageSquare,
  Database,
  Shield
} from 'lucide-react';

export const featureCategories = [
  {
    id: 'dashboard',
    name: 'Dashboard & Analytics',
    icon: BarChart3,
    description: 'Visualização completa e inteligente dos seus dados'
  },
  {
    id: 'ai',
    name: 'Inteligência Artificial',
    icon: Brain,
    description: 'IA preditiva e automação inteligente'
  },
  {
    id: 'automation',
    name: 'Automação',
    icon: Target,
    description: 'Workflows e processos automatizados'
  },
  {
    id: 'communication',
    name: 'Comunicação',
    icon: MessageSquare,
    description: 'Ferramentas de engajamento e comunicação'
  },
  {
    id: 'integrations',
    name: 'Integrações',
    icon: Database,
    description: 'Conecte com suas ferramentas favoritas'
  },
  {
    id: 'security',
    name: 'Segurança',
    icon: Shield,
    description: 'Proteção e conformidade empresarial'
  }
];
