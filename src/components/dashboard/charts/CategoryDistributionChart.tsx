
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categoryData = [
  { name: 'Tecnologia', value: 400, color: '#3B82F6' },
  { name: 'Saúde', value: 300, color: '#10B981' },
  { name: 'Varejo', value: 300, color: '#F59E0B' },
  { name: 'Serviços', value: 200, color: '#8B5CF6' },
];

export const CategoryDistributionChart: React.FC = () => {
  const navigate = useNavigate();

  const handlePieClick = (data: any) => {
    if (data && data.name) {
      navigate(`/clients?category=${encodeURIComponent(data.name.toLowerCase())}`);
    }
  };

  return (
    <Card className="bg-white border border-slate-100 shadow-md rounded-2xl">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Tag className="w-5 h-5 text-blue-500" />
          <CardTitle className="text-lg font-bold text-gray-900">
            Distribuição por Categoria
          </CardTitle>
        </div>
        <div className="text-sm text-slate-500 mt-1 ml-7">
          Clientes por setor de mercado
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              onClick={handlePieClick}
              style={{ cursor: 'pointer' }}
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => [`${value} clientes`]} />
            <Legend iconSize={10} wrapperStyle={{fontSize: "12px", bottom: -5}}/>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
