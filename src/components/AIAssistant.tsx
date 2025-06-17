
import React, { useState } from 'react';
import { MessageCircle, Send, Sparkles, TrendingUp, Users, Target } from 'lucide-react';
import { Button } from './ui/button';

const aiInsights = [
  {
    type: 'alert',
    icon: TrendingUp,
    title: 'Oportunidade Identificada',
    message: 'TechCorp LTDA está pronta para upgrade. LTV projetado: +R$ 30k',
    action: 'Ver Estratégia'
  },
  {
    type: 'warning',
    icon: Users,
    title: 'Cliente em Risco',
    message: 'BigCorp S.A. com NPS baixo (25). Ação recomendada: reunião urgente',
    action: 'Criar Ação'
  },
  {
    type: 'success',
    icon: Target,
    title: 'Meta Atingida',
    message: 'NPS geral subiu 8% este mês. Estratégia "Foco em Promotores" eficaz',
    action: 'Ver Relatório'
  }
];

const quickActions = [
  "Quais clientes têm maior potencial de upsell?",
  "Analise os clientes com risco de churn",
  "Sugira estratégias para melhorar o NPS",
  "Identifique oportunidades na carteira Nível A"
];

export const AIAssistant = () => {
  const [message, setMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [conversations, setConversations] = useState<Array<{type: 'user' | 'ai', content: string}>>([]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setConversations(prev => [...prev, { type: 'user', content: message }]);
    
    // Simulate AI response
    setTimeout(() => {
      setConversations(prev => [...prev, { 
        type: 'ai', 
        content: 'Baseado na análise dos seus dados, identifiquei 3 clientes Nível A com alto potencial de upsell. TechCorp LTDA tem 85% de probabilidade de aceitar upgrade para o plano Premium, gerando +R$ 30k em LTV. Deseja que eu crie uma estratégia personalizada?' 
      }]);
    }, 1000);
    
    setMessage('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Assistente IA</h3>
              <p className="text-sm text-gray-500">CS360° Intelligence</p>
            </div>
          </div>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        
        <div className="text-sm text-gray-600">
          Analiso seus dados em tempo real e identifico oportunidades estratégicas para maximizar o sucesso dos seus clientes.
        </div>
      </div>

      {/* AI Insights */}
      <div className="p-6 space-y-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Insights em Tempo Real</h4>
        {aiInsights.map((insight, index) => (
          <div key={index} className="p-4 rounded-lg border border-gray-200 hover:border-purple-200 transition-colors">
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                insight.type === 'alert' ? 'bg-blue-100 text-blue-600' :
                insight.type === 'warning' ? 'bg-red-100 text-red-600' :
                'bg-green-100 text-green-600'
              }`}>
                <insight.icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h5 className="text-sm font-medium text-gray-900 mb-1">{insight.title}</h5>
                <p className="text-xs text-gray-600 mb-2">{insight.message}</p>
                <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                  {insight.action}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Interface */}
      <div className="border-t border-gray-200">
        {!isExpanded ? (
          <div className="p-6 space-y-2">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Perguntas Rápidas</h4>
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsExpanded(true);
                  setMessage(action);
                }}
                className="w-full text-left p-3 text-sm border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-200 transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        ) : (
          <div className="p-6 space-y-4">
            {/* Conversation */}
            <div className="max-h-64 overflow-y-auto space-y-3">
              {conversations.map((conv, index) => (
                <div key={index} className={`flex ${conv.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    conv.type === 'user' 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    {conv.content}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Input */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Faça uma pergunta sobre seus dados..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              />
              <Button 
                onClick={handleSendMessage}
                size="sm" 
                className="bg-gradient-to-r from-purple-500 to-pink-500"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
