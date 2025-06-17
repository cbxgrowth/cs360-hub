
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Target, Eye, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categoryData = [
  { name: 'Tecnologia', value: 45, color: '#3B82F6', route: '/category-technology' },
  { name: 'Saúde', value: 23, color: '#10B981', route: '/category-health' },
  { name: 'Financeiro', value: 18, color: '#8B5CF6', route: '/category-financial' },
  { name: 'E-commerce', value: 14, color: '#F59E0B', route: '/category-ecommerce' }
];

export const CategoryDistributionChart: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg text-gray-900 dark:text-white">Distribuição por Categoria</CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">Clientes por segmento</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
            4 categorias
          </Badge>
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-3">
            {categoryData.map((category) => (
              <div key={category.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{category.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{category.value}% do total</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-blue-600 dark:text-blue-400"
                  onClick={() => navigate(category.route)}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
