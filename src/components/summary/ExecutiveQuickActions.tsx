
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Zap, BarChart3, Users, PieChart, Target } from 'lucide-react';

export const ExecutiveQuickActions = () => {
  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-lg font-bold text-slate-900 dark:text-white">
          <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg mr-3">
            <Zap className="w-4 h-4 text-white" />
          </div>
          Ações Executivas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Link to="/app">
          <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
            <BarChart3 className="w-4 h-4 mr-3" />
            Dashboard Completo
          </Button>
        </Link>
        <Link to="/clients">
          <Button variant="outline" className="w-full justify-start bg-white/80 hover:bg-white dark:bg-slate-700 dark:hover:bg-slate-600 font-semibold">
            <Users className="w-4 h-4 mr-3" />
            Gestão de Clientes
          </Button>
        </Link>
        <Link to="/reports">
          <Button variant="outline" className="w-full justify-start bg-white/80 hover:bg-white dark:bg-slate-700 dark:hover:bg-slate-600 font-semibold">
            <PieChart className="w-4 h-4 mr-3" />
            Relatórios Estratégicos
          </Button>
        </Link>
        <Link to="/goals">
          <Button variant="outline" className="w-full justify-start bg-white/80 hover:bg-white dark:bg-slate-700 dark:hover:bg-slate-600 font-semibold">
            <Target className="w-4 h-4 mr-3" />
            Gestão de Metas
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
