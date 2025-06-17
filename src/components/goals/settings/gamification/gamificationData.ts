
import { 
  Award, 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  Gift, 
  Crown, 
  Sparkles
} from 'lucide-react';

export const gamificationFeatures = [
  {
    id: 'points_system',
    label: 'Sistema de Pontos',
    description: 'Ganhe pontos ao completar metas e marcos',
    icon: Star,
    category: 'core',
    defaultEnabled: true
  },
  {
    id: 'achievements',
    label: 'Conquistas e Badges',
    description: 'Desbloqueie badges e troféus especiais',
    icon: Award,
    category: 'core',
    defaultEnabled: true
  },
  {
    id: 'leaderboard',
    label: 'Ranking da Equipe',
    description: 'Apareça no ranking público da equipe',
    icon: Trophy,
    category: 'social',
    defaultEnabled: false
  },
  {
    id: 'celebrations',
    label: 'Celebrações Visuais',
    description: 'Animações e efeitos ao completar metas',
    icon: Sparkles,
    category: 'visual',
    defaultEnabled: true
  },
  {
    id: 'streaks',
    label: 'Sequências (Streaks)',
    description: 'Conte dias consecutivos de progresso',
    icon: Zap,
    category: 'engagement',
    defaultEnabled: true
  },
  {
    id: 'rewards',
    label: 'Sistema de Recompensas',
    description: 'Recompensas virtuais por conquistas',
    icon: Gift,
    category: 'motivation',
    defaultEnabled: false
  },
  {
    id: 'levels',
    label: 'Níveis de Usuário',
    description: 'Progrida através de níveis baseados em experiência',
    icon: Crown,
    category: 'progression',
    defaultEnabled: true
  },
  {
    id: 'challenges',
    label: 'Desafios Especiais',
    description: 'Desafios temporários com recompensas extras',
    icon: Target,
    category: 'engagement',
    defaultEnabled: false
  }
];

export const pointsConfig = [
  { id: 'goal_completed', label: 'Meta Completada', defaultValue: 100 },
  { id: 'milestone_reached', label: 'Marco Atingido', defaultValue: 25 },
  { id: 'early_completion', label: 'Completada Antes do Prazo', defaultValue: 50 },
  { id: 'streak_milestone', label: 'Marco de Sequência', defaultValue: 20 },
  { id: 'team_collaboration', label: 'Colaboração em Equipe', defaultValue: 15 }
];

export const getCategoryColor = (category: string) => {
  switch (category) {
    case 'core': return 'bg-blue-100 text-blue-800';
    case 'social': return 'bg-purple-100 text-purple-800';
    case 'visual': return 'bg-pink-100 text-pink-800';
    case 'engagement': return 'bg-green-100 text-green-800';
    case 'motivation': return 'bg-orange-100 text-orange-800';
    case 'progression': return 'bg-indigo-100 text-indigo-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
