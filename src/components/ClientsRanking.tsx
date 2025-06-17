
import React, { useState } from 'react';
import { Trophy, Star, TrendingUp, DollarSign, Users, Target } from 'lucide-react';
import { ClientFilter } from '../pages/Clients';

interface ClientsRankingProps {
  filters: ClientFilter;
}

const rankingData = [
  {
    id: 1,
    name: 'TechCorp LTDA',
    avatar: 'TC',
    score: 95,
    position: 1,
    nps: 85,
    ltv: 120000,
    growth: '+15%',
    avatar_bg: 'from-blue-500 to-purple-600',
    medal: 'gold'
  },
  {
    id: 2,
    name: 'InnovateFlow',
    avatar: 'IF',
    score: 92,
    position: 2,
    nps: 82,
    ltv: 110000,
    growth: '+12%',
    avatar_bg: 'from-green-500 to-teal-600',
    medal: 'silver'
  },
  {
    id: 3,
    name: 'DataMind Corp',
    avatar: 'DM',
    score: 89,
    position: 3,
    nps: 78,
    ltv: 95000,
    growth: '+8%',
    avatar_bg: 'from-purple-500 to-pink-600',
    medal: 'bronze'
  },
  {
    id: 4,
    name: 'CloudTech Solutions',
    avatar: 'CT',
    score: 85,
    position: 4,
    nps: 75,
    ltv: 88000,
    growth: '+10%',
    avatar_bg: 'from-orange-500 to-red-600',
    medal: null
  },
  {
    id: 5,
    name: 'SmartFlow Inc',
    avatar: 'SF',
    score: 82,
    position: 5,
    nps: 72,
    ltv: 78000,
    growth: '+6%',
    avatar_bg: 'from-cyan-500 to-blue-600',
    medal: null
  }
];

const categories = [
  { id: 'overall', name: 'Geral', icon: Trophy },
  { id: 'nps', name: 'NPS', icon: Star },
  { id: 'ltv', name: 'LTV', icon: DollarSign },
  { id: 'growth', name: 'Crescimento', icon: TrendingUp },
  { id: 'engagement', name: 'Engajamento', icon: Users },
  { id: 'retention', name: 'Retenção', icon: Target }
];

export const ClientsRanking: React.FC<ClientsRankingProps> = ({ filters }) => {
  const [selectedCategory, setSelectedCategory] = useState('overall');

  const getMedalIcon = (medal: string | null, position: number) => {
    if (medal === 'gold') return '🥇';
    if (medal === 'silver') return '🥈';
    if (medal === 'bronze') return '🥉';
    return position;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 80) return 'text-blue-600 dark:text-blue-400';
    if (score >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Category Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categorias de Ranking</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                  selectedCategory === category.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <Icon className={`w-6 h-6 mb-2 ${
                  selectedCategory === category.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
                }`} />
                <span className={`text-sm font-medium ${
                  selectedCategory === category.id ? 'text-blue-900 dark:text-blue-100' : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Ranking List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Ranking - {categories.find(c => c.id === selectedCategory)?.name}
          </h3>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {rankingData.map((client, index) => (
              <div
                key={client.id}
                className={`flex items-center p-4 rounded-lg border transition-all hover:shadow-md ${
                  index < 3 
                    ? 'border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 dark:border-yellow-700' 
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50'
                }`}
              >
                <div className="flex items-center mr-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold ${
                    index < 3 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                  }`}>
                    {getMedalIcon(client.medal, client.position)}
                  </div>
                </div>

                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${client.avatar_bg} flex items-center justify-center mr-4`}>
                  <span className="text-white font-medium">{client.avatar}</span>
                </div>

                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{client.name}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      NPS: <span className="font-medium text-gray-900 dark:text-white">{client.nps}</span>
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      LTV: <span className="font-medium text-gray-900 dark:text-white">R$ {(client.ltv / 1000).toFixed(0)}k</span>
                    </span>
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                      {client.growth}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`text-3xl font-bold ${getScoreColor(client.score)}`}>
                    {client.score}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">pontos</div>
                </div>
              </div>
            ))}
          </div>

          {/* View More */}
          <div className="text-center mt-6">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Ver Ranking Completo
            </button>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <span className="text-2xl font-bold text-yellow-500">3</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Clientes Top 10</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-green-500" />
            <span className="text-2xl font-bold text-green-500">+12%</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Crescimento Médio</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <Star className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold text-blue-500">78</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">NPS Médio</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8 text-purple-500" />
            <span className="text-2xl font-bold text-purple-500">98k</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">LTV Médio</p>
        </div>
      </div>
    </div>
  );
};
