
import React, { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ClientsOverview } from '../components/ClientsOverview';
import { ClientsFilters } from '../components/ClientsFilters';
import { ClientsList } from '../components/ClientsList';
import { ClientsCharts } from '../components/ClientsCharts';
import { ClientsRanking } from '../components/ClientsRanking';
import { ClientsInteractions } from '../components/ClientsInteractions';
import { Users } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export interface ClientFilter {
  profile: string[];
  level: string[];
  status: string[];
  npsCategory: string[];
  ltvRange: [number, number];
  cacRange: [number, number];
  dateRange: [Date | null, Date | null];
  segment?: string[];
  category?: string[];
}

const parseTierParam = (tier: string | null): string[] => {
  if (!tier) return [];
  const t = tier.toUpperCase();
  if (['A', 'B', 'C'].includes(t)) return [t];
  if (t === 'PROSPECT' || t === 'PROSPECTS') return ['Prospects'];
  return [];
};

const capitalize = (s: string | null): string => {
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const Clients = () => {
  const location = useLocation();

  const getFiltersFromParams = (search: string) => {
    const searchParams = new URLSearchParams(search);
    return {
      level: parseTierParam(searchParams.get('tier')),
      segment: searchParams.get('segment') ? [capitalize(searchParams.get('segment'))] : [],
      category: searchParams.get('category') ? [capitalize(searchParams.get('category'))] : [],
      npsCategory: searchParams.get('nps') ? [capitalize(searchParams.get('nps'))] : [],
    };
  }

  const [activeView, setActiveView] = useState<'list' | 'charts' | 'ranking' | 'interactions'>('list');
  const [filters, setFilters] = useState<ClientFilter>(() => {
    const initialParams = getFiltersFromParams(location.search);
    return {
      profile: [],
      status: [],
      ltvRange: [0, 500000],
      cacRange: [0, 50000],
      dateRange: [null, null],
      ...initialParams,
    };
  });

  useEffect(() => {
    const paramsFilters = getFiltersFromParams(location.search);
    setFilters((prev) => ({
      ...prev,
      ...paramsFilters
    }));
  }, [location.search]);

  return (
    <AppLayout
      title="Gestão de Clientes"
      description="Visão completa e análise avançada da base de clientes com inteligência artificial"
      icon={<Users className="w-6 h-6 text-white" />}
      gradientColors="bg-gradient-to-r from-blue-600 to-cyan-600"
      badgeText="Tempo Real"
      badgeIcon={<Users className="w-3 h-3 mr-1.5" />}
    >
      <div className="space-y-6">
        <ClientsOverview />
        
        <ClientsFilters filters={filters} onFiltersChange={setFilters} />

        <div className="flex flex-wrap gap-4 mb-6">
          <button 
            onClick={() => setActiveView('list')} 
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeView === 'list' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
            }`}
          >
            Lista de Clientes
          </button>
          <button 
            onClick={() => setActiveView('charts')} 
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeView === 'charts' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
            }`}
          >
            Visualizações
          </button>
          <button 
            onClick={() => setActiveView('ranking')} 
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeView === 'ranking' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
            }`}
          >
            Ranking
          </button>
          <button 
            onClick={() => setActiveView('interactions')} 
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeView === 'interactions' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
            }`}
          >
            Interações
          </button>
        </div>

        <div>
          {activeView === 'list' && <ClientsList filters={filters} />}
          {activeView === 'charts' && <ClientsCharts filters={filters} />}
          {activeView === 'ranking' && <ClientsRanking filters={filters} />}
          {activeView === 'interactions' && <ClientsInteractions filters={filters} />}
        </div>
      </div>
    </AppLayout>
  );
};

export default Clients;
