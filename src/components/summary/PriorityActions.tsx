
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Zap, Crown, Phone, Calendar, Mail, BarChart3 } from 'lucide-react';

export const PriorityActions = () => {
  const actions = [
    {
      title: 'Contatar cliente em risco de churn',
      client: 'TechCorp',
      priority: 'Alta',
      time: '09:00',
      type: 'call',
      color: 'red'
    },
    {
      title: 'Acompanhar onboarding StartupXYZ',
      client: 'StartupXYZ',
      priority: 'Média',
      time: '11:30',
      type: 'meeting',
      color: 'yellow'
    },
    {
      title: 'Enviar relatório semanal',
      client: 'Enterprise Inc',
      priority: 'Baixa',
      time: '15:00',
      type: 'email',
      color: 'green'
    },
    {
      title: 'Review de health score',
      client: 'Digital Agency',
      priority: 'Média',
      time: '16:30',
      type: 'analysis',
      color: 'blue'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'call': return Phone;
      case 'meeting': return Calendar;
      case 'email': return Mail;
      case 'analysis': return BarChart3;
      default: return Phone;
    }
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'Alta': return 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 dark:from-red-900/30 dark:to-red-800/30 dark:text-red-400';
      case 'Média': return 'bg-gradient-to-r from-yellow-100 to-orange-200 text-yellow-800 dark:from-yellow-900/30 dark:to-orange-800/30 dark:text-yellow-400';
      default: return 'bg-gradient-to-r from-green-100 to-emerald-200 text-green-800 dark:from-green-900/30 dark:to-emerald-800/30 dark:text-green-400';
    }
  };

  const getColorStyle = (color: string) => {
    switch (color) {
      case 'red': return 'bg-gradient-to-r from-red-500 to-red-600';
      case 'yellow': return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      case 'green': return 'bg-gradient-to-r from-green-500 to-emerald-500';
      default: return 'bg-gradient-to-r from-blue-500 to-indigo-500';
    }
  };

  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg mr-3">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white">Ações Executivas Prioritárias</span>
          </div>
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1">
            <Crown className="w-3 h-3 mr-1" />
            C-Level
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {actions.map((action, index) => {
            const IconComponent = getIcon(action.type);
            return (
              <div key={index} className="group relative overflow-hidden bg-gradient-to-r from-slate-50 to-blue-50/50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border border-white/20 dark:border-slate-600/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full shadow-lg ${getColorStyle(action.color)}`}></div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm lg:text-base">{action.title}</h4>
                      <p className="text-xs lg:text-sm text-slate-600 dark:text-slate-400 font-medium">{action.client} • {action.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={`font-semibold text-xs ${getPriorityStyle(action.priority)}`}>
                      {action.priority}
                    </Badge>
                    <Button size="sm" className="bg-white/80 hover:bg-white dark:bg-slate-700 dark:hover:bg-slate-600 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                      <IconComponent className="w-3 h-3 lg:w-4 lg:h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
