
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  Star, 
  Activity,
  Target,
  FileText,
  BarChart3,
  Settings
} from 'lucide-react';

interface Indicator {
  id: string;
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ElementType;
  color: string;
  description: string;
}

const initialIndicators: Indicator[] = [
  {
    id: 'clients',
    title: 'Clientes Ativos',
    value: 127,
    change: '+12%',
    changeType: 'positive',
    icon: Users,
    color: 'bg-blue-500',
    description: 'Total de clientes ativos'
  },
  {
    id: 'mrr',
    title: 'MRR',
    value: 'R$ 485k',
    change: '+15%',
    changeType: 'positive',
    icon: DollarSign,
    color: 'bg-green-500',
    description: 'Receita mensal recorrente'
  },
  {
    id: 'nps',
    title: 'NPS Score',
    value: 75,
    change: '+8 pts',
    changeType: 'positive',
    icon: Star,
    color: 'bg-yellow-500',
    description: 'Net Promoter Score'
  },
  {
    id: 'churn',
    title: 'Churn Rate',
    value: '2.1%',
    change: '-0.3%',
    changeType: 'positive',
    icon: TrendingUp,
    color: 'bg-purple-500',
    description: 'Taxa de cancelamento'
  },
  {
    id: 'health',
    title: 'Health Score',
    value: '8.7/10',
    change: '+0.5',
    changeType: 'positive',
    icon: Activity,
    color: 'bg-emerald-500',
    description: 'Pontuação de saúde dos clientes'
  },
  {
    id: 'alerts',
    title: 'Alertas Ativos',
    value: 3,
    change: '-2',
    changeType: 'positive',
    icon: AlertTriangle,
    color: 'bg-red-500',
    description: 'Alertas que requerem atenção'
  }
];

export const DraggableIndicators = () => {
  const [indicators, setIndicators] = useState(initialIndicators);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(indicators);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setIndicators(items);
  };

  const getChangeIcon = (changeType: string) => {
    if (changeType === 'positive') return <TrendingUp className="w-3 h-3" />;
    if (changeType === 'negative') return <AlertTriangle className="w-3 h-3" />;
    return <Activity className="w-3 h-3" />;
  };

  const getChangeColor = (changeType: string) => {
    if (changeType === 'positive') return 'text-green-600 dark:text-green-400';
    if (changeType === 'negative') return 'text-red-600 dark:text-red-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Indicadores Principais
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsConfigOpen(!isConfigOpen)}
          className="text-gray-600 dark:text-gray-400"
        >
          <Settings className="w-4 h-4 mr-2" />
          Configurar
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="indicators" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4"
            >
              {indicators.map((indicator, index) => (
                <Draggable key={indicator.id} draggableId={indicator.id} index={index}>
                  {(provided, snapshot) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`transition-all duration-200 hover:shadow-lg ${
                        snapshot.isDragging ? 'rotate-2 shadow-xl' : ''
                      } bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className={`p-2 rounded-lg ${indicator.color}`}>
                            <indicator.icon className="w-4 h-4 text-white" />
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {indicator.changeType === 'positive' ? '↗' : indicator.changeType === 'negative' ? '↘' : '→'}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                            {indicator.title}
                          </p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {indicator.value}
                          </p>
                          <div className={`flex items-center text-xs ${getChangeColor(indicator.changeType)}`}>
                            {getChangeIcon(indicator.changeType)}
                            <span className="ml-1">{indicator.change}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {isConfigOpen && (
        <Card className="bg-gray-50 dark:bg-gray-800/50 border-dashed border-2 border-gray-300 dark:border-gray-600">
          <CardContent className="p-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Configurações dos Indicadores
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {indicators.map((indicator) => (
                <label key={indicator.id} className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{indicator.title}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
