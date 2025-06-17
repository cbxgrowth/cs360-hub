
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, Target, Users, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const performanceData = [
  { month: 'Jan', completed: 5, progress: 65, efficiency: 78 },
  { month: 'Fev', completed: 8, progress: 72, efficiency: 82 },
  { month: 'Mar', completed: 12, progress: 68, efficiency: 85 },
  { month: 'Abr', completed: 15, progress: 75, efficiency: 88 },
  { month: 'Mai', completed: 18, progress: 82, efficiency: 90 },
  { month: 'Jun', completed: 22, progress: 78, efficiency: 92 }
];

const impactData = [
  { category: 'Retenção', impact: 85, strategies: 4 },
  { category: 'Crescimento', impact: 92, strategies: 3 },
  { category: 'Eficiência', impact: 78, strategies: 5 },
  { category: 'Satisfação', impact: 88, strategies: 2 }
];

const teamPerformance = [
  { name: 'João Silva', completed: 15, inProgress: 3, efficiency: 92 },
  { name: 'Maria Santos', completed: 12, inProgress: 4, efficiency: 88 },
  { name: 'Pedro Costa', completed: 18, inProgress: 2, efficiency: 95 },
  { name: 'Ana Lima', completed: 9, inProgress: 5, efficiency: 82 },
  { name: 'Carlos Rocha', completed: 14, inProgress: 3, efficiency: 90 }
];

const statusDistribution = [
  { name: 'Ativas', value: 8, color: '#10B981' },
  { name: 'Pausadas', value: 2, color: '#F59E0B' },
  { name: 'Concluídas', value: 12, color: '#3B82F6' },
  { name: 'Rascunho', value: 3, color: '#6B7280' }
];

interface StrategyAnalyticsProps {
  strategies: any[];
}

export const StrategyAnalytics: React.FC<StrategyAnalyticsProps> = ({ strategies }) => {
  const calculateMetrics = () => {
    const total = strategies.length;
    const active = strategies.filter(s => s.status === 'active').length;
    const completed = strategies.filter(s => s.status === 'completed').length;
    const avgProgress = strategies.reduce((acc, s) => acc + s.progress, 0) / total || 0;
    const totalTasks = strategies.reduce((acc, s) => acc + s.tasks.length, 0);
    const completedTasks = strategies.reduce((acc, s) => 
      acc + s.tasks.filter((t: any) => t.status === 'completed').length, 0
    );

    return {
      total,
      active,
      completed,
      avgProgress: Math.round(avgProgress),
      taskCompletion: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
      totalTasks,
      completedTasks
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Progresso Médio</p>
                <p className="text-3xl font-bold text-blue-600">{metrics.avgProgress}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-sm text-green-600 mt-2">+5% vs mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Taxa de Conclusão</p>
                <p className="text-3xl font-bold text-green-600">{metrics.taskCompletion}%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {metrics.completedTasks} de {metrics.totalTasks} tarefas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Estratégias Ativas</p>
                <p className="text-3xl font-bold text-orange-600">{metrics.active}</p>
              </div>
              <Target className="w-8 h-8 text-orange-600" />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              de {metrics.total} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Equipe Envolvida</p>
                <p className="text-3xl font-bold text-purple-600">
                  {new Set(strategies.flatMap(s => s.assignedTo)).size}
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-sm text-gray-600 mt-2">membros ativos</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Desempenho ao Longo do Tempo</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={3} name="Estratégias Concluídas" />
                <Line type="monotone" dataKey="progress" stroke="#3B82F6" strokeWidth={2} name="Progresso Médio %" />
                <Line type="monotone" dataKey="efficiency" stroke="#8B5CF6" strokeWidth={2} name="Eficiência %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Impact by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Impacto por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={impactData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="impact" fill="#F59E0B" name="Impacto %" />
                <Bar dataKey="strategies" fill="#3B82F6" name="Qtd Estratégias" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Performance da Equipe</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={teamPerformance} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={100} />
                <Tooltip />
                <Bar dataKey="completed" fill="#10B981" name="Concluídas" />
                <Bar dataKey="inProgress" fill="#F59E0B" name="Em Andamento" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhamento por Estratégia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Estratégia</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Progresso</th>
                  <th className="text-left p-2">Tarefas</th>
                  <th className="text-left p-2">Equipe</th>
                  <th className="text-left p-2">Prazo</th>
                </tr>
              </thead>
              <tbody>
                {strategies.map((strategy) => (
                  <tr key={strategy.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="p-2 font-medium">{strategy.name}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        strategy.status === 'active' ? 'bg-green-100 text-green-800' :
                        strategy.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                        strategy.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {strategy.status === 'active' ? 'Ativa' :
                         strategy.status === 'paused' ? 'Pausada' :
                         strategy.status === 'completed' ? 'Concluída' : 'Rascunho'}
                      </span>
                    </td>
                    <td className="p-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${strategy.progress}%` }}
                          />
                        </div>
                        <span className="text-xs">{strategy.progress}%</span>
                      </div>
                    </td>
                    <td className="p-2">
                      {strategy.tasks.filter((t: any) => t.status === 'completed').length} / {strategy.tasks.length}
                    </td>
                    <td className="p-2">{strategy.assignedTo.length}</td>
                    <td className="p-2">{strategy.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
