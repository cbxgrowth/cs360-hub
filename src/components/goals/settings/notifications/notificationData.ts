
import { 
  Bell, 
  Mail, 
  Smartphone, 
  Clock, 
  Target, 
  Users, 
  Award,
  Calendar,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

export const notificationTypes = [
  {
    id: 'goal_created',
    label: 'Meta Criada',
    description: 'Quando uma nova meta é atribuída a você',
    icon: Target,
    category: 'system',
    defaultEnabled: true
  },
  {
    id: 'goal_updated',
    label: 'Meta Atualizada',
    description: 'Quando uma meta existente é modificada',
    icon: Target,
    category: 'system',
    defaultEnabled: true
  },
  {
    id: 'milestone_reached',
    label: 'Marco Atingido',
    description: 'Quando você ou sua equipe atinge um marco importante',
    icon: Award,
    category: 'achievement',
    defaultEnabled: true
  },
  {
    id: 'deadline_approaching',
    label: 'Prazo Próximo',
    description: 'Quando o prazo de uma meta está se aproximando',
    icon: Clock,
    category: 'reminder',
    defaultEnabled: true
  },
  {
    id: 'goal_completed',
    label: 'Meta Concluída',
    description: 'Quando uma meta é marcada como concluída',
    icon: CheckCircle2,
    category: 'achievement',
    defaultEnabled: false
  },
  {
    id: 'team_updates',
    label: 'Atualizações da Equipe',
    description: 'Updates de metas colaborativas e da equipe',
    icon: Users,
    category: 'team',
    defaultEnabled: true
  },
  {
    id: 'goal_overdue',
    label: 'Meta Atrasada',
    description: 'Quando uma meta passa do prazo estabelecido',
    icon: AlertTriangle,
    category: 'alert',
    defaultEnabled: true
  },
  {
    id: 'weekly_summary',
    label: 'Resumo Semanal',
    description: 'Relatório semanal do progresso das metas',
    icon: Calendar,
    category: 'report',
    defaultEnabled: false
  }
];

export const channels = [
  { id: 'email', label: 'Email', icon: Mail, description: 'Notificações por email' },
  { id: 'push', label: 'Push', icon: Smartphone, description: 'Notificações push no navegador' },
  { id: 'in_app', label: 'In-App', icon: Bell, description: 'Notificações dentro da aplicação' }
];

export const getCategoryColor = (category: string) => {
  switch (category) {
    case 'system': return 'bg-blue-100 text-blue-800';
    case 'achievement': return 'bg-green-100 text-green-800';
    case 'reminder': return 'bg-yellow-100 text-yellow-800';
    case 'team': return 'bg-purple-100 text-purple-800';
    case 'alert': return 'bg-red-100 text-red-800';
    case 'report': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
