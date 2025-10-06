import React from 'react';

export const SimpleLanding: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            CS360° Hub
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Customer Success com Inteligência Artificial
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">+250%</div>
              <div className="text-gray-600">Aumento em Retenção</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">-60%</div>
              <div className="text-gray-600">Redução de Churn</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">3x</div>
              <div className="text-gray-600">Mais ROI</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => window.location.href = '/login'}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Fazer Login
            </button>
            <button 
              onClick={() => window.location.href = '/register'}
              className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Criar Conta
            </button>
            <button 
              onClick={() => window.location.href = '/executive-demo'}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Ver Demo
            </button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-blue-600 text-2xl mb-3">🤖</div>
            <h3 className="font-semibold text-gray-900 mb-2">IA Preditiva</h3>
            <p className="text-gray-600 text-sm">Previna churn antes que aconteça</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-green-600 text-2xl mb-3">📊</div>
            <h3 className="font-semibold text-gray-900 mb-2">Analytics Avançado</h3>
            <p className="text-gray-600 text-sm">Insights acionáveis em tempo real</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-purple-600 text-2xl mb-3">🎯</div>
            <h3 className="font-semibold text-gray-900 mb-2">Automação</h3>
            <p className="text-gray-600 text-sm">Workflows inteligentes</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-red-600 text-2xl mb-3">🔗</div>
            <h3 className="font-semibold text-gray-900 mb-2">Integrações</h3>
            <p className="text-gray-600 text-sm">Conecte com suas ferramentas</p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-500">
            Transforme dados em resultados. Escale seu Customer Success com IA.
          </p>
        </div>
      </div>
    </div>
  );
};
