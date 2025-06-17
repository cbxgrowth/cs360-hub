
import React from 'react';
import { Download, Filter, Eye } from 'lucide-react';
import { Button } from '../../ui/button';
import { ResponsiveContainer, ScatterChart, Scatter, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { segmentData } from '../data/ltvCacData';
import { getSegmentColor, getRatioColor } from '../utils/colorUtils';

interface SegmentsTabProps {
  segmentFilter: string;
  onSegmentFilterChange: (filter: string) => void;
}

export const SegmentsTab = ({ segmentFilter, onSegmentFilterChange }: SegmentsTabProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex space-x-4">
          <select
            value={segmentFilter}
            onChange={(e) => onSegmentFilterChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
          >
            <option value="Todos">Todos Segmentos</option>
            <option value="Nível">Por Nível</option>
            <option value="Perfil">Por Perfil</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {segmentData.map((segment, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSegmentColor(segment.segment)}`}>
                {segment.segment}
              </span>
              <span className={`text-lg font-bold ${getRatioColor(segment.ratio)}`}>
                {segment.ratio.toFixed(1)}:1
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">LTV Médio</p>
                <p className="text-lg font-bold text-green-600">R$ {(segment.ltv / 1000).toFixed(0)}k</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">CAC Médio</p>
                <p className="text-lg font-bold text-blue-600">R$ {(segment.cac / 1000).toFixed(1)}k</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Clientes</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{segment.clients}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Contrato Médio</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{segment.avgContract} meses</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Churn Rate</p>
                <p className={`text-sm font-medium ${segment.churnRate <= 3 ? 'text-green-600' : segment.churnRate <= 6 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {segment.churnRate}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Payback</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{segment.payback} meses</p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <Button variant="outline" size="sm" className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                Ver Detalhes
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Comparação LTV vs CAC por Segmento</h3>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart data={segmentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="cac" name="CAC" />
            <YAxis dataKey="ltv" name="LTV" />
            <Tooltip formatter={(value, name) => [
              `R$ ${value.toLocaleString()}`,
              name === 'cac' ? 'CAC' : 'LTV'
            ]} />
            <Scatter dataKey="ltv" fill="#3B82F6" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
