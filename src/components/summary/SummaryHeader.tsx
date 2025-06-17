
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Activity, Sparkles, Play } from 'lucide-react';
import { PageHeader } from '../common/PageHeader';

export const SummaryHeader = () => {
  const badges = [
    {
      icon: Activity,
      text: 'Tempo Real',
      variant: 'success' as const
    },
    {
      icon: Sparkles,
      text: 'IA Ativa',
      variant: 'info' as const
    }
  ];

  const actions = (
    <Link to="/app">
      <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
        <Play className="w-4 h-4 mr-2" />
        Ver Dashboard Completo
      </Button>
    </Link>
  );

  return (
    <PageHeader
      title="CS360° - Resumo Executivo"
      description={`Visão estratégica completa do seu Customer Success - ${new Date().toLocaleDateString('pt-BR')}`}
      badges={badges}
      actions={actions}
      compact
    />
  );
};
