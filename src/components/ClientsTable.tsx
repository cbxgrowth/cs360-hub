
import React from 'react';
import { ChevronLeft, ChevronRight, Plus, Search } from 'lucide-react';

const clients = [
  {
    name: 'Empresa A',
    level: 'Nível A - Avançado',
    healthScore: 85,
    nps: 9,
    ltv: 'R$ 24.5k',
    churnRisk: 'Baixo',
    lastCsat: '8/10',
    status: 'Ativo',
    color: 'green'
  },
  {
    name: 'Empresa B',
    level: 'Nível B - Moderado',
    healthScore: 62,
    nps: 7,
    ltv: 'R$ 12.8k',
    churnRisk: 'Médio',
    lastCsat: '6/10',
    status: 'Ativo',
    color: 'orange'
  },
  {
    name: 'Empresa C',
    level: 'Nível A - Conservador',
    healthScore: 78,
    nps: 8,
    ltv: 'R$ 18.7k',
    churnRisk: 'Baixo',
    lastCsat: '9/10',
    status: 'Ativo',
    color: 'green'
  },
  {
    name: 'Empresa D',
    level: 'Nível C - Moderado',
    healthScore: 35,
    nps: 4,
    ltv: 'R$ 6.1k',
    churnRisk: 'Alto',
    lastCsat: '3/10',
    status: 'Risco',
    color: 'red'
  },
  {
    name: 'Empresa E',
    level: 'Nível B - Avançado',
    healthScore: 56,
    nps: 6,
    ltv: 'R$ 15.1k',
    churnRisk: 'Médio',
    lastCsat: '5/10',
    status: 'Ativo',
    color: 'orange'
  }
];

export const ClientsTable = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Clientes</h3>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span className="text-sm">Adicionar Cliente</span>
          </button>
        </div>
        
        <div className="mt-4 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar clientes..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Health Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NPS</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LTV</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Churn Risk</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Último CSAT</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clients.map((client, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center mr-3">
                      <span className="text-purple-600 font-medium text-sm">
                        {client.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{client.name}</div>
                      <div className="text-sm text-gray-500">{client.level}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      client.color === 'green' ? 'bg-green-500' :
                      client.color === 'orange' ? 'bg-orange-500' :
                      'bg-red-500'
                    }`}></div>
                    <span className="text-sm text-gray-900">{client.healthScore}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.nps}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.ltv}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    client.churnRisk === 'Baixo' ? 'bg-green-100 text-green-800' :
                    client.churnRisk === 'Médio' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {client.churnRisk}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      parseInt(client.lastCsat) >= 8 ? 'bg-green-500' :
                      parseInt(client.lastCsat) >= 6 ? 'bg-orange-500' :
                      'bg-red-500'
                    }`}></div>
                    <span className="text-sm text-gray-900">{client.lastCsat}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    client.status === 'Ativo' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {client.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">Ver</button>
                    <button className="text-blue-600 hover:text-blue-900">Editar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Mostrando 1 a 5 de 24 clientes
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 border border-gray-300 rounded hover:bg-gray-100">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded">1</span>
            <button className="px-3 py-1 border border-gray-300 text-sm rounded hover:bg-gray-100">2</button>
            <button className="px-3 py-1 border border-gray-300 text-sm rounded hover:bg-gray-100">3</button>
            <span className="text-gray-500">...</span>
            <button className="px-3 py-1 border border-gray-300 text-sm rounded hover:bg-gray-100">Próximo</button>
            <button className="p-2 border border-gray-300 rounded hover:bg-gray-100">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
