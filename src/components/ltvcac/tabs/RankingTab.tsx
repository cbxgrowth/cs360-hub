
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Trophy, TrendingUp, TrendingDown, Minus, Search, Filter } from 'lucide-react';
import { clientRanking } from '../data/ltvCacData';

export const RankingTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('ratio');
  const [filterTier, setFilterTier] = useState('all');

  const filteredRanking = clientRanking
    .filter(client => 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterTier === 'all' || client.tier === filterTier)
    )
    .sort((a, b) => {
      switch(sortBy) {
        case 'ltv': return b.ltv - a.ltv;
        case 'cac': return b.cac - a.cac;
        case 'ratio': return b.ratio - a.ratio;
        default: return 0;
      }
    });

  const getTierColor = (tier: string) => {
    const colors = {
      'Enterprise': 'bg-purple-100 text-purple-800',
      'Growth': 'bg-blue-100 text-blue-800',
      'Standard': 'bg-green-100 text-green-800',
      'Basic': 'bg-gray-100 text-gray-800'
    };
    return colors[tier as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getRiskColor = (risk: number) => {
    if (risk < 20) return 'text-green-600';
    if (risk < 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            Ranking de Clientes por LTV/CAC
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Buscar cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ratio">Ratio LTV:CAC</SelectItem>
                <SelectItem value="ltv">LTV</SelectItem>
                <SelectItem value="cac">CAC</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterTier} onValueChange={setFilterTier}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Tiers</SelectItem>
                <SelectItem value="Enterprise">Enterprise</SelectItem>
                <SelectItem value="Growth">Growth</SelectItem>
                <SelectItem value="Standard">Standard</SelectItem>
                <SelectItem value="Basic">Basic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            {filteredRanking.map((client, index) => (
              <Card key={client.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold">{client.name}</h3>
                      <Badge className={getTierColor(client.tier)}>
                        {client.tier}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">LTV</p>
                      <p className="font-semibold">
                        R$ {client.ltv.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">CAC</p>
                      <p className="font-semibold">
                        R$ {client.cac.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Ratio</p>
                      <p className="font-semibold text-green-600">
                        {client.ratio.toFixed(1)}:1
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Risco Churn</p>
                      <p className={`font-semibold ${getRiskColor(client.churn_risk)}`}>
                        {client.churn_risk}%
                      </p>
                    </div>
                  </div>

                  <Button variant="outline" size="sm">
                    Ver Detalhes
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
