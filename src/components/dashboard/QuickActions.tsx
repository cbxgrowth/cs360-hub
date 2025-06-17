
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Zap, 
  Plus, 
  Users, 
  FileText, 
  Target, 
  Mail,
  Phone,
  Calendar,
  BarChart3,
  Settings,
  Download,
  Upload,
  Star,
  AlertTriangle
} from 'lucide-react';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  shortcut?: string;
  category: 'create' | 'manage' | 'analyze' | 'communicate';
  onClick: () => void;
}

export const QuickActions = () => {
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);

  const quickActions: QuickAction[] = [
    {
      id: 'new-client',
      title: 'Novo Cliente',
      description: 'Cadastrar novo cliente no sistema',
      icon: Users,
      color: 'bg-blue-500 hover:bg-blue-600',
      shortcut: 'Ctrl+N',
      category: 'create',
      onClick: () => {
        console.log('Navegar para cadastro de cliente');
        window.location.href = '/clients';
      }
    },
    {
      id: 'new-contract',
      title: 'Novo Contrato',
      description: 'Criar novo contrato ou renovação',
      icon: FileText,
      color: 'bg-green-500 hover:bg-green-600',
      shortcut: 'Ctrl+C',
      category: 'create',
      onClick: () => {
        console.log('Navegar para criação de contrato');
        window.location.href = '/contracts';
      }
    },
    {
      id: 'new-goal',
      title: 'Nova Meta',
      description: 'Definir nova meta de CS',
      icon: Target,
      color: 'bg-purple-500 hover:bg-purple-600',
      shortcut: 'Ctrl+G',
      category: 'create',
      onClick: () => {
        console.log('Navegar para criação de meta');
        window.location.href = '/goals';
      }
    },
    {
      id: 'schedule-meeting',
      title: 'Agendar Reunião',
      description: 'Marcar QBR ou check-in',
      icon: Calendar,
      color: 'bg-orange-500 hover:bg-orange-600',
      category: 'communicate',
      onClick: () => {
        console.log('Abrir agendamento de reunião');
        // Implementar modal de agendamento
      }
    },
    {
      id: 'send-nps',
      title: 'Enviar NPS',
      description: 'Disparar pesquisa de satisfação',
      icon: Star,
      color: 'bg-yellow-500 hover:bg-yellow-600',
      category: 'communicate',
      onClick: () => {
        console.log('Navegar para NPS');
        window.location.href = '/nps';
      }
    },
    {
      id: 'follow-up',
      title: 'Follow-up',
      description: 'Contatar cliente em risco',
      icon: Phone,
      color: 'bg-red-500 hover:bg-red-600',
      category: 'communicate',
      onClick: () => {
        console.log('Abrir lista de follow-ups');
        // Implementar modal de follow-up
      }
    },
    {
      id: 'health-check',
      title: 'Health Check',
      description: 'Analisar saúde dos clientes',
      icon: BarChart3,
      color: 'bg-teal-500 hover:bg-teal-600',
      category: 'analyze',
      onClick: () => {
        console.log('Abrir análise de health score');
        // Implementar modal de health check
      }
    },
    {
      id: 'reports',
      title: 'Relatórios',
      description: 'Gerar relatórios executivos',
      icon: Download,
      color: 'bg-indigo-500 hover:bg-indigo-600',
      category: 'analyze',
      onClick: () => {
        console.log('Navegar para relatórios');
        window.location.href = '/reports';
      }
    },
    {
      id: 'import-data',
      title: 'Importar Dados',
      description: 'Upload de planilhas e dados',
      icon: Upload,
      color: 'bg-gray-500 hover:bg-gray-600',
      category: 'manage',
      onClick: () => {
        console.log('Abrir importação de dados');
        // Implementar modal de importação
      }
    },
    {
      id: 'settings',
      title: 'Configurações',
      description: 'Ajustar preferências',
      icon: Settings,
      color: 'bg-slate-500 hover:bg-slate-600',
      category: 'manage',
      onClick: () => {
        console.log('Abrir configurações');
        // Implementar modal de configurações
      }
    }
  ];

  const categories = {
    create: { name: 'Criar', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
    manage: { name: 'Gerenciar', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
    analyze: { name: 'Analisar', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' },
    communicate: { name: 'Comunicar', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' }
  };

  const groupedActions = quickActions.reduce((acc, action) => {
    if (!acc[action.category]) {
      acc[action.category] = [];
    }
    acc[action.category].push(action);
    return acc;
  }, {} as Record<string, QuickAction[]>);

  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            <CardTitle className="text-lg text-gray-900 dark:text-white">
              Ações Rápidas
            </CardTitle>
          </div>
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
            {quickActions.length} ações
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-6">
          {Object.entries(groupedActions).map(([category, actions]) => (
            <div key={category}>
              <div className="flex items-center space-x-2 mb-3">
                <Badge className={`text-xs ${categories[category as keyof typeof categories].color}`}>
                  {categories[category as keyof typeof categories].name}
                </Badge>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {actions.length} ações
                </span>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                {actions.map((action) => (
                  <Button
                    key={action.id}
                    variant="ghost"
                    className={`w-full justify-start p-3 h-auto hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 ${
                      hoveredAction === action.id ? 'scale-105 shadow-sm' : ''
                    }`}
                    onClick={action.onClick}
                    onMouseEnter={() => setHoveredAction(action.id)}
                    onMouseLeave={() => setHoveredAction(null)}
                  >
                    <div className={`p-2 rounded-lg mr-3 text-white ${action.color}`}>
                      <action.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {action.title}
                        </p>
                        {action.shortcut && (
                          <Badge variant="outline" className="text-xs">
                            {action.shortcut}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {action.description}
                      </p>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Dica: Use os atalhos do teclado para ações mais rápidas
            </p>
            <Button variant="outline" size="sm" className="text-xs">
              Ver todos os atalhos
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
